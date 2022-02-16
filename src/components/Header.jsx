import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFeedBack } from '../actions';

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
        <h2 data-testid="header-player-name">{userName}</h2>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${image}` }
          alt="Foto do jogador"
        />
        <h2 data-testid="header-score">{score}</h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  userName: state.userReducer.userName,
  score: state.header.score,
  image: state.header.image,
});

const mapDispatchToProps = (dispatch) => ({
  setFeedBack: ({ image, score }) => dispatch(getFeedBack({ image, score })),
});

Header.propTypes = {
  email: PropTypes.string,
  userName: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
