import io from "socket.io-client";
import { BaseUrl } from "./Constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BaseUrl);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
