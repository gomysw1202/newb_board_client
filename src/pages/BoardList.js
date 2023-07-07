import React, {useState, useEffect} from 'react';
import axios from "axios";

import {Link } from "react-router-dom";

const BoardList = () => {

    const [boardList, setBoardList] = useState([]);
    const [commentList, setCommentList] = useState([]);

  //   const getBoardList = async({fkUserid}) => {

  //       await axios.get("/board/list", { params: {fkUserid} } )
  //       .then((resp) => {
  //           setBoardList(resp.data);
  //       }).catch((err) => {
  //           console.log('[BoardList.js] useEffect() error :<' + err)
  //       });
      
  // }
  
  const getBoardList = async() => {

    await axios.get("/board/list")
    .then((resp) => {
        setBoardList(resp.data);

    }).catch((err) => {
        console.log('[BoardList.js] useEffect() error :<' + err)
    });
  
}
  useEffect(() => {
    getBoardList();
  }, []);


  const getCommentList = async ({fkUserid}) => {
		await axios.get(`/comment/list`, { params: { fkUserid} } )
			.then((resp) => {
				console.log("[BoardDetail.js] getCommentList() success :D");
				console.log(resp.data);
				
				setCommentList(resp.data);
			}).catch((err) => {
				console.log("[BoardDetail.js] getCommentList() error :<");
				console.log(err);
			});
	}

  // const updateOpenYN = async () => {
	// 	await axios.patch(`/comment/updateOpenYN` )
	// 		.then((resp) => {
	// 			console.log("[BoardDetail.js] updateOpenYN() success :D");
	// 			console.log(resp.data);
				
	// 			getCommentList();
	// 		}).catch((err) => {
	// 			console.log("[BoardDetail.js] updateOpenYN() error :<");
	// 			console.log(err);
	// 		});
	// }

  

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
                  <TableRow obj={obj} key={idx} cnt={idx + 1} />
                )
              })
            }
        </tbody>
			</table>

			<div>
				<Link to="/board/write">글쓰기</Link>
        <button onClick={() => getBoardList()}>내 게시글</button>
        <button onClick={() => getCommentList({ fkUserid: 'limsw' })}>내 댓글</button>
    
      </div>
    </>
    
    
  );
};


function TableRow(props) {
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
                {/* <th><button onClick={() => updateOpenYN()}>비공개</button></th> */}
              </tr>
);
}


export default BoardList;