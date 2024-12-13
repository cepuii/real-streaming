import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const body = await req.json();

  const studio = await client.user.update({
    where: {
      id,
    },
    data: {
      studio: {
        update: {
          screen: body.screen,
          mic: body.audio,
          preset: body.preset,
        },
      },
    },
  });

  if (studio)
    return NextResponse.json({ status: 200, message: "Studio updated!" });

  return NextResponse.json({
    status: 400,
    message: "Oops! Something gone wrong.",
  });
};