import { mongoConnect } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";
import path from "path";
const bcryptjs = require("bcryptjs");

mongoConnect();

export async function POST(req) {
  try {
    const reqBody = await req.formData();
    console.log("reqBody11", reqBody);

    const username = reqBody.get("username");
    const email = reqBody.get("email");
    const password = reqBody.get("password");
    const userProfile = reqBody.get("userProfile");

    console.log("userProfile", userProfile);

    if (!userProfile || !username || !email || !password) {
      return NextResponse.json(
        { error: "Missing required field" },
        { status: 400 }
      );
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const fileName = `${Date.now()}-${userProfile.name}`;
    const filePath = path.join(process.cwd(), "uploads", fileName);

    const newUser = new User({
      userProfile: filePath,
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          userProfile: filePath,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
