import Head from "next/head";
import { Global } from "@emotion/react";
import QueryInputs from "../components/QueryInputs";
import QueryResults from "../components/QueryResults";
import { sideMargin } from "../modules/styles";

export default function App() {
  return (
    <div css={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Head>
        <title>USS playground</title>
        <link rel="icon" href="/favicon.ico" />
        <Global
          styles={{
            "*": {
              fontFamily: "sans-serif",
              boxSizing: "border-box",
            },
            body: {
              margin: 0,
              padding: 0,
            },
          }}
        />
      </Head>

      <header
        css={{
          backgroundImage: "linear-gradient(to bottom, #555, #444)",
          textShadow: "0 0 0.5rem black",
          padding: `0.8rem ${sideMargin}`,
          color: "#eee",
        }}
      >
        <h1 css={{ margin: 0, fontSize: "1.2rem" }}>USS playground</h1>
      </header>

      <main
        css={{
          flex: "1 1 auto",
          overflow: "auto",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <QueryInputs css={{ borderRight: "1px solid #ddd", width: "40rem" }} />
        <QueryResults css={{ flex: "1 1 auto" }} />
      </main>

      <footer
        css={{
          backgroundColor: "#333",
          color: "#ddd",
          padding: `0.8rem ${sideMargin}`,
          fontSize: "0.9rem",
          a: {
            color: "inherit",
            textDecoration: "none",
            ":hover": {
              color: "white",
              textDecoration: "underline",
            },
          },
        }}
      >
        <ul
          css={{
            display: "flex",
            listStyleType: "none",
            margin: 0,
            padding: 0,
            gap: "1.6rem",
            li: { margin: 0, padding: 0 },
          }}
        >
          <li>
            <a href="https://github.skyscannertools.net/spyro/uss-playground">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://github.skyscannertools.net/unified-search/unified-search-service/tree/master/proto/unifiedsearch/unifiedsearchservice/api/v2">
              USS Protobuf
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
