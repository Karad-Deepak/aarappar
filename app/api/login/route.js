// app/api/login/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { pin } = await request.json();
    const correctPin = process.env.PASSWORD;

    if (!correctPin) {
      console.error("PIN environment variable is not set.");
      return NextResponse.json(
        { message: "Server misconfiguration" },
        { status: 500 }
      );
    }

    if (pin === correctPin) {
      const response = NextResponse.json({ message: "Success" });
      // Update cookie name to "auth"
      response.cookies.set("auth", "true", {
        path: "/",
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
      });
      return response;
    }

    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  } catch (error) {
    console.error("Error in login API:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
