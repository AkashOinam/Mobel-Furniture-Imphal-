import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const webappUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;
    if (!webappUrl) {
      console.warn("GOOGLE_SHEET_WEBAPP_URL environment variable is not defined.");
      // Fallback for simulation/testing if not configured yet
      return NextResponse.json({ 
        status: "success", 
        message: "Simulation: Google Sheet Webapp URL not set, but data received successfully." 
      });
    }

    const response = await fetch(webappUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error submitting to Google Sheets:", error);
    return NextResponse.json(
      { status: "error", message: error.message || "Failed to submit quote request" },
      { status: 500 }
    );
  }
}
