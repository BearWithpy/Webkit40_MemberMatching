import React, { useState } from "react"
import styles from "./projectPost.module.css"

import { Link } from "react-router-dom"

const ProjectPost = ({ project }) => {
    const projTechLang = []
    const projPosArr = []
    const [projTech, setProjTech] = useState(project.tech.split(","))
    const [projPos, setProjPos] = useState(project.position.split(","))

    for (let i = 0; i < 8; i++) {
        if (projTech[i] === undefined) break
        else projTechLang.push(projTech[i])
    }

    for (let i = 0; i < 4; i++) {
        if (projPos[i] === undefined) break
        else projPosArr.push(projPos[i])
    }

    return (
        <Link
            to={`/detail?id=${project.id}`}
            className={`${styles.studyItem} `}
        >
            <h1 className={styles.title}>{project.title}</h1>
            <li>
                <div className={styles.schedule}>
                    <p className={styles.scheduleTitle}>마감일 |</p>
                    <p className={styles.scheduleInfo}>{project.startdate}</p>
                </div>

                <ul className={styles.positionList}>
                    {projPosArr.map((pos, idx) => (
                        <li key={idx} className={styles.position}>
                            {pos}
                        </li>
                    ))}
                </ul>
                <ul className={styles.content}>
                    {projTechLang.map((lang, i) => (
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
                <div className={styles.border} />
                <section className={styles.info}>
                    <div className={styles.userInfo}>
                        <div className={styles.userName}>{project.owner}</div>
                    </div>
                </section>
            </li>
        </Link>
    )
}

export default ProjectPost
