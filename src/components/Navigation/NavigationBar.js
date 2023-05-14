import { AppBar, Button, Grid, Link, Toolbar, Typography } from "@mui/material"
import { useState } from "react"

import LoginModal from "../../modal/LoginModal"
import SignupModal from "../../modal/SignupModal"

const NavigationBar = () => {
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

    const signout = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    const navigationBarCert = (
        <AppBar position="static">
            <Toolbar>
                <Grid justifyContent="space-between" container>
                    <Grid item>
                        <Button color="inherit" href="/">
                            <Typography component="h1" variant="h6">
                                JOIN⋈US
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Link
                            href="/qna"
                            color="inherit"
                            style={{ marginRight: "15px" }}
                        >
                            QnA 게시판
                        </Link>

                        <Link
                            href="/newproject"
                            color="inherit"
                            style={{ marginRight: "15px" }}
                        >
                            새 프로젝트 만들기
                        </Link>

                        <Link
                            href="/mypage"
                            color="inherit"
                            style={{ marginRight: "8px" }}
                        >
                            {localStorage.getItem("USER_NAME")}님을 응원합니다!!
                        </Link>

                        <Button color="inherit" onClick={signout}>
                            logout
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )

    const navigationBarDefault = (
        <AppBar position="static">
            <Toolbar>
                <Grid justifyContent="space-between" container>
                    <Grid item>
                        <Button color="inherit" href="/">
                            <Typography component="h1" variant="h6">
                                JOIN⋈US
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="inherit" onClick={handleLoginModalOpen}>
                            Login
                        </Button>
                        <Button color="inherit" onClick={handleSignupModalOpen}>
                            Sign up
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )

    return (
        <div>
            {localStorage.getItem("ACCESS_TOKEN")
                ? navigationBarCert
                : navigationBarDefault}

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

export default NavigationBar
