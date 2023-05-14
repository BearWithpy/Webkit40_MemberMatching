import {
    Button,
    Container,
    Grid,
    IconButton,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material"
import React, { useRef, useState } from "react"

import Modal from "react-modal"
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios"
import ReactSelect from "react-select"

Modal.setAppElement("#root")

const techOptions = [
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "javascript", label: "Javascript" },
    { value: "typescript", label: "Typescript" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
    { value: "nextjs", label: "Nextjs" },
    { value: "nodejs", label: "Nodejs" },
    { value: "spring", label: "Spring" },
    { value: "go", label: "Go" },
    { value: "nestjs", label: "Nestjs" },
    { value: "express", label: "Express" },
    { value: "django", label: "Django" },
    { value: "kotlin", label: "Kotlin" },
    { value: "swift", label: "Swift" },
    { value: "flutter", label: "Flutter" },
    { value: "reactnative", label: "ReactNative" },
    { value: "mysql", label: "MySQL" },
    { value: "mongodb", label: "MongoDB" },
    { value: "docker", label: "Docker" },
    { value: "figma", label: "Figma" },
    { value: "k8s", label: "K8S" },
]

const techStyles = {
    control: (provided) => ({
        ...provided,
        height: "60px",
    }),
}

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

const SignupModal = ({ isOpen, onClose }) => {
    const [pos, setPosition] = useState("default")
    const [techMulti, setTechMulti] = useState([])

    function handleTechChange(selectedOptions) {
        setTechMulti(selectedOptions)
    }

    const emailRef = useRef(null)
    const PasswordRef = useRef(null)

    // const handleTechOptionChange = (options) => {
    //     setTechMulti(options)
    // }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Sign Up Button!!")

        const data = new FormData(event.target)

        const email = data.get("email")
        const password = data.get("password")
        const passwordConfirm = data.get("password-confirm")
        const name = data.get("nickname")
        // const tech = data.get("tech")
        const techvalue = techMulti
            .map((obj) => obj.value)
            .filter((value) => value !== undefined)

        if (password !== passwordConfirm) {
            alert("Password Confirmation Failed")

            PasswordRef.current.focus()
            return
        }

        console.log(techvalue)

        axios
            .post("http://localhost:7777/auth/signup", {
                email: email,
                password: password,
                name: name,
                position: pos,
                tech: techvalue.join(","),
            })
            .then((response) => {
                console.log(response.data)
                alert(`Welcome! ${response.data.name}!`)
                onClose()
            })
            .catch((error) => {
                alert(error.response.data.error)
                console.error(error.response.data.error)
                emailRef.current.focus()
                return
            })
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
                                회원 가입
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                id="nickname"
                                label="닉네임"
                                autoFocus
                                name="nickname"
                                variant="outlined"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                            <TextField
                                autoComplete="current-password"
                                name="password"
                                variant="outlined"
                                required
                                fullWidth
                                type="password"
                                id="password"
                                label="패스워드"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="current-password"
                                inputRef={PasswordRef}
                                name="password-confirm"
                                variant="outlined"
                                required
                                fullWidth
                                id="password-confirm"
                                type="password"
                                label="패스워드 확인"
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12}>
                            {/* <TextField
                                name="tech"
                                variant="outlined"
                                required
                                fullWidth
                                id="tech"
                                label="관심 기술"
                                autoFocus
                            /> */}
                            {/* <TechMultiSelect
                                onOptionsChange={handleTechOptionChange}
                            /> */}

                            <ReactSelect
                                options={techOptions}
                                isMulti
                                onChange={handleTechChange}
                                styles={techStyles}
                                value={techMulti}
                                placeholder="관심 기술"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                value={pos}
                                required
                                fullWidth
                                autoFocus
                                onChange={(e) => setPosition(e.target.value)}
                            >
                                <MenuItem value="default">
                                    역할군 선택하기
                                </MenuItem>
                                <MenuItem value="frontend">Front-End</MenuItem>
                                <MenuItem value="backend">Back-End</MenuItem>
                                <MenuItem value="android">Android</MenuItem>
                                <MenuItem value="ios">IOS</MenuItem>
                                <MenuItem value="pm">PM</MenuItem>
                                <MenuItem value="devops">DevOps</MenuItem>
                                <MenuItem value="designer">Designer</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                계정생성
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        {/* <Grid item>
                            <Link href="/login" variant="body2">
                                이미 계정이 있습니까? 로그인 하세요.
                            </Link>
                        </Grid> */}
                    </Grid>
                </form>
            </Container>
        </Modal>
    )
}

export default SignupModal
