export class Field {
  constructor({ name, label, choices, visibility }) {
    this.name = name;
    this.label = label;
    this.choices = choices;
    this.visibility = visibility;
  }
}

export class FieldSet {
  constructor({ name, label, fields, visibility }) {
    this.name = name;
    this.label = label;
    this.fields = fields;
    this.visibility = visibility;
  }
}

export class BooleanField extends Field {
  constructor(props) {
    super(props);
  }
}

export class StringField extends Field {
  constructor(props) {
    super(props);
  }
}

export class IntegerField extends Field {
  constructor(props) {
    super(props);
  }
}
