import React, {useState, useEffect} from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import CommentList from "./CommentList";
import CommentWrite from "./CommentWrite";
import axios from "axios";
function BoardDetail() {

	const userid = sessionStorage.getItem("userid");

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
		if(window.confirm("게시글을 정말로 삭제하시겠습니까?")){
			await axios.patch(`/board/delete/${boardNum}`).then((resp) => {
				console.log("[BoardDetail.js] handleDeleteBnt() success :D");
				console.log(resp.data);
	
				alert("게시글이 삭제되었습니다.");
	
				navigate("/board/list");
			}).catch((err) => {
				console.log("[BoardDetail.js] handleDeleteBnt() error :<");
				console.log(err);
			});
		}
		else{
			return;
		}
    }


	const openCloseContent = async () => {

		const open = board.open === 'Y' ? 'N' : 'Y';

		if(window.confirm("게시글을 비공개/공개 처리하시겠습니까?")){
			await axios.post('/board/openClose', { open: open, boardNum: boardNum} ).then((resp) => {
				console.log(resp.data);
	
				alert("게시글이 비공개/공개 처리 되었습니다.");
	
				navigate("/board/list");
			}).catch((err) => {
				console.log(err);
			});
		}
		else{
			return;
		}
    }
	


    const boardModify = {
		boardNum: board.boardNum,
		fkUserid: board.fkUserid,
		title: board.title,
		content: board.content
	}

	

    return (
	<>
	<h2>게시물 상세보기</h2>
		<div className="board-details">
			<table>
			<tbody>
				<tr>
				<th>작성자</th>
				<td>
					<span>{board.fkUserid}</span>
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
				<th>제목</th>
				<td>
					<span>{board.title}</span>
				</td>
				</tr>

				<tr>
				<th>내용</th>
				<td>
					<div>{board.content}</div>
				</td>
				</tr>
			</tbody>
			</table>

			{userid === board.fkUserid && (
			<div className="board-actions">
				<Link to={`/board/modify`} state={{ board: boardModify }}>수정</Link>
				<button type='button' onClick={handleDeleteBnt}>삭제</button>
				
				<button
				type='button'
				onClick={openCloseContent}
				className={board.open === 'Y' ? 'close-button' : 'open-button'}
				>
				{board.open === 'Y' ? '비공개 처리' : '공개 처리'}
				</button>
			</div>
			)}
			<Link to="/board/list">목록으로</Link>
		</div>

		<CommentWrite boardNum={boardNum} commentReRender={getCommentList} />
		<CommentList commentList={commentList} commentReRender={getCommentList} />
	</>
        
    )
};

export default BoardDetail;