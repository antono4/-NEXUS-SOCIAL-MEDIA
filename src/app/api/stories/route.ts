import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    const stories = await prisma.story.findMany({
      where: {
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const storiesWithViewStatus = stories.map((story) => ({
      ...story,
      isViewed: false,
    }));

    return NextResponse.json({ success: true, stories: storiesWithViewStatus });
  } catch (error) {
    console.error("Get stories error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil stories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Anda harus login terlebih dahulu" },
        { status: 401 }
      );
    }

    const { image, backgroundColor } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "Image diperlukan" },
        { status: 400 }
      );
    }

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const story = await prisma.story.create({
      data: {
        image,
        backgroundColor: backgroundColor || "#1a1d23",
        authorId: session.user.id,
        expiresAt,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, story });
  } catch (error) {
    console.error("Create story error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat membuat story" },
      { status: 500 }
    );
  }
}
