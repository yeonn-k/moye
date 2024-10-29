import { useState, useEffect } from 'react';
import CustomDropdown from './CustomDropdown.tsx';

interface ListTimeElementProps {
  totalLabel: string;
  inputLabel: string;
  startName: string;
  startValue: string;
  endName: string;
  endValue: string;
  onChange: (name: string, value: string) => void;
}

const ListTimeElement = (props: ListTimeElementProps) => {
  const [startHour, setStartHour] = useState(
    props.startValue.length > 2 ? props.startValue.slice(0, 2) : '',
  );
  const [startMin, setStartMin] = useState(
    props.startValue.length > 2 ? props.startValue.slice(3, 5) : '',
  );
  const [endHour, setEndHour] = useState(
    props.endValue.length > 2 ? props.endValue.slice(0, 2) : '',
  );
  const [endMin, setEndMin] = useState(
    props.endValue.length > 2 ? props.endValue.slice(3, 5) : '',
  );

  useEffect(() => {
    props.onChange(props.startName, `${startHour}:${startMin}`);
  }, [startHour, startMin]);

  useEffect(() => {
    props.onChange(props.endName, `${endHour}:${endMin}`);
  }, [endHour, endMin]);

  return (
    <li>
      <span>{props.totalLabel}</span>
      {props.inputLabel}
      <CustomDropdown
        onClickTime={setStartHour}
        prevValue={startHour}
        type="hour"
      />
      :
      <CustomDropdown
        onClickTime={setStartMin}
        prevValue={startMin}
        type="minute"
      />
      ~
      <CustomDropdown
        onClickTime={setEndHour}
        prevValue={endHour}
        type="hour"
      />
      :
      <CustomDropdown
        onClickTime={setEndMin}
        prevValue={endMin}
        type="minute"
      />
    </li>
  );
};

export default ListTimeElement;
