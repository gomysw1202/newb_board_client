import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../styles/board.css';
const BoardList = () => {

    const userid = sessionStorage.getItem("userid");

    const [boardList, setBoardList] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [myContent, setMyContent] = useState(false);

    const navigate = useNavigate();

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
  if (!userid) {
    navigate("/login"); // 리다이렉트할 경로를 설정해주세요
  }
}, [navigate]);

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


  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <div className="button-group">
        <Link to="/board/write" className="button">글쓰기</Link>
        <button onClick={myContentToggle} className="button">{myContent ? '전체 게시글' : '내 게시글'}</button>
        <button onClick={() => getCommentList({ fkUserid: 'limsw' })} className="button">나에게 달린 댓글</button>
        <button onClick={logout} className="button">로그아웃</button>
      </div>
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

    </>
    
    
  );
};


function TableRow(props) {
  const userid = sessionStorage.getItem("userid");
	const board = props.obj;

	return (
              <tr>
                <td>{props.cnt}</td>
                <td>
                  {board.open === 'N' && (<span className='hide'>비공개</span>)}
                    <Link to={`/board/${board.boardNum}`} className="link-style"> { /* 게시글 상세 링크 */}
                      <span >{board.title}  </span> { /* 게시글 제목 */}
                    </Link>
                  {board.commentCnt !== 0 && (<span>[{board.commentCnt}]</span>)}
                </td>
                <td>{board.fkUserid}</td>
                <td>{board.writeDate}</td>
                <td>{board.views}</td>
                <td>
                {userid === board.fkUserid && (<button onClick={() => openCloseContent(board)}>{board.open === 'Y' ? '비공개' : '공개'}</button>)}
                </td>
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