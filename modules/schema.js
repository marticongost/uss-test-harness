export class Field {
  constructor({ name, label, choices, visibility, input }) {
    this.name = name;
    this.label = label;
    this.choices = choices;
    this.visibility = visibility;
    this.input = input;
  }
}

export class FieldSet {
  constructor({ name, label, fields, visibility, icon }) {
    this.name = name;
    this.label = label;
    this.fields = fields;
    this.visibility = visibility;
    this.icon = icon;
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
