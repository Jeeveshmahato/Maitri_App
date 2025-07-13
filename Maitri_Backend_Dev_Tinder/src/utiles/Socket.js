const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../Model/chat");
const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};
const initailizeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: process.env.NODE_ENV === "production" 
        ? ["https://maitri-app-frontend.onrender.com", "http://localhost:5173"]
        : "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Cookie"],
    },
    path: "/socket.io"
  });
  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(firstName + "joined Room : " + roomId);
      console.log(roomId);
      socket.join(roomId);
      console.log(`Active rooms:`, socket.rooms);
    });
    socket.on(
      "sendMessage",
      async ({ firstName, userId, lastName, targetUserId, text, img_Url }) => {
        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(roomId);
          console.log(firstName + " " + text);
          console.log("Message data:", { firstName, lastName, text, img_Url });
          
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({
            senderId: userId,
            text,
          });
          await chat.save();
          console.log("Emitting message with user data:", { firstName, lastName, text, img_Url });
          io.to(roomId).emit("messageReceived", { firstName, lastName, text, img_Url });
        } catch (error) {
          console.log(error);
        }
      }
    );
    socket.on("disconnect", () => {});
  });
};
module.exports = initailizeSocket;
