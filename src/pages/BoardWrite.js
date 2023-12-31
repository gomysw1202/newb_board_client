import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/comment.css';

function BoardWrite() {

    const userid = sessionStorage.getItem("userid");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // const [board, setBoard] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        if (!userid) {
          navigate("/login"); // 리다이렉트할 경로를 설정해주세요
        }
      }, [navigate]);


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
        
        
        if (!title.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }

        if (!content.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }

        let data = {
            fkUserid: userid,
            title: title,
            content: content,
        };

        axios.post("/board/write", data)
            .then((resp) => {
                if(resp.status === 200) {
                    navigate('/board/list');
                }
            }).catch((err) => {
                alert("글등록실패, 다시 시도 해주세요" + err)
            });
    }       


    return (
        <>
<div className="centered-form">
  <div className="form-container">
        <form onSubmit={handleSubmit}>
        <table className="form-table">
            <tbody>
            <tr>
                <th>작성자</th>
                <td>
                <span>{userid}</span>
                </td>
            </tr>

            <tr>
                <th>제목</th>
                <td>
                <input type="text" value={title} onChange={onTitleHandler} size="50px" />
                </td>
            </tr>

            <tr>
                <th>내용</th>
                <td>
                <textarea value={content} onChange={onContentHandler} rows="10"></textarea>
                </td>
            </tr>
            </tbody>
        </table>

        <div className="form-buttons">
            <button>글쓰기</button>
            <button type="button" onClick={moveTolist}>취소</button>
        </div>
    </form>
    
    </div>

    </div>

        </>
    )
    
}

export default BoardWrite;