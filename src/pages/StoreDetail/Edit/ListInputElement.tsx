import { L } from './ListInputElement.style.ts';

interface ListInputElementProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ListInputElement = (props: ListInputElementProps) => {
  return (
    <li>
      <label htmlFor={props.id}>{props.label}</label>
      <div>
        <L.CustomInput
          type={props.type}
          id={props.id}
          name={props.id}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </li>
  );
};

export default ListInputElement;
