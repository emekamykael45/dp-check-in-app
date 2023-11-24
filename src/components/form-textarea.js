const FormTextArea = ({
  name,
  label,
  placeholder,
  defaultValue,
  inputRef,
  onChange,
  onKeyDown,
  readOnly,
  errorMessage,
  ...rest
}) => {
  return (
    <div className="form_group_container">
      <div className="form-group">
        {label && <label>{label}</label>}
        <div className="flex_input">
          <textarea
            name={name}
            placeholder={placeholder}
            className="form-control"
            onChange={onChange}
            onKeyDown={onKeyDown}
            readOnly={readOnly ? true : false}
            {...inputRef}
            {...rest}
          >
            {defaultValue}
          </textarea>
        </div>
      </div>
      {errorMessage && <span>* {errorMessage}</span>}
    </div>
  );
};

export default FormTextArea;
