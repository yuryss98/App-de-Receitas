import React from 'react';

function Login() {
  // const emailIsValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);
  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name=""
          id=""
          data-testid="email-input"
        />
      </label>

      <label htmlFor="email">
        Senha
        <input
          type="text"
          name=""
          id=""
          data-testid="password-input"
        />
      </label>

      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
