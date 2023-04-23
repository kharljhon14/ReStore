import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

interface Props {
  label?: string;
  name: string;
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function Input({ label, name, id, type, placeholder, value, defaultChecked, onChange }: Props) {
  return (
    <div className="space-x-2">
      <input
        onChange={onChange}
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        defaultChecked={defaultChecked}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
}
