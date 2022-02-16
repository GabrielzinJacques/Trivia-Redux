import React, { Component } from 'react';
import Header from '../components/Header';

export default class Game extends Component {
  render() {
    return (
      <section>
        <Header />
        <button
          type="button"
          onClick={ () => this.props.history.push('/feedBack') }
        >
          feedback
        </button>
      </section>
    );
  }
}
