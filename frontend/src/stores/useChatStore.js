import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { getMessagesByUserId } from '../../../backend/src/controllers/message.controller.js';

 const useChatStore = create((set) => ({ 

    allContacts: [],
    chats: [],
    messages: [],
    activeTab: 'chats', // 'chats' or 'contacts'
    SelectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem('isSoundEnabled') === 'true' ? true : false,

    toggleSound: () => {
        localStorage.setItem('isSoundEnabled', !(localStorage.getItem('isSoundEnabled') === 'true'));
        set((state) => ({ isSoundEnabled: !state.isSoundEnabled }));
    },

    setActiveTab: (tab) => set({ activeTab: tab}),

    setSelectedUser: (selectedUser) => set({ SelectedUser: selectedUser}),


    getAllContacts: async () => {
        set({ isUsersLoading: true });

        try {
            const res = await axiosInstance.get('/messages/contacts');
            set({ allContacts: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load contacts. Please try again.");
        } finally {         
            set({ isUsersLoading: false });
        }
    },

    getMyChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load chats. Please try again.");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load messages. Please try again.");
        } finally {
            set({ isMessagesLoading: false });
        }
    }



}));

export default useChatStore;
