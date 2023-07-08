import axios from "axios";
import { useState } from "react";
import CommentWrite from "./CommentWrite";

function Comment(props) {
    const userid = sessionStorage.getItem("userid");
    const comment = props.obj;
    const commentReRender = props.commentReRender;

    const [showModify, setShowModify] = useState(false);
    const [showReply, setShowReply] = useState(false);

    const [content, setContent] = useState(comment.content);

    const onContentHandler = (event) => {
        setContent(event.currentTarget.value);
    }

    const handleDeleteBnt = async () => {

        await axios.patch(`/comment/delete`, null, { params: { commentNum: comment.commentNum } }).then((resp) => {
            console.log("[Comment.js] handleDeleteBnt() success :D");
			console.log(resp.data);

            alert('comment delete가 정상적으로 되었는지 확인하는 로직을 구현해야함. 일단 상태 코드 200');

            commentReRender();
        }).catch((err) => {
			console.log(err);
        });
    }


    const handleModifyBnt = async () => {
        const data = {
            commentNum: comment.commentNum,
            content: content
        }

        await axios.patch('/comment/modify', data).then((resp) => {
            setShowModify(showModify => !showModify);
            commentReRender();
        }).catch((err) => {
            console.log("[Comment.js] handleModifyBnt() error :<");
			console.log(err);
        });
    }

    function ModifyToggle() { 
		setShowModify(showModify => !showModify) 
	}

    function reCommentToggle() { 
		setShowReply(showReply => !showReply) 
	}



    return (
        <>

        {
            showModify ? 
            <>
                <div>
                    <textarea value={content} onChange={onContentHandler}></textarea>
                    <button type="button" onClick={handleModifyBnt}>수정완료</button>
                </div>
            </>
                :   
            <>
                <div>
                    <span>{content}</span>
                    <span>{comment.fkUserid}</span>
                    <span>{comment.writeDate}</span>
                    { userid === comment.fkUserid && (
                        <>
                            <button type="button" onClick={ModifyToggle}>수정</button>
                            <button type="button" onClick={handleDeleteBnt}>삭제</button>
                        </>
				    )}
                    
                    
                </div>
            </>
        }

        </>
    )
}


export default Comment;