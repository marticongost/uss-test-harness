export default function TextInput({ field, onChange, ...attributes }) {
  return (
    <input
      name={field.name}
      css={{
        padding: "0.6rem",
        border: "1px solid #ddd",
        borderRadius: "0.1rem",
      }}
      onChange={
        onChange ? (e) => onChange({ newValue: e.target.value || "" }) : null
      }
      {...attributes}
    />
  );
}
