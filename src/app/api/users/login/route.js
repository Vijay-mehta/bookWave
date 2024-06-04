import { mongoConnect } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";

mongoConnect();
export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { email, password } = reqBody;

    console.log("logindata",reqBody)

    const userExist = User.findOne({email});
    if (!userExist) {
      return NextResponse.json({ error: "User Not Found" });
    }
    if(userExist){
        return NextResponse.json({
            message:"User Login Successfully",
            success:true,
            email,
            password
        })
    }
  } catch (error) {
    return NextResponse.json({error:error.message},{status:500})
  }
}
