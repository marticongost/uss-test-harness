import Button from "./Button";
import EditIcon from "../images/edit.svg";
import JsonIcon from "../images/brackets.svg";
import { JsonViewer } from "@textea/json-viewer";
import { useState } from "react";
import Form from "./Form";
import MultiViewPanel from "./MultiViewPanel";
import { formSchema } from "../modules/uss-form-schema";
import { ussFormToRequest } from "../modules/uss-form-adapter";
import { getDefaults } from "../modules/schema";
import UssQuery from "../modules/ussquery";

export default function QueryInputs({ onUssQueryCompleted, ...attributes }) {
  const [formState, setFormState] = useState(getInitialFormState);
  const [requestBody, setRequestBody] = useState(() =>
    ussFormToRequest(formState)
  );

  function handleViewChange(e) {
    setFormState({ ...formState, ...{ view: e.newValue } });
  }

  function handleFormStateChange(newState) {
    setFormState(newState);
    setRequestBody(ussFormToRequest(newState));
  }

  function handleSubmit(e) {
    fetch("/api/uss/create-search", {
      method: "POST",
      body: JSON.stringify(requestBody, null, 2),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseData) =>
        onUssQueryCompleted(new UssQuery(formState, requestBody, responseData))
      );
  }

  return (
    <MultiViewPanel
      {...attributes}
      heading="Request"
      views={{
        edit: {
          label: <EditIcon />,
          title: "Edit parameters",
          content: (
            <Form
              schema={formSchema}
              values={formState}
              onChange={handleFormStateChange}
            />
          ),
        },
        json: {
          label: <JsonIcon />,
          title: "Edit JSON",
          content: <JsonViewer value={requestBody} displayDataTypes={false} />,
        },
      }}
      activeView={formState.view}
      onViewChange={handleViewChange}
      buttons={<Button onClick={handleSubmit}>Send</Button>}
    />
  );
}

function getInitialFormState() {
  return { view: "edit", ...getDefaults(formSchema) };
}
