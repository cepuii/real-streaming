import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const body = await req.json();

    const completeProcessing = await client.video.update({
      where: {
        userId: id,
        source: body.filename,
      },
      data: {
        processing: false,
      },
    });

    if (completeProcessing) {
      return NextResponse.json({
        status: 200,
      });
    }

    return NextResponse.json({
      status: 400,
    });
  } catch (error) {
    console.log("🔴 Error in completing video ", error);
  }
};
