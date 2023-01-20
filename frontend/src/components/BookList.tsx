import { css } from "@emotion/css"
import React, { ChangeEventHandler } from "react"

import { Book } from "../services/backend.types"

// Localizations
const ADD_NEW = "Add new"

const MINIMUM_SIZE = 10
const NEW = "new"

export interface BookListProps {
  books: Array<Book>
  onSelect: (book: Book | null) => void
  selected: Book | null
}

const BookList: React.FC<BookListProps> = ({ books, onSelect, selected }) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value
    if (value === NEW) {
      onSelect(null)
    } else {
      const parsed = parseInt(value)
      onSelect(books.find((x) => x.id === parsed) ?? null)
    }
  }

  const size = Math.max(MINIMUM_SIZE, books.length)
  return (
    <select
      className={css`
        margin-top: 1.5rem;
        width: 100%;
      `}
      value={selected?.id ?? NEW}
      size={size}
      onChange={handleChange}
    >
      {/* New book option has a non-colliding value with special handling. */}
      <option value={NEW}>({ADD_NEW})</option>
      {books.map((book) => (
        <option key={book.id} value={book.id}>
          {book.title} ({book.author})
        </option>
      ))}
    </select>
  )
}

export default BookList
