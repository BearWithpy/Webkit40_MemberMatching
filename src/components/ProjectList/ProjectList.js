import React from "react"
import styles from "./projectList.module.css"
import ProjectPost from "../ProjectPost/ProjectPost"

const ProjectList = ({ projects }) => {
    return (
        <ul className={styles.studyList}>
            {projects.map((project) => {
                // console.log(project)
                return (
                    <ProjectPost
                        project={project}
                        key={project.id}
                    ></ProjectPost>
                )
            })}
        </ul>
    )
}

export default ProjectList
