import { EXPLORE_INTENT, inventories } from "./inventories";
import { Anytime, DateRange, SingleDate, Month } from "./dates";
import {
  GEO_LEVEL_ANYWHERE,
  GEO_LEVEL_COUNTRY,
  GEO_LEVEL_LOCAL,
  GEO_LEVEL_REGION,
  GEO_LEVEL_POI,
} from "./uss-geolevels";

export function ussFormToRequest(formState) {
  const response = { request_context: ussFormToRequestContext(formState) };

  if (formState.intent == EXPLORE_INTENT) {
    response.explore_intent = ussFormToExploreIntent(formState);
  }

  return response;
}

function ussFormToRequestContext(formState) {
  const requestContext = { inventory: [] };
  for (let inventory of inventories) {
    if (!inventory.appliesToIntent(formState.intent)) {
      continue;
    }
    if (formState[inventory.shorthand]) {
      if (!inventory.descriptors?.length) {
        console.error(
          `No response message descriptor defined for inventory '${inventory.shorthand}' (have you set its 'descriptors' parameter?)`
        );
        continue;
      }
      requestContext.inventory.push({
        inventory_type: inventory.searchInventoryType,
        response_message_descriptor: {
          message_descriptor_full_name: inventory.descriptors[0],
        },
      });
    }
  }
  return requestContext;
}

function ussFormToExploreIntent(formState) {
  const intent = {
    traveller_context: {
      market: formState.market,
      locale: formState.locale,
      currency: formState.currency,
    },
    target_geo_level: formState.targetGeoLevel,
  };

  if (formState.origin) {
    intent.origin = { travel_entity_id: formState.origin.id };
  }

  if (formState.destination) {
    intent.destination = {
      locations: {
        geo_level: fenryrLocationTypeToGeoLevel(formState.destination.type),
        location: [{ travel_entity_id: formState.destination.id }],
      },
    };
  } else {
    intent.destination = {
      locations: { geo_level: GEO_LEVEL_ANYWHERE },
    };
  }

  intent.travel_dates = {
    departure_date: ussFormValueToFlexibleDate(formState.departure),
  };
  if (!formState.oneWay) {
    intent.travel_dates.return_date = ussFormValueToFlexibleDate(
      formState.return
    );
  }
  return intent;
}

function ussFormValueToFlexibleDate(formDate) {
  if (formDate instanceof Anytime) {
    return { anytime: true };
  } else if (formDate instanceof Month) {
    return {
      date_range: {
        range_start: {
          year: formDate.year,
          month: formDate.month,
          day: 1,
        },
        range_end: {
          year: formDate.year,
          month: formDate.month,
          day: new Date(formDate.year, formDate.month, 0).getDate(),
        },
      },
    };
  } else if (formDate instanceof SingleDate) {
    return {
      date: {
        year: formDate.year,
        month: formDate.month,
        day: formDate.day,
      },
    };
  } else if (formDate instanceof DateRange) {
    return {
      date_range: {
        range_start: {
          year: formDate.start.year,
          month: formDate.start.month,
          day: formDate.start.day,
        },
        range_end: {
          year: formDate.end.year,
          month: formDate.end.month,
          day: formDate.end.day,
        },
      },
    };
  }
}

function fenryrLocationTypeToGeoLevel(type) {
  if (type == "COUNTRY") {
    return GEO_LEVEL_COUNTRY;
  } else if (type == "REGION") {
    return GEO_LEVEL_REGION;
  } else if (type == "CITY" || type == "AIRPORT") {
    return GEO_LEVEL_LOCAL;
  }
  // Assume POI for anything else, as this level matches dozens of canonical geo types
  return GEO_LEVEL_POI;
}

export function ussFormFromRequest(request) {}
