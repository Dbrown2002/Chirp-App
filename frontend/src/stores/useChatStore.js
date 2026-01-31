import { create } from 'zustand';
import axios from 'axios';

 const useChatStore = create((set) => ({ 

    allContacts: [],
    chats: [],
    messages: [],
    activeTab: 'chats', // 'chats' or 'contacts'
    SelectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem('isSoundEnabled') === 'true' ? true : false,

    toggleSound: () => {
        localStorage.setItem('isSoundEnabled', !(localStorage.getItem('isSoundEnabled') === 'true'));
        set((state) => ({ isSoundEnabled: !state.isSoundEnabled }));
    },

    setActiveTab: (tab) => set({ activeTab: tab}),

    setSelectedUser: (selectedUser) => set({ SelectedUser: selectedUser}),


    getAllContacts: async () => {
        set({ isUserLoading: true });

        try {
            const res = await axios.get('/messages/contactss');
            set({ allContacts: res.data, isUserLoading: false });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load contacts. Please try again.");
}      finally {         
        set({ isUserLoading: false });
    }

    },

    getMyChatPartners: async () => {
        set ({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/chats");
            set ({ allContacts: res.data });

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load chat partners. Please try again.");
        } finally {
            set ({ isUserLoading: false });
        }

    },



}));

export default useChatStore;