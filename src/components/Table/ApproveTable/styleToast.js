import { ToastContainer } from "react-toastify"
import styled from "styled-components"

export const ToastStyleContainer = styled(ToastContainer)`
    .Toastify__toast {
        font-size: 16px;
        max-width: 500px;
        min-height: 500px;
        border-radius: 50px;
        padding: 16px 28px;
        color: #fff;
        background: rgb(56, 116, 203);
    }

    .Toastify__toast-icon {
        display: none;
    }
`
