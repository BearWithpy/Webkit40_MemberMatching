import React, { useEffect, useState } from "react"

import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const ContentEditor = ({ onStateChange }) => {
    const [content, setContent] = useState("")

    const handleChildStateChange = (value) => {
        setContent(value)
        onStateChange(value)
    }

    return <ReactQuill value={content} onChange={handleChildStateChange} />
}

export default ContentEditor
