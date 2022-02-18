import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          onClick={ this.playAgain }
          data-testid="btn-go-home"
          type="button"
        >
          Jogar novamente

        </button>
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;
