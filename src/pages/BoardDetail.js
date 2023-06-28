import React, {useState, useEffect} from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
function BoardDetail() {

    // const { auth, setAuth } = useContext(AuthContext)

	const [board, setBoard] = useState({});
	const { boardNum } = useParams(); // 파라미터 가져오기

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

    useEffect(() => {
		getBoardDetail();
	}, []);


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
            <Link to={`/board/write/${board.boardNum}`}>수정</Link>
			</table>
        </>
        
    )
};

export default BoardDetail;