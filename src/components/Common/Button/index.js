import "./style.css";

const Button = ({ text, onClick, outlined ,mode}) => {
  return <div className={outlined ? "outlined-btn outlined-"+{mode} : "btn" } onClick={()=> onClick()}>{text}</div>;
};
export default Button;
