import { NextResponse } from "next/server";

const { connectToDB } = require("../../database/index");
const User = require("../../models/user");

export async function PUT(req) {
    try {
        await connectToDB();
        const { id, data } = await req.json();
        const updatedData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            role: data.role,
            gender: data.gender,
        };
        const userUpdate = await User.findByIdAndUpdate(id, updatedData, { new: true });
        if (!userUpdate) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
