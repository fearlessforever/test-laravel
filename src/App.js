import React, { Component } from 'react'; 
import './App.css';

import Login from './page/login'
import Game from './page/game'
import Player from './page/player'

class App extends Component {
  state = {
    page:'login',
    accesstoken:false,
    userInfo:false,
  };
  setUserInfo(e , page=''){
    this.setState({
      userInfo:e,page:page
    })
  }
  setPage(e){
    this.setState({
      page:e
    })
  }

  render() {
    let page;
    console.log(this.state)
    switch(this.state.page){
      case 'game': page = <Game userInfo={this.state.userInfo} setPage={this.setPage.bind(this)} />; break;
      case 'player': page = <Player userInfo={this.state.userInfo} setPage={this.setPage.bind(this)} />; break;
      default: page = <Login setUser={this.setUserInfo.bind(this)} setPage={this.setPage.bind(this)} />; break;
    }
    return (
      <div className="app">
        {page}
      </div>
    );
  }
}

export default App;
