import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useState } from "react";

const UserCard = ({ user, onSwipe }) => {
  const x = useMotionValue(0);
  console.log("UserCard Rendered with user:", user);
  const { _id, firstName, lastName, skills, age, gender, img_Url, isPremium } =
    user;

  // Animation properties
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(
    x,
    [-200, -100, 0, 100, 200],
    [0.8, 1, 1, 1, 0.8]
  );

  // Background overlay colors
  const leftBgOpacity = useTransform(x, [-200, -100, 0], [0.3, 0, 0]);
  const rightBgOpacity = useTransform(x, [0, 100, 200], [0, 0, 0.3]);

  const handleDragEnd = () => {
    const xValue = x.get();
    if (xValue < -100) {
      onSwipe(_id, "left");
    } else if (xValue > 100) {
      onSwipe(_id, "right");
    }
  };

  return (
    <div className="relative w-full max-w-md h-[580px]">
      {/* Background overlays */}
      <motion.div
        className="absolute inset-0 bg-red-500/20 rounded-xl pointer-events-none"
        style={{ opacity: leftBgOpacity }}
      />
      <motion.div
        className="absolute inset-0 bg-green-500/20 rounded-xl pointer-events-none"
        style={{ opacity: rightBgOpacity }}
      />

      <motion.div
        drag="x"
        dragConstraints={{ left: -300, right: 300 }}
        dragElastic={0.2}
        style={{
          x,
          rotate,
          opacity,
        }}
        onDragEnd={handleDragEnd}
        className="absolute w-full h-full cursor-grab active:cursor-grabbing"
      >
        <div className="card bg-base-100 w-full h-full shadow-lg">
          <figure className="px-4 pt-4">
            <img
              className="w-full h-96 object-contain rounded-xl"
              src={img_Url}
              alt="Profile"
            />
          </figure>
          <div className="card-body">
            <div className="flex items-center  justify-between">
              <h2 className="card-title text-2xl">
                {firstName} {lastName}
              </h2>
              {isPremium && (
                <div className="flex items-center gap-1 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-label="Verified"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 01.894.553l1.618 3.289 3.631.527a1 1 0 01.555 1.706l-2.627 2.56.62 3.612a1 1 0 01-1.45 1.055L10 14.347l-3.241 1.704a1 1 0 01-1.45-1.055l.62-3.612-2.627-2.56a1 1 0 01.555-1.706l3.631-.527L9.106 2.553A1 1 0 0110 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">Verified</span>
                </div>
              )}
            </div>
            <p className="text-lg">
              {age} • {gender}
            </p>
            <div className="flex flex-wrap gap-2 my-2">
              {skills?.map((skill) => (
                <span key={skill} className="badge badge-outline">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Swipe indicators */}
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none"
            style={{
              opacity: useTransform(x, [-200, -100], [1, 0]),
              scale: useTransform(x, [-200, -100], [1.5, 1]),
            }}
          >
            <div className="text-6xl font-bold border-4 border-red-500 rounded-full w-20 h-20 flex items-center justify-center">
              ✕
            </div>
          </motion.div>

          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none"
            style={{
              opacity: useTransform(x, [100, 200], [0, 1]),
              scale: useTransform(x, [100, 200], [1, 1.5]),
            }}
          >
            <div className="text-6xl font-bold border-4 border-green-500 rounded-full w-20 h-20 flex items-center justify-center">
              ✓
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserCard;
