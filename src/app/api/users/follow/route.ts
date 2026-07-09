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

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "ID user diperlukan" },
        { status: 400 }
      );
    }

    if (userId === session.user.id) {
      return NextResponse.json(
        { error: "Anda tidak bisa mengikuti diri sendiri" },
        { status: 400 }
      );
    }

    const userToFollow = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userToFollow) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: userId,
        },
      },
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: { id: existingFollow.id },
      });

      await prisma.notification.create({
        data: {
          userId,
          type: "follow",
          message: `${session.user.name} berhenti mengikuti Anda`,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Berhasil berhenti mengikuti",
        isFollowing: false,
      });
    }

    await prisma.follow.create({
      data: {
        followerId: session.user.id,
        followingId: userId,
      },
    });

    await prisma.notification.create({
      data: {
        userId,
        type: "follow",
        message: `${session.user.name} mulai mengikuti Anda`,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berhasil mengikuti",
      isFollowing: true,
    });
  } catch (error) {
    console.error("Follow error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengikuti user" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const type = searchParams.get("type");

    if (!userId) {
      return NextResponse.json(
        { error: "ID user diperlukan" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    if (type === "followers") {
      const follows = await prisma.follow.findMany({
        where: { followingId: userId },
        include: {
          follower: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
              bio: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      const followersWithFollowStatus = follows.map((follow) => ({
        ...follow.follower,
        isFollowing: currentUserId
          ? follow.follower.id === currentUserId
          : false,
      }));

      return NextResponse.json({ success: true, users: followersWithFollowStatus });
    }

    if (type === "following") {
      const follows = await prisma.follow.findMany({
        where: { followerId: userId },
        include: {
          following: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
              bio: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      const followingWithFollowStatus = follows.map((follow) => ({
        ...follow.following,
        isFollowing: currentUserId
          ? follow.following.id !== currentUserId
          : false,
      }));

      return NextResponse.json({ success: true, users: followingWithFollowStatus });
    }

    return NextResponse.json(
      { error: "Tipe tidak valid" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Get followers/following error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data" },
      { status: 500 }
    );
  }
}
