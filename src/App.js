import React, {Component} from 'react';
import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      num1: 2,
      num2: 1,
      wrongs: 0,
      tries: 8,
      score: 0,
      restart: false,
      incorrect: false,
      response: "",
      choice: '',
      opsign: '?',
      message: '',
      level: ''
    };
  }

  render() {
    if (this.state.score === 10) {
        return this.renderWinnerScreen();
    } else if (this.state.opsign === '?' || this.state.restart === true) {
        return this.renderWelcome();
    } else if (this.state.wrongs >= this.state.tries && this.state.wrongs > 0) {
        return this.renderLoserScreen();
    } else if (this.state.opsign !== '?' && this.state.tries == 8) {
        return this.renderLevel();
    } else {
      return this.renderProblem();
    }
}

  renderLoserScreen() {
    return (
      <div>
        <div id="loser"> Sorry, you lost!</div>
        <button type="button" class="btn btn-outline-primary btn-lg" onClick = { () => this.clickRestart() }> Restart </button>
      </div>
    );
  }

  renderWinnerScreen() {
    return (
      <div>
        <div id="winner">Congrats, you won!</div>
        <button type="button" class="btn btn-outline-primary btn-lg" onClick = { () => this.clickRestart() }> Restart </button>
      </div>
    );
  }

  renderWelcome() {
    return (
    <div>
        <div id="welcome"> Are you smarter than a 5th grader?</div>
        <div> Please enter a math operation: </div>
        <ul id = "operations">
          <li> + </li>
          <li> - </li>
          <li> × </li>
          <li> ÷ </li>
        </ul>
        <input class = "field" onKeyPress={this.inputChoice} onChange = {this.updateChoice} autoFocus={true} value = {this.state.choice} />
        <div> {this.state.message} </div>
    </div>
    );
  }

  renderLevel() {
    return (
    <div>
      <div id = "level-message"> Great, now enter a level number (1-3): </div>
      <ul id = "level">
        <li> 1. First Rodeo </li>
        <li> 2. So-So </li>
        <li> 3. Zenned Shifu </li>
      </ul>
      <input class = "field" onKeyPress={this.inputLevel} onChange = {this.updateLevel} autoFocus={true} value= {this.state.level} />
      <div> {this.state.message} </div>
    </div>
    );
  }

  renderProblem() {
    return (
    <div>
        <table id = 'stats'>
          <tr>
            <th>Level: </th>
            <th>Score: </th>
            <th>Total Tries: </th>
            <th>Wrong Tries: </th>
          </tr>
          <tr>
            <td>{this.state.level} </td>
            <td>{this.state.score}</td>
            <td>{this.state.tries} </td>
            <td>{this.state.wrongs} </td>
          </tr>
        </table>
        <div className={this.state.incorrect ? "incorrect" : ""} id="problem">{this.state.num1} {this.state.opsign} {this.state.num2} </div>
        <input id = "answer" onKeyPress={this.inputAnswer} onChange={this.updateResponse} autoFocus={true} value={this.state.response} />
        <button id = "skip-but" type="button" class="btn btn-outline-primary" onClick = { () => this.clickSkip() }> Skip </button>
        <div id = "mfade"> {this.state.message} </div>
    </div>
  );
}

  inputChoice = (event) => {
    if (event.key === "Enter") {
      if (this.state.choice === '+' || this.state.choice ==='-' || this.state.choice === '*' || this.state.choice === '/') {
        this.setState(state => ({
          opsign: state.choice,
          choice: '',
          restart: false
      }));
    } else {
      this.setState({
        choice: '',
        message: 'Invalid option. Try again',
        restart: false
      });
    }}
  }

  inputLevel = (event) => {
  if (event.key === "Enter") {
    const lev = parseInt(this.state.level);
    if (lev === 1) {
      this.setState({
        tries: 5,
        message: 'Welcome. You get 5 tries and need 10 correct ones to win the game.'
      });
    } else if (lev === 2) {
      this.setState({
        tries: 2,
        message: 'Cool! You get 2 tries and need 10 correct ones to win the game.'
      });
    } else if (lev === 3) {
      this.setState({
        tries: 0,
        message: 'Please show your zen power, master! No tries and 10 to win the game.'
      });
  } else {
      this.setState({
        message: 'Invalid option. Try again.'
      });
  }}
}

  inputAnswer = (event) => {
    if (event.key === "Enter") {
        const answer = parseInt(this.state.response);
        if ((this.state.opsign === '+'& answer === this.state.num1 + this.state.num2)
          || (this.state.opsign === '-' & answer === this.state.num1 - this.state.num2)
          || (this.state.opsign === '*' & answer === this.state.num1 * this.state.num2)
          || (this.state.opsign === '/' & answer === this.state.num1 / this.state.num2))
      {
        // need to make sure num2 is divisible
        var rnum2 = Math.ceil(Math.random() * 10)
        var rnum1 = Math.ceil(Math.random() * 10)

        if (this.state.opsign === '/') {
          while (true) {
            if (rnum1 % rnum2 == 0) {
                break;
            } else {
                rnum1 = Math.ceil(Math.random() * 30)
              continue;
            }
          }
        }
        // if the answer is correct
        this.setState(state => ({
            score: state.score + 1,
            response: "",
            num1: rnum1,
            num2: rnum2,
            incorrect: false,
        }));
    } else {
        // if the answer is wrong
        this.setState( state => ({
            wrongs: state.wrongs + 1,
            response: "",
            incorrect: true,
        }));
      }
    }
  }

  updateResponse = (event) => {
      this.setState({
          response: event.target.value
      });
  }

  updateLevel = (event) => {
      this.setState({
          level: event.target.value,
      });
  }

  updateChoice = (event) => {
      this.setState({
          choice: event.target.value
      });
  }

  clickSkip = () => {
    this.setState({
      num1: Math.ceil(Math.random() * 10),
      num2: Math.ceil(Math.random() * 10),
      incorrect: false
    });
  }

  clickRestart = () => {
    this.setState ({
      restart: true,
      incorect: false,
      message: '',
      wrongs: 0,
      level: '',
      tries: 8,
      score: 0,
      num1: 2,
      num2: 1
    });
  }

}

export default App;
