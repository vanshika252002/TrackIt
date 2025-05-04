import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Eye, EyeClosed } from 'lucide-react';
import './forminput.css';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  enableToggle?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  onChange,
  value,
  showPassword,
  setShowPassword,
  enableToggle,
}) => {
  const isPasswordField = type === 'password';

  return (
    <div className="form-group">
      <div className="label-with-aestrick">
        <label htmlFor={name}>{label}</label>
        <label style={{ color: 'red' }}>*</label>
      </div>

      {isPasswordField && enableToggle ? (
        <div className="input-wrapper">
          <Field
            type={showPassword ? 'text' : 'password'}
            name={name}
            id={name}
            as="input"
            onChange={onChange}
            value={value}
            className="form-input"
          />
          <span
            className="eye-toggle-icon"
            onClick={() => setShowPassword?.(!showPassword)}
          >
            {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
          </span>
        </div>
      ) : (
        <Field
          type={type}
          name={name}
          id={name}
          as="input"
          onChange={onChange}
          value={value}
          className="form-input"
        />
      )}

      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default FormInput;
