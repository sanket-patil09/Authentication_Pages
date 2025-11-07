import connect from "@/src/app/db_config/db_config";
import { NextResponse, NextRequest } from "next/server";
import User from "@/src/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// connect to database every time this route is hit
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User Not Exist !" },
        { status: 400 }
      );
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json(
        { message: "Invalid Password !" },
        { status: 400 }
      );
    }
    //generating tokens data
    const TokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    // create token
    const token = await jwt.sign(TokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1D",
    });

    // send response
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });
    // set token in httpOnly cookie
    response.cookies.set("token", token, { httpOnly: true });
    // return response
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
