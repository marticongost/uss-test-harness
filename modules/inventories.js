import PlaneIcon from "../images/plane.svg";
import HotelIcon from "../images/hotel.svg";
import CarIcon from "../images/car.svg";
import RestrictionIcon from "../images/restriction.svg";
import ImageIcon from "../images/image.svg";
import AdvertIcon from "../images/advert.svg";
import { BooleanField, StringField } from "./schema";

export const SEARCH_INTENT = 1;
export const EXPLORE_INTENT = 2;

export class Inventory {
  constructor({
    label,
    searchInventoryType,
    descriptors,
    shorthand,
    intent,
    icon,
    inventoryOptions,
  }) {
    this.label = label;
    this.searchInventoryType = searchInventoryType;
    this.descriptors = descriptors;
    this.shorthand = shorthand;
    this.intent = intent; // bitmap of SEARCH_INTENT and EXPLORE_INTENT
    this.icon = icon;
    this.inventoryOptions = inventoryOptions || [];
    // TODO: Backend and squad resources (GitHub project, GitHub link for the Protobuf schemas, Slack channel & greenflag handle)
  }

  appliesToIntent(intent) {
    return this.intent & intent;
  }
}

export class InventoryOption {
  constructor({ schema, toJson }) {
    this.schema = schema;
    this.toJson = toJson;
  }
}

export const inventories = [
  new Inventory({
    label: "Flights",
    searchInventoryType: "SEARCH_INVENTORY_TYPE_FLIGHTS",
    descriptors: ["net.skyscanner.dps.conductor.api.v2.FlightsTOC"],
    shorthand: "fl",
    intent: SEARCH_INTENT,
    icon: PlaneIcon,
  }),
  new Inventory({
    label: "Hotels",
    searchInventoryType: "SEARCH_INVENTORY_TYPE_HOTELS",
    descriptors: ["net.skyscanner.hotels.uss.v2.TableOfContents"],
    shorthand: "ht",
    intent: SEARCH_INTENT,
    icon: HotelIcon,
  }),
  new Inventory({
    label: "Car hire",
    searchInventoryType: "SEARCH_INVENTORY_TYPE_CAR_HIRE",
    descriptors: ["net.skyscanner.carhireweb.mangalica.uss.api.v1.Group"],
    shorthand: "car",
    intent: SEARCH_INTENT,
    icon: CarIcon,
  }),
  new Inventory({
    label: "Flights indicative",
    searchInventoryType: "SEARCH_INVENTORY_TYPE_FLIGHTS_INDICATIVE",
    descriptors: ["net.skyscanner.fluxcapacitor.taps.api.TapsUssResponseToC"],
    shorthand: "flin",
    intent: EXPLORE_INTENT,
    icon: PlaneIcon,
    inventoryOptions: [
      new InventoryOption({
        schema: [
          new StringField({
            name: "flinRollup",
            label: "Rollup",
            defaultValue: "none",
            choices: [
              { value: "none", label: "None" },
              { value: "month", label: "Per month" },
              { value: "date", label: "Per date" },
            ],
          }),
        ],
      }),
    ],
  }),
  new Inventory({
    label: "Hotels indicative",
    searchInventoryType: "SEARCH_INVENTORY_TYPE_HOTELS_INDICATIVE",
    descriptors: ["net.skyscanner.bamboo.xsellv2.uss.TOCv1"],
    shorthand: "htin",
    intent: EXPLORE_INTENT,
    icon: HotelIcon,
  }),
  new Inventory({
    label: "Travel Restrictions",
    searchInventoryType: "TRAVEL_RESTRICTIONS",
    descriptors: [
      "net.skyscanner.martech.travelrestrictions.v2.USSExploreResponseTOC",
    ],
    shorthand: "tr",
    intent: EXPLORE_INTENT,
    icon: RestrictionIcon,
    inventoryOptions: [
      new InventoryOption({
        schema: [
          new BooleanField({
            name: "trCommentary",
            label: "Commentary",
          }),
        ],
      }),
    ],
  }),
  new Inventory({
    label: "Images",
    searchInventoryType: "LOCATION_IMAGES",
    descriptors: ["net.skyscanner.martech.postcard.v1.TOCv1"],
    shorthand: "img",
    intent: EXPLORE_INTENT,
    icon: ImageIcon,
  }),
  new Inventory({
    label: "Adverts",
    searchInventoryType: "ADVERTS",
    descriptors: [
      "net.skyscanner.adverts.adsretrievalservice.api.rpc.v1.AdsUssResponseToC",
    ],
    shorthand: "ads",
    intent: EXPLORE_INTENT,
    icon: AdvertIcon,
  }),
];
