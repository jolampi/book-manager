import { css } from "@emotion/css"
import React from "react"

import { Book } from "../../services/backend.types"

const MINIMUM_SIZE = 10

export interface BookListProps {
  books: Array<Book>
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const size = Math.max(MINIMUM_SIZE, books.length)
  return (
    <select
      className={css`
        width: 100%;
      `}
      size={size}
    >
      {books.map((book) => (
        <option key={book.id} value={book.id}>
          {book.title} ({book.author})
        </option>
      ))}
    </select>
  )
}

export default BookList
