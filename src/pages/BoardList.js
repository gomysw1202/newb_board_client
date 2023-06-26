import React, {useState, useEffect} from 'react';
import axios from "axios";

import {Link } from "react-router-dom";

const BoardList = () => {

    const [boardList, setBoardList] = useState([]);

    const getBoardList = async () => {
    const resp = await (await axios.get("/boardList")).data;
    setBoardList(resp);
    console.log(resp);
  }

  useEffect(() => {
    getBoardList();
  }, []);

  return (
    
    <div>
      게시판 목록 출력
      <ul>
      {boardList && boardList.map((board) => (
          <li key={board.boardNum}>
            <Link to={`/board/${board.boardNum}`}>{board.title}</Link>
          </li>
        ))}
      </ul>

    </div>
    
  );
};


export default BoardList;