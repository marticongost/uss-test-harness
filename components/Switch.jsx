import { useState } from "react";

export default function Switch({
  field,
  value,
  items,
  onChange,
  ...attributes
}) {
  return (
    <div
      role="listbox"
      css={{
        display: "flex",
      }}
      {...attributes}
    >
      {items.map((item, index) => {
        function handleClick(e) {
          if (onChange) {
            onChange({ newValue: item.value });
          }
        }
        return (
          <button
            key={item.value}
            type="button"
            role="option"
            aria-selected={value == item.value ? "true" : "false"}
            value={item.value}
            title={item.title}
            onClick={handleClick}
            appearence={value == item.value ? "primary" : "secondary"}
            css={[
              {
                flex: "1 1 auto",
                padding: "0.5rem 1rem",
                color: "white",
                border: "none",
                borderRadius: "0.3rem",
                fontSize: "1rem",
                "&[aria-selected='false']": {
                  cursor: "pointer",
                  backgroundImage: "linear-gradient(to bottom, #999, #777)",
                  boxShadow: "0 0 0.3rem #444 inset",
                  color: "#eee",
                  svg: {
                    fill: "#eee",
                  },
                  ":hover": {
                    backgroundImage: "linear-gradient(to bottom, #aaa, #888)",
                  },
                },
                "&[aria-selected='true']": {
                  backgroundImage: "linear-gradient(to bottom, #444, #222)",
                  boxShadow: "0 0 0.3rem #111 inset",
                  fontWeight: "bold",
                  textShadow: "0 0 0.3rem black",
                },
                svg: {
                  height: "1rem",
                  width: "auto",
                  fill: "white",
                },
              },
              index > 0 && {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              },
              index < items.length - 1 && {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            ]}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
