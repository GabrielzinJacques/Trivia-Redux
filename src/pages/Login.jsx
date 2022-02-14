import React, { Component } from 'react';

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
    );
  }
}

export default Login;
