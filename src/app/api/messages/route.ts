import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Anda harus login terlebih dahulu" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const chatRoomId = searchParams.get("chatRoomId");

    if (chatRoomId) {
      const messages = await prisma.message.findMany({
        where: { chatRoomId },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      });

      await prisma.message.updateMany({
        where: {
          chatRoomId,
          receiverId: session.user.id,
          read: false,
        },
        data: { read: true },
      });

      return NextResponse.json({ success: true, messages });
    }

    const chatRooms = await prisma.chatRoom.findMany({
      where: {
        participants: {
          some: {
            userId: session.user.id,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
          include: {
            sender: {
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
      orderBy: { updatedAt: "desc" },
    });

    const chatRoomsWithUnread = await Promise.all(
      chatRooms.map(async (room) => {
        const unreadCount = await prisma.message.count({
          where: {
            chatRoomId: room.id,
            receiverId: session.user.id,
            read: false,
          },
        });
        return {
          ...room,
          unreadCount,
        };
      })
    );

    return NextResponse.json({ success: true, chatRooms: chatRoomsWithUnread });
  } catch (error) {
    console.error("Get messages error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil pesan" },
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

    const { receiverId, content, image, chatRoomId } = await request.json();

    if (!content && !image) {
      return NextResponse.json(
        { error: "Konten atau image diperlukan" },
        { status: 400 }
      );
    }

    let targetChatRoomId = chatRoomId;

    if (!targetChatRoomId) {
      if (!receiverId) {
        return NextResponse.json(
          { error: "Receiver ID diperlukan" },
          { status: 400 }
        );
      }

      const existingChatRoom = await prisma.chatRoom.findFirst({
        where: {
          AND: [
            {
              participants: {
                some: { userId: session.user.id },
              },
            },
            {
              participants: {
                some: { userId: receiverId },
              },
            },
          ],
        },
      });

      if (existingChatRoom) {
        targetChatRoomId = existingChatRoom.id;
      } else {
        const newChatRoom = await prisma.chatRoom.create({
          data: {
            participants: {
              create: [{ userId: session.user.id }, { userId: receiverId }],
            },
          },
        });
        targetChatRoomId = newChatRoom.id;
      }
    }

    const message = await prisma.message.create({
      data: {
        content,
        image,
        senderId: session.user.id,
        receiverId,
        chatRoomId: targetChatRoomId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    await prisma.chatRoom.update({
      where: { id: targetChatRoomId },
      data: { updatedAt: new Date() },
    });

    if (receiverId !== session.user.id) {
      await prisma.notification.create({
        data: {
          userId: receiverId,
          type: "message",
          message: `${session.user.name} mengirim pesan kepada Anda`,
          link: `/messages?chatRoom=${targetChatRoomId}`,
        },
      });
    }

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("Send message error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengirim pesan" },
      { status: 500 }
    );
  }
}
