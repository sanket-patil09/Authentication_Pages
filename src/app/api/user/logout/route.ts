import { NextResponse } from "next/server";

export async function GET() {
  try {
    // grabbing the token from cookies
    const response = NextResponse.json({
      message: "Logout Successfully !",
      success: true,
    });

    // deleting the token from cookies no expiration date means delete
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    // returning the response
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
