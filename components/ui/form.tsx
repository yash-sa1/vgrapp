import React from 'react';

export const Input = ({ ...props }) => {
  return <input {...props} />;
};

import { ReactNode } from 'react';

export const Button = ({ children, ...props }: { children: ReactNode }) => {
  return <button {...props}>{children}</button>;
};