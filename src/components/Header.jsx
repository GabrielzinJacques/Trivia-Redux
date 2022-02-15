import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, userName } = this.props;
    const hashString = md5(email).toString();
    return (
      <header>
        <h2 data-testid="header-player-name">{userName}</h2>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashString}` }
          alt="Foto do jogador"
        />
        <h2 data-testid="header-score">{0}</h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  userName: state.userReducer.userName,
});

Header.propTypes = {
  email: PropTypes.string,
  userName: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
