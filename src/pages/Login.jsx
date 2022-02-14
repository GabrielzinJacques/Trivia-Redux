import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeLogin, getTokenThunk } from '../actions';
import logo from '../trivia.png';
import '../App.css';

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

  handleClick = () => {
    const { email, userName } = this.state;
    const { setLogin, setToken, history } = this.props;
    history.push('/game');
    setLogin({ email, userName });
    setToken();
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
      <div className="App">
        <section className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <section>
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
          </section>
        </section>
      </div>
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
  setToken: () => dispatch(getTokenThunk()),
});

export default connect(null, mapDispatchToProps)(Login);
