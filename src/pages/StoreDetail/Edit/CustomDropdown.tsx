import { useState, useEffect } from 'react';
import { D } from './CustomDropdown.style';

const hourTable = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
];

const minuteTable = ['00', '10', '20', '30', '40', '50'];

interface CustomDropdownProps {
  onClickTime: (time: string) => void;
  prevValue: string;
  type: string;
}

const CustomDropdown = (props: CustomDropdownProps) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [selectedTime, setSelectedTime] = useState(props.prevValue);
  const droptable = props.type === 'hour' ? hourTable : minuteTable;
  const onClickOption = (e: any) => {
    props.onClickTime(e.target.value);
    setSelectedTime(e.target.innerText);
    setIsDropdown(false);
  };
  const onClickSelect = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <D.Component>
      <D.SelectButton type="button" onClick={onClickSelect}>
        <D.Select>{selectedTime}</D.Select>
      </D.SelectButton>
      {isDropdown && (
        <D.Dropdown>
          {droptable.map((time) => (
            <D.Option value={time} key={time} onClick={onClickOption}>
              {time}
            </D.Option>
          ))}
        </D.Dropdown>
      )}
    </D.Component>
  );
};

export default CustomDropdown;
