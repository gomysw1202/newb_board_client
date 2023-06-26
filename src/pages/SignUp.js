import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Register() {

    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const onUserIdHandler = (event) => {
        setUserid(event.currentTarget.value);
}

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
            }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // if(password !== confirmPassword){
        //     return alert('비밀번호가 일치하지 않습니다.')
        // }
        
        let data = {
            userid: userid,
            passwd: password
        };

        console.log(data);

        axios.post("/signUp", data)
            .then((resp) => {
                if(resp.status === 200) {
                    navigate('/login');
                    console.log(resp.data);
                }
            }).catch((err) => {
                alert("회원가입실패" + err)
            });
    }

    return (
        <>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <label>아이디</label>
                <input type='text' value={userid} onChange={onUserIdHandler}/><button >중복확인</button>
                <label>비밀번호</label>
                <input type="password" value={password} onChange={onPasswordHandler}/>
                <label>비밀번호 확인</label>
                <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler}/>
                <button>회원가입</button>
            </form>
        </>
        
    )
    

}; 

