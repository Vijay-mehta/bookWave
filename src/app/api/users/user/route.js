import { NextResponse } from "next/server";
import User from "@/app/models/userModel";
export async function GET(req){

   try{
    const allUsers =await User.find().exec();
    console.log("allusers",allUsers)
    return NextResponse.json(allUsers) 
   }catch(error){
    console.log(error)
   }

}