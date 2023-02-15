export function ussFormToRequest(formState) {
  return {
    requestContext: {
      inventory: [
        {
          inventoryType: "SEARCH_INVENTORY_TYPE_FLIGHTS_INDICATIVE",
          responseMessageDescriptor: {
            messageDescriptorFullName:
              "net.skyscanner.fluxcapacitor.taps.api.TapsUssResponseToC",
          },
        },
        {
          inventoryType: "SEARCH_INVENTORY_TYPE_HOTELS_INDICATIVE",
          responseMessageDescriptor: {
            messageDescriptorFullName:
              "net.skyscanner.bamboo.xsellv2.uss.TOCv1",
          },
        },
        {
          inventoryType: "SEARCH_INVENTORY_TYPE_TRAVEL_RESTRICTIONS",
          responseMessageDescriptor: {
            messageDescriptorFullName:
              "net.skyscanner.martech.travelrestrictions.v2.USSExploreResponseTOC",
          },
        },
        {
          inventoryType: "SEARCH_INVENTORY_TYPE_LOCATION_IMAGES",
          responseMessageDescriptor: {
            messageDescriptorFullName:
              "net.skyscanner.martech.postcard.v1.TOCv1",
          },
        },
      ],
    },
    exploreIntent: {
      travellerContext: {
        market: "UK",
        locale: "en-GB",
        currency: "GBP",
      },
      origin: {
        travelEntityId: "27544008",
      },
      destination: {
        locations: {
          geoLevel: "GEO_LEVEL_ANYWHERE",
        },
      },
      targetGeoLevel: "GEO_LEVEL_COUNTRY",
      travelDates: {
        departureDate: {
          anytime: true,
        },
        returnDate: {
          anytime: true,
        },
      },
    },
  };
}

export function ussFormFromRequest(request) {}
