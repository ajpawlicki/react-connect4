import React, {Component} from 'react';

import GameBoard from './GameBoard.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      board: [],
      player: 1,
      isWinner: false,
      isTieGame: false,
      isInvalidMove: false,
      isLoadingData: false,
      errorRetrievingData: false,
    };

    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleRestartButtonClick = this.handleRestartButtonClick.bind(this);
  }
  
  fetchGame() {
    this.setState({
      isLoadingData: true,
      errorRetrievingData: false
    });

    fetch('fetchGame')
    .then(res => res.json())
    .then(data => {
      this.setState({
        board: data.board,
        player: data.player,
        isWinner: data.isWinner,
        isTieGame: data.isTieGame,
        isLoadingData: false,
      });
    })
    .catch(err => {
      console.error(err);

      this.setState({
        errorRetrievingData: true,
        isLoadingData: false
      });
    });
  }

  handleCellClick(col) {
    if (this.state.isWinner || this.state.isTieGame) return;

    this.setState({
      isLoadingData: true,
      errorRetrievingData: false,
      isInvalidMove: false
    });

    fetch('postMove', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ col: col })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error === 'Invalid move.') this.setState({ isInvalidMove: true });

      this.setState({ isLoadingData: false });

      this.fetchGame();
    })
    .catch(err => {
      console.error(err);

      this.setState({
        errorRetrievingData: true,
        isLoadingData: false
      });
    });
  }

  handleRestartButtonClick() {
    this.setState({
      isLoadingData: true,
      isWinner: false,
      isTieGame: false,
      errorRetrievingData: false,
      isInvalidMove: false
    });

    fetch('restartGame', { method: 'PUT' })
    .then(res => {
      this.setState({ isLoadingData: false });

      this.fetchGame();
    })
    .catch(err => {
      console.error(err);

      this.setState({
        isLoadingData: false,
        errorRetrievingData: true
      });
    });
  }

  componentDidMount() {
    this.fetchGame();
  }

  render() {
    return (
      <div>
        <div className="header-container">
          <h2>Connect Four</h2>
          
          <div className="header-col-1">
            <h4>{!this.state.isWinner && !this.state.isTieGame ? `Player ${this.state.player}'s turn` : 'Game over'}</h4>
            <span className="restart-button" onClick={this.handleRestartButtonClick}>Restart</span>
          </div>

          <div className="header-col-2">
            <i className={`fa fa-futbol-o fa-3x player-${this.state.player}`} aria-hidden="true"></i>
          </div>
        </div>

        <GameBoard board={this.state.board} handleCellClick={this.handleCellClick} />

        <div className="footer-container">
          {this.state.isWinner ? <span className="alert">Player {this.state.player} <i className={`fa fa-futbol-o fa-1x player-${this.state.player}`} aria-hidden="true"></i> wins!</span> : null}
          {this.state.isTieGame ? <span className="alert">Tie game!</span> : null}
          {this.state.isInvalidMove ? <span className="alert">Invalid move.</span> : null}
          {this.state.isLoadingData ? <i className="fa fa-spinner fa-spin fa-2x fa-fw"></i> : null}
          {this.state.errorRetrievingData ? <span className="alert">There was an error.</span> : null}
        </div>
      </div>
    );
  }

}

export default App;
