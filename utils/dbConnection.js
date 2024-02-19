import mongoose from "mongoose";

const dbConnection = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  mongoose.connect(process.env.DB_URI);
};

export default dbConnection;
