import React from 'react';


function Bar({ style, child, handleClick = () => {} }) {
  return (
    <div className="bar" style={style}>{ child }</div>
  );
}

export default Bar;
