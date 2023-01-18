import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

import BookList from "./components/BookList"
import "./App.css"
import AddBookForm from "./components/forms/AddBookForm"
import { postBook } from "./services/backend"

const client = new QueryClient()

const App: React.FC = () => {
  return (
    <div>
      <QueryClientProvider client={client}>
        <AddBookForm onSubmit={postBook} />
        <BookList />
      </QueryClientProvider>
    </div>
  )
}

export default App
