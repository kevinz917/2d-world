import React from 'react';
import './input.scss';

interface inputOwnProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: inputOwnProps) => {
  const { value, onChange } = props;

  return <input className="input-main" value={value} onChange={onChange} />;
};

export default Input;
