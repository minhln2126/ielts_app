import React from 'react'
export default function Input(props) {
  let {
    id,
    value,
    type,
    name,
    error,
    placeholder,
    handleChange,
    autoComplete
  } = props;
  let className = error ? 'input-error' : '';
  placeholder = error ? error : placeholder;
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      className={className}
      onChange={handleChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />)
}