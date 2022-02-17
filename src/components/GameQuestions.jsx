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
      answers: [],
      correct: '',
      counter: 30,
      questionIndex: 0,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
    this.startCounter();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.counter === 1) {
      this.disableAnswer();
    }
  }

  startCounter = () => {
    const ONE_SECOND = 1000;

    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        counter: prevState.counter - 1,
      }));
    }, ONE_SECOND);
  }

  disableAnswer = () => {
    clearInterval(this.interval);
    console.log('chamou func');
    this.setState({ buttonDisabled: true });
  }

  handleClick = () => {
    const getAlternativas = [...document.getElementsByClassName('alternativas')];
    getAlternativas.forEach((alternativa) => {
      if (alternativa.id === 'correctAnwser') {
        alternativa.classList.add('correct');
      } else {
        alternativa.classList.add('incorrect');
      }
    });
    clearInterval(this.interval);
  }

  fetchQuestions = async () => {
    const RESPONSE = 3;
    const { token, setToken } = this.props;
    const getQuestions = await questionsObj(token);
    if (getQuestions.response_code === RESPONSE) {
      const results = await tokenObj();
      setToken(results);
      const newQuestions = await questionsObj(results.token);
      // console.log(newQuestions.results);
      this.setState({ results: newQuestions.results });
      this.randomAnwsers();
    } else {
      this.setState({ results: getQuestions.results });
      this.randomAnwsers();
    }
  }

  randomAnwsers = () => {
    const NUMBER = 0.5;
    const { results, questionIndex } = this.state;
    const correct = results[questionIndex].correct_answer;

    const incorrectAns = results[questionIndex]
      .incorrect_answers.map((incorret) => incorret);

    const answers = [...incorrectAns, correct];
    const randonAnswers = answers.sort(() => NUMBER - Math.random());
    this.setState({ answers: randonAnswers, correct });
  }

  render() {
    const { results,
      counter,
      answers,
      buttonDisabled,
      correct,
      questionIndex } = this.state;
    // console.log(answers);
    return (
      <section>
        <p>{ counter }</p>
        {results.length > 0 && [results[questionIndex]].map((element) => (
          <div key={ element.question }>
            <h3 data-testid="question-category">{element.category}</h3>
            <p data-testid="question-text">{element.question}</p>
            <div data-testid="answer-options">
              {answers.map((buttonAnswer, index) => (
                <button
                  id={ buttonAnswer === correct ? 'correctAnwser' : 'incorrect' }
                  className="alternativas"
                  key={ buttonAnswer }
                  type="button"
                  data-testid={ buttonAnswer === correct ? 'correct-answer'
                    : `wrong-answer-${index}` }
                  onClick={ this.handleClick }
                  disabled={ buttonDisabled }
                >
                  {buttonAnswer}

                </button>
              ))}

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
