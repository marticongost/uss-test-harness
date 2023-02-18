import SpinnerIcon from "../images/spinner.svg";

import { keyframes } from "@emotion/react";

const spin = keyframes({
  from: {
    transform: "rotate(0)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

export default function Spinner({ ...attributes }) {
  return (
    <SpinnerIcon
      css={{
        fill: "#666",
        height: "1.4rem",
        width: "auto",
        animation: `${spin} 3s linear infinite`,
      }}
      {...attributes}
    />
  );
}
