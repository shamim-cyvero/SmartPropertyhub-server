import mongoose from "mongoose";

const DBconnection = async () => {
  try {
    const res = await mongoose.connect(process.env.DATA_BASE_URL);
    console.log(`DataBase has connected with : ${res.connection.host}`);
  } catch (error) {
    console.log(`Error from DataBase ${error}`);
  }
};

export default DBconnection;
