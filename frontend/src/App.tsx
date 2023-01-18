import { css } from "@emotion/css"
import styled from "@emotion/styled"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

import BookList from "./components/BookList"
import AddBookForm from "./components/forms/AddBookForm"
import { postBook } from "./services/backend"

const FlexDiv = styled.div`
  flex: 1;
`

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
        <div
          className={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <FlexDiv>
            <AddBookForm onSubmit={postBook} />
          </FlexDiv>
          <FlexDiv>
            <BookList />
          </FlexDiv>
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App
