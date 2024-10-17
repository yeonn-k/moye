import { ESD } from './EditStoreDetail';

interface ListTimeElementProps {
  totalLabel: string;
  inputLabel: string;
  type: string;
  min: number;
  max: number;
  startName: string;
  endName: string;
  startValue: string;
  endValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ListTimeElement = (props: ListTimeElementProps) => {
  return (
    <li>
      <span>{props.totalLabel}</span>
      <div>
        {props.inputLabel}&nbsp;
        <ESD.TimeInput
          type={props.type}
          min={props.min}
          max={props.max}
          name={props.startName}
          value={props.startValue}
          onChange={props.onChange}
        />{' '}
        시 ~&nbsp;
        <ESD.TimeInput
          type={props.type}
          min={props.min}
          max={props.max}
          name={props.endName}
          value={props.endValue}
          onChange={props.onChange}
        />{' '}
        시
      </div>
    </li>
  );
};

export default ListTimeElement;
