import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.css';
import logoTomate from '../images/imagesCSS/tomate.png';
import logoRecipes from '../images/imagesCSS/logo Recipes App.png';
import 'bulma/css/bulma.min.css';

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
    <form onSubmit={ handleSubmit } className="container">
      <div>
        <div className="logo">
          <img
            src={ logoRecipes }
            alt=""
          />
        </div>

        <div className="tomate">
          <img
            className="titleLogin"
            src={ logoTomate }
            alt=""
          />
        </div>

      </div>

      <div className="ipuntsAndButton">
        <h1 className="titleLogin">Login</h1>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input is-rounded"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ handleEmail }
              data-testid="email-input"
              placeholder="Email"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>

          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input is-rounded"
              type="password"
              name="password"
              id="password"
              value={ password }
              onChange={ handlePassword }
              data-testid="password-input"
              placeholder="Password"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
          </p>
        </div>

        <button
          type="submit"
          className="button is-warning is-rounded"
          disabled={ disabled }
          data-testid="login-submit-btn"
          onClick={ handleSubmit }
        >
          ENTER
        </button>
      </div>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
