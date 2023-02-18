const FENRYR_BASE_URL = "https://gateway.skyscanner.net/fenryr";

const fenryrHeaders = {
  "Content-Type": "application/json",
  "X-Skyscanner-Market": "UK",
  "X-Skyscanner-Locale": "en-GB",
  "X-Skyscanner-Currency": "GBP",
  "X-Skyscanner-Enable-General-Search": "true",
};

export default function autocompleteHandler(endpoint) {
  return async (req, res) => {
    const url = new URL(`http://${req.headers.host}${req.url}`);
    const userQuery = url.searchParams.get("query");

    if (!userQuery) {
      res.status(400).json({
        error: { type: "queryMissing", label: "A valid query is required" },
      });
      return;
    }

    const fenryrUrl = `${FENRYR_BASE_URL}${endpoint}?query=${userQuery}`;
    const fenryrResponse = await fetch(fenryrUrl, { headers: fenryrHeaders });
    const fenryrDocument = await fenryrResponse.json();

    const responseDocument = {
      suggestions: fenryrDocument.inputSuggest.map((suggestion) => ({
        id: suggestion.navigation.entityId,
        type: suggestion.navigation.entityType,
        title: suggestion.presentation.suggestionTitle,
        subtitle: suggestion.presentation.subtitle,
      })),
    };

    res.status(200).json(responseDocument);
  };
}
