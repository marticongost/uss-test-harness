import { useState } from "react";
import TableIcon from "../images/table.svg";
import JsonIcon from "../images/brackets.svg";
import MultiViewPanel from "./MultiViewPanel";
import UssResponseInspector from "./UssResponseInspector";
import { JsonViewer } from "@textea/json-viewer";
import Spinner from "./Spinner";

export default function QueryResults({
  ussQuery,
  ussQueryInProgress,
  ...attributes
}) {
  const [activeView, setActiveView] = useState("table");
  return (
    <MultiViewPanel
      heading="Response"
      views={
        ussQuery &&
        !ussQueryInProgress && {
          table: {
            label: <TableIcon />,
            title: "See results as a table",
            content: <UssResponseInspector ussQuery={ussQuery} />,
          },
          json: {
            label: <JsonIcon />,
            title: "See results as JSON",
            content: (
              <JsonViewer
                value={ussQuery.response.data}
                displayDataTypes={false}
              />
            ),
          },
        }
      }
      activeView={activeView}
      onViewChange={(e) => setActiveView(e.newValue)}
      {...attributes}
    >
      {ussQueryInProgress ? <UssQueryInProgressIndicator /> : false}
    </MultiViewPanel>
  );
}

function UssQueryInProgressIndicator({ ...attributes }) {
  return (
    <div
      {...attributes}
      css={{
        fontSize: "1.1rem",
        color: "#666",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        width: "100%",
        height: "100%",
      }}
    >
      <Spinner />
      Loading results...
    </div>
  );
}
