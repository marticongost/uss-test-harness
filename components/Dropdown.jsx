export default function Dropdown({ expanded, children, ...attributes }) {
  return (
    <div css={{ position: "relative" }} {...attributes}>
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
            borderBottomLeftRadius: "0.3rem",
            borderBottomRightRadius: "0.3rem",
          },
          !expanded && {
            opacity: 0,
            pointerEvents: "none",
            visibility: "hidden",
          },
        ]}
      >
        {children}
      </div>
    </div>
  );
}
