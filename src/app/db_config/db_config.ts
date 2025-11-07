import mongoose, { mongo } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on("open", () => {
      console.log("Database connected Successfully !");
    });
    connection.on("error", (err) => {
      console.log("Database connection failed !" + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong !");
    console.log(error);
  }
}

export default connect;
