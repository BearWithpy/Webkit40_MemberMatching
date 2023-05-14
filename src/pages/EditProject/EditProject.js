import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import NavigationBar from "../../components/Navigation/NavigationBar"
import { Button, Grid, MenuItem, Paper, Select, TextField } from "@mui/material"
import { AiOutlineArrowLeft } from "react-icons/ai"

import axios from "axios"
import ReactSelect from "react-select"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const posOptions = [
    { value: "frontend", label: "Front-End" },
    { value: "backend", label: "Back-End" },
    { value: "android", label: "Android" },
    { value: "ios", label: "IOS" },
    { value: "pm", label: "PM" },
    { value: "devops", label: "DevOps" },
    { value: "designer", label: "Designer" },
]

const techStyles = {
    control: (provided) => ({
        ...provided,
        height: "60px",
    }),
}

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

const EditProject = () => {
    const dateNow = new Date()
    const today = dateNow.toISOString().slice(0, 10)
    const [dateState, setDateState] = useState(today)
    const [contentState, setContentState] = useState("")
    const [hcountState, setHcountState] = useState("")
    const [titleState, setTitleState] = useState("")

    // const [techState, setTechState] = useState("")
    // const [posState, setPosState] = useState("")

    const [project, setProject] = useState({})

    const [p_arr, setPos] = useState([])
    const [t_arr, setTech] = useState([])

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const queryValue = searchParams.get("id")

    useEffect(() => {
        axios
            .get(`http://localhost:7777/project/detail?id=${queryValue}`)
            .then((response) => {
                setProject(response.data.data[0])
                setTitleState(response.data.data[0].title)
                setContentState(response.data.data[0].content)
                setHcountState(response.data.data[0].headcount)
                setDateState(response.data.data[0].startdate)
                stringToArray(response.data.data[0].tech)
                stringToArrayPos(response.data.data[0].position)
            })
            .catch((error) => {
                // alert(error.response.data.error)
                console.error(error)
                return
            })
    }, [queryValue])

    const handleTitleStateChange = (event) => {
        const newState = event.target.value

        setTitleState(newState)
    }

    const handleTechStateChange = (newState) => {
        setTech(newState)
    }

    const handlePosStateChange = (newState) => {
        setPos(newState)
    }

    const handleDateStateChange = (event) => {
        const newState = event.target.value
        setDateState(newState)
    }

    const handleContentChange = (newState) => {
        setContentState(newState)
    }

    const goback = useNavigate()

    function handleBack() {
        goback(-1)
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     const data = new FormData(event.target)
    //     const title = data.get("title")

    //     const date = new Date(dateState)

    //     call("/project", "POST", {
    //         owner: localStorage.getItem("ID"),
    //         title: title,
    //         startdate: date,
    //         content: contentState,
    //         headcount: Number(hcountState),
    //         tech: techState,
    //         position: posState,
    //     })
    //         .then((response) => {
    //             console.log(response.data)
    //             window.location.href = "/"
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //             return
    //         })
    // }

    const handleSubmit = (event) => {
        event.preventDefault()

        const techvalue = t_arr
            .map((obj) => obj.value)
            .filter((value) => value !== undefined)

        const posvalue = p_arr
            .map((obj) => obj.value)
            .filter((value) => value !== undefined)

        const data = {
            id: queryValue,
            title: event.target.elements.title.value,
            content: contentState,
            headcount: hcountState,
            startdate: dateState,
            tech: techvalue.join(","),
            position: posvalue.join(","),
        }

        axios
            .put("http://localhost:7777/project/edit", data)
            .then((response) => {
                console.log(response)
                alert("프로젝트 수정 성공!")
                goback(-1)
            })
            .catch((error) => {
                alert("프로젝트 수정 실패!")
                console.log(data)
                console.error(error)
            })
    }
    const stringToArray = (techStr) => {
        let tempTech = techStr.split(",")
        let finalTech = []
        let idx = 0
        for (idx = 0; idx < tempTech.length; idx++) {
            for (let j = 0; j < techOptions.length; j++) {
                if (tempTech[idx] === techOptions[j].value) {
                    finalTech.push(techOptions[j])
                    continue
                }
            }
        }
        setTech(finalTech)
    }

    const stringToArrayPos = (posStr) => {
        let tempTech = posStr.split(",")
        let finalPos = []
        let idx = 0
        for (idx = 0; idx < tempTech.length; idx++) {
            for (let j = 0; j < posOptions.length; j++) {
                if (tempTech[idx] === posOptions[j].value) {
                    finalPos.push(posOptions[j])
                    continue
                }
            }
        }
        setPos(finalPos)
    }

    return (
        <>
            <NavigationBar />

            <div className="container">
                <Paper style={{ margin: "2rem", padding: 16 }} className="box">
                    <AiOutlineArrowLeft size="40" onClick={handleBack} />
                    <h1 style={{ paddingLeft: "10px" }}>프로젝트 수정하기</h1>
                    <Grid container>
                        <form
                            style={{ width: "100%" }}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <label>프로젝트 제목</label>
                            <Grid xs={12} md={12} item>
                                <TextField
                                    name="title"
                                    fullWidth
                                    value={titleState}
                                    onChange={handleTitleStateChange}
                                />
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: "20px" }}>
                                <label>모집 분야</label>
                                {/* <PositionMultiSelect
                                    onStateChange={handlePosStateChange}
                                /> */}
                                <ReactSelect
                                    options={posOptions}
                                    isMulti
                                    onChange={handlePosStateChange}
                                    styles={techStyles}
                                    value={p_arr}
                                    placeholder="모집 분야"
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "20px" }}>
                                <label>사용 기술</label>
                                {/* <TechMultiSelect
                                    onStateChange={handleTechStateChange}
                                /> */}
                                <ReactSelect
                                    options={techOptions}
                                    isMulti
                                    onChange={handleTechStateChange}
                                    styles={techStyles}
                                    value={t_arr}
                                    placeholder="관심 기술"
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
                                    value={hcountState}
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
                                {/* <DemoDatepicker
                                    onStateChange={handleDateStateChange}
                                /> */}
                                <TextField
                                    fullWidth
                                    id="date"
                                    value={dateState}
                                    type="date"
                                    onChange={handleDateStateChange}
                                    inputProps={{ min: today }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "20px" }}>
                                <label>소개 글 작성</label>
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
                                    type="submit"
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
export default EditProject
