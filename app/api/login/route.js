// app/api/login/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { pin } = await request.json();
    const correctPin = process.env.PIN;

    // Check if the PIN env variable is available
    if (!correctPin) {
      console.error("PIN environment variable is not set.");
      return NextResponse.json(
        { message: "Server misconfiguration" },
        { status: 500 }
      );
    }

    // Compare the provided pin with the environment variable
    if (pin === correctPin) {
      const response = NextResponse.json({ message: "Success" });
      response.cookies.set("authenticated", "true", {
        path: "/",
        httpOnly: true,
        // Uncomment the line below in production for enhanced security
        // secure: process.env.NODE_ENV === 'production',
      });
      return response;
    }

    return NextResponse.json({ message: "Invalid pin" }, { status: 401 });
  } catch (error) {
    console.error("Error in login API:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
