import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8000"; // Update with your server URL

class WebSocketService {
  constructor() {
    this.socket = socketIOClient(SOCKET_SERVER_URL);
  }

  connectToRide(rideId, onRideApproved) {
    this.socket.on(`ride_${rideId}`, (data) => {
      if (data.type === "ride.approved") {
        onRideApproved(data.message);
      }
    });
  }

  notifyUser(rideId, message) {
    this.socket.emit("ride.notification", {
      rideId,
      message,
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export default WebSocketService;
