import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function BoardWrite() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // const [board, setBoard] = useState({});
    const navigate = useNavigate();
    const { boardNum } = useParams(); // 파라미터 가져오기

    
    const getBoardDetail = async () => {

        
		await axios.get(`/board/${boardNum}`)
		.then((resp) => {
			console.log("[BoardDetail.js] getBoardDetail() success :D");
			console.log(resp.data);
            
			const board = resp.data;
            setContent(board.content);
            setTitle(board.title);
		})
		.catch((err) => {
			console.log("[BoardDetail.js] getBoardDetail() error :<");
			console.log(err);
		});

	}

    useEffect(() => {
        console.log(boardNum)
        getBoardDetail();
        }, []);
    


    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    }   

    const onContentHandler = (event) => {
        setContent(event.currentTarget.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let data = {
            // fkUserid: fkUserid,
            title: title,
            content: content,
        };

        console.log(data);

        axios.post("/board/write", data)
            .then((resp) => {
                if(resp.status === 200) {
                    navigate('/board/list');
                    debugger
                }
            }).catch((err) => {
                alert("글등록실패, 다시 시도 해주세요" + err)
            });
    }       


    return (
        <>

        <form onSubmit={handleSubmit}>
            <table >
				<tbody>
					{/* <tr>
						<th >작성자</th>
						<td>
							<input type="text" value={localStorage.getItem("id")} size="50px" readOnly />
						</td>
					</tr> */}

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
        </>
    )
    
}

export default BoardWrite;