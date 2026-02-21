import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MessageSender = "user" | "bot" | "admin";

export type ChatMessage = {
    id: string;
    from: MessageSender;
    text: string;
    time: string;
    senderName?: string;
};

export type ChatSession = {
    id: string; // session ID unik per visitor
    visitorName: string;
    visitorEmail?: string;
    status: "bot" | "waiting" | "live" | "closed"; // bot=masih di bot, waiting=minta admin, live=admin online, closed=selesai
    messages: ChatMessage[];
    createdAt: string;
    lastMessageAt: string;
    unreadByAdmin: number; // jumlah pesan yang belum dibaca admin
};

type ChatStore = {
    sessions: ChatSession[];
    activeSessionId: string | null;

    // User actions
    initSession: (visitorName: string) => string;
    sendUserMessage: (sessionId: string, text: string) => void;
    requestAdmin: (sessionId: string) => void;
    getSession: (sessionId: string) => ChatSession | undefined;

    // Bot action
    addBotMessage: (sessionId: string, text: string) => void;

    // Admin actions
    sendAdminMessage: (sessionId: string, text: string, adminName: string) => void;
    markReadByAdmin: (sessionId: string) => void;
    closeSession: (sessionId: string) => void;
    deleteSession: (sessionId: string) => void;
    setActiveSession: (sessionId: string | null) => void;

    // Selector
    getPendingSessions: () => ChatSession[];
    getLiveSessions: () => ChatSession[];
};

function generateId() {
    return Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
}

function now() {
    return new Date().toISOString();
}

function timeStr() {
    return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            sessions: [],
            activeSessionId: null,

            initSession: (visitorName) => {
                const id = generateId();
                const session: ChatSession = {
                    id,
                    visitorName,
                    status: "bot",
                    messages: [
                        {
                            id: generateId(),
                            from: "bot",
                            text: `Halo ${visitorName}! 👋 Selamat datang di **Senja Wisata**. Saya Senja Assistant, siap membantu Anda.\n\nAda yang bisa saya bantu?`,
                            time: timeStr(),
                            senderName: "Senja Assistant",
                        },
                    ],
                    createdAt: now(),
                    lastMessageAt: now(),
                    unreadByAdmin: 0,
                };
                set((s) => ({ sessions: [...s.sessions, session] }));
                return id;
            },

            sendUserMessage: (sessionId, text) => {
                const msg: ChatMessage = {
                    id: generateId(),
                    from: "user",
                    text,
                    time: timeStr(),
                };
                set((s) => ({
                    sessions: s.sessions.map((sess) =>
                        sess.id === sessionId
                            ? {
                                ...sess,
                                messages: [...sess.messages, msg],
                                lastMessageAt: now(),
                                unreadByAdmin: sess.status !== "bot" ? sess.unreadByAdmin + 1 : sess.unreadByAdmin,
                            }
                            : sess
                    ),
                }));
            },

            requestAdmin: (sessionId) => {
                const adminRequestMsg: ChatMessage = {
                    id: generateId(),
                    from: "bot",
                    text: "✋ Baik! Saya akan menghubungkan Anda dengan **Tim Support Senja**. Mohon tunggu sebentar, admin kami akan segera membalas pesan Anda.\n\n_Estimasi waktu tunggu: < 5 menit_ ⏳",
                    time: timeStr(),
                    senderName: "Senja Assistant",
                };
                set((s) => ({
                    sessions: s.sessions.map((sess) =>
                        sess.id === sessionId
                            ? {
                                ...sess,
                                status: "waiting",
                                messages: [...sess.messages, adminRequestMsg],
                                lastMessageAt: now(),
                                unreadByAdmin: sess.unreadByAdmin + 1,
                            }
                            : sess
                    ),
                }));
            },

            getSession: (sessionId) => {
                return get().sessions.find((s) => s.id === sessionId);
            },

            addBotMessage: (sessionId, text) => {
                const msg: ChatMessage = {
                    id: generateId(),
                    from: "bot",
                    text,
                    time: timeStr(),
                    senderName: "Senja Assistant",
                };
                set((s) => ({
                    sessions: s.sessions.map((sess) =>
                        sess.id === sessionId
                            ? {
                                ...sess,
                                messages: [...sess.messages, msg],
                                lastMessageAt: now(),
                            }
                            : sess
                    ),
                }));
            },

            sendAdminMessage: (sessionId, text, adminName) => {
                const msg: ChatMessage = {
                    id: generateId(),
                    from: "admin",
                    text,
                    time: timeStr(),
                    senderName: adminName,
                };
                set((s) => ({
                    sessions: s.sessions.map((sess) =>
                        sess.id === sessionId
                            ? {
                                ...sess,
                                status: "live",
                                messages: [...sess.messages, msg],
                                lastMessageAt: now(),
                            }
                            : sess
                    ),
                }));
            },

            markReadByAdmin: (sessionId) => {
                set((s) => ({
                    sessions: s.sessions.map((sess) =>
                        sess.id === sessionId ? { ...sess, unreadByAdmin: 0 } : sess
                    ),
                }));
            },

            closeSession: (sessionId) => {
                set((s) => ({
                    sessions: s.sessions.map((sess) =>
                        sess.id === sessionId ? { ...sess, status: "closed" } : sess
                    ),
                }));
            },

            deleteSession: (sessionId) => {
                set((s) => ({
                    sessions: s.sessions.filter((sess) => sess.id !== sessionId),
                    activeSessionId: s.activeSessionId === sessionId ? null : s.activeSessionId,
                }));
            },

            setActiveSession: (sessionId) => {
                set({ activeSessionId: sessionId });
            },

            getPendingSessions: () => {
                return get().sessions.filter((s) => s.status === "waiting");
            },

            getLiveSessions: () => {
                return get().sessions.filter((s) => s.status === "live");
            },
        }),
        {
            name: "senja-chat-store",
        }
    )
);
