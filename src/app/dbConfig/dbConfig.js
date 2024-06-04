import mongoose from "mongoose";

export async function mongoConnect() {
  try {
 mongoose.connect(process.env.MONGO_URL)
 const connection =mongoose.connection;
 connection.on('connected',()=>{
    console.log("MOnogoDB connected successfully")
 })
 connection.on('erre',(error)=>{
    console.log("MongoDB connection error Please make sure MongoDB is runing."+error)
 })
  } catch (error) {
    console.log("Something goes wrong!")
    console.log(error)
  }
}
