import useAuthStore from "../stores/useAuthStore";
import { useState } from "react";

function ChatPage() {
   const { logout } = useAuthStore(); 
  return (
    <div className='z-10'>
        ChatPage
        <button onClick={logout}>Logout</button>
   
    </div>
  );
}

export default ChatPage