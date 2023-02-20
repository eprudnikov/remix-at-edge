import { createRequestHandler as edgeHandler } from "remix-lambda-at-edge";
import { createRequestHandler as localHandler } from "@remix-run/architect";
import * as build from "@remix-run/dev/server-build";

if (process.env.NODE_ENV !== "production") {
  require("./mocks");
}

export const handler =
  process.env.NODE_ENV === "development"
    ? localHandler({ build })
    : edgeHandler({
        getBuild: () => build,
      });
