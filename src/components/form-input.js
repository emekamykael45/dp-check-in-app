const FormInput = ({
  id,
  name,
  label,
  type,
  placeholder,
  accept,
  value,
  checked,
  inputRef,
  icon,
  iconClick,
  readOnly,
  errorMessage,
  ...rest
}) => {
  const checkBoxInputTypes = ["checkbox", "radio"];

  return (
    <div className="form_group_container">
      {!checkBoxInputTypes.includes(type) ? (
        <div className="form-group">
          {label && <label>{label}</label>}
          <div className="flex_input">
            <input
              name={name}
              type={type}
              placeholder={placeholder}
              accept={accept}
              value={value}
              className="form-control"
              readOnly={readOnly ? true : false}
              {...inputRef}
              {...rest}
            />

            {icon && iconClick && (
              <img className="icon" src={icon} alt="Icon" onClick={iconClick} />
            )}
          </div>
        </div>
      ) : (
        <div className="form-group form-check">
          <input
            className="form-check-input"
            name={name}
            type={type}
            defaultValue={value}
            checked={checked || value ? true : false}
            id={id}
            readOnly={readOnly ? true : false}
            {...inputRef}
            {...rest}
          />
          <label className="form-check-label" htmlFor={id}>
            {label}
          </label>
        </div>
      )}
      {errorMessage && <span>* {errorMessage}</span>}
    </div>
  );
};

export default FormInput;
