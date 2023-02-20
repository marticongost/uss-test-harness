import { useState } from "react";
import { highlightColor } from "../modules/styles";

export default function UssResponseInspector({ ussQuery, ...attributes }) {
  const requestedInventories = ussQuery.request.getInventories();
  const [activeInventory, setActiveInventory] = useState(
    requestedInventories[0].searchInventoryType
  );
  const activeSearchResult =
    ussQuery.response.getInventorySearchResult(activeInventory);

  const inactiveColor = "#777";
  return (
    <div {...attributes}>
      <ul
        css={{
          listStyleType: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          gap: "1.5rem",
        }}
      >
        {requestedInventories.map((inventory) => (
          <li
            key={inventory.searchInventoryType}
            css={{ padding: 0, margin: 0 }}
          >
            <button
              type="button"
              onClick={(e) => setActiveInventory(inventory.searchInventoryType)}
              data-active={
                activeInventory == inventory.searchInventoryType
                  ? "true"
                  : "false"
              }
              css={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: inactiveColor,
                textAlign: "left",
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                cursor: "pointer",
                fontSize: "1.2rem",
                "&[data-active='true']": {
                  fontWeight: "bold",
                  color: highlightColor,
                  svg: { fill: highlightColor },
                },
              }}
            >
              <inventory.icon
                css={{ height: "1.4rem", width: "auto", fill: inactiveColor }}
              />
              <div>
                {inventory.label}
                {inventory.itemTypes && (
                  <div
                    css={{
                      fontSize: "0.9rem",
                      fontWeight: "normal",
                      opacity: 0.8,
                    }}
                  >
                    {ussQuery.response.countDefaultItems(inventory)}{" "}
                    {inventory.itemTypes[0].label}
                  </div>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
