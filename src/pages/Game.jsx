import React, { Component } from 'react';
import GameQuestions from '../components/GameQuestions';
import Header from '../components/Header';

export default class Game extends Component {
  render() {
    return (
      <section>
        <Header />
        <GameQuestions />
        {/* <button
          type="button"
          onClick={ () => this.props.history.push('/feedBack') }
        >
          feedback
        </button> */}
      </section>
    );
  }
}
