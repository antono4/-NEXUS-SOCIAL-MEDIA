import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    const where = userId ? { authorId: userId } : {};

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            _count: {
              select: { followers: true, following: true },
            },
          },
        },
        comments: {
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
          take: 3,
        },
        likes: {
          select: { userId: true },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    const postsWithLikeStatus = posts.map((post) => ({
      ...post,
      isLiked: currentUserId
        ? post.likes.some((like) => like.userId === currentUserId)
        : false,
      likes: undefined,
    }));

    return NextResponse.json({ success: true, posts: postsWithLikeStatus });
  } catch (error) {
    console.error("Get posts error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil postingan" },
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

    const { content, images, video } = await request.json();

    if (!content && !images?.length && !video) {
      return NextResponse.json(
        { error: "Postingan harus memiliki konten" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        content,
        images: images || [],
        video,
        authorId: session.user.id,
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
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat membuat postingan" },
      { status: 500 }
    );
  }
}
