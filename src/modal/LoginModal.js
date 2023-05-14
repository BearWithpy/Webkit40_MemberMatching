import {
    Button,
    Container,
    Grid,
    IconButton,
    TextField,
    Typography,
} from "@mui/material"
import React from "react"

import axios from "axios"
import Modal from "react-modal"
import CloseIcon from "@mui/icons-material/Close"

Modal.setAppElement("#root")

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
}

const LoginModal = ({ isOpen, onClose }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Login Button!!")

        const data = new FormData(event.target)

        const email = data.get("email")
        const password = data.get("password")

        axios
            .post("http://localhost:7777/auth/signin", {
                email: email,
                password: password,
            })
            .then((response) => {
                // console.log(response.data)
                // console.log(response.data.name)
                onClose()
                localStorage.setItem("ACCESS_TOKEN", response.data.token)
                localStorage.setItem("USER_NAME", response.data.name)
                localStorage.setItem("USER_EMAIL", response.data.email)
                localStorage.setItem("ID", response.data.id)
                window.location.href = "/"
            })
            .catch((error) => {
                console.error(error)
                alert("Wrong ID or Password")

                return
            })
        // signin({ email: email, password: password })
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <IconButton onClick={onClose}>
                <CloseIcon />
            </IconButton>
            <Container
                component="main"
                maxWidth="xs"
                style={{ marginTop: "5%", marginBottom: "10%" }}
            >
                <Grid item xs={12} style={{ margin: "20px" }}>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                </Grid>
                <form noValidate onSubmit={handleSubmit}>
                    {" "}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="패스워드"
                                name="password"
                                autoComplete="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                로그인
                            </Button>
                        </Grid>

                        <Grid container justifyContent="flex-end">
                            {/* <Link href="/signup" variant="body2">
                                <Grid item>
                                    계정이 없습니까? 여기서 가입하세요.
                                </Grid>
                            </Link> */}
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Modal>
    )
}

export default LoginModal
