import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavigationBar from "../../components/Navigation/NavigationBar"
import { Button, Grid, MenuItem, Paper, Select, TextField } from "@mui/material"
import { AiFillCaretRight, AiOutlineArrowLeft } from "react-icons/ai"

import axios from "axios"
import ReactSelect from "react-select"

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

const EditPage = () => {
    const goback = useNavigate()

    function handleBack() {
        goback(-1)
    }

    const [name, setName] = useState("")
    const [position, setPosition] = useState("")
    const [tech, setTech] = useState([])

    function handleTechChange(selectedOptions) {
        setTech(selectedOptions)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Update!!")

        const data = new FormData(event.target)

        const name = data.get("name")
        const techvalue = tech
            .map((obj) => obj.value)
            .filter((value) => value !== undefined)

        // console.log(name)
        // console.log(position)
        // console.log(techvalue)

        call("/auth", "PUT", {
            id: localStorage.getItem("ID"),
            email: localStorage.getItem("USER_EMAIL"),
            name: name,
            position: position,
            tech: techvalue.join(","),
        })
            .then((response) => {
                console.log(response.data)
                localStorage.setItem("USER_NAME", name)
                window.location.href = "/mypage"
            })
            .catch((error) => {
                alert(error.response.data.error)
                console.error(error.response.data.error)

                return
            })

        // axios
        //     .put("http://localhost:7777/auth", {
        //         name: name,
        //         position: position,
        //         tech: techvalue.join(","),
        //     })
        //     .then((response) => {
        //         console.log(response.data)
        //         window.location.href = "/mypage"
        //     })
        //     .catch((error) => {
        //         alert(error.response.data.error)
        //         console.error(error.response.data.error)

        //         return
        //     })
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

    const originDataGet = async () => {
        try {
            const data = axios
                .get("/auth/origin", {
                    params: {
                        email: localStorage.getItem("USER_EMAIL"),
                    },
                })
                .then((res) => {
                    localStorage.setItem("ID", res.data.data[0].id)
                    setName(res.data.data[0].name)
                    setPosition(res.data.data[0].position)
                    stringToArray(res.data.data[0].tech)
                })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        originDataGet()
    }, [])

    return (
        <>
            <NavigationBar />
            <div className="container">
                <Paper style={{ margin: 16, padding: 16 }} className="box">
                    <AiOutlineArrowLeft size="40" onClick={handleBack} />
                    <h1 style={{ paddingLeft: "10px" }}>내 정보 수정</h1>
                    <Grid container>
                        <form
                            style={{ width: "100%" }}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <Grid
                                xs={11}
                                md={11}
                                item
                                style={{ paddingRight: 16 }}
                            >
                                <h2 style={{ paddingLeft: "10px" }}>
                                    <AiFillCaretRight /> 이메일
                                </h2>
                                <h2
                                    style={{
                                        paddingLeft: "10%",
                                        textAlign: "center",
                                        color: "#3874cb",
                                    }}
                                >
                                    {localStorage.getItem("USER_EMAIL")}
                                </h2>
                            </Grid>

                            <Grid xs={12} md={12} item>
                                <label>닉네임</label>
                                <TextField
                                    fullWidth
                                    value={name}
                                    name="name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: "20px" }}>
                                <label>역할군</label>
                                <Select
                                    value={position}
                                    name="position"
                                    required
                                    fullWidth
                                    autoFocus
                                    onChange={(e) =>
                                        setPosition(e.target.value)
                                    }
                                >
                                    <MenuItem value="default">
                                        역할군 선택하기
                                    </MenuItem>
                                    <MenuItem value="frontend">
                                        Front-End
                                    </MenuItem>
                                    <MenuItem value="backend">
                                        Back-End
                                    </MenuItem>
                                    <MenuItem value="android">Android</MenuItem>
                                    <MenuItem value="ios">IOS</MenuItem>
                                    <MenuItem value="pm">PM</MenuItem>
                                    <MenuItem value="devops">DevOps</MenuItem>
                                    <MenuItem value="designer">
                                        Designer
                                    </MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "20px" }}>
                                <label>관심 기술</label>

                                <ReactSelect
                                    options={techOptions}
                                    isMulti
                                    onChange={handleTechChange}
                                    styles={techStyles}
                                    value={tech}
                                    placeholder="관심 기술"
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
                                    color="primary"
                                    variant="outlined"
                                    type="submit"
                                    // href="/mypage"
                                    // onClick={handleSubmit}
                                >
                                    수정 완료
                                </Button>
                            </section>
                        </form>
                    </Grid>
                </Paper>
            </div>
        </>
    )
}

export default EditPage
