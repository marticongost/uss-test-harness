import PlaneIcon from "../images/plane.svg";
import HotelIcon from "../images/hotel.svg";
import CarIcon from "../images/car.svg";
import RestrictionIcon from "../images/restriction.svg";
import ImageIcon from "../images/image.svg";
import AdvertIcon from "../images/advert.svg";

export const SEARCH_INTENT = 1;
export const EXPLORE_INTENT = 2;

export class Inventory {
  constructor({ label, searchInventoryType, shorthand, intent, icon }) {
    this.label = label;
    this.searchInventoryType = searchInventoryType;
    this.shorthand = shorthand;
    this.intent = intent; // bitmap of SEARCH_INTENT and EXPLORE_INTENT
    this.icon = icon;
    // TODO: Inventory options
    // TODO: Backend and squad resources (GitHub project, GitHub link for the Protobuf schemas, Slack channel & greenflag handle)
  }

  appliesToIntent(intent) {
    return this.intent & intent;
  }
}

export const inventories = [
  new Inventory({
    label: "Flights",
    searchInventoryType: "SEARCH_INTENT_INVENTORY_TYPE_FLIGHTS",
    shorthand: "fl",
    intent: SEARCH_INTENT,
    icon: PlaneIcon,
  }),
  new Inventory({
    label: "Hotels",
    searchInventoryType: "SEARCH_INTENT_INVENTORY_TYPE_HOTELS",
    shorthand: "ht",
    intent: SEARCH_INTENT,
    icon: HotelIcon,
  }),
  new Inventory({
    label: "Car hire",
    searchInventoryType: "SEARCH_INTENT_INVENTORY_TYPE_CAR_HIRE",
    shorthand: "car",
    intent: SEARCH_INTENT,
    icon: CarIcon,
  }),
  new Inventory({
    label: "Flights indicative",
    searchInventoryType: "SEARCH_INTENT_INVENTORY_TYPE_FLIGHTS_INDICATIVE",
    shorthand: "flin",
    intent: EXPLORE_INTENT,
    icon: PlaneIcon,
  }),
  new Inventory({
    label: "Hotels indicative",
    searchInventoryType: "SEARCH_INTENT_INVENTORY_TYPE_HOTELS_INDICATIVE",
    shorthand: "htin",
    intent: EXPLORE_INTENT,
    icon: HotelIcon,
  }),
  new Inventory({
    label: "Travel Restrictions",
    searchInventoryType: "TRAVEL_RESTRICTIONS",
    shorthand: "tr",
    intent: EXPLORE_INTENT,
    icon: RestrictionIcon,
  }),
  new Inventory({
    label: "Images",
    searchInventoryType: "LOCATION_IMAGES",
    shorthand: "img",
    intent: EXPLORE_INTENT,
    icon: ImageIcon,
  }),
  new Inventory({
    label: "Adverts",
    searchInventoryType: "ADVERTS",
    shorthand: "ads",
    intent: EXPLORE_INTENT,
    icon: AdvertIcon,
  }),
];
