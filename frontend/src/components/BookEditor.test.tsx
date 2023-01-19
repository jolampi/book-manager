import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { act } from "react-dom/test-utils"

import { NewBook } from "../services/backend.types"

import BookEditor from "./BookEditor"

const exampleNewBook: NewBook = {
  author: "Robert Nystrom",
  description: "Book that collects proven patterns to untangle and optimize your game.",
  title: "Game Programming Patterns",
}

it("lets user create a new book", async () => {
  const onCreate = jest.fn<Promise<void>, [NewBook]>(() => Promise.resolve())
  render(<BookEditor book={null} onSaveNew={onCreate} />)

  userEvent.type(screen.getByLabelText("Author"), exampleNewBook.author)
  userEvent.type(screen.getByLabelText("Description"), exampleNewBook.description)
  userEvent.type(screen.getByLabelText("Title"), exampleNewBook.title)
  await act(async () => {
    userEvent.click(screen.getByText("Save New"))
  })

  expect(onCreate.mock.lastCall[0]).toStrictEqual(exampleNewBook)
})
