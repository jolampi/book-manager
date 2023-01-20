import { css } from "@emotion/css"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

import BooksView from "./components/BooksView"
import Header from "./components/Header"

const APP_NAME = "Book Manager"

const client = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={client}>
      <div
        className={css`
          margin: auto;
          max-width: 1000px;
          padding: 1.5rem;
        `}
      >
        <Header title={APP_NAME} />
        <BooksView />
      </div>
    </QueryClientProvider>
  )
}

export default App
