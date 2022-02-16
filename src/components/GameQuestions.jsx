import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { questionsObj, tokenObj } from '../Services/api';
import { getTokenSuccess } from '../actions';
import '../App.css';

class GameQuestions extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  handleClick = () => {
    const getAlternativas = [...document.getElementsByClassName('alternativas')];
    console.log(getAlternativas);

    getAlternativas.forEach((alternativa) => {
      if (alternativa.id === 'correctAnwser') {
        alternativa.classList.add('correct');
      } else {
        alternativa.classList.add('incorrect');
      }
    });
  }

  fetchQuestions = async () => {
    const RESPONSE = 3;
    const { token, setToken } = this.props;
    const getQuestions = await questionsObj(token);
    if (getQuestions.response_code === RESPONSE) {
      const results = await tokenObj();
      setToken(results);
      const newQuestions = await questionsObj(results.token);
      this.setState({ results: newQuestions.results });
    } else this.setState({ results: getQuestions.results });
  }

  randomAnwsers = () => {
    const NUMBER = 0.5;
    const { results } = this.state;
    const correct = (
      <button
        id="correctAnwser"
        className="alternativas"
        key="correct"
        type="button"
        data-testid="correct-answer"
        onClick={ this.handleClick }
      >
        {results[0].correct_answer}

      </button>
    );
    const incorrectAns = results[0].incorrect_answers.map((incorret, index) => (
      <button
        className="alternativas"
        type="button"
        key={ incorret }
        data-testid={ `wrong-answer-${index}` }
        onClick={ this.handleClick }
      >
        {incorret}

      </button>
    ));
    const answers = [...incorrectAns, correct];
    const randonAnswers = answers.sort(() => NUMBER - Math.random());
    return randonAnswers;
  }

  render() {
    const { results } = this.state;
    return (
      <section>
        {results.length > 0 && [results[0]].map((element) => (
          <div key={ element.question }>
            <h3 data-testid="question-category">{element.category}</h3>
            <p data-testid="question-text">{element.question}</p>
            <div data-testid="answer-options">
              {this.randomAnwsers()}
            </div>
          </div>
        ))}
        <button
          data-testid="btn-next"
          type="button"
        >
          Próxima Pergunta

        </button>
      </section>
    );
  }
}

GameQuestions.propTypes = {
  token: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  setToken: (payload) => dispatch(getTokenSuccess(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
