import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconBar from './IconBar';
import Bar from './Bar';
import SettingForm from './SettingForm';


class SettingBar extends Component {
/**
* Метод handleClickIcon вызывает функцию onHandleClickIcon которая меняет
* состояние SettingBar на противоположное (true/false) и очищает поле ввода.
*/
  handleClickIcon = () => {
    this.props.onHandleClickIcon(!this.props.store.setting_bar);
    document.querySelector('.error').innerText = '';
  }
/**
* Метод addCity добавляет город localStorage.
* Берет значение из поля ввода, после запроса проверяет
* статус запроса, если 200, то проверяет на наличие существующего города в
* списке городов.
*/
  addCity = () => {
    const city_name = document.querySelector('.input_city');
    const url = `http://api.openweathermap.org`;
    const path = `/data/2.5/weather`;
    const appId = `b1b35bba8b434a28a0be2a3e1071ae5b`;
    const query = `units=metric&lang=ru&appid=${appId}&units=default`;
    fetch(`${url}${path}?q=${city_name.value}&${query}`)
      .then(res => res.json())
      .then(data => {
        if (data.cod === 200) {
          let cities_list = JSON.parse(localStorage.getItem('cities'));
          if (cities_list.indexOf(data.name) === -1){
              cities_list.push(data.name);
              localStorage.setItem('cities', JSON.stringify(cities_list));
              document.querySelector('.error').innerText = 'город добавлен';
          } else {
            document.querySelector('.error').innerText = 'такой город уже есть';
          }
        } else {
          document.querySelector('.error').innerText = 'город не найден';
        }
    });
    city_name.value = '';
    document.querySelector('.error').innerText = '';
  }

  /**
  * Метод removeCity удаляет город из списка городов.
  * Берет все чекбоксы, после чекбоксы фильтруются и остаются только активные
  * Потом сверяется с уже существующим списком и удаляет путем фильтрации
  * отмечанные города
  */
  removeCity = () => {
    const all_cities = [].slice.call(document.getElementsByName('city'));
    const checked_cities = all_cities.filter((city) => city.checked).map((city) => city.value);
    const current_city_list = JSON.parse(localStorage.getItem('cities'));
    const new_city_list = current_city_list.filter((city) => checked_cities.indexOf(city) === -1);
    localStorage.setItem('cities', JSON.stringify(new_city_list));
  }

  render() {
    return (
      <div className="setting_bar">
        <IconBar
          handleClick={this.handleClickIcon}
          className="fa fa-cogs" />
        <Bar
          child={
            <SettingForm
              AddCity={ this.addCity }
              RemoveCity={ this.removeCity }
              cities={ this.props.cities } />
          }
          style={ this.props.store.setting_bar ? {right: '0px'} : {right: '-400px'}}
        />
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
      dispatch({ type: 'CLICK_SETTING_BAR', payload: action })
    }
  })
)(SettingBar);
