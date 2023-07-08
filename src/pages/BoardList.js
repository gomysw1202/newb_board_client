import React, {useState, useEffect} from 'react';
import axios from "axios";

import {Link} from "react-router-dom";

const BoardList = () => {

    const userid = sessionStorage.getItem("userid");

    const [boardList, setBoardList] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [myContent, setMyContent] = useState(false);

  const getBoardList = async() => {
    let userid="";
    if(myContent) {
      userid = sessionStorage.getItem("userid");
    }else {
      userid = ""
    }
  
    await axios.get("/board/list", { params: { userid: userid } })
    .then((resp) => {
      console.log(resp.data);
      setBoardList(resp.data);

    }).catch((err) => {
        console.log('[BoardList.js] useEffect() error :<' + err)
    });
  
}
  useEffect(() => {
    getBoardList();
  }, [myContent]);


  const getCommentList = async () => {
		await axios.get(`/comment/list`, { params: { userid : userid} } )
			.then((resp) => {
				console.log("[BoardDetail.js] getCommentList() success :D");
				console.log(resp.data);
				
				setCommentList(resp.data);
			}).catch((err) => {
				console.log("[BoardDetail.js] getCommentList() error :<");
				console.log(err);
			});
	}

  function myContentToggle() { 
    setMyContent(myContent => !myContent);
  }


  return (
    <>
        <table className="table table-hover">
				<thead>
					<tr>
						<th>번호</th>
						<th>제목</th>
						<th>작성자</th>
						<th>작성일자</th>
            <th>조회수</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
          {
              boardList && boardList.map(function (obj, idx) {
                return (
                  <TableRow obj={obj} key={idx} cnt={idx + 1}/>
                )
              })
            }
        </tbody>
			</table>

			<div>
				<Link to="/board/write">글쓰기</Link>
        <button onClick={myContentToggle}>{myContent === true ? '전체 게시글' : '내 게시글'}</button>
        <button onClick={() => getCommentList({ fkUserid: 'limsw' })}>나에게 달린 댓글</button>
      </div>
    </>
    
    
  );
};


function TableRow(props) {
  const userid = sessionStorage.getItem("userid");
	const board = props.obj;

	return (
              <tr>
                <th>{props.cnt}</th>
                <th >
                  {board.open === 'N' && (<span>비공개</span>)}
                    <Link to={`/board/${board.boardNum}` }> { /* 게시글 상세 링크 */}
                      <span >{board.title}  </span> { /* 게시글 제목 */}
                    </Link>
                  {board.commentCnt !== 0 && (<span>[{board.commentCnt}]</span>)}
                </th>
                <th>{board.fkUserid}</th>
                <th>{board.writeDate}</th>
                <th>{board.views}</th>
                <th>
                {userid === board.fkUserid && (<button onClick={() => openCloseContent(board)}>{board.open === 'Y' ? '비공개' : '공개'}</button>)}
                </th>
              </tr>
);
}

const openCloseContent = async (props) => {
  const open = props.open === 'Y' ? 'N' : 'Y';

  if(window.confirm("게시글을 비공개/공개 처리하시겠습니까?")){
    await axios.post('/board/openClose', { open: open, boardNum: props.boardNum} ).then((resp) => {
      console.log(resp.data);

      alert("게시글이 비공개/공개 처리 되었습니다.");

    }).catch((err) => {
      console.log(err);
    });
  }
  else{
    return;
  }

}



export default BoardList;