import { Details as TravelRestrictionsDetails } from "../vendor/js/canigo/travelrestrictions/net/skyscanner/martech/travelrestrictions/v2/travelrestrictions_v2";
import { Quote as TapsQuote } from "../vendor/js/fluxcapacitor/tapsapi/uss/taps_uss_response";
import { GeoEntityImages } from "../vendor/js/martech/postcard/v1/postcard_response";
import { EntityHotelPrices } from "../vendor/js/bamboo/xsellv2/uss/aggregated_indicative_price_response";
import { Advert } from "../vendor/js/adverts/adsretrievalservice/v1/adverts";

const typeRegistry = [
  TapsQuote,
  TravelRestrictionsDetails,
  GeoEntityImages,
  EntityHotelPrices,
  Advert,
];

export default typeRegistry;
