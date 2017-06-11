import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import './static/css/style.css';
import SearchBar from './components/SearchBar';
import SettingBar from './components/SettingBar';
import Weather from './components/Weather';

const default_data = ["Novosibirsk", "Moscow", "Omsk", "Tomsk", "Berdsk", "Chelyabinsk"];

class App extends Component {
  componentDidMount(){
    if (this.props.store.city)
      this.currentPostion();
  }

  currentPostion() {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        const url = `http://api.openweathermap.org`;
        const path = `/data/2.5/weather`;
        const appId = `b1b35bba8b434a28a0be2a3e1071ae5b`;
        const query = `units=metric&lang=ru&appid=${appId}&units=default`;
        const coord = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
        fetch(`${url}${path}?${coord}&${query}`)
          .then(res => res.json())
          .then(data => {
            localStorage.setItem('weather', JSON.stringify(data));
            this.props.onCurrentPostion(data);
        });
      });
    }
  }

  render() {
    if (localStorage.getItem('cities') === null) {
      localStorage.setItem('cities', JSON.stringify(default_data));
    }
    if (localStorage.getItem('weather') === null) {
      localStorage.setItem('weather', JSON.stringify([]));
    }

    const cities = JSON.parse(localStorage.getItem('cities'));
    return (
      <div className="container-fluid">
        <div className="App">
          <div className="row app-row">
            <div className="col-md-3 col-sm-3 col-xs-3 left">
              <SearchBar cities={ cities } />
            </div>
            <div className="col-md-6 col-sm-6 col-xs-6 center">
            {this.props.store.city ? <Weather city={this.props.store.city} /> : this.currentPostion()}
            </div>
            <div className="col-md-3 col-sm-3 col-xs-3 right">
              <SettingBar cities={ cities } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onCurrentPostion: (city) => {
      dispatch({ type: 'SELECT_CITY', payload: city })
    }
  })
)(App);
