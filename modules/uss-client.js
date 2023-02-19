import { UnifiedSearchServiceClient } from "../vendor/js/unifiedsearch/unifiedsearchservice/api/v2/unified_search_api.grpc-client";
import * as grpc from "@grpc/grpc-js";

const USS_ADDRESS = "unified-search-service.skyscanner.io:50051";
const CLIENT_OPTIONS = {
  "grpc.keepalive_time_ms": 10000,
  "grpc.keepalive_timeout_ms": 5000,
  "grpc.keepalive_permit_without_calls": 1,
};

let client;

export default function getUssClient() {
  return (
    client ||
    (client = new UnifiedSearchServiceClient(
      USS_ADDRESS,
      grpc.credentials.createInsecure(),
      CLIENT_OPTIONS
    ))
  );
}
