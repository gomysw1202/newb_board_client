import { Link } from "react-router-dom";

export default function Main() {

    return (
        <>
            <Link to="/board/list">게시판</Link>
            <br></br>
            <Link to="/commentList">댓글</Link>
        </>
    )
}
