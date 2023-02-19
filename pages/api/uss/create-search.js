import getUssClient from "../../../modules/uss-client";
import typeRegistry from "../../../modules/uss-typeregistry";
import {
  CreateSearchRequest,
  CreateSearchResponse,
} from "../../../vendor/js/unifiedsearch/unifiedsearchservice/api/v2/unified_search_api";

export default async function handler(req, res) {
  return new Promise(async (resolve, reject) => {
    const ussRequest = CreateSearchRequest.fromJson(req.body);
    const client = getUssClient();

    // Send the request to USS
    client.createSearch(ussRequest, (ussError, ussResponse) => {
      if (ussError) {
        res
          .status(500)
          .json({ error: { type: "ussError", details: ussError } });
      } else {
        //unpackCreateSearchResponse(ussResponse);
        const responseData = CreateSearchResponse.toJson(ussResponse, {
          typeRegistry,
        });
        res.status(200).json(responseData);
      }
      resolve();
    });
  });
}
