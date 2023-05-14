import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import NavigationBar from "../../components/Navigation/NavigationBar"
import { Button, Grid, Paper, TextField } from "@mui/material"
import { AiOutlineArrowLeft } from "react-icons/ai"

import axios from "axios"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const EditQnAPage = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const queryValue = searchParams.get("id")

    const [titleState, setTitleState] = useState("")
    const [contentState, setContentState] = useState("")

    const handleContentChange = (newState) => {
        setContentState(newState)
    }

    const handleTitleStateChange = (event) => {
        const newState = event.target.value

        setTitleState(newState)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const data = new FormData(event.target)
        const title = data.get("title")

        axios
            .put("http://localhost:7777/qna/edit", {
                id: queryValue,
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

    const goback = useNavigate()

    function handleBack() {
        goback(-1)
    }

    useEffect(() => {
        axios
            .get(`http://localhost:7777/qna/detail?id=${queryValue}`)
            .then((response) => {
                setTitleState(response.data.data[0].title)
                setContentState(response.data.data[0].content)
            })
            .catch((error) => {
                // alert(error.response.data.error)
                console.error(error)
                return
            })
    }, [queryValue])

    return (
        <>
            <NavigationBar />
            <div className="container">
                <Paper style={{ margin: "2rem", padding: 16 }} className="box">
                    <AiOutlineArrowLeft size="40" onClick={handleBack} />
                    <h1 style={{ paddingLeft: "10px" }}>글 수정 - Q&A</h1>
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
                                    value={titleState}
                                    onChange={handleTitleStateChange}
                                />
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: "20px" }}>
                                <label></label>
                                {/* <ContentEditor
                                    onStateChange={handleContentChange}
                                /> */}
                                <ReactQuill
                                    value={contentState}
                                    onChange={handleContentChange}
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
                                    href="/qna"
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
                                    수정
                                </Button>
                            </section>
                        </form>
                    </Grid>
                </Paper>
            </div>
        </>
    )
}

export default EditQnAPage
