import { Button, Grid, Paper } from "@mui/material"
import React, { useEffect, useState } from "react"
import { AiFillCaretRight, AiOutlineArrowLeft } from "react-icons/ai"
import { useLocation, useNavigate } from "react-router-dom"
import NavigationBar from "../../components/Navigation/NavigationBar"

import styles from "./detailpage.module.css"
import axios from "axios"

const Detail = () => {
    const goback = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const queryValue = searchParams.get("id")
    const [project, setProject] = useState({})

    const [closed, setClosed] = useState(false)

    const [p_arr, setPos] = useState([])
    const [t_arr, setTech] = useState([])

    function handleBack() {
        goback(-1)
    }

    const handleEditProject = () => {
        if (localStorage.getItem("ID") === null) {
            alert("로그인 후 이용이 가능합니다!")
            return
        }
        window.location.href = `/editproject?id=${queryValue}`
    }

    const handleApproval = () => {
        if (localStorage.getItem("ID") === null) {
            alert("로그인 후 이용이 가능합니다!")
            return
        }
        window.location.href = `/apply?id=${queryValue}`
    }

    const handleApply = () => {
        if (localStorage.getItem("ID") === null) {
            alert("로그인 후 이용이 가능합니다!")
            return
        }

        if (closed) {
            alert("마감된 프로젝트입니다!!!!!")
            return
        }

        console.log("지원하러 가자!!!")

        const date = new Date()
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const day = date.getDate().toString().padStart(2, "0")
        const today = `${year}-${month}-${day}`

        axios
            .post(`http://localhost:7777/project/apply`, {
                title: project.title,
                projectid: queryValue,
                memberid: localStorage.getItem("ID"),
                membername: localStorage.getItem("USER_NAME"),
                applydate: today,
            })
            .then((response) => {
                // console.log({
                //     projectid: queryValue,
                //     memberid: localStorage.getItem("ID"),
                //     applydate: today,
                // })

                console.log(response)
                // .project_id(projectApplyDTO.getProject_id())
                // .member_id(projectApplyDTO.getMember_id())
                // .applydate(projectApplyDTO.getApplydate())
                alert("지원 완료!!")
                // console.log(response.data)
            })
            .catch((error) => {
                alert("지원은 한번만 가능합니다")
                // console.error(error)
                return
            })
    }
    const handleWithdrawal = () => {
        if (localStorage.getItem("ID") === null) {
            alert("로그인 후 이용이 가능합니다!")
            return
        }

        // const dateNow = new Date()
        // const today = dateNow.toISOString().slice(0, 10)
        const date = new Date()
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const day = date.getDate().toString().padStart(2, "0")
        const today = `${year}-${month}-${day}`

        axios
            .post(`http://localhost:7777/project/withdrawal`, {
                // title: project.title,
                projectid: queryValue,
                memberid: localStorage.getItem("ID"),
                applydate: today,
            })
            .then((response) => {
                if (response.data) {
                    alert("탈퇴하였습니다..")
                } else {
                    alert("신청한 것에 대하여 탈퇴가 가능합니다!")
                }
            })
            .catch((error) => {
                console.error(error)
                return
            })
    }

    useEffect(() => {
        axios
            .get(`http://localhost:7777/project/detail?id=${queryValue}`)
            .then((response) => {
                // console.log(response.data.data[0])
                setProject(response.data.data[0])
                setPos(response.data.data[0].position.split(","))
                setTech(response.data.data[0].tech.split(","))
            })
            .catch((error) => {
                // alert(error.response.data.error)
                console.error(error)
                return
            })

        axios
            .get(`http://localhost:7777/project/detail/join?id=${queryValue}`)
            .then((response) => {
                console.log(response.data)
                if (response.data) {
                    // alert("마감된 프로젝트입니다!!!!!")
                    setClosed(response.data)
                }
            })
            .catch((error) => {
                alert("지원은 한번만 가능합니다")
                // console.error(error)
                return
            })
    }, [queryValue])

    return (
        <>
            <NavigationBar />
            <div className="container">
                <Paper style={{ margin: 16, padding: 16 }} className="box">
                    <AiOutlineArrowLeft size="40" onClick={handleBack} />
                    <h1 style={{ paddingLeft: "10px" }}>
                        {closed ? "[마감] " : <></>}
                        {project.title}
                    </h1>
                    <Grid container>
                        <Grid xs={6} md={6} item style={{ paddingRight: 16 }}>
                            <h2 style={{ paddingLeft: "10px" }}>
                                <AiFillCaretRight /> 모집 분야
                            </h2>
                            <Grid
                                xs={6}
                                md={6}
                                item
                                style={{ paddingLeft: 16 }}
                            >
                                <ul className={styles.positionList}>
                                    {p_arr.map((pos, idx) => (
                                        <li
                                            key={idx}
                                            className={styles.position}
                                        >
                                            {pos}
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                        </Grid>

                        <Grid xs={6} md={6} item style={{ paddingRight: 16 }}>
                            <h2 style={{ paddingLeft: "10px" }}>
                                <AiFillCaretRight /> 모집 인원
                            </h2>
                            <h2
                                style={{
                                    paddingLeft: "10%",
                                    textAlign: "center",
                                    color: "#3874cb",
                                }}
                            >
                                {project.headcount}명
                            </h2>
                        </Grid>
                        <Grid xs={11} md={6} item style={{ paddingRight: 16 }}>
                            <h2 style={{ paddingLeft: "10px" }}>
                                <AiFillCaretRight /> 시작 예정일
                            </h2>
                            <h2
                                style={{
                                    paddingLeft: "10%",
                                    textAlign: "center",
                                    color: "#3874cb",
                                }}
                            >
                                {project.startdate}
                            </h2>
                        </Grid>
                        <Grid xs={11} md={6} item style={{ paddingRight: 16 }}>
                            <h2 style={{ paddingLeft: "10px" }}>
                                <AiFillCaretRight />
                                사용 기술
                            </h2>
                            <ul
                                className={styles.content}
                                style={{ paddingLeft: 16 }}
                            >
                                {t_arr.map((lang, i) => (
                                    <li key={i} className={styles.language}>
                                        <img
                                            className={styles.languageImage}
                                            title={lang}
                                            src={`/imgs/tech/${lang}.svg`}
                                            alt="language"
                                        />
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                        <Grid xs={12} md={12} item style={{ paddingRight: 16 }}>
                            <h2 style={{ paddingLeft: "10px" }}>
                                <AiFillCaretRight />
                                소개글
                            </h2>
                            <hr />
                            <div
                                style={{
                                    paddingTop: "2%",
                                    paddingLeft: "3%",
                                    paddingRight: "3%",
                                }}
                                className={styles.postContent}
                                dangerouslySetInnerHTML={{
                                    __html: project.content,
                                }}
                            ></div>
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
                            {localStorage.getItem("ID") === project.owner ? (
                                <>
                                    <Button
                                        style={{
                                            height: "3.5rem",
                                            width: "6.5rem",
                                            fontSize: "large",
                                        }}
                                        fullWidth
                                        color="secondary"
                                        variant="outlined"
                                        onClick={handleEditProject}
                                    >
                                        수정
                                    </Button>
                                    <Button
                                        style={{
                                            height: "3.5rem",
                                            width: "6.5rem",
                                            fontSize: "large",
                                            marginLeft: "1rem",
                                        }}
                                        fullWidth
                                        color="primary"
                                        variant="outlined"
                                        onClick={handleApproval}
                                    >
                                        지원 승인
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        style={{
                                            height: "3.5rem",
                                            width: "6.5rem",
                                            fontSize: "large",
                                            marginLeft: "1rem",
                                        }}
                                        fullWidth
                                        color="primary"
                                        variant="outlined"
                                        onClick={handleApply}
                                    >
                                        가입 신청
                                    </Button>
                                    <Button
                                        style={{
                                            height: "3.5rem",
                                            width: "6.5rem",
                                            fontSize: "large",
                                            marginLeft: "1rem",
                                        }}
                                        fullWidth
                                        color="error"
                                        variant="outlined"
                                        onClick={handleWithdrawal}
                                    >
                                        탈퇴
                                    </Button>
                                </>
                            )}
                        </section>
                    </Grid>
                </Paper>
            </div>
        </>
    )
}

export default Detail
