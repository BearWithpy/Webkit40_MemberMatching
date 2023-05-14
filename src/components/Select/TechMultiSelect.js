import React, { useState } from "react"

import Select from "react-select"

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

const TechMultiSelect = ({ onStateChange }) => {
    const [selectedOptions, setSelectedOptions] = useState(null)

    function handleChange(selected) {
        setSelectedOptions(selected)

        if (selected) {
            const techvalue = selected
                .map((obj) => obj.value)
                .filter((value) => value !== undefined)

            onStateChange(techvalue.join(","))
        } else {
            onStateChange("")
        }
    }

    const customStyles = {
        control: (provided) => ({
            ...provided,

            height: "60px",
        }),
    }

    return (
        <Select
            options={techOptions}
            isMulti
            styles={customStyles}
            value={selectedOptions}
            onChange={handleChange}
            placeholder="관심 기술"
        />
    )
}

export default TechMultiSelect
