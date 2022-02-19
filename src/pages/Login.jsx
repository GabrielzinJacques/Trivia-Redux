import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeLogin, getTokenSuccess } from '../actions';
import Logo from '../trivia.png';
import { tokenObj } from '../Services/api';
import './Styles/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      userName: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { email, userName } = this.state;
    const { setLogin, setToken, history } = this.props;
    setLogin({ email, userName });
    const results = await tokenObj();
    setToken(results);
    history.push('/game');
  }

  checkInput = () => {
    const { email, userName } = this.state;
    const MINLENGHT = 1;
    const checkEmail = email.includes('@' && '.com');
    const checkName = userName.length >= MINLENGHT;
    return !(checkEmail && checkName);
  }

  render() {
    const { email, userName } = this.state;
    return (
      <section className="login">
        <div className="login-header">
          <img src={ Logo } className="login-logo" alt="logo" />
          <form>
            <label htmlFor="email">
              <input
                name="email"
                id="email"
                data-testid="input-gravatar-email"
                type="email"
                placeholder="exemplo@trybe.com"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="name">
              <input
                name="userName"
                id="name"
                data-testid="input-player-name"
                type="text"
                placeholder="Nome"
                value={ userName }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="btn-play"
              onClick={ this.handleClick }
              disabled={ this.checkInput() }
              type="button"
            >
              Play
            </button>
            <button
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
            <span data-testid="settings-title"> </span>
          </form>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  setLogin: PropTypes.func,
  setToken: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  setLogin: ({ email, userName }) => dispatch(changeLogin({ email, userName })),
  // setToken: () => dispatch(getTokenThunk()),
  setToken: (payload) => dispatch(getTokenSuccess(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
