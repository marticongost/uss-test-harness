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
              data-active={
                activeInventory == inventory.searchInventoryType
                  ? "true"
                  : "false"
              }
              onClick={(e) => setActiveInventory(inventory.searchInventoryType)}
              css={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: inactiveColor,
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
              {inventory.label}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <ul>
          {Object.entries(activeSearchResult.resultSet.itemsByItemType).map(
            ([itemType, itemTypeData]) => (
              <li key={itemType}>
                {itemType} {Object.entries(itemTypeData.itemsById).length}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
