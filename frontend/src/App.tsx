import { css } from "@emotion/css"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

import BooksView from "./components/BooksView"

const client = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={client}>
      <div
        className={css`
          margin: auto;
          max-width: 1200px;
        `}
      >
        <BooksView />
      </div>
    </QueryClientProvider>
  )
}

export default App
