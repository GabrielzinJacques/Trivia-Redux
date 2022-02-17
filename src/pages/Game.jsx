import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameQuestions from '../components/GameQuestions';
import Header from '../components/Header';

export default class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <section>
        <Header />
        <GameQuestions history={ history } />
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;
