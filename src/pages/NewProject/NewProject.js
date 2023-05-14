import React, { useState } from "react"

import DemoDatepicker from "../../components/Demo/DemoDatepicker"
import { Button, Grid, MenuItem, Paper, Select, TextField } from "@mui/material"

import "./NewProject.css"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import NavigationBar from "../../components/Navigation/NavigationBar"
import PositionMultiSelect from "../../components/Select/PositionMultiSelect"
import TechMultiSelect from "../../components/Select/TechMultiSelect"
import ContentEditor from "../../components/Editor/ContentEditor"

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

            alert("Ooops! Something Wrong.... :(")
            return Promise.reject(error)
        })
}

const NewProject = () => {
    const [dateState, setDateState] = useState("")
    const [contentState, setContentState] = useState("")
    const [hcountState, setHcountState] = useState("")

    const [techState, setTechState] = useState("")
    const [posState, setPosState] = useState("")

    const handleTechStateChange = (newState) => {
        setTechState(newState)
    }

    const handlePosStateChange = (newState) => {
        setPosState(newState)
    }

    const handleDateStateChange = (newState) => {
        setDateState(newState)
    }

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

        // console.log("Create Project!!")
        // console.log(title)
        // console.log(dateState)
        // console.log(contentState)
        // console.log(Number(hcountState))
        // console.log(techState)
        // console.log(posState)

        const date = new Date(dateState)
        // console.log(date)

        // Date 객체에서 날짜 정보 추출
        // const year = date.getFullYear()
        // const month = date.getMonth() + 1
        // const day = date.getDate()

        call("/project", "POST", {
            owner: localStorage.getItem("ID"),
            title: title,
            startdate: date,
            content: contentState,
            headcount: Number(hcountState),
            tech: techState,
            position: posState,
        })
            .then((response) => {
                console.log(response.data)
                alert("Happy Hacking!! 프로젝트 등록 완료!")
                window.location.href = "/"
            })
            .catch((error) => {
                // alert(error.response.data.error)
                // console.error(error.response.data.error)

                console.error(error)

                return
            })

        // axios
        //     .post("http://localhost:7777/project", {
        //         owner: localStorage.getItem("ID"),
        //         title: title,
        //         startdate: dateState,
        //         content: contentState,
        //         headcount: Number(hcountState),
        //         tech: techState,
        //         position: posState,
        //     })
        //     .then((response) => {
        //         console.log(response.data)
        //         window.location.href = "/"
        //     })
        //     .catch((error) => {
        //         // alert(error.response.data.error)
        //         // console.error(error.response.data.error)

        //         console.error(error)

        //         return
        //     })
    }

    return (
        <>
            <NavigationBar />
            <div className="container">
                <Paper style={{ margin: "2rem", padding: 16 }} className="box">
                    <AiOutlineArrowLeft size="40" onClick={handleBack} />
                    <h1 style={{ paddingLeft: "10px" }}>
                        새로운 프로젝트 만들기
                    </h1>
                    <Grid container>
                        <form
                            style={{ width: "100%" }}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <label>프로젝트 제목</label>
                            <Grid xs={12} md={12} item>
                                <TextField
                                    // placehoder="Add Todo here"
                                    name="title"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: "20px" }}>
                                <label>모집 분야</label>
                                <PositionMultiSelect
                                    onStateChange={handlePosStateChange}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "20px" }}>
                                <label>사용 기술</label>
                                <TechMultiSelect
                                    onStateChange={handleTechStateChange}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "20px" }}>
                                <label>모집 인원</label>
                                <Select
                                    required
                                    fullWidth
                                    autoFocus
                                    onChange={(e) =>
                                        setHcountState(e.target.value)
                                    }
                                    value={hcountState || ""}
                                >
                                    <MenuItem value="0">인원 선택</MenuItem>
                                    <MenuItem value="1">1명</MenuItem>
                                    <MenuItem value="2">2명</MenuItem>
                                    <MenuItem value="3">3명</MenuItem>
                                    <MenuItem value="4">4명</MenuItem>
                                    <MenuItem value="5">5명 이상</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "20px" }}>
                                <label>시작 예정일</label>
                                <br />
                                <DemoDatepicker
                                    onStateChange={handleDateStateChange}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "20px" }}>
                                <label>소개 글 작성</label>
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

export default NewProject
