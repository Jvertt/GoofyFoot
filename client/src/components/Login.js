import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Implement login logic here, then redirect to product list.
    history.push('/products');
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required className="login-input" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="login-input" />
      <button type="submit" className="login-button">Log in</button>
    </form>
  );
};

export default Login;
