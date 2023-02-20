import { inventories } from "./inventories";

export default class UssQuery {
  constructor(formState, requestBody, responseData) {
    this.request = new UssRequest(formState, requestBody);
    this.response = new UssResponse(responseData);
  }
}

export class UssRequest {
  constructor(formState, body) {
    this.formState = formState;
    this.body = body;
  }

  getInventories() {
    return inventories.filter(
      (inventory) =>
        inventory.appliesToIntent(this.formState.intent) &&
        this.formState[inventory.shorthand]
    );
  }
}

export class UssResponse {
  constructor(data) {
    this.data = data;
  }

  getJsonString() {
    return JSON.stringify(this.data, null, 2);
  }

  getInventorySearchResult(searchInventoryType) {
    return this.data.searchResponse?.searchResult?.find(
      (searchResult) =>
        searchResult?.inventory?.inventoryType === searchInventoryType
    );
  }

  getDefaultItems(inventory) {
    console.log(inventory.searchInventoryType);
    const searchResult = this.getInventorySearchResult(
      inventory.searchInventoryType
    );
    console.log(!!searchResult);
    console.log(!!searchResult?.resultSet);
    console.log(
      !!searchResult?.resultSet?.itemsByItemType[inventory.itemTypes[0].name]
    );
    return searchResult?.resultSet?.itemsByItemType[
      inventory.itemTypes[0].name
    ];
  }

  countDefaultItems(inventory) {
    const items = this.getDefaultItems(inventory);
    return items ? Object.keys(items).length : 0;
  }
}
