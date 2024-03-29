import { NextResponse } from "next/server";
import dbConnection from "@/utils/dbConnection";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req) {
  const _req = await req.json();
  await dbConnection();

  try {
    const { name, email, password } = _req;

    // Check if user with email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          err: "User with that email already exists",
        },
        { status: 409 },
      );
    } else {
      await new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      }).save();
      return NextResponse.json(
        {
          success: "Registered successfully",
        },
        { status: 200 },
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: "Server error. Please try again.",
      },
      { status: 500 },
    );
  }
}
