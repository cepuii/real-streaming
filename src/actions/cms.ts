import { client } from "@/lib/prisma";
import { items } from "@wix/data";
import { createClient, OAuthStrategy } from "@wix/sdk";

export const getWixContent = async () => {
  try {
    const wixClient = createClient({
      modules: { items },
      auth: OAuthStrategy({
        clientId: process.env.WIX_OAUTH_KEY! as string,
      }),
    });

    const videos = await wixClient.items
      .queryDataItems({
        dataCollectionId: "opal-videos",
      })
      .find();

    const videosIds = videos.items.map((video) => video.data?.title);
    const video = await client.video.findMany({
      where: {
        title: {
          in: videosIds,
        },
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        workSpaceId: true,
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (video && video.length > 0) {
      return { status: 200, data: video };
    }

    return { status: 404, data: [] };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 403, data: [] };
  }
};
