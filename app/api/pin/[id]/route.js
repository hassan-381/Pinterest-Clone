import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Pin from "@/models/pin";
import connectToDB from "@/libs/mongodb";

export const GET = async (req, { params }) => {
  try {
    // Ensure database connection
    await connectToDB();

    // Check if params and id exist
    if (!params || !params.id) {
      return NextResponse.json(
        { success: false, message: "Invalid request. ID is required." },
        { status: 400 }
      );
    }

    const { id } = params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID format." },
        { status: 400 }
      );
    }

    // Fetch pin from database
    const pin = await Pin.findById(id);

    if (!pin) {
      return NextResponse.json(
        { success: false, message: "Pin not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, pin }, { status: 200 });
  } catch (error) {
    console.error("Error while fetching pin:", error);
    return NextResponse.json(
      { success: false, message: "Error while fetching pin." },
      { status: 500 }
    );
  }
};
