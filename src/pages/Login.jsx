import { useEffect, useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const passwordMinLength = 6;
    const emailIsValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);

    if (password.length > passwordMinLength && emailIsValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleEmail = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handlePassword = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          id=""
          value={ email }
          onChange={ handleEmail }
          data-testid="email-input"
        />
      </label>

      <label htmlFor="email">
        Senha
        <input
          type="password"
          name=""
          id=""
          value={ password }
          onChange={ handlePassword }
          data-testid="password-input"
        />
      </label>

      <button
        type="button"
        disabled={ disabled }
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
