import { connectToDB } from "@/app/database";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
export  async function GET(req, res) {
  try {
    await connectToDB();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Error getting users",
      error: err.message,
    });
  }
}




