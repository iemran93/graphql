import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { ApolloProvider } from "@apollo/client"
import client from "./apollo/apollo-client.js"
import { StrictMode } from "react"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
)
