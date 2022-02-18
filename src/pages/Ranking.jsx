import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from '../actions';

class Ranking extends Component {
  playAgain = () => {
    const { history, resetScore } = this.props;
    resetScore();
    history.push('/');
  };

  render() {
    const { ranking } = this.props;
    const arraySort = ranking.sort((a, b) => b.score - a.score);
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
        {arraySort.map((player, index) => (
          <div key={ player.userName }>
            <img
              src={ `https://www.gravatar.com/avatar/${player.image}` }
              alt="Foto do jogador"
            />
            <h4 data-testid={ `player-name-${index}` }>
              {player.userName}
            </h4>
            <h4 data-testid={ `player-score-${index}` }>{player.score}</h4>
          </div>
        ))}
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  ranking: PropTypes.arrayOf(PropTypes.any),
  resetScore: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  ranking: state.player.ranking,
});

const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
