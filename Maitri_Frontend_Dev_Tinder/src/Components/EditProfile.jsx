import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../Utiles/Constants";
import { addLoginUser } from "../Utiles/userAuthSlice";
import UserCardBackup from "./UserCardBackup";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  // console.log(user);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [img_Url, setimg_Url] = useState(user?.img_Url || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [newSkills, setNewSkills] = useState("");
  const [errorr, setErrorr] = useState("");
  const [showTaste, setShowTaste] = useState(false);
  const addSkills = (e) => {
    e.preventDefault();
    if (newSkills.trim() && !skills.includes(newSkills)) {
      setSkills((preSkills) => [...preSkills, newSkills]);
      // setSkills([newSkills, ...skills]);
      setNewSkills("");
    }
  };
  const editSkill = (index, skill) => {
    const newskillsArray = [...skills];
    newskillsArray[index] = skill;
    setSkills(newskillsArray);
  };
  const removeSkill = (index) => {
    setSkills((preSkills) => preSkills.filter((_, i) => i !== index));
    // setSkills(skills.filter((_, i) => i !== index));
  };
  const update = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        BaseUrl + "/profile/edit",
        {
          firstName,
          lastName,
          img_Url,
          age,
          gender,
          skills,
        },
        {
          withCredentials: true,
        }
      );
      // console.log("Profile updated successfully:", res.data);
      dispatch(addLoginUser(res.data));
      setShowTaste(true);
      setTimeout(() => {
        setShowTaste(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error.response);
      setErrorr(error.response?.data);
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setimg_Url(user.img_Url || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setSkills(user.skills || []); // Fix: Ensure skills array is properly set
    }
  }, [user]);
  return (
    <>
      {user && (
        <div className="flex  items-center justify-center gap-4">
          <div class="p-6 pt-0 w-full">
            <form>
              <div>
                <div>
                  <div class="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div class="flex justify-between">
                      <label class="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        FirstName
                      </label>
                    </div>
                    <input
                      type="String"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      autocomplete="off"
                      class="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <div>
                  <div class="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div class="flex justify-between">
                      <label class="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        lastName
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="String"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        class="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <div>
                  <div class="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div class="flex justify-between">
                      <label class="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Image
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="String"
                        name="img_Url"
                        value={img_Url}
                        onChange={(e) => {
                          setimg_Url(e.target.value);
                        }}
                        class="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <div>
                  <div class="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div class="flex justify-between">
                      <label class="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Age
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="String"
                        name="img_Url"
                        value={age}
                        onChange={(e) => {
                          setAge(e.target.value);
                        }}
                        class="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <div>
                  <div class="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div class="flex justify-between">
                      <label class="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Gender
                      </label>
                    </div>
                    <div class="flex items-center">
                      {/* <input
                        type="String"
                        name="img_Url"
                        value={gender}
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                        class="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                      /> */}
                      <select
                        className="select mt-2 select-bordered w-full max-w-xs"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <div>
                  <div class="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div class="flex justify-between">
                      <label class="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Skills
                      </label>
                    </div>
                    <div className="flex flex-col  items-center mt-2">
                      {skills &&
                        skills.map((skill, index) => (
                          <div className=" flex  w-full">
                            <input
                              key={index}
                              type="text"
                              value={skill}
                              onChange={(e) => editSkill(index, e.target.value)}
                              class="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                            />
                            <button
                            className=" hover:border border-red-600 rounded-xl py-2 px-6"
                              type="button"
                              onClick={() => removeSkill(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      <div className="flex gap-2 mt-4 w-full ">
                        <input
                          className=" border border-white w-full text-white"
                          type="string"
                          value={newSkills}
                          onChange={(e) => setNewSkills(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={addSkills}
                          className="w-full hover:cursor-pointer hover:border border-amber-100"
                        >
                          Add Skill
                        </button>
                      </div>
                    </div>

                    {/* <div className="flex flex-col items-start mt-2">
                      {skills &&
                        skills.map((skill, index) => (
                          <input
                            key={index}
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const updatedSkills = [...skills];
                              updatedSkills[index] = e.target.value;
                              setSkills(updatedSkills);
                            }}
                            class="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                          />
                        ))}
                    </div> */}
                  </div>
                </div>
              </div>
              <p className="text-red-600 mt-3">{errorr}</p>

              <div class="mt-4 flex items-center justify-end gap-x-2">
                <button
                  class="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                  type="submit"
                  onClick={(e) => update(e)}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          <div className="w-full flex items-center justify-center">
            <UserCardBackup
              users={{ firstName, lastName, img_Url, age, gender, skills }}
              showButton={false}
            />
          </div>
          {showTaste && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-success">
                <span>Profile saved successfully.</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EditProfile;
