import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const THREE = 3;
    const verify = assertions < THREE;
    return (
      <section>
        <Header />
        {verify ? <p data-testid="feedback-text">Could be better...</p>
          : <p data-testid="feedback-text">Well Done!</p>}
        <div>
          {console.log(score)}
          <h3 data-testid="feedback-total-score">{score}</h3>
          <h3 data-testid="feedback-total-question">{assertions}</h3>
        </div>
      </section>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
