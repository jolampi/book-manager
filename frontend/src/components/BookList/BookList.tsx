import React from "react"

import { Book } from "../../services/backend.types"

export interface BookListProps {
  books: Array<Book>
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          {book.title} ({book.author})
        </li>
      ))}
    </ul>
  )
}

export default BookList
