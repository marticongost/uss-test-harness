export function getDefaults(schema) {
  const defaults = {};
  function traverse(elements) {
    for (const element of elements) {
      if (element instanceof FieldSet) {
        traverse(element.fields);
      } else {
        defaults[element.name] = element.defaultValue;
      }
    }
  }
  traverse(schema);
  return defaults;
}

export const FIELDSET_CONTENT = "fieldset-content";
export const FIELDSET_HEADER = "fieldset-header";

export class Field {
  constructor({
    name,
    label,
    defaultValue,
    choices,
    visibility,
    input,
    placement,
  }) {
    this.name = name;
    this.label = label;
    if (defaultValue !== undefined) {
      this.defaultValue = defaultValue;
    }
    this.choices = choices;
    this.visibility = visibility;
    this.input = input;
    this.placement = placement || FIELDSET_CONTENT;
  }

  copy(props = null) {
    const clone = Object.assign(new this.constructor({}), this);
    if (props) {
      Object.assign(clone, props);
    }
    return clone;
  }
}

Field.prototype.defaultValue = null;

export class FieldSet {
  constructor({ name, label, fields, visibility, icon, styles }) {
    this.name = name;
    this.label = label;
    this.fields = fields;
    this.visibility = visibility;
    this.icon = icon;
    this.styles = styles;
  }
}

export class BooleanField extends Field {
  constructor(props) {
    super(props);
  }
}

BooleanField.prototype.defaultValue = false;

export class StringField extends Field {
  constructor(props) {
    super(props);
  }
}

StringField.prototype.defaultValue = "";

export class IntegerField extends Field {
  constructor(props) {
    super(props);
  }
}

IntegerField.prototype.defaultValue = 0;
