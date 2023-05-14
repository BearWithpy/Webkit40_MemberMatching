import React, { useEffect, useState } from "react"
import NavigationBar from "../../components/Navigation/NavigationBar"
import styles from "./qnapage.module.css"

import { Button, Grid } from "@mui/material"

import DemoSearchBar from "../../components/Demo/DemoSearchBar"

import QnABoard from "../../components/QnABoard/QnABoard"

const QnaPage = () => {
    // const columnsApply = ["순번", "제목", "작성자", "등록일"]

    useEffect(() => {}, [])

    const [query, setQuery] = useState("")
    const [category, setCategory] = useState("")

    const handleQnA = () => {
        window.location.href = "/newqna"
    }

    const handleSearch = (searchQuery, searchCategory) => {
        setQuery(searchQuery)
        setCategory(searchCategory)
    }

    return (
        <>
            <NavigationBar />
            <main className={styles.main}>
                <Grid container>
                    <Grid xs={6} md={6} item style={{ paddingRight: 16 }}>
                        <h1 style={{ marginTop: "40px", paddingLeft: "140px" }}>
                            질의 응답 게시판
                        </h1>
                    </Grid>
                </Grid>
                <div className={styles.appWrapper}>
                    <Grid
                        container
                        style={{
                            justifyContent: "space-around",
                        }}
                    >
                        <Grid
                            xs={12}
                            md={12}
                            item
                            style={{
                                paddingRight: 16,
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <DemoSearchBar onSearch={handleSearch} />
                        </Grid>
                        <Grid
                            xs={11}
                            md={11}
                            item
                            style={{
                                paddingRight: 16,
                            }}
                        >
                            {/* <QnATable columnsApply={columnsApply} /> */}
                            <QnABoard searchQuery={{ query, category }} />
                        </Grid>
                    </Grid>

                    <section
                        style={{
                            width: "99%",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginTop: "1rem",
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
                            onClick={handleQnA}
                        >
                            글 쓰기
                        </Button>
                    </section>
                </div>
            </main>
        </>
    )
}

export default QnaPage
