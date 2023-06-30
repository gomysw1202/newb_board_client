import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Register() {

    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

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
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }



    // useEffect(() => {
    // }, [onUserIdHandler]);


    const checkIdDuplicate = () => {

        let data = {
            userid: userid,
        };

        axios.post('/checkIdDuplicate', data)
        .then((resp) => {
 
            if(resp.data === false) {
                alert('사용 가능한 아이디 입니다.')
                
            }else{
                alert('중복된 아이디 입니다.')
            }

        }).catch((err) => {
            alert("사용 불가한 아이디 입니다." + err);
        }); 

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // if(password !== confirmPassword){
        //     return alert('비밀번호가 일치하지 않습니다.')
        // }
        
        let data = {
            userid: userid,
            passwd: password,
            email: email,
        };

        console.log(data);

        axios.post("/signUp", data)
            .then((resp) => {
                if(resp.status === 200) {
                    navigate('/login');
                }
            }).catch((err) => {
                alert("회원가입실패, 다시 시도 해주세요" + err)
            });
    }

    return (
        <>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <label>아이디</label>
                <input type='text' value={userid} onChange={onUserIdHandler}/><button type="button" onClick={checkIdDuplicate}>중복확인</button>
                <label>비밀번호</label>
                <input type="password" value={password} onChange={onPasswordHandler}/>
                <label>비밀번호 확인</label>
                <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler}/>
                <label>이메일</label>
                <input type="email" value={email} onChange={onEmailHandler}/>
                <button>회원가입</button>
            </form>
        </>
        
    )
    

}; 

