import { useEffect, useRef, useState } from "react";
import ChevronDownIcon from "../images/chevron-down.svg";
import { highlightColor, textBoxStyles } from "../modules/styles";
import { createElement } from "../modules/utils";
import Dropdown from "./Dropdown";

export default function DropdownInput({
  field,
  value,
  onChange,
  input,
  label,
  ...attributes
}) {
  const ref = useRef();
  const [expanded, setExpanded] = useState(false);

  // Close the dropdown when clicking anywhere else in the document
  useEffect(() => {
    const listener = document.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setExpanded(false);
      }
    });
    return () => document.removeEventListener("click", listener);
  }, []);

  function handleChange(e) {
    if (onChange) {
      onChange(e);
    }
    setExpanded(false);
  }

  return (
    <div
      ref={ref}
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
      <Dropdown expanded={expanded}>
        {createElement(input, { field, value, onChange: handleChange })}
      </Dropdown>
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
