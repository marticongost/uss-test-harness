export default function TextInput(props) {
  const { field, onChange, ...extraProps } = props;
  return (
    <input
      name={field.name}
      css={{
        padding: "0.6rem",
        border: "1px solid #ddd",
        borderRadius: "0.1rem",
      }}
      onChange={onChange ? (e) => onChange({ newValue: e.target.value }) : null}
      {...props}
    />
  );
}
