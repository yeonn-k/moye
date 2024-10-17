interface ListInputElementProps {
  label: string;
  type: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ListInputElement = (props: ListInputElementProps) => {
  return (
    <li>
      <label htmlFor={props.id}>{props.label}</label>
      <div>
        <input
          type={props.type}
          id={props.id}
          name={props.id}
          onChange={props.onChange}
        />
      </div>
    </li>
  );
};

export default ListInputElement;
