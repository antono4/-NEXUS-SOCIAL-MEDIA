import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const userId = searchParams.get("userId");
    const search = searchParams.get("search");

    if (username) {
      const user = await prisma.user.findUnique({
        where: { username },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          bio: true,
          avatar: true,
          coverImage: true,
          createdAt: true,
          _count: {
            select: {
              followers: true,
              following: true,
              posts: true,
            },
          },
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: "User tidak ditemukan" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, user });
    }

    if (search) {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { username: { contains: search, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
          bio: true,
        },
        take: 20,
      });

      return NextResponse.json({ success: true, users });
    }

    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          bio: true,
          avatar: true,
          coverImage: true,
          createdAt: true,
          _count: {
            select: {
              followers: true,
              following: true,
              posts: true,
            },
          },
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: "User tidak ditemukan" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, user });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
        bio: true,
      },
      take: 20,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil users" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Anda harus login terlebih dahulu" },
        { status: 401 }
      );
    }

    const { name, bio, avatar, coverImage } = await request.json();

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        bio,
        avatar,
        coverImage,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        bio: true,
        avatar: true,
        coverImage: true,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengupdate user" },
      { status: 500 }
    );
  }
}
