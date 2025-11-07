import connect from "@/src/app/db_config/db_config";
import { NextResponse, NextRequest } from "next/server";
import User from "@/src/models/userModel";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // check for the user in the DB with multiple fileds
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    // if user already exists return error
    if (user) {
      const field = user.email === email ? "email" : "username";
      return NextResponse.json(
        { message: `User with this ${field} already exists` },
        { status: 400 }
      );
    }

    // hash the password with 10 rounds of salt
    const salt = await bcrypt.genSalt(10);

    // compared the password with hashed password
    const hashedPassword = await bcrypt.hash(password, salt);

    // created a new user using above info
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // saved the user in the DB
    const savedUser = await newUser.save();

    // returned the savedUser with a response message
    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    // return error with status code of 500
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
