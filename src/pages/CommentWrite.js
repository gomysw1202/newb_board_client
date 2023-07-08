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
            <textarea value={content} onChange={onContentHandler}></textarea>
            <button type="button" onClick={handleSubmit}>댓글등록</button>
            
        </>
	)
}


export default CommentWrite;