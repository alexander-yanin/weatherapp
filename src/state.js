import { createStore } from 'redux';


function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_CITY':
      return {...state, ...{
        'city': action.city,
      }};
    default:
      return state;
  }
}


const store = createStore(reducer, {
  'city': null
});


export default store;
