import Button from "./Button";
import EditIcon from "../images/edit.svg";
import JsonIcon from "../images/brackets.svg";
import CodeEditor from "./CodeEditor";
import { useState } from "react";
import Form from "./Form";
import MultiViewPanel from "./MultiViewPanel";
import { formSchema } from "../modules/uss-form-schema";
import { ussFormToRequest } from "../modules/uss-form-adapter";
import { getDefaults } from "../modules/schema";

export default function QueryInputs(props) {
  const [formState, setFormState] = useState(getInitialFormState);
  const [requestJson, setRequestJson] = useState(() =>
    JSON.stringify(ussFormToRequest(formState), null, 2)
  );
  return (
    <MultiViewPanel
      {...props}
      heading="Request"
      views={{
        edit: {
          label: <EditIcon />,
          title: "Edit parameters",
          content: (
            <Form
              schema={formSchema}
              values={formState}
              onChange={setFormState}
            />
          ),
        },
        json: {
          label: <JsonIcon />,
          title: "Edit JSON",
          content: (
            <CodeEditor
              value={requestJson}
              onChange={(e) => setRequestJson(e.newValue)}
            />
          ),
        },
      }}
      activeView={formState.view}
      onViewChange={(e) =>
        setFormState({ ...formState, ...{ view: e.newValue } })
      }
      buttons={<Button>Send</Button>}
    />
  );
}

function getInitialFormState() {
  return { view: "edit", ...getDefaults(formSchema) };
}
