import {
  BooleanField,
  FieldSet,
  StringField,
  IntegerField,
} from "../modules/schema";
import { EXPLORE_INTENT, inventories, SEARCH_INTENT } from "./inventories";

export const formSchema = [
  new FieldSet({
    name: "intent",
    label: "Intent",
    fields: [
      new IntegerField({
        name: "intent",
        label: "Type",
        choices: [
          {
            value: SEARCH_INTENT,
            label: "Search",
          },
          {
            value: EXPLORE_INTENT,
            label: "Explore",
          },
        ],
      }),
    ],
  }),
  new FieldSet({
    name: "locations",
    label: "Locations",
    fields: [
      new StringField({
        name: "origin",
        label: "Origin",
      }),
      new StringField({
        name: "destination",
        label: "Destination",
      }),
    ],
  }),
  new FieldSet({
    name: "dates",
    label: "Dates",
    fields: [
      new StringField({
        name: "departure",
        label: "Departure",
      }),
      new StringField({
        name: "return",
        label: "Return",
      }),
    ],
  }),
  new FieldSet({
    name: "inventories",
    label: "Inventories",
    fields: inventories.map(
      (inventory) =>
        new BooleanField({
          name: inventory.shorthand,
          label: inventory.label,
          visibility: (formState) =>
            inventory.appliesToIntent(formState.intent),
        })
    ),
  }),
  new FieldSet({
    name: "requestContext",
    label: "Request context",
    fields: [
      new StringField({
        name: "channel",
        label: "Channel",
      }),
      new BooleanField({
        name: "enhancedLogging",
        label: "Enhanced logging",
      }),
    ],
  }),
];

export const initialFormState = {
  view: "edit",
  intent: EXPLORE_INTENT,
  origin: "",
  destination: "",
  departure: "",
  return: "",
  enhancedLogging: false,
};

inventories.forEach(
  (inventory) => (initialFormState[inventory.shorthand] = true)
);
