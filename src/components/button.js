import Loader from "./loader";
import Icon from "../assets/svg";

const Button = ({
  className,
  btnStyle,
  text,
  leftIcon,
  rightIcon,
  loading,
  secondaryLoader,
  disabled,
  onClick,
  ...rest
}) => (
  <button
    className={`button_component btn ${className ? className : "btn_primary"} ${
      loading && "loading"
    }`}
    style={btnStyle}
    onClick={onClick}
    disabled={disabled}
    {...rest}
  >
    {loading ? (
      <Loader white={secondaryLoader ? false : true} />
    ) : (
      <>
        {leftIcon && (
          <span className="left_icon">
            <Icon name={leftIcon} />
          </span>
        )}
        {text}
        {rightIcon && (
          <span className="right_icon">
            <Icon name={rightIcon} />
          </span>
        )}
      </>
    )}
  </button>
);

export default Button;
