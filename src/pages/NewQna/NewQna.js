import React, { useState } from "react"
import NavigationBar from "../../components/Navigation/NavigationBar"
import { Button, Grid, Paper, TextField } from "@mui/material"
import { AiOutlineArrowLeft } from "react-icons/ai"

import ContentEditor from "../../components/Editor/ContentEditor"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const NewQna = () => {
    // const [titleState, setTitleState] = useState("")
    const [contentState, setContentState] = useState("")

    const handleContentChange = (newState) => {
        setContentState(newState)
    }

    const goback = useNavigate()

    function handleBack() {
        goback(-1)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const data = new FormData(event.target)
        const title = data.get("title")

        axios
            .post("http://localhost:7777/qna", {
                writer: localStorage.getItem("ID"),
                title: title,
                content: contentState,
            })
            .then((response) => {
                alert("글이 등록되었습니다!!")
                window.location.href = "/qna"
            })
            .catch((error) => {
                console.error(error)
                alert(error)
                return
            })
    }

    return (
        <>
            <NavigationBar />
            <div className="container">
                <Paper style={{ margin: "2rem", padding: 16 }} className="box">
                    <AiOutlineArrowLeft size="40" onClick={handleBack} />
                    <h1 style={{ paddingLeft: "10px" }}>
                        새로운 글 쓰기 - Q&A
                    </h1>
                    <Grid container>
                        <form
                            style={{ width: "100%" }}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <label> 제목</label>
                            <Grid xs={12} md={12} item>
                                <TextField
                                    // placehoder="Add Todo here"
                                    name="title"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: "20px" }}>
                                <label></label>
                                <ContentEditor
                                    onStateChange={handleContentChange}
                                />
                            </Grid>
                            <section
                                style={{
                                    width: "100%",
                                    marginTop: "1rem",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                }}
                            >
                                <Button
                                    style={{
                                        height: "3.5rem",
                                        width: "6.5rem",
                                        fontSize: "large",
                                    }}
                                    fullWidth
                                    color="secondary"
                                    variant="outlined"
                                    href="/"
                                >
                                    취소
                                </Button>
                                <Button
                                    style={{
                                        height: "3.5rem",
                                        width: "6.5rem",
                                        fontSize: "large",
                                        marginLeft: "1rem",
                                    }}
                                    type="submit"
                                    fullWidth
                                    color="primary"
                                    variant="outlined"
                                >
                                    등록
                                </Button>
                            </section>
                        </form>
                    </Grid>
                </Paper>
            </div>
        </>
    )
}

export default NewQna
