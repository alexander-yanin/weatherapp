import React from 'react';


function IconBar({ className, handleClick }) {
  return (
    <div className="wrap_icon">
      <i
        onClick={handleClick}
        className={className}
        aria-hidden="true"></i>
    </div>
  );
}

export default IconBar;
