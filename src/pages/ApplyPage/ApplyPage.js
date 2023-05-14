import React, { useEffect, useState } from "react"
import NavigationBar from "../../components/Navigation/NavigationBar"
import { Button, Grid } from "@mui/material"

import styles from "./applypage.module.css"
import { useLocation } from "react-router-dom"
import axios from "axios"
import ApproveTable from "../../components/Table/ApproveTable/ApproveTable"

const ApplyPage = () => {
    const columnsApply = ["번호", "지원자", "지원 날짜", "지원 승인"]
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const queryValue = searchParams.get("id")

    const [data, setData] = useState([])
    const [projectName, setProjectName] = useState("")
    const [headcount, setHeadcount] = useState(0)

    const [applicantInfo, setApplicantInfo] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:7777/project/manage/apply?id=${queryValue}`)
            .then((response) => {
                const dataArray = Object.values(response.data)
                // console.log(Object.values(response.data))
                setData(dataArray.reverse())
            })
            .catch((error) => {
                console.error(error)
            })

        axios
            .get(`http://localhost:7777/project/detail?id=${queryValue}`)
            .then((response) => {
                // console.log(response.data.data[0])
                setProjectName(response.data.data[0].title)
                setHeadcount(response.data.data[0].headcount)
            })
            .catch((error) => {
                // alert(error.response.data.error)
                console.error(error)
                return
            })
    }, [queryValue])

    const handleApprove = () => {
        console.log(applicantInfo)
        if (applicantInfo.length === 0) {
            alert("아무도 선택 되지 않았습니다!! [Error]")
            return
        }
        let dtoData = []

        const date = new Date()
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const day = date.getDate().toString().padStart(2, "0")
        const today = `${year}-${month}-${day}`

        applicantInfo.map((item) => {
            let temp = {
                projectid: queryValue,
                memberid: item,
                joindate: today,
            }
            dtoData.push(temp)
        })
        dtoData.push({
            projectid: queryValue,
            memberid: localStorage.getItem("ID"),
            joindate: today,
        })

        const data = {
            projectJoinDTOs: dtoData,
        }
        // console.log(data)

        axios
            .post(`http://localhost:7777/project/approve`, data)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.error(error)
            })

        axios
            .post(`http://localhost:7777/project/approve/delete`, data)
            // .delete(`http://localhost:7777/project/approve/delete`, data)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.error(error)
            })

        alert("팀 가입 승인이 완료되었습니다")
        window.location.href = "/mypage"
    }

    return (
        <>
            <NavigationBar />

            <main className={styles.main}>
                <Grid container>
                    <Grid xs={6} md={6} item style={{ paddingRight: 16 }}>
                        <h1 style={{ marginTop: "40px", paddingLeft: "140px" }}>
                            승인 페이지 - {projectName}
                            <br />
                            모집 인원: {headcount}명
                        </h1>
                    </Grid>
                </Grid>
                <div className={styles.appWrapper}>
                    <Grid container>
                        <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
                            <ApproveTable
                                applicantInfo={applicantInfo}
                                setApplicantInfo={setApplicantInfo}
                                columnsApply={columnsApply}
                                applicant={data}
                                headcount={headcount}
                            />
                        </Grid>
                    </Grid>
                    <section
                        style={{
                            width: "100%",

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
                            onClick={handleApprove}
                            // href="/newqna"
                        >
                            일괄 승인
                        </Button>
                    </section>
                </div>
            </main>
        </>
    )
}

export default ApplyPage
