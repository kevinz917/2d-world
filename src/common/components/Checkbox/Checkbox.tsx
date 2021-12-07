import { ReactElement } from 'react';
import './Checkbox.css';

interface checkboxOwnProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox = (props: checkboxOwnProps): ReactElement => {
  const { label, checked, onChange } = props;
  return (
    <div className="checkbox-container">
      <label className="main">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="checkbox-mark" />
      </label>
      <div className="checkbox-label">{label}</div>
    </div>
  );
};

export default Checkbox;
