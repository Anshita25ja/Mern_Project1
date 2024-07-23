import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
    const MONGODB_URL="mongodb://localhost:27017/Ecommerce";
  try {
    const conn = await mongoose.connect(MONGODB_URL);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;