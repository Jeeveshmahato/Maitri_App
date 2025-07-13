import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Utiles/Constants";
import { useNavigate } from "react-router-dom";

const Membership = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BaseUrl + "/premium/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };
  const verifyPremium = async (userId) => {
    if (!userId) {
      console.error("userId is undefined in verifyPremium");
      return;
    }

    const res = await axios.post(
      BaseUrl + "/premium/userVerify",
      { userId, isPremium: true },
      {
        withCredentials: true,
      }
    );
  };
  const handlePayment = async (type) => {
    const order = await axios.post(
      BaseUrl + "/payment/create",
      { membershipType: type },
      {
        withCredentials: true,
      }
    );
    const { orderId, amount, notes, userId, currency, keyId } = order.data;
    console.log("User ID:", userId);
    const options = {
      key: keyId,
      amount,
      currency,
      name: "Maitri_App_Silver",
      description: "memebership for sliver",
      order_id: orderId,
      prefill: {
        userId,
        name: notes.firstName + " " + notes.lastName,
        email: notes.email,
      },
      theme: {
        color: "#F37254",
      },
      handler: function () {
        verifyPremiumUser();
        verifyPremium(userId);
        navigate("/");
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="text-2xl">You are already a premium user 🎉</h1>
      </div>
    </>
  ) : (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Silver Membership */}
          {/* <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-72">
            <h2 className="text-xl font-bold text-gray-300">
              Silver Membership
            </h2>
            <p className="mt-2 text-gray-400">Basic Features</p>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li>✅ Limit: 50 friend requests</li>
              <li>✅ No verification mark</li>
              <li>✅ Limited chat access</li>
            </ul>
            <button
              type="button"
              className="mt-4 w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded"
              onClick={() => handlePayment("silver")}
            >
              Choose Silver
            </button>
          </div> */}

          {/* Gold Membership */}
          <div className="p-6 bg-yellow-600 rounded-lg shadow-lg w-72">
            <h2 className="text-xl font-bold">Gold Membership</h2>
            <p className="mt-2 text-yellow-200">Premium Features</p>
            <ul className="mt-4 space-y-2 text-yellow-100">
              {/* <li>✨ Unlimited friend requests</li> */}
              <li>✨ Verified badge</li>
              <li>✨ Full chat access</li>
            </ul>
            <button
              className="mt-4 w-full bg-yellow-500 hover:bg-yellow-400 text-white py-2 rounded"
              onClick={() => handlePayment("gold")}
            >
              Choose Gold
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Membership;
