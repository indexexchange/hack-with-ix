import React from 'React'

export default function Pill(props) {
  const {label, active} = props;

  let style = {
    borderRadius: 100,
    border: "1px solid #fff",
    color: "#eee",
    padding: "10px 20px",
    margin: 10,
  };
  if(active) {
    style = {
      ...style,
      backgroundColor: "#fff",
      color: "#111",
    };
  }

  return <div style={style} {...props}>{label}</div>
}