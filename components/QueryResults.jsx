import { useState } from "react";
import TableIcon from "../images/table.svg";
import JsonIcon from "../images/brackets.svg";
import MultiViewPanel from "./MultiViewPanel";
import UssResponseInspector from "./UssResponseInspector";
import CodeEditor from "./CodeEditor";

export default function QueryResults({ ussQuery, ...attributes }) {
  const [activeView, setActiveView] = useState("table");
  return (
    <MultiViewPanel
      heading="Response"
      views={
        ussQuery && {
          table: {
            label: <TableIcon />,
            title: "See results as a table",
            content: <UssResponseInspector ussQuery={ussQuery} />,
          },
          json: {
            label: <JsonIcon />,
            title: "See results as JSON",
            content: <CodeEditor value={ussQuery.response.getJsonString()} />,
          },
        }
      }
      activeView={activeView}
      onViewChange={(e) => setActiveView(e.newValue)}
      {...attributes}
    />
  );
}
