import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, ChatRoom } from "@/types";

interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);

interface UIStore {
  sidebarOpen: boolean;
  activeModal: string | null;
  selectedChatRoom: ChatRoom | null;
  toggleSidebar: () => void;
  openModal: (modal: string) => void;
  closeModal: () => void;
  setSelectedChatRoom: (room: ChatRoom | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  activeModal: null,
  selectedChatRoom: null,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
  setSelectedChatRoom: (room) => set({ selectedChatRoom: room }),
}));

interface NotificationStore {
  notifications: number;
  unreadMessages: number;
  incrementNotifications: () => void;
  incrementMessages: () => void;
  resetNotifications: () => void;
  resetMessages: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: 0,
  unreadMessages: 0,
  incrementNotifications: () =>
    set((state) => ({ notifications: state.notifications + 1 })),
  incrementMessages: () =>
    set((state) => ({ unreadMessages: state.unreadMessages + 1 })),
  resetNotifications: () => set({ notifications: 0 }),
  resetMessages: () => set({ unreadMessages: 0 }),
}));
