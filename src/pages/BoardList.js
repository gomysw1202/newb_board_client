import React, {useState, useEffect} from 'react';
import axios from "axios";

import {Link } from "react-router-dom";

const BoardList = () => {

    const [boardList, setBoardList] = useState([]);

    const getBoardList = async () => {
        await axios.get("/board/list").then((resp) => {
            setBoardList(resp.data);
        }).catch((err) => {
            console.log('[BoardList.js] useEffect() error :<' + err)
        });
  }

  useEffect(() => {
    getBoardList();
  }, []);

  return (
    <>
        <table className="table table-hover">
				<thead>
					<tr>
						<th className="col-1">번호</th>
						<th className="col-8">제목</th>
						<th className="col-3">작성자</th>
						<th className="col-3">작성일자</th>
						<th className="col-3">조회수</th>
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
				<Link to="/board/write"><i className="fas fa-pen"></i> &nbsp; 글쓰기</Link>
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
                  <Link to={`/board/${board.boardNum}` }> { /* 게시글 상세 링크 */}
                    <span >{board.title} </span> { /* 게시글 제목 */}
                  </Link>
                </th>
                <th>{board.fkUserid}</th>
                <th>{board.writeDate}</th>
                <th>{board.views}</th>
              </tr>
);
}


export default BoardList;