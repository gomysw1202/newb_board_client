import { useState } from "react";
import axios from "axios";


export default function Register() {

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const onUserIdHandler = (event) => {
        setUserId(event.currentTarget.value);
    }
    
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const handleSubmit = (event) => {
        if(password !== confirmPassword){
            return alert('비밀번호가 일치하지 않습니다.')
        }
        
        let data = {
            userId: userId,
            userPW: password
        };

        console.log(data);

        axios.post("/SignUp", data)
            .then((resp) => {
                alert("회원가입성공")
            }).catch((err) => {
                alert("회원가입실패")
            });


    }

    return (
        <>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <label>아이디</label>
                <input type='text' value={userId} onChange={onUserIdHandler}/><button >중복확인</button>
                <label>비밀번호</label>
                <input type="password" value={password} onChange={onPasswordHandler}/>
                <label>비밀번호 확인</label>
                <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler}/>
                <button>회원가입</button>
            </form>
        </>
        
    )

}; 

