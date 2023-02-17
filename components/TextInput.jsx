import { textBoxStyles } from "../modules/styles";

export default function TextInput({ field, value, onChange, ...attributes }) {
  return (
    <input
      name={field?.name}
      css={textBoxStyles}
      value={value}
      onChange={
        onChange ? (e) => onChange({ newValue: e.target.value || "" }) : null
      }
      {...attributes}
    />
  );
}
