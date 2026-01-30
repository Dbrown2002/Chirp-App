
import { Routes, Route } from 'react-router'
import ChatPage from './pages/ChatPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import useAuthStore from './stores/useAuthStore.js'
import { useEffect } from 'react'
import { Navigate } from 'react-router'
import PageLoader from './components/PageLoader.jsx'
import { Toaster } from 'react-hot-toast'

export default function App() {

  const {checkAuth, isCheckingAuth, authUser} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  console.log(authUser);

  if (isCheckingAuth) {
    return <PageLoader/>
  }
   
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-primary/10 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* DECORATORS */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="pointer-events-none absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen w-full bg-base-100/60 backdrop-blur-sm">
        <Routes>
          <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login"/>} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
        <Toaster/>
      </div>
    </div>
  )
}
