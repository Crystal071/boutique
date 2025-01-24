import React from 'react';

export const Select = ({ children, value, onValueChange }) => (
  <select value={value} onChange={(e) => onValueChange(e.target.value)} className="border rounded p-2 w-full">
    {children}
  </select>
);

export const SelectContent = ({ children }) => <>{children}</>;
export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);
export const SelectTrigger = ({ children }) => <>{children}</>;
export const SelectValue = ({ placeholder }) => <option value="">{placeholder}</option>;