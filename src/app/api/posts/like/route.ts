import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Anda harus login terlebih dahulu" },
        { status: 401 }
      );
    }

    const { postId } = await request.json();

    if (!postId) {
      return NextResponse.json(
        { error: "ID postingan diperlukan" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return NextResponse.json(
        { error: "Postingan tidak ditemukan" },
        { status: 404 }
      );
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });

      await prisma.notification.create({
        data: {
          userId: post.authorId,
          type: "like",
          message: `${session.user.name} unlike postingan Anda`,
          link: `/post/${postId}`,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Like berhasil dihapus",
        isLiked: false,
      });
    }

    await prisma.like.create({
      data: {
        userId: session.user.id,
        postId,
      },
    });

    if (post.authorId !== session.user.id) {
      await prisma.notification.create({
        data: {
          userId: post.authorId,
          type: "like",
          message: `${session.user.name} menyukai postingan Anda`,
          link: `/post/${postId}`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Like berhasil",
      isLiked: true,
    });
  } catch (error) {
    console.error("Like error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memberikan like" },
      { status: 500 }
    );
  }
}
