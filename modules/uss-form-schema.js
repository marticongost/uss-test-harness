import CheckBox from "../components/CheckBox";
import FlexibleDateDropdownInput from "../components/FlexibleDateDropdownInput";
import OriginAutocomplete from "../components/OriginAutocomplete";
import DestinationAutocomplete from "../components/OriginAutocomplete";
import {
  BooleanField,
  Field,
  FieldSet,
  StringField,
  IntegerField,
  FIELDSET_HEADER,
} from "../modules/schema";
import { anytime } from "./dates";
import { EXPLORE_INTENT, inventories, SEARCH_INTENT } from "./inventories";
import {
  GEO_LEVEL_COUNTRY,
  GEO_LEVEL_LOCAL,
  GEO_LEVEL_POI,
  GEO_LEVEL_REGION,
} from "./uss-geolevels";

export const formSchema = [
  new FieldSet({
    name: "intent",
    label: "Intent",
    fields: [
      new IntegerField({
        name: "intent",
        label: "Type",
        defaultValue: EXPLORE_INTENT,
        placement: FIELDSET_HEADER,
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
      new FieldSet({
        name: "tripElements",
        label: "Trip elements",
        visibility: (formState) => formState.intent == SEARCH_INTENT,
        fields: [],
      }),
      new FieldSet({
        name: "locations",
        label: "Locations",
        visibility: (formState) => formState.intent == EXPLORE_INTENT,
        fields: [
          new Field({
            name: "origin",
            label: "Origin",
            input: OriginAutocomplete,
          }),
          new Field({
            name: "destination",
            label: "Destination",
            input: (
              <DestinationAutocomplete placeholder="Leave blank to travel anywhere" />
            ),
          }),
        ],
      }),
      new FieldSet({
        name: "dates",
        label: "Dates",
        visibility: (formState) => formState.intent == EXPLORE_INTENT,
        fields: [
          new BooleanField({
            name: "oneWay",
            label: "One way trip",
            defaultValue: false,
            choices: [
              { value: true, label: "One way" },
              { value: false, label: "Roundtrip" },
            ],
            placement: FIELDSET_HEADER,
          }),
          new Field({
            name: "departure",
            label: "Departure",
            defaultValue: anytime,
            input: FlexibleDateDropdownInput,
          }),
          new Field({
            name: "return",
            label: "Return",
            defaultValue: anytime,
            input: FlexibleDateDropdownInput,
            visibility: (formState) => !formState["oneWay"],
          }),
        ],
      }),
      new FieldSet({
        name: "targetGeoLevel",
        label: "Target geo level",
        visibility: (formState) => formState.intent == EXPLORE_INTENT,
        fields: [
          new StringField({
            name: "targetGeoLevel",
            label: "Target geo level",
            defaultValue: GEO_LEVEL_COUNTRY,
            choices: [
              { value: GEO_LEVEL_COUNTRY, label: "Country" },
              { value: GEO_LEVEL_LOCAL, label: "Local" },
              { value: GEO_LEVEL_REGION, label: "Region" },
              { value: GEO_LEVEL_POI, label: "POI" },
            ],
            placement: FIELDSET_HEADER,
          }),
        ],
      }),
      new FieldSet({
        name: "travellerContext",
        label: "Traveller context",
        fields: [
          new StringField({
            name: "market",
            label: "Market",
            defaultValue: "UK",
          }),
          new StringField({
            name: "locale",
            label: "Locale",
            defaultValue: "en-GB",
          }),
          new StringField({
            name: "currency",
            label: "Currency",
            defaultValue: "GBP",
          }),
        ],
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
          styles: (formState) =>
            !formState[inventory.shorthand] && {
              backgroundColor: "#eee",
              ".fieldset-label": { color: "#666" },
              svg: { fill: "#666" },
            },
          fields: [
            new BooleanField({
              name: inventory.shorthand,
              label: "Enabled",
              defaultValue: true,
              placement: FIELDSET_HEADER,
              input: CheckBox,
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
