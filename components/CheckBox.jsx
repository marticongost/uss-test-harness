import { highlightColor, subtleLineColor } from "../modules/styles";

export default function CheckBox({ field, value, onChange, ...attributes }) {
  function handleChange(e) {
    if (onChange) {
      onChange({ newValue: e.currentTarget.checked });
    }
  }
  return (
    <input
      type="checkbox"
      checked={!!value}
      css={{
        position: "relative",
        display: "inline-block",
        height: "1.3rem",
        width: "1.3rem",
        appearance: "none",
        MozAppearance: "none",
        WebkitAppearance: "none",
        border: "2px solid #999",
        borderRadius: "0.3rem",
        backgroundColor: "white",
        cursor: "pointer",
        ":after": {
          content: "'✔'",
          position: "absolute",
          left: "0.1rem",
          top: "0rem",
          fontSize: "1rem",
          color: "#666",
          opacity: 0,
          transition: "opacity 0.1s linear",
        },
        ":checked:after": {
          opacity: 1,
        },
        ":hover": {
          borderColor: highlightColor,
        },
      }}
      {...attributes}
      onChange={handleChange}
    />
  );
}
