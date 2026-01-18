import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
  if (isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    // Check if mongoose is already connected
    if (mongoose.connection.readyState === 1) {
      console.log("Mongoose already connected");
      isConnected = true;
      return;
    }

    // Disconnect any existing connection before connecting
    if (mongoose.connection.readyState > 0) {
      await mongoose.disconnect();
      console.log("Disconnected existing connection");
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log("Database connected Successfully!");
  } catch (error) {
    console.log("Database connection failed!", error);
    isConnected = false;
    throw error;
  }
}

export default connect;
