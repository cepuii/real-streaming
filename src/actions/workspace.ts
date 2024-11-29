"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    const isUserInWorkspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });

    return {
      status: 200,
      data: { workspace: isUserInWorkspace },
    };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 403, data: { workspace: null } };
  }
};

export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (isFolders && isFolders.length > 0) {
      return { status: 200, data: isFolders };
    }

    return { status: 404, data: [] };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 403, data: [] };
  }
};

export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }
    const videos = await client.video.findMany({
      where: {
        OR: [{ workSpaceId }, { folderId: workSpaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (videos && videos.length > 0) {
      return { status: 200, data: videos };
    }
    return { status: 400, data: [] };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 503, data: [] };
  }
};

export const getWorkSpaces = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }

    const workSpaces = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (workSpaces) {
      return { status: 200, data: workSpaces };
    }

    return { status: 403, data: [] };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 403, data: [] };
  }
};

export const createWorkspace = async (name: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const authorized = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (authorized?.subscription?.plan === "PRO") {
      const workspace = await client.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          workspace: {
            create: {
              name: name,
              type: "PUBLIC",
            },
          },
        },
      });

      if (workspace) {
        return { status: 200, data: "Workspace created" };
      }
    }

    return { status: 401, data: "You are not authorized to create workspace" };
  } catch (error) {
    return { status: 400 };
  }
};

export const renameFolders = async (folderId: string, name: string) => {
  try {
    const folder = await client.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });

    if (folder) {
      return { status: 200, data: "Folder Renamed" };
    }
    return { status: 400, data: "Folder does not exist" };
  } catch (error) {
    return { status: 500, data: "Oops! smth went wrong" };
  }
};

export const createFolder = async (workspaceId: string) => {
  try {
    const isNewFolder = await client.workSpace.update({
      where: {
        id: workspaceId,
      },
      data: {
        folders: {
          create: {
            name: "untitled",
          },
        },
      },
    });
    if (isNewFolder) {
      return { status: 200, data: "New Folder Created" };
    }
    return { status: 400, data: "Can't create the folder" };
  } catch (error) {
    return { status: 500, data: "Oops! smth went wrong" };
  }
};

export const getFolderInfo = async (folderId: string) => {
  try {
    const folderInfo = await client.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        name: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (folderInfo) {
      return { status: 200, data: folderInfo };
    }
    return { status: 400, data: "No folders" };
  } catch (error) {
    return { status: 500, data: "Oops!" };
  }
};

export const moveVideoLocation = async (
  videoId: string,
  workSpaceId: string,
  folderId: string
) => {
  try {
    const location = await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        folderId: folderId || null,
        workSpaceId,
      },
    });

    if (location) {
      return { status: 200, data: "Folder changed successfully" };
    }
    return { status: 404, data: "Folder/workspace not found" };
  } catch (error) {
    return { status: 500, data: "Oops!" };
  }
};

export const getPreviewVideo = async (videoId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }

    const video = await client.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        title: true,
        createdAt: true,
        source: true,
        description: true,
        processing: true,
        views: true,
        summery: true,
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
            clerkid: true,
            trial: true,
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    });

    if (video) {
      return {
        status: 200,
        data: video,
        author: user.id === video.User?.clerkid ? true : false,
      };
    }

    return { status: 400, data: "No video!" };
  } catch (error) {
    return { status: 500, data: "Oops!" };
  }
};
