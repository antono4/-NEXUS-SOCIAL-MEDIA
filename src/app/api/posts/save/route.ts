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

    const existingSave = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId,
        },
      },
    });

    if (existingSave) {
      await prisma.savedPost.delete({
        where: { id: existingSave.id },
      });

      return NextResponse.json({
        success: true,
        message: "Postingan berhasil dihapus dari tersimpan",
        isSaved: false,
      });
    }

    await prisma.savedPost.create({
      data: {
        userId: session.user.id,
        postId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Postingan berhasil disimpan",
      isSaved: true,
    });
  } catch (error) {
    console.error("Save post error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan postingan" },
      { status: 500 }
    );
  }
}
