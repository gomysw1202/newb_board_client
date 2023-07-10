import axios from "axios";
import { useState } from "react";

function CommentWrite(props) {
    const userid = sessionStorage.getItem("userid");

    const fkBoardNum = props.boardNum;
    const commentReRender = props.commentReRender;

    const [content, setContent] = useState("");

    const onContentHandler = (event) => {
        setContent(event.currentTarget.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!content.trim()) {
            alert("댓글을 입력해주세요.");
            return;
        }

        let data = {
            fkUserid: userid,
            fkBoardNum : fkBoardNum,
            content: content,
        };

        console.log(data);

        axios.post("/comment/write", data)
            .then((resp) => {
                if(resp.status === 200) {
                    commentReRender();
                }
            }).catch((err) => {
                alert("댓글등록실패, 다시 시도 해주세요" + err)
            });


        setContent('');    
    }       




    return (
        <>	
        <h4>댓글 달기</h4>
        <div className="comment-form">
            <textarea value={content} onChange={onContentHandler}></textarea>
            <button type="button" onClick={handleSubmit}>댓글등록</button>
        </div>
        </>
	)
}


export default CommentWrite;