import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Register() {

    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isIdDuplicated, setIsIdDuplicated] = useState(false);

    const navigate = useNavigate();

    const onUserIdHandler = (event) => {
        setUserid(event.currentTarget.value);
        setIsIdDuplicated(true);
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

    const idDuplicateCheck = () => {

        if (!userid.trim()) {
            alert("아이디를 입력해주세요.");
            return;
        }

        axios.get('/idDuplicateCheck', { params: { userid: userid } })
        .then((resp) => {

            if(resp.data === false) {
                alert('사용 가능한 아이디 입니다.')
                setIsIdDuplicated(false);
            }else {
                alert('사용 불가한 아이디 입니다.')
                setIsIdDuplicated(true);
            }

        }).catch((err) => {
            alert("사용 불가한 아이디 입니다." + err);
            setIsIdDuplicated(true);
        }); 

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!userid.trim()) {
            alert("아이디를 입력해주세요.");
            return;
        }
        if(!password.trim()){
            return alert('비밀번호를 입력해주세요.')
        }

        if(password !== confirmPassword){
            return alert('비밀번호가 일치하지 않습니다.')
        }

        if(!email.trim()){
            if(window.confirm("이메일 입력을 안하시면 비밀번호 변경이 어렵습니다. 정말로 입력을 안하시겠습니까?")){
                
            }else{
                return;
            }
        }

        

        if (!isIdDuplicated) {
            let data = {
                userid: userid,
                passwd: password,
            };
    
            console.log(data);
    
            axios.post("/signUp", data)
                .then((resp) => {
                    if(resp.status === 200) {
                        alert("회원가입 성공!");
                        navigate('/login');
                    }
                }).catch((err) => {
                    alert("회원가입실패, 다시 시도 해주세요" + err)
                });
        }
        else{
            alert('아이디 중복확인을 해주세요.')
        }
        
    }

    return (
        <div className="signup-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <label>아이디</label>
                <input type='text' value={userid} onChange={onUserIdHandler}/>
                <button type="button" onClick={idDuplicateCheck}>아이디 중복확인</button>
                <label>비밀번호</label>
                <input type="password" value={password} onChange={onPasswordHandler}/>
                <label>비밀번호 확인</label>
                <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler}/>
                <label>이메일</label>
                <input type="email" value={email} onChange={onEmailHandler}/>
                <button>회원가입</button>
            </form>
        </div>
    )
    

}; 

