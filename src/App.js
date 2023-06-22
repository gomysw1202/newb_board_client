import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<SignUp />}/>
        </Routes>
      </Router>
    </>
    );
}
