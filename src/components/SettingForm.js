import React from 'react';


function SettingForm({ cities, AddCity, RemoveCity }) {
  return (
    <div className="row">
      <div className='col-md-12'>
        <div className='add_form'>
          <input type='text' placeholder='введите название города' className='input_city' />
          <button
            onClick={ AddCity }
            className='add_city'>добавить</button>
          <label className="error"></label>
        </div>
      </div>
      <div className='col-md-12 del_form'>
        <div className="remove_form">
          {
            cities.map((city, index) => (
              <div key={ index } className='col-md-6 col-sm-6 item'>
                <input className='chbox' type='checkbox' name='city' value={ city } />
                <label>{ city }</label>
              </div>
            ))
          }
          <div className='col-md-12'>
            <button
              onClick={ RemoveCity }
              className='del_button'>удалить</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SettingForm;
