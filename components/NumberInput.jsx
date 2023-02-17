import { useRef } from "react";
import LeftIcon from "../images/left.svg";
import RightIcon from "../images/right.svg";
import { textBoxStyles, highlightColor } from "../modules/styles";

export default function NumberInput({
  field,
  value,
  onChange,
  min,
  max,
  step,
  cycleAround,
  ...attributes
}) {
  const ref = useRef();

  const arrowButtonStyles = {
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.1s ease",
    ":hover": {
      transform: "scale(1.2)",
    },
  };
  const arrowStyles = {
    fill: highlightColor,
    height: "1rem",
    width: "auto",
  };

  function changeValue(delta) {
    if (onChange) {
      const previousValue = ref.current.value;

      if (delta == 1) {
        ref.current.stepUp();
      } else {
        ref.current.stepDown();
      }

      if (ref.current.value != previousValue) {
        onChange({ newValue: ref.current.value, previousValue });
      } else if (cycleAround) {
        const newValue = delta == 1 ? min : max;
        if (newValue !== null && newValue !== undefined) {
          onChange({ newValue, previousValue });
        }
      }
    }
  }

  return (
    <div
      css={{
        display: "flex",
        gap: "0.2rem",
        alignItems: "center",
      }}
      {...attributes}
    >
      <button
        type="button"
        css={arrowButtonStyles}
        onClick={(e) => changeValue(-1)}
      >
        <LeftIcon css={arrowStyles} />
      </button>
      <input
        ref={ref}
        type="number"
        field={field}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        css={{
          ...textBoxStyles,
          width: "4rem",
          textAlign: "center",
          MozAppearence: "none",
          "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
        }}
      />
      <button
        type="button"
        css={arrowButtonStyles}
        onClick={(e) => changeValue(1)}
      >
        <RightIcon css={arrowStyles} />
      </button>
    </div>
  );
}
