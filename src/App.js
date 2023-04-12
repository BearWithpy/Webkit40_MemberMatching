import { useState } from "react"
import "./App.css"

import LoginModal from "./modal/LoginModal"
import SignupModal from "./modal/SignupModal"

function App() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

    const handleLoginModalOpen = () => {
        setIsLoginModalOpen(true)
    }

    const handleLoginModalClose = () => {
        setIsLoginModalOpen(false)
    }

    const handleSignupModalOpen = () => {
        setIsSignupModalOpen(true)
    }

    const handleSignupModalClose = () => {
        setIsSignupModalOpen(false)
    }

    return (
        <div>
            <button onClick={handleLoginModalOpen}>Login</button>
            <button onClick={handleSignupModalOpen}>Signup</button>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={handleLoginModalClose}
            />

            <SignupModal
                isOpen={isSignupModalOpen}
                onClose={handleSignupModalClose}
            />
        </div>
    )
}

export default App
