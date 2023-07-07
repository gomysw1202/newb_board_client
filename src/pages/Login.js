import { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../components/axiosInstance.js";


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
    
    useEffect(() => {

        console.log(window.location.origin)
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let data = {
            userid: userid,
            passwd: password
        };

        axios.post("/login", data)
            .then((resp) => {
                if(resp.status === 200) {
                    console.log(resp.data.access_token)
                    localStorage.setItem("access-token", resp.data.access_token)
                    navigate('/main');
                }
            }).catch((err) => {
                alert("아이디 혹은 비밀번호가 틀렸습니다" + err)
            });
    }

    return (
        <>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <label>아이디</label>
                <input type="text" name="userid" value={userid} onChange={onUserIdHandler}></input>
                <label>비밀번호</label>
                <input type="password" name="passwd" value={password} onChange={onPasswordHandler}></input>
                <button>로그인</button>
            </form>
            <Link to="/SignUp" >회원가입</Link>
            <br/>
            <a href="#">비밀번호 찾기</a>
        </>
        
    )

}; 

