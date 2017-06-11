import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconBar from './IconBar';
import Bar from './Bar';


class SearchBar extends Component {
  handleClickIcon = () => {
    this.props.onHandleClickIcon(!this.props.store.search_bar);
  }

  handleSelectCity = (city) => {
    const url = `http://api.openweathermap.org`;
    const path = `/data/2.5/weather`;
    const appId = `b1b35bba8b434a28a0be2a3e1071ae5b`;
    const query = `units=metric&lang=ru&appid=${appId}&units=default`;
    fetch(`${url}${path}?q=${city}&${query}`)
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('weather', JSON.stringify(data));
        this.props.onhandleSelectCity(data);
      });
  }

  render() {
    return (
      <div className="search_bar">
        <IconBar
          handleClick={this.handleClickIcon}
          className="fa fa-bars"/>
        <Bar
          handleClick={ this.handleSelectCity }
          child={
            this.props.cities.map((city, index) =>
              <div className="col-md-6 col-sm-12" key={index}>
                <div
                  onClick={() => this.handleSelectCity(city)}
                  key={city}
                  className="city_button">{city}
                </div>
              </div>
            )
          }
          style={ this.props.store.search_bar ? {left: '0px'} : {left: '-400px'}}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    onHandleClickIcon: (action) => {
      dispatch({ type: 'CLICK_SEARCH_BAR', payload: action })
    },
    onhandleSelectCity: (city) => {
      dispatch({ type: 'SELECT_CITY', payload: city })
    }
  })
)(SearchBar);
