import { Button, Grid, IconButton, Paper, TextField } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import styles from "./qnacomment.module.css"
import CloseIcon from "@mui/icons-material/Close"

const QnAComment = () => {
    const [commentsList, setCommentsList] = useState([]) //보여줄 comments 리스트

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const queryValue = searchParams.get("id")
    const [content, setContent] = useState("") //댓글 내용
    const [commentOnSubmitCheck, setCommentOnSubmitCheck] = useState(true) //댓글 등록 버튼 체크

    function timer(d) {
        let timestamp = d
        let date = new Date(timestamp)

        let year = date.getFullYear().toString().slice(0) //년도 뒤에 두자리
        let month = ("0" + (date.getMonth() + 1)).slice(-2) //월 2자리 (01, 02 ... 12)
        let day = ("0" + date.getDate()).slice(-2) //일 2자리 (01, 02 ... 31)
        let hour = ("0" + date.getHours()).slice(-2) //시 2자리 (00, 01 ... 23)
        let minute = ("0" + date.getMinutes()).slice(-2) //분 2자리 (00, 01 ... 59)
        let second = ("0" + date.getSeconds()).slice(-2) //초 2자리 (00, 01 ... 59)

        let returnDate =
            year +
            "." +
            month +
            "." +
            day +
            ". " +
            hour +
            ":" +
            minute +
            ":" +
            second
        return returnDate
    }

    //로그인 유무 확인
    const isLogin = () => {
        if (localStorage.getItem("ID") === null) {
            alert("로그인 후 이용이 가능합니다!")
            return false
        }
        return true
    }

    //댓글 작성 axios
    const commentOnSubmit = async () => {
        if (commentOnSubmitCheck) {
            setCommentOnSubmitCheck(false)
            await axios
                .post(`/qna/comment`, {
                    qnaid: queryValue,
                    writer: localStorage.getItem("ID"),
                    content: `${content}`,
                })
                .then((res) => {
                    alert("등록이 완료되었습니다!")
                    window.location.reload()
                })
                .catch((e) => {
                    if (e.response.data.message === "Unauthorized") {
                        alert("로그인 후 이용 가능합니다.")
                    }
                })
        } else {
            alert("잠시만 기다려주세요!!")
        }
    }

    //댓글 리스트 가져오는 axios
    const getCommentList = async () => {
        await axios
            .get(`/qna/comment?id=${queryValue}`)
            .then((res) => {
                console.log(res.data.data)
                console.log(typeof res.data.data)
                setCommentsList(res.data.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        getCommentList()
    }, [])

    const handleClose = (commentId) => {
        axios
            .post(`/qna/comment/del`, {
                id: commentId,
            })
            .then((res) => {
                if (res) {
                    alert("댓글이 삭제되었습니다.")
                    window.location.reload()
                } else {
                    alert("요청에 문제가 있습니다.")
                    return
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <>
            <Paper style={{ margin: 16, padding: 16 }}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
                        <TextField
                            className="comments_header_textarea"
                            maxRows={3}
                            onClick={isLogin}
                            onChange={(e) => {
                                setContent(e.target.value)
                            }}
                            multiline
                            fullWidth
                            placeholder="댓글을 입력해주세요✏️"
                        />
                    </Grid>
                    <Grid xs={1} md={1} item>
                        {content !== "" ? (
                            <Button
                                style={{ height: "3.5rem" }}
                                fullWidth
                                color="secondary"
                                variant="outlined"
                                onClick={commentOnSubmit}
                            >
                                등록
                            </Button>
                        ) : (
                            <Button
                                style={{ height: "3.5rem" }}
                                fullWidth
                                color="secondary"
                                variant="outlined"
                                disabled={true}
                            >
                                등록
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Paper>
            <div className="comments_body">
                {commentsList.map((item, index) => (
                    <>
                        <div
                            key={index + 9087}
                            className={styles.comments_comment}
                        >
                            {item.isDeleted === true ? (
                                <div className="delete_message">
                                    삭제된 댓글입니다.
                                </div>
                            ) : (
                                <>
                                    <div className="comment_info_box">
                                        <div className="comment_user_box">
                                            {item.author === "" ? (
                                                <div className="comment_username">
                                                    <span className="material-symbols-outlined">
                                                        &#xe7fd;
                                                    </span>{" "}
                                                    (알 수 없음)
                                                </div>
                                            ) : (
                                                <div
                                                    className={
                                                        styles.comment_username
                                                    }
                                                >
                                                    {/* <span className="material-symbols-outlined">
                                                        &#xe7fd;
                                                    </span>{" "} */}
                                                    <h3>{item.writer}</h3>
                                                    {/* 디비를 고칠 수 없어서...일단은 이름만 같으면...근데 중복 닉네임은....ㅅㅂ... */}
                                                    {item.writer ===
                                                        localStorage.getItem(
                                                            "USER_NAME"
                                                        ) && (
                                                        <IconButton
                                                            onClick={() => {
                                                                handleClose(
                                                                    item.id
                                                                )
                                                            }}
                                                        >
                                                            <CloseIcon />
                                                        </IconButton>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.comment_date}>
                                            {/* <span class="material-symbols-outlined">
                                                &#xebcc;
                                            </span>{" "} */}
                                            [{timer(item.createdate)}]
                                        </div>
                                    </div>
                                    <div className="comment_content">
                                        <strong>{item.content}</strong>
                                    </div>
                                    <br />
                                </>
                            )}
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default QnAComment
