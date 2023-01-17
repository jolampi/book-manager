import React from "react"
import { useQuery } from "react-query"

import { getBooks } from "../../services/backend"

import BookListInner from "./BookList"

const BookList: React.FC = () => {
  const books = useQuery("books", getBooks)

  return (
    <>
      {books.isError && <div>Error</div>}
      {books.isLoading && <div>Loading</div>}
      {books.isSuccess && <BookListInner books={books.data} />}
    </>
  )
}

export default BookList
