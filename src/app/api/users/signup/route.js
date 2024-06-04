import { mongoConnect } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
const bcryptjs = require("bcryptjs");

mongoConnect();

export async function POST(req) {
  try {
    const reqBody = await req.formData();
    console.log("reqBody11", reqBody);
    const { userProfile, username, email, password } = reqBody;
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

    const newUser = new User({
      userProfile,
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        savedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
