import { ChangeEventHandler, HTMLAttributes, HTMLInputTypeAttribute, KeyboardEventHandler } from 'react';

interface Props {
  label?: string;
  name: string;
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  className?: string;
  onKeyDown?: any;
}

export default function Input({
  label,
  name,
  id,
  type,
  placeholder,
  value,
  defaultChecked,
  onChange,
  checked,
  className,
  onKeyDown,
}: Props) {
  return (
    <div className="space-x-2">
      <input
        className={className}
        onChange={onChange}
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        defaultChecked={defaultChecked}
        checked={checked}
        onKeyDown={onKeyDown}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
}
