import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`border rounded shadow p-4 ${className}`}>{children}</div>
);

export const CardContent = ({ children }) => <div>{children}</div>;
export const CardHeader = ({ children }) => <div className="font-bold mb-2">{children}</div>;
export const CardTitle = ({ children }) => <h2 className="text-lg">{children}</h2>;
export const CardFooter = ({ children }) => <div className="mt-4">{children}</div>;