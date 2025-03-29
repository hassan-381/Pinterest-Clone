import connectToDB from "@/libs/mongodb";
import Pin from "@/models/pin";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const GET = async (req, { params }) => {
  try {
    // Ensure database connection
    await connectToDB();
    console.log("Database connected successfully!");

    // Check if params and id exist
    if (!params || !params.id) {
      return NextResponse.json(
        { success: false, message: "Invalid request. ID is required." },
        { status: 400 }
      );
    }

    const { id } = params;
    console.log("Requested Pin ID:", id);

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID format." },
        { status: 400 }
      );
    }

    // Fetch pin from database
    const pin = await Pin.findById(id);
    console.log("Fetched Pin:", pin);

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
