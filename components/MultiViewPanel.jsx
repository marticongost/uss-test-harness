import Switch from "./Switch";
import { sideMargin } from "../modules/styles";

export default function MultiViewPanel({
  heading,
  children,
  views,
  activeView,
  onViewChange,
  buttons,
  ...attributes
}) {
  return (
    <section
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
      {...attributes}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          backgroundImage: "linear-gradient(to bottom, white, #e5e5e5)",
          padding: `0.8rem ${sideMargin}`,
          gap: "1rem",
          minHeight: "5rem",
          button: {
            height: "2.2rem",
          },
        }}
      >
        <h1
          css={{
            fontSize: "1.3rem",
            margin: 0,
            marginRight: "auto",
            color: "#333",
          }}
        >
          {heading}
        </h1>
        <Switch
          value={activeView}
          items={Object.entries(views).map(([value, item]) => {
            return { ...item, value };
          })}
          onChange={onViewChange}
        />
        {buttons}
      </div>
      <div
        css={{
          padding: sideMargin,
          flex: "1 1 auto",
          overflow: "auto",
        }}
      >
        {views[activeView]?.content}
      </div>
    </section>
  );
}
