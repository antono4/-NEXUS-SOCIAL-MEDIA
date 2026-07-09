import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    const post = await prisma.post.findUnique({
      where: { id },
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
            replies: {
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
            },
          },
          orderBy: { createdAt: "desc" },
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
    });

    if (!post) {
      return NextResponse.json(
        { error: "Postingan tidak ditemukan" },
        { status: 404 }
      );
    }

    const postWithLikeStatus = {
      ...post,
      isLiked: currentUserId
        ? post.likes.some((like) => like.userId === currentUserId)
        : false,
      likes: undefined,
    };

    return NextResponse.json({ success: true, post: postWithLikeStatus });
  } catch (error) {
    console.error("Get post error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil postingan" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Anda harus login terlebih dahulu" },
        { status: 401 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return NextResponse.json(
        { error: "Postingan tidak ditemukan" },
        { status: 404 }
      );
    }

    if (post.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Anda tidak memiliki izin untuk mengedit postingan ini" },
        { status: 403 }
      );
    }

    const { content, images, video } = await request.json();

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        content: content ?? post.content,
        images: images ?? post.images,
        video: video ?? post.video,
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

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    console.error("Update post error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengupdate postingan" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Anda harus login terlebih dahulu" },
        { status: 401 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return NextResponse.json(
        { error: "Postingan tidak ditemukan" },
        { status: 404 }
      );
    }

    if (post.authorId !== session.user.id) {
      return NextResponse.json(
        { error: "Anda tidak memiliki izin untuk menghapus postingan ini" },
        { status: 403 }
      );
    }

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Postingan berhasil dihapus",
    });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menghapus postingan" },
      { status: 500 }
    );
  }
}
