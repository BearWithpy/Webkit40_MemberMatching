import {
    Button,
    Container,
    Grid,
    IconButton,
    TextField,
    Typography,
} from "@mui/material"
import React, { useRef } from "react"
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

function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    })
    const accessToken = localStorage.getItem("ACCESS_TOKEN")
    if (accessToken) {
        headers.append("Authorization", "Bearer " + accessToken)
    }

    let options = {
        headers: headers,
        url: "http://localhost:7777" + api,
        method: method,
    }
    if (request) {
        options.body = JSON.stringify(request)
    }
    return fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                if (!response.ok) {
                    return Promise.reject(json)
                }
                return json
            })
        )
        .catch((error) => {
            if (error.status === 403) {
                window.location.href = "/login"
            }

            alert("Ooops! Wrong ID or Password :(")
            return Promise.reject(error)
        })
}

const WithdrawalModal = ({ isOpen, onClose }) => {
    const emailRef = useRef(null)
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Withdrawal :(")

        const data = new FormData(event.target)
        const email = data.get("email")

        if (email !== localStorage.getItem("USER_EMAIL")) {
            alert("이메일 주소를 다시 입력해주세요")
            emailRef.current.focus()
            return
        }

        call("/auth/one", "DELETE", {
            email: email,
        })
            .then((response) => {
                alert("다음에 또 만나요!!")
                onClose()
                localStorage.clear()
                window.location.href = "/"
            })
            .catch((error) => {
                alert(error.response.data.error)
                console.error(error.response.data.error)
                return
            })

        // axios
        //     .delete("http://localhost:7777/auth/one", {
        //         email: email,
        //     })
        // .then((response) => {
        //     alert("다음에 또 만나요!!")
        //     onClose()
        //     localStorage.clear()
        //     window.location.href = "/"
        // })
        // .catch((error) => {
        //     alert(error.response.data.error)
        //     console.error(error.response.data.error)
        //     return
        // })
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
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                정말로 떠나실 건가요?
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <label>
                                탈퇴를 원하시면 이메일 주소를 입력해주세요.
                            </label>
                            <TextField
                                style={{ marginTop: "7px" }}
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                inputRef={emailRef}
                                required
                                fullWidth
                                id="email"
                                label="이메일 주소"
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="error"
                            >
                                탈퇴하기
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end"></Grid>
                </form>
            </Container>
        </Modal>
    )
}

export default WithdrawalModal
