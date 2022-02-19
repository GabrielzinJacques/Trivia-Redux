import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decode } from 'he';
import { questionsObj, tokenObj } from '../Services/api';
import { getScore, getTokenSuccess } from '../actions';
import './Styles/GameQuestions.css';

class GameQuestions extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      answers: [],
      correct: '',
      counter: 30,
      questionIndex: 0,
      enableNext: false,
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

  componentWillUnmount() {
    clearInterval(this.interval);
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
    this.setState({ buttonDisabled: true });
  }

  handleStateButton = () => {
    this.setState((prev) => ({ enableNext: !prev.enableNext }));
  }

  buttonNext = () => {
    const { history } = this.props;
    const { questionIndex } = this.state;
    const MAX_QUESTION = 4;
    this.setState({ counter: 30 });
    if (questionIndex !== MAX_QUESTION) {
      this.startCounter();
      this.setState((prevState) => (
        { questionIndex: prevState.questionIndex + 1 }
      ), () => {
        this.randomAnwsers();
        this.handleStateButton();
      });
    } else history.push('/feedback');
  }

  handleClick = ({ target }) => {
    const { results, questionIndex } = this.state;
    const { setScore } = this.props;
    const getAlternativas = [...document.getElementsByClassName('alternativas')];
    this.handleStateButton();
    if (target.id === 'correctAnwser') {
      setScore(this.sum(results[questionIndex].difficulty));
    }
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
    this.setState({ answers: randonAnswers,
      correct,
    });
  }

  sum = (difficulty) => {
    const { counter } = this.state;
    const PONTO = 10;
    const points = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    return PONTO + (counter * points[difficulty]);
  }

  render() {
    const { results,
      counter,
      answers,
      buttonDisabled,
      correct,
      questionIndex,
      enableNext,
    } = this.state;

    return (
      <section className="game-container">
        <div className="game-content">
          {results.length > 0 && [results[questionIndex]].map((element) => (
            <div key={ element.question }>
              <div className="question-category">
                <span>Category:</span>
                <span
                  data-testid="question-category"
                >
                  {`${element.category}`}
                </span>
              </div>
              <div className="questions-container">
                <p data-testid="question-text">{decode(element.question)}</p>
              </div>
              <div
                data-testid="answer-options"
                className="answer-container"
              >
                {answers.map((buttonAnswer, index) => {
                  const indexSum = index + 1;
                  return (
                    <button
                      id={ buttonAnswer === correct ? 'correctAnwser' : 'incorrect' }
                      className="alternativas answers-content"
                      key={ buttonAnswer }
                      type="button"
                      data-testid={ buttonAnswer === correct ? 'correct-answer'
                        : `wrong-answer-${index}` }
                      onClick={ this.handleClick }
                      disabled={ buttonDisabled }
                    >
                      {`${indexSum} - ${buttonAnswer}`}

                    </button>
                  );
                })}
                { enableNext
                     && (
                       <button
                         onClick={ this.buttonNext }
                         data-testid="btn-next"
                         type="button"
                         id="next-button"
                       >
                         Next
                       </button>)}

                <div className="timer-container">
                  <p>{`Timer: ${counter}s`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="side-image" />
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
  setScore: (score) => dispatch(getScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
