import axios from "axios";
import { useState } from "react";
import CommentWrite from "./CommentWrite";
import '../styles/comment.css';


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
        if(window.confirm("댓글을 정말로 삭제하시겠습니까?")){
        await axios.patch(`/comment/delete`, null, { params: { commentNum: comment.commentNum } }).then((resp) => {
            console.log("[Comment.js] handleDeleteBnt() success :D");
			console.log(resp.data);

            alert("댓글이 삭제되었습니다.");
            commentReRender();
        }).catch((err) => {
			console.log(err);
        });
    }		
    else{
        return;
    }
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
        <div className="comment">
        {showModify ? (
          <div>
            <textarea value={content} onChange={onContentHandler}></textarea>
            <button type="button" onClick={handleModifyBnt}>수정완료</button>
          </div>
        ) : (
          <div>
            <span className="content">{content}</span>
            <span className="meta">{comment.fkUserid}</span>
            <span className="meta">{comment.writeDate}</span>
            {userid === comment.fkUserid && (
              <div className="actions">
                <button type="button" onClick={ModifyToggle}>수정</button>
                <button type="button" onClick={handleDeleteBnt}>삭제</button>
              </div>
            )}
          </div>
        )}
      </div>
    )
}


export default Comment;