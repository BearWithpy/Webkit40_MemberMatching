// import { Typography } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import MyPage from "./pages/MyPage/MyPage"
import NewProject from "./pages/NewProject/NewProject"
import EditPage from "./pages/EditPage/EditPage"
import Main from "./pages/MainPage/Main"
import Detail from "./pages/DetailPage/Detail"
import QnaPage from "./pages/QnaPage/QnaPage"
import NewQna from "./pages/NewQna/NewQna"
import ApplyPage from "./pages/ApplyPage/ApplyPage"
import EditProject from "./pages/EditProject/EditProject"
import DetailQnAPage from "./pages/DetailQnAPage/DetailQnAPage"
import EditQnAPage from "./pages/EditQnAPage/EditQnAPage"

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {"Copyright ⓒ "}
//             reverselevel, {new Date().getFullYear()}
//             {"."}
//         </Typography>
//     )
// }

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/detail" element={<Detail />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/newproject" element={<NewProject />} />
                    <Route path="/newqna" element={<NewQna />} />
                    <Route path="/edit" element={<EditPage />} />
                    <Route path="/editproject" element={<EditProject />} />
                    <Route path="/qna" element={<QnaPage />} />
                    <Route path="/qnadetail" element={<DetailQnAPage />} />
                    <Route path="/editqna" element={<EditQnAPage />} />
                    <Route path="/apply" element={<ApplyPage />} />
                </Routes>
            </div>
            {/* <div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </div> */}
        </BrowserRouter>
    )
}

export default AppRouter
