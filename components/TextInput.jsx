import { textBoxStyles } from "../modules/styles";

export default function TextInput({ field, onChange, ...attributes }) {
  return (
    <input
      name={field.name}
      css={textBoxStyles}
      onChange={
        onChange ? (e) => onChange({ newValue: e.target.value || "" }) : null
      }
      {...attributes}
    />
  );
}
