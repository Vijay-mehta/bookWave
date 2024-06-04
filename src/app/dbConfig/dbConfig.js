import mongoose from "mongoose";

export async function mongoConnect() {
  if (mongoose.connection.readyState >= 1) {
    console.log("MongoDB is already connected.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(
      "MongoDB connection error. Please make sure MongoDB is running.",
      error
    );
  }

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB connection lost. Attempting to reconnect...");
    mongoConnect();
  });
}
