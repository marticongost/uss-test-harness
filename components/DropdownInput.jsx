import { useState } from "react";
import ChevronDownIcon from "../images/chevron-down.svg";
import { highlightColor, textBoxStyles } from "../modules/styles";
import { createElement } from "../modules/utils";

export default function DropdownInput({
  field,
  value,
  onChange,
  input,
  label,
  ...attributes
}) {
  const [expanded, setExpanded] = useState(false);

  function handleChange(e) {
    if (onChange) {
      onChange(e);
    }
    setExpanded(false);
  }

  return (
    <div
      css={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
      {...attributes}
    >
      <button
        type="button"
        css={{
          ...textBoxStyles,
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          cursor: "pointer",
          ":hover": {
            borderColor: highlightColor,
          },
        }}
        onClick={(e) => setExpanded(!expanded)}
      >
        {createElement(label || Label, { value, css: { flex: "1 1 auto" } })}
        <ChevronDownIcon
          css={{ height: "0.5rem", width: "auto", fill: "#333" }}
        />
      </button>
      <div css={{ position: "relative" }}>
        <div
          css={[
            {
              position: "absolute",
              zIndex: 1000,
              opacity: 1,
              transition: "opacity 0.2s ease",
              boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
              backgroundColor: "white",
              border: "1px solid #ddd",
              padding: "1rem",
              borderBottomLeftRadius: "0.3rem",
              borderBottomRightRadius: "0.3rem",
            },
            !expanded && { opacity: 0, pointerEvents: "none" },
          ]}
        >
          {createElement(input, { field, value, onChange: handleChange })}
        </div>
      </div>
    </div>
  );
}

function Label({ value, ...attributes }) {
  return (
    <div {...attributes}>
      {value !== null && value !== undefined ? value.toString() : null}
    </div>
  );
}
