
import * as React from 'react';
import { Checkbox } from '../Checkbox';


interface ConfirmedFilterProps {
  onConfirmedChange: (confirmed: boolean) => void;
  currentValue: boolean
}

const ConfirmedFilter: React.FC<ConfirmedFilterProps> = ({ onConfirmedChange, currentValue }) => {
  const handleCheckboxChange = (value: boolean) => {

    onConfirmedChange(value);
  };

  return (
    <div className='flex gap-3 items-center min-w-fit'>
      <Checkbox label='Mostrar apenas Confirmados' id="confirmed-checkbox" onChange={(e) => handleCheckboxChange(e.target.checked)} checked={currentValue} />
    </div>
  );
};

export default ConfirmedFilter;
