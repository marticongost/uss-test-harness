import { BooleanField, Field, FieldSet, StringField } from "../modules/schema";
import { highlightColor, subtleLineColor } from "../modules/styles";
import { cloneElement } from "../modules/utils";
import OnOffSwitch from "./OnOffSwitch";
import Switch from "./Switch";
import TextInput from "./TextInput";

const fieldSpacing = "0.5rem";

export class DynamicFieldInput {
  constructor(renderInput) {
    this.renderInput = renderInput;
  }
}

// Default input widget for each field type
BooleanField.prototype.defaultInput = OnOffSwitch;
StringField.prototype.defaultInput = TextInput;

// Default input widget for fields with closed options
Field.prototype.defaultChoicesInput = new DynamicFieldInput((field) => (
  <Switch items={field.choices} />
));

export default function Form({ schema, values, onChange, ...attributes }) {
  function renderFormElement(element, depth) {
    // Some parts of the schema might decree they should only be visible depending
    // on the state of other fields. F. eg. using this feature one might hide a
    // numberOfBeers field if the customerAge field is < 18.
    if (element.visibility && !element.visibility(values)) {
      return null;
    }

    if (element instanceof FieldSet) {
      const childrenDepth = depth + 1;
      return (
        <FormFieldSet key={element.name} fieldSet={element} depth={depth}>
          {element.fields.map((child) =>
            renderFormElement(child, childrenDepth)
          )}
        </FormFieldSet>
      );
    } else if (element instanceof Field) {
      return (
        <FormField
          key={element.name}
          field={element}
          input={renderFieldInput(element)}
        />
      );
    }
  }

  function renderFieldInput(field) {
    const inputProps = {
      field: field,
      value: values[field.name],
      onChange: (e) => {
        onChange({ ...values, ...{ [field.name]: e.newValue } });
      },
    };

    let input = field.input;
    if (!input) {
      input = field.choices ? field.defaultChoicesInput : field.defaultInput;
    }

    // Input set to a custom renderer: invoke it, passing it the field
    if (input instanceof DynamicFieldInput) {
      input = input.renderInput(field);
    }

    // Input set to a component type: create a new instance
    if (typeof input == "function") {
      const InputType = input;
      return <InputType {...inputProps} />;
    }
    // Input set to an instance of a component
    else {
      return cloneElement(input, inputProps);
    }
  }

  return (
    <form
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "2rem",
      }}
      {...attributes}
    >
      {schema.map((element) => renderFormElement(element, 0))}
    </form>
  );
}

function FormFieldSet({ fieldSet, depth, children, ...attributes }) {
  console.log(fieldSet.name, depth);
  const topLevel = depth === 0;
  return (
    <div
      css={
        topLevel
          ? {
              padding: "1rem",
              border: "1px solid #e5e5e5",
              boxShadow: "0 0 0.5rem rgba(0,0,0,0.1)",
            }
          : { marginTop: "1rem" }
      }
      {...attributes}
    >
      <div
        css={[
          {
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: 0,
            fontWeight: "bold",
            marginBottom: "1rem",
          },
          topLevel
            ? {
                color: "#333",
                fontSize: "1.2rem",
              }
            : {
                color: highlightColor,
                paddingBottom: "0.5rem",
                borderBottom: `1px solid ${subtleLineColor}`,
                fontSize: "1.1rem",
              },
        ]}
      >
        {fieldSet.icon ? (
          <fieldSet.icon
            css={{
              height: "1.2rem",
              width: "auto",
              marginRight: "0.5rem",
              fill: highlightColor,
            }}
          />
        ) : null}
        {fieldSet.label}
      </div>
      <div
        css={{
          marginTop: "0.4rem",
          display: "flex",
          flexDirection: "column",
          gap: fieldSpacing,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function FormField({ field, input, ...attributes }) {
  const fieldId = `field-${field.name}`;
  return (
    <div css={{ display: "flex", alignItems: "baseline" }} {...attributes}>
      <label
        htmlFor={fieldId}
        css={{ display: "table-cell", paddingRight: "1rem", width: "10rem" }}
        title={field.title}
      >
        {field.label}
      </label>
      {cloneElement(input, {
        id: fieldId,
        css: { flex: "1 1 auto" },
      })}
    </div>
  );
}
