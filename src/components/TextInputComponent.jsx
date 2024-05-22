import { Grid, TextField, Alert } from "@mui/material";
import propTypes from "prop-types";

const TextInputComponent = ({
  xs,
  sm,
  id,
  label,
  autoFocus,
  value,
  onChange,
  onBlur,
  errors,
  required,
  type,
}) => {
  return (
    <Grid item xs={xs} sm={sm}>
      <TextField
        name={id}
        fullWidth
        required={required}
        id={id}
        label={label}
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
      />
      {errors && <Alert severity="error">{errors}</Alert>}
    </Grid>
  );
};

TextInputComponent.prototype = {
  xs: propTypes.number,
  sm: propTypes.number,
  id: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  autoFocus: propTypes.bool,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  onBlur: propTypes.func,
  errors: propTypes.string,
  required: propTypes.bool,
  type: propTypes.string,
};

TextInputComponent.defaultProps = {
  xs: 6,
  autoFocus: false,
};

export default TextInputComponent;
