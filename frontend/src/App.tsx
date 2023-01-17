import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

import BookList from "./components/BookList"
import "./App.css"

const client = new QueryClient()

const App: React.FC = () => {
  return (
    <div>
      <QueryClientProvider client={client}>
        <BookList />
      </QueryClientProvider>
    </div>
  )
}

export default App
