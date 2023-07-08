import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


function BoardWrite() {

    const userid = sessionStorage.getItem("userid");

    const location = useLocation();
    const { board } = location.state;
    
    const [title, setTitle] = useState(board.title);
    const [content, setContent] = useState(board.content);
    const navigate = useNavigate();

        
    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    }   

    const onContentHandler = (event) => {
        setContent(event.currentTarget.value);
    }

    const moveTolist = (event) => {
        navigate('/board/list');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let data = {
            boardNum: board.boardNum,
            title: title,
            content: content,
        };

        console.log(data);

        axios.patch('/board/modify', data)
            .then((resp) => {
                if(resp.status === 200) {
                    navigate(`/board/${board.boardNum}`);
                }
            }).catch((err) => {
                alert("글수정실패, 다시 시도 해주세요" + err)
            });
    }       


    return (
        <>

        <form onSubmit={handleSubmit}>
            <table >
				<tbody>
                <tr>
						<th >작성자</th>
						<td>
							<span>{userid}</span>
						</td>
					</tr>

					<tr>
						<th >제목</th>
						<td>
							<input type="text" value={title} onChange={onTitleHandler} size="50px" />
						</td>
					</tr>

					<tr>
						<th >내용</th>
						<td>
							<textarea value={content} onChange={onContentHandler} rows="10"></textarea>
						</td>
					</tr>
				</tbody>
			</table>

			<div >
				<button>글쓰기</button>
			</div>
        </form>

        
        <button type="button" onClick={moveTolist}>취소</button>
        </>
    )
    
}

export default BoardWrite;