import { NextResponse } from "next/server";
import generatePassword from "@/app/password-generator/pass";
const { connectToDB } = require("../../database/index");
const User = require("../../models/user");
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const passKey = generatePassword(16);
    const { firstName, lastName, email, role, age, gender } = body;
    const addUser = new User({
      firstName,
      lastName,
      email,
      role,
      age,
      gender,
      password: passKey,
    });
    await addUser.save();
    return NextResponse.json({ message: "User added successfully" });

    // if (addUser) {
    //   let transporter = nodemailer.createTransport({
    //     host: "smtp.gmail.com",
    //     port: 587,
    //     auth: {
    //       user: process.env.EMAIL_USER,
    //       pass: process.env.EMAIL_PASS,
    //     },
    //   });

    //   let mailOptions = {
    //     from: process.env.EMAIL_USER,
    //     to: email,
    //     subject: "Welcome to Our Service",
    //     text: `Hello ${firstName} ${lastName},\n\nYour account has been created successfully. Your generated password is: ${passKey}\n\nThank you!`,
    //   };

    //   // Send the email
    //   await transporter.sendMail(mailOptions);
    //   console.log("Email sent successfully");
    // }

    // // Return a success response to the client
    // return NextResponse.json({
    //   message:
    //     "User added successfully, The password has been send of resgistered email. Thank You.",
    // });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Error adding user" }, { status: 500 });
  }
}
