import Autocomplete from "./Autocomplete";

export default function OriginAutocomplete({ ...baseProps }) {
  function fetchSuggestions(query) {
    return fetch(`/api/origin?query=${query}`)
      .then((response) => response.json())
      .then((json) => json.suggestions);
  }
  return <Autocomplete fetchSuggestions={fetchSuggestions} {...baseProps} />;
}
