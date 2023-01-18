import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { act } from "react-dom/test-utils"

import { NewBook } from "../../services/backend.types"

import AddBookForm from "./AddBookForm"

it("submits valid object", async () => {
  const expected: NewBook = {
    author: "Robert Nystrom",
    description: "Book that collects proven patterns to untangle and optimize your game.",
    title: "Game Programming Patterns",
  }
  const onSubmit = jest.fn<Promise<void>, [NewBook]>(() => Promise.resolve())
  render(<AddBookForm onSubmit={onSubmit} />)

  userEvent.type(screen.getByLabelText("Author"), expected.author)
  userEvent.type(screen.getByLabelText("Description"), expected.description)
  userEvent.type(screen.getByLabelText("Title"), expected.title)
  await act(async () => {
    userEvent.click(screen.getByText("Save New"))
  })

  expect(onSubmit.mock.lastCall[0]).toStrictEqual(expected)
})
