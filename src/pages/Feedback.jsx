import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { reset, setRanking } from '../actions';
import './Styles/Feedback.css';

class Feedback extends Component {
  playAgain = () => {
    const { history, resetScore } = this.props;
    resetScore();
    history.push('/');
  };

  ranking = () => {
    const { history, getRanking, userName, image, score } = this.props;
    getRanking({ image, score, userName });
    history.push('/ranking');
  };

  render() {
    const { assertions, score, history } = this.props;
    console.log(history);
    const THREE = 3;
    const verify = assertions < THREE;
    const win = 'happy-santos';
    const lose = 'sad-santos';
    return (
      <>
        <Header />
        <section className={ verify ? lose : win }>
          <div className="feedback-score">
            {verify
              ? <p data-testid="feedback-text" className="feedback">Could be better...</p>
              : <p data-testid="feedback-text" className="feedback">Well Done!</p>}
            <span data-testid="feedback-total-score">{`Pontuação Total: ${score}`}</span>
            <span data-testid="feedback-total-question">
              {`Total de Acertos: ${assertions}`}
            </span>
          </div>
          <div className="feedback-buttons">
            <button
              onClick={ this.playAgain }
              data-testid="btn-play-again"
              type="button"
            >
              Jogar novamente

            </button>
            <button
              onClick={ this.ranking }
              data-testid="btn-ranking"
              type="button"
            >
              Ranking

            </button>
          </div>
        </section>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  history: PropTypes.objectOf(PropTypes.any),
  resetScore: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  image: state.player.image,
  userName: state.userReducer.userName,
});

const mapDispatchToProps = (dispatch) => ({
  getRanking: (ranking) => dispatch(setRanking(ranking)),
  resetScore: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
