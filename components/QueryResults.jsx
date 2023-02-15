import { useState } from "react";
import TableIcon from "../images/table.svg";
import JsonIcon from "../images/brackets.svg";
import MultiViewPanel from "./MultiViewPanel";

export default function QueryResults(props) {
  const [activeView, setActiveView] = useState("table");
  return (
    <MultiViewPanel
      heading="Response"
      views={{
        table: {
          label: <TableIcon />,
          title: "See results as a table",
          content: <div>Table</div>,
        },
        json: {
          label: <JsonIcon />,
          title: "See results as JSON",
          content: <div>JSON</div>,
        },
      }}
      activeView={activeView}
      onViewChange={(e) => setActiveView(e.newValue)}
      {...props}
    />
  );
}
