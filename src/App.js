import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import Main from "./pages/Main.js";     
import BoardList from "./pages/BoardList";     

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<Main />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/SignUp" element={<SignUp />}/>
          <Route path="/boardList" element={<BoardList/>}/>
          
        </Routes>
      </Router>
    </>
    );
}
