import { useRef, useState } from "react";
import { highlightColor, subtleLineColor } from "../modules/styles";
import Dropdown from "./Dropdown";
import Spinner from "./Spinner";
import TextInput from "./TextInput";

const fetchDelay = 200;

export default function Autocomplete({
  field,
  value,
  onChange,
  fetchSuggestions,
  placeholder,
  ...attributes
}) {
  const [query, setQuery] = useState(value?.title || "");
  const [expanded, setExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const suggestionsRequest = useRef();

  function handleQueryChange(e) {
    setQuery(e.newValue);
    setExpanded(!!e.newValue);
    if (!e.newValue.startsWith(query)) {
      setSuggestions(null);
    }
    if (!e.newValue) {
      setSelectedIndex(0);
    }

    // Fetch new suggestions after a few milliseconds (to avoid every
    // single key press from spawning a backend request)
    if (suggestionsRequest.current) {
      clearTimeout(suggestionsRequest.current);
    }
    suggestionsRequest.current = setTimeout(
      () => fetchSuggestions(e.newValue).then(setSuggestions),
      fetchDelay
    );
  }

  function handleSuggestionChosen(e) {
    setQuery(e.newValue?.title || "");
    setSelectedIndex(0);
    setExpanded(false);
    if (onChange) {
      onChange(e);
    }
  }

  function handleKeyDown(e) {
    if (e.key == "Escape") {
      handleSuggestionChosen({ newValue: null });
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (suggestions?.length) {
      if (e.key == "ArrowDown") {
        setSelectedIndex(Math.min(selectedIndex + 1, suggestions.length - 1));
        e.preventDefault();
        e.stopPropagation();
      } else if (e.key == "ArrowUp") {
        setSelectedIndex(Math.max(selectedIndex - 1, 0));
        e.preventDefault();
        e.stopPropagation();
      } else if (e.key == "Enter") {
        handleSuggestionChosen({
          newValue: suggestions[selectedIndex],
        });
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
      }}
      {...attributes}
    >
      <TextInput
        field={field}
        value={query}
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        placeholder={placeholder}
      />
      <Dropdown expanded={expanded}>
        <AutocompleteSuggestions
          value={value}
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          onChange={handleSuggestionChosen}
        />
      </Dropdown>
    </div>
  );
}

function AutocompleteSuggestions({
  value,
  suggestions,
  selectedIndex,
  onChange,
  ...attributes
}) {
  return suggestions ? (
    <ul
      {...attributes}
      css={{
        listStyleType: "none",
        padding: 0,
        margin: 0,
      }}
    >
      {suggestions.map((suggestion, index) => {
        return (
          <li
            key={suggestion.id}
            css={{
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "stretch",
            }}
          >
            <button
              type="button"
              onClick={(e) => onChange({ newValue: suggestion })}
              data-selected={index === selectedIndex ? "true" : "false"}
              css={{
                background: "none",
                border: "none",
                padding: "0.8rem 1rem",
                cursor: "pointer",
                borderBottom: `1px solid ${subtleLineColor}`,
                display: "block",
                textAlign: "left",
                "&[data-selected='true'], &:hover": {
                  backgroundColor: highlightColor,
                  color: "white",
                },
              }}
            >
              <div>{suggestion.title}</div>
              {suggestion.subtitle && (
                <div
                  css={{
                    opacity: 0.7,
                    marginTop: "0.2rem",
                    fontStyle: "italic",
                  }}
                >
                  {suggestion.subtitle}
                </div>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  ) : (
    <div
      css={{
        margin: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Spinner />
      Loading...
    </div>
  );
}
