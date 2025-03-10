import React from 'react';

export const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`py-2 px-4 rounded ${className}`}>
    {children}
  </button>
);