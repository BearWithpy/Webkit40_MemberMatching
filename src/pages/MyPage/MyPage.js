import { Button, Grid, Paper } from "@mui/material"
import React, { useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

import NavigationBar from "../../components/Navigation/NavigationBar"

import ApplyTable from "../../components/Table/ApplyTable"
import JoinTable from "../../components/Table/JoinTable"
import { AiFillCaretRight } from "react-icons/ai"
import WithdrawalModal from "../../modal/WithdrawalModal"

const MyPage = () => {
    const goback = useNavigate()
    const columnsApply = ["제목", "지원 날짜"]
    const columnsJoin = ["제목", "승인 날짜"]

    const [resultApply, setResultApply] = useState([])
    const [resultJoin, setResultJoin] = useState([])

    const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false)

    const handleWithdrawalModalOpen = () => {
        setIsWithdrawalModalOpen(true)
    }

    const handleWithdrawalModalClose = () => {
        setIsWithdrawalModalOpen(false)
    }

    function handleBack() {
        goback(-1)
    }

    return (
        <>
            <NavigationBar />
            <div className="container">
                <Paper style={{ margin: 16, padding: 16 }} className="box">
                    <AiOutlineArrowLeft size="40" onClick={handleBack} />
                    <h1 style={{ paddingLeft: "10px" }}>마이페이지</h1>
                    <Grid container>
                        <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
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

                        <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
                            <h2 style={{ paddingLeft: "10px" }}>
                                <AiFillCaretRight /> 닉네임
                            </h2>
                            <h2
                                style={{
                                    paddingLeft: "10%",
                                    textAlign: "center",
                                    color: "#3874cb",
                                }}
                            >
                                {localStorage.getItem("USER_NAME")}
                            </h2>
                        </Grid>
                        <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
                            <h2 style={{ paddingLeft: "10px" }}>
                                <AiFillCaretRight /> 지원한 프로젝트 목록
                            </h2>
                            <ApplyTable
                                columnsApply={columnsApply}
                                result={resultApply}
                            />
                        </Grid>
                        <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
                            <h2 style={{ paddingLeft: "10px" }}>
                                <AiFillCaretRight />
                                참여 중인 프로젝트 목록
                            </h2>
                            <JoinTable
                                columnsJoin={columnsJoin}
                                result={resultApply}
                            />
                            {/* <JoinTable columnsJoin={columnsJoin} result={resultJoin}/> */}
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
                                color="error"
                                variant="outlined"
                                onClick={handleWithdrawalModalOpen}
                            >
                                회원 탈퇴
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
                                href="/edit"
                            >
                                정보 수정
                            </Button>
                        </section>
                    </Grid>
                </Paper>

                <WithdrawalModal
                    isOpen={isWithdrawalModalOpen}
                    onClose={handleWithdrawalModalClose}
                />
            </div>
        </>
    )
}

export default MyPage
