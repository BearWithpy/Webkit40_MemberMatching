import React, { useEffect, useState } from "react"
import NavigationBar from "../../components/Navigation/NavigationBar"

import styles from "./mainpage.module.css"

import ProjectList from "../../components/ProjectList/ProjectList"

import axios from "axios"

const Main = () => {
    const [projects, setProjects] = useState([])
    useEffect(() => {
        axios
            .get("http://localhost:7777/project")
            .then((response) => {
                // console.log(response.data.data)
                setProjects(response.data.data)
            })
            .catch((error) => {
                console.error(error)

                return
            })
    }, [])

    return (
        <>
            <NavigationBar />
            <main className={styles.main}>
                <h1 style={{ marginTop: "40px", paddingLeft: "140px" }}>
                    프로젝트 모집 글
                </h1>
                <div className={styles.appWrapper}>
                    <ProjectList projects={projects} />
                </div>
            </main>
        </>
    )
}

export default Main
