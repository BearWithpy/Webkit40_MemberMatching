import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import NavigationBar from "../../components/Navigation/NavigationBar"
import axios from "axios"
import { Button, Grid, Paper } from "@mui/material"
import { AiFillCaretRight, AiOutlineArrowLeft } from "react-icons/ai"
import styles from "./detailqnapage.module.css"
import QnAComment from "../../components/Comment/QnAComment"

const DetailQnAPage = () => {
    const goback = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const queryValue = searchParams.get("id")
    const [project, setProject] = useState({})

    const [date, setDate] = useState("")

    function handleBack() {
        goback(-1)
    }

    const handleEditProject = () => {
        if (localStorage.getItem("ID") === null) {
            alert("로그인 후 이용이 가능합니다!")
            return
        }
        window.location.href = `/editqna?id=${queryValue}`
    }

    const handleDelete = () => {
        if (localStorage.getItem("ID") === null) {
            alert("로그인 후 이용이 가능합니다!")
            return
        }

        axios
            .post(`http://localhost:7777/qna/delete`, { id: queryValue })
            .then((response) => {
                if (response) {
                    alert("삭제되었습니다!!")
                    window.location.href = `/qna`
                }
            })
            .catch((error) => {
                alert(error)
                console.error(error)
                return
            })
    }

    useEffect(() => {
        axios
            .get(`http://localhost:7777/qna/detail?id=${queryValue}`)
            .then((response) => {
                console.log(response.data.data[0])
                setProject(response.data.data[0])
                setDate(response.data.data[0].createdate.substring(0, 10))
            })
            .catch((error) => {
                alert(error)
                console.error(error)
                return
            })
    }, [queryValue])

    return (
        <>
            <NavigationBar />
            <div className="container">
                <Paper style={{ margin: 16, padding: 16 }} className="box">
                    <AiOutlineArrowLeft size="40" onClick={handleBack} />
                    <h1 style={{ paddingLeft: "10px" }}>{project.title}</h1>
                    <Grid container>
                        <Grid xs={12} md={12} item style={{ paddingRight: 16 }}>
                            <h5 style={{ paddingLeft: "10px" }}>
                                <AiFillCaretRight />
                                작성자: {project.writer}
                            </h5>
                            <h5 style={{ paddingLeft: "10px" }}>
                                <AiFillCaretRight />
                                작성일: {date}
                            </h5>
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
                            {localStorage.getItem("USER_NAME") ===
                            project.writer ? (
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
                                        color="error"
                                        variant="outlined"
                                        onClick={handleDelete}
                                    >
                                        삭제
                                    </Button>
                                </>
                            ) : (
                                <></>
                            )}
                        </section>
                    </Grid>

                    <h5 style={{ paddingLeft: "10px" }}>
                        <AiFillCaretRight />
                        댓글
                    </h5>
                    <QnAComment />
                </Paper>
            </div>
        </>
    )
}

export default DetailQnAPage
