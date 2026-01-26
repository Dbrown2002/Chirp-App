
import { Routes, Route } from 'react-router'
import ChatPage from './pages/ChatPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-primary/10 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* DECORATORS */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="pointer-events-none absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen w-full bg-base-100/60 backdrop-blur-sm">
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </div>
  )
}