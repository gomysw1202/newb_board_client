import React, {useState, useEffect} from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import CommentList from "./CommentList";
import CommentWrite from "./CommentWrite";
import axios from "axios";
function BoardDetail() {

    // const { auth, setAuth } = useContext(AuthContext)

	const { boardNum } = useParams(); // 파라미터 가져오기
	const [board, setBoard] = useState({});
    const [commentList, setCommentList] = useState([]);

    const navigate = useNavigate();

    const getBoardDetail = async () => {
		await axios.get(`/board/${boardNum}`)
		.then((resp) => {
			console.log("[BoardDetail.js] getBoardDetail() success :D");
			console.log(resp.data);
            
			setBoard(resp.data);
		})
		.catch((err) => {
			console.log("[BoardDetail.js] getBoardDetail() error :<");
			console.log(err);
		});
	}

	const getCommentList = async () => {
		await axios.get(`/comment/list/${boardNum}`)
			.then((resp) => {
				console.log("[BoardDetail.js] getCommentList() success :D");
				console.log(resp.data);
				
				setCommentList(resp.data);
			}).catch((err) => {
				console.log("[BoardDetail.js] getCommentList() error :<");
				console.log(err);
			});
	}

    useEffect(() => {
		getBoardDetail();
        getCommentList();
	}, []);

    const handleDeleteBnt = async () => {
        await axios.delete(`/board/delete/${boardNum}`).then((resp) => {
            console.log("[BoardDetail.js] handleDeleteBnt() success :D");
			console.log(resp.data);

            alert('delete가 정상적으로 되었는지 확인하는 로직을 구현해야함. 일단 상태 코드 200');

            navigate("/board/list");
        }).catch((err) => {
            console.log("[BoardDetail.js] handleDeleteBnt() error :<");
			console.log(err);
        });
    }


    const boardModify = {
		boardNum: board.boardNum,
		fkUserid: board.fkUserid,
		title: board.title,
		content: board.content
	}

    return (
        <>
            <table>
				<tbody>
					<tr>
						<th>작성자</th>
						<td>
							<span>{board.fkUserid}</span>
						</td>
					</tr>

					<tr>
						<th>제목</th>
						<td>
							<span>{board.title}</span>
						</td>
					</tr>

					<tr>
						<th>작성일</th>
						<td>
							<span>{board.writeDate}</span>
						</td>
					</tr>

					<tr>
						<th>조회수</th>
						<td>
							<span>{board.views}</span>
						</td>
					</tr>

					<tr>
						<th>내용</th>
						<td>
							<div>
								{board.content}
							</div>
						</td>
					</tr>
				</tbody>
            <Link to={`/board/modify`} state={{board: boardModify}} >수정</Link>
            <button type='button' onClick={handleDeleteBnt}>삭제</button>

			</table>

            <CommentWrite boardNum={boardNum} commentReRender={getCommentList}></CommentWrite>
            <CommentList commentList = {commentList} commentReRender={getCommentList}/>
        </>
        
    )
};

export default BoardDetail;