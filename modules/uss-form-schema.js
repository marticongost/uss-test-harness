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
        defaultValue: EXPLORE_INTENT,
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
        new FieldSet({
          name: inventory.shorthand,
          label: inventory.label,
          icon: inventory.icon,
          visibility: (formState) =>
            inventory.appliesToIntent(formState.intent),
          fields: [
            new BooleanField({
              name: inventory.shorthand,
              label: "Enabled",
              defaultValue: true,
            }),
            ...inventory.inventoryOptions
              .map((option) =>
                option.schema.map((element) =>
                  element.copy({
                    visibility: (formState) => formState[inventory.shorthand],
                  })
                )
              )
              .flat(),
          ],
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
