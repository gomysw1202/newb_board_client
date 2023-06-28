import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import Main from "./pages/Main.js";     
import BoardList from "./pages/BoardList";  
import BoardDetail from './pages/BoardDetail';   
import BoardWrite from './pages/BoardWrite';   

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<Main />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/SignUp" element={<SignUp />}/>
          <Route path="/board/list" element={<BoardList/>}/>
          <Route path="/board/:boardNum" element={<BoardDetail/>}/>
          <Route path="/board/write/:boardNum" element={<BoardWrite/>}/>
          
        </Routes>
      </Router>
    </>
    );
}
