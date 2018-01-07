import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import GameBoard from './GameBoard.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.fetchGame();
    
    this.state = {
      board: [],
      player: null,
      isWinner: false,
      isTieGame: false,
      errorRetrievingData: false,
      isLoadingData: false
    };

    this.handleCellClick = this.handleCellClick.bind(this);
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
        isLoadingData: false,
        errorRetrievingData: false
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
      errorRetrievingData: false
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
      if (data.isWinner) this.setState({ isWinner: true });
      if (data.isTieGame) this.setState({ isTieGame: true });

      this.setState({
        errorRetrievingData: false,
        isLoadingData: false
      });

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

  render() {
    return (
      <div>
        {this.state.isWinner ? <span className="alert">Player {this.player} wins!</span> : null}
        {this.state.isTieGame ? <span className="alert">Tie game!</span> : null}
        {this.state.isLoadingData ? <span className="alert">Loading...</span> : null}
        {this.state.errorRetrievingData ? <span className="alert">There was an error.</span> : null}

        <GameBoard board={this.state.board} handleCellClick={this.handleCellClick} />
      </div>
    );
  }

}

export default App;
