import React, { Component } from 'react';
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
