import Comment from "./Comment.js"
import '../styles/comment.css';

function CommentList({commentList, commentReRender}) {
    return (
        <>
			<h4>댓글 목록</h4>
            {
                commentList && commentList.map(function (comment, idx) {
					return (
						<div key={idx}>
							<Comment obj={comment} key={idx} commentReRender = {commentReRender}/>
						</div>
                    )
                })
            }
        </>
    )

}

export default CommentList;