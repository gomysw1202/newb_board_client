import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import '../styles/login.css';

export default function Login() {

    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
        
    const onUserIdHandler = (event) => {
        setUserid(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let data = {
            userid: userid,
            passwd: password
        };

        axios.post("/login", data)
            .then((resp) => {
                if(resp.data === true) {
                    console.log(resp.data);
                    sessionStorage.setItem("userid", data.userid);
                    navigate('/board/list');
                }
            }).catch((err) => {
                alert("아이디 혹은 비밀번호가 틀렸습니다" + err)
            });
    }

    return (
        <>
        <div className="login-container">
        <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <label>아이디</label>
                <input type="text" name="userid" value={userid} onChange={onUserIdHandler}></input>
                <label>비밀번호</label>
                <input type="password" name="passwd" value={password} onChange={onPasswordHandler}></input>
                <button>로그인</button>
            </form>
            <Link to="/SignUp" >회원가입</Link>
            <Link to="/findPwd" >비밀번호 찾기</Link>
            <br/>
            
            

        </div>
        </>
        
    )

}; 

