import React, { useState } from 'react';
import axios from 'axios';

const FindPwd = () => {
  const [email, setEmail] = useState('');
  const [resetLinkSent, setResetLinkSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetLinkClick = async (e) => {
    e.preventDefault();

    await axios.post('/findPwd', { email }).then((resp) => {
        if (resp.status === 200) {
        setResetLinkSent(true);
    }}).catch ((err) => {
        alert("이메일 전송 실패" + err)
    });

  return (
    <div>
      <h2>비밀번호 찾기</h2>
      {!resetLinkSent ? (
        <form onSubmit={handleResetLinkClick}>
          <label>이메일 주소:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
          <button type="submit">비밀번호 재설정 링크 보내기</button>
        </form>
      ) : (
        <p>비밀번호 재설정 링크가 이메일로 전송되었습니다. 확인해주세요.</p>
      )}
    </div>
  );
};
}

export default FindPwd;