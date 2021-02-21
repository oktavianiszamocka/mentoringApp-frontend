import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';

const DatePickerInput = ({
  name,
  form: { setFieldValue },
  field: { value },
  fieldSet,
  labelField,
}) => (
  <DatePicker
    name={name}
    keyboard
    clearable
    autoOk
    label={labelField}
    format="dd/MM/yyyy"
    placeholder="10/10/2018"
      // handle clearing outside => pass plain array if you are not controlling value outside
    mask={(value) => (value
      ? [/[0-3]/, /\d/, '/', /0|1/, /\d/, '/', /1|2/, /\d/, /\d/, /\d/]
      : [])}
    disableOpenOnEnter
    onChange={(value) => {
      setFieldValue(fieldSet, value);
    }}
    value={value}
    animateYearScrolling={false}
  />
);

export default DatePickerInput;
