import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  //WIP wire up ai agent
  try {
    const body = await req.json();
    const content = JSON.parse(body.content);

    const transcribed = await client.video.update({
      where: {
        userId: id,
        source: body.filename,
      },
      data: {
        title: content.title,
        description: content.summary,
        summery: body.transcript,
      },
    });

    if (transcribed) {
      return NextResponse.json({
        status: 200,
      });
    }

    return NextResponse.json({
      status: 400,
    });
  } catch (error) {
    console.log("🔴 Error in transcribe ", error);
  }
};
