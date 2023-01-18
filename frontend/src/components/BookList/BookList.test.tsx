import { render, screen } from "@testing-library/react"
import React from "react"

import { Book } from "../../services/backend.types"

import BookList from "./BookList"

test("renders book title and author", () => {
  const book: Book = {
    author: "Robert Nystrom",
    description: "",
    id: 0,
    title: "Game Programming Patterns",
  }
  render(<BookList books={[book]} />)

  screen.getByText

  const authorElement = screen.getByText(book.author, { exact: false })
  expect(authorElement).toBeInTheDocument()

  const titleElement = screen.getByText(book.title, { exact: false })
  expect(titleElement).toBeInTheDocument()
})
