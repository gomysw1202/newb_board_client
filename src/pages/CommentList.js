import Comment from "./Comment.js"


function CommentList({commentList, commentReRender}) {
    

    return (
        <>
			<div>댓글 목록</div>
			<div>총 댓글 수</div>
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