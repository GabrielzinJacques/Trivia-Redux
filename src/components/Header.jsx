import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFeedBack } from '../actions';
import './Styles/Header.css';
import Logo from '../trivia.png';

class Header extends Component {
  componentDidMount() {
    const { setFeedBack, email, score } = this.props;
    const image = md5(email).toString();
    setFeedBack({ image, score });
  }

  render() {
    const { userName, image, score } = this.props;
    return (
      <header>
        <div className="header-logo">
          <img className="game-logo" src={ Logo } alt="trivia-logo" />
        </div>
        <div className="user-infos">
          <div className="divisor" />
          <div className="score-box">
            <span data-testid="header-player-name">{`Player: ${userName}`}</span>
            <h4 className="header-score">
              Pontuação Total:
              <span
                data-testid="header-score"
              >
                {score}
              </span>
            </h4>
          </div>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${image}` }
            alt="Foto do jogador"
          />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  userName: state.userReducer.userName,
  score: state.player.score,
  image: state.player.image,
});

const mapDispatchToProps = (dispatch) => ({
  setFeedBack: ({ image, score }) => dispatch(getFeedBack({ image, score })),
});

Header.propTypes = {
  email: PropTypes.string,
  userName: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
