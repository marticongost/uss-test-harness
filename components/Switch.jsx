import { optionStyles, selectedOptionStyles } from "../modules/styles";

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
                border: "none",
                borderRadius: "0.3rem",
                fontSize: "1rem",
                "&[aria-selected='false']": optionStyles,
                "&[aria-selected='true']": selectedOptionStyles,
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
