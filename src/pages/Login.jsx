import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('drinksToken', '1');

    const { push } = history;

    push('/meals');
  };

  return (
    <form onSubmit={ handleSubmit }>
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
        type="submit"
        disabled={ disabled }
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
