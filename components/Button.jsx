import { highlightColor } from "../modules/styles";

const commonStyles = {
  padding: "0.5rem 1rem",
  color: "white",
  border: "none",
  borderRadius: "0.3rem",
  fontSize: "1rem",
  cursor: "pointer",
  svg: {
    height: "1rem",
    width: "auto",
    fill: "white",
  },
};

const appearences = {
  primary: {
    backgroundImage: `linear-gradient(to bottom, #37a, ${highlightColor})`,
    boxShadow: "0 0 0.2rem #136 inset",
    fontWeight: "bold",
    textShadow: "0 0 0.8rem rgba(0,0,0,0.2)",
    ":hover": {
      backgroundImage: "linear-gradient(to bottom, #37a, #248)",
    },
  },
  secondary: {
    backgroundImage: "linear-gradient(to bottom, #6ae, #58d)",
    boxShadow: "0 0 0.3rem #24a inset",
    ":hover": {
      backgroundImage: "linear-gradient(to bottom, #59c, #248)",
    },
  },
};

export default function Button({ appearence, children, ...attributes }) {
  return (
    <button
      type="button"
      {...attributes}
      css={[commonStyles, appearences[appearence || "primary"]]}
    >
      {children}
    </button>
  );
}
