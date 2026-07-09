export interface User {
  id: string;
  name: string | null;
  username: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  coverImage: string | null;
  createdAt: Date;
  followers?: User[];
  following?: User[];
  _count?: {
    followers: number;
    following: number;
    posts: number;
  };
}

export interface Post {
  id: string;
  content: string;
  images: string[];
  video: string | null;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  authorId: string;
  comments?: Comment[];
  likes?: Like[];
  _count?: {
    comments: number;
    likes: number;
  };
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  authorId: string;
  postId: string;
  parentId: string | null;
  replies?: Comment[];
  _count?: {
    replies: number;
  };
}

export interface Like {
  id: string;
  createdAt: Date;
  userId: string;
  postId: string;
}

export interface Story {
  id: string;
  image: string;
  backgroundColor: string;
  createdAt: Date;
  expiresAt: Date;
  author: User;
  authorId: string;
  viewCount: number;
  isViewed?: boolean;
}

export interface Follow {
  id: string;
  createdAt: Date;
  followerId: string;
  followingId: string;
}

export interface Message {
  id: string;
  content: string;
  image: string | null;
  createdAt: Date;
  read: boolean;
  senderId: string;
  receiverId: string;
  chatRoomId: string;
  sender?: User;
  receiver?: User;
}

export interface ChatRoom {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  participants?: User[];
  messages?: Message[];
  lastMessage?: Message;
  unreadCount?: number;
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "message" | "mention";
  message: string;
  link: string | null;
  read: boolean;
  createdAt: Date;
  userId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
