import { css } from "@emotion/css"
import styled from "@emotion/styled"
import React, { useState } from "react"
import { useQuery } from "react-query"

import { deleteBook, getBooks, postBook, updateBook } from "../services/backend"
import { Book, NewBook } from "../services/backend.types"

import BookEditor from "./BookEditor"
import BookList from "./BookList"

// Localization
const LOADING_BOOKS = "Loading books..."
const ERROR_FAILED_TO_LOAD_BOOKS = "Error: Failed to load books."

const FlexDiv = styled.div`
  flex: 1;
  min-width: 200px;
`

const BooksView: React.FC = () => {
  const booksQuery = useQuery("books", async () => {
    const books = await getBooks()
    return books.sort((a, b) => a.title.localeCompare(b.title))
  })
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null)

  const handleDelete = async () => {
    if (bookToEdit) {
      await deleteBook(bookToEdit.id)
      await booksQuery.refetch()
      setBookToEdit(null)
    }
  }

  const handleSaveNew = async (newBook: NewBook) => {
    await postBook(newBook)
    await booksQuery.refetch()
  }

  const handleSave = async (editedBook: NewBook) => {
    if (bookToEdit) {
      await updateBook(bookToEdit.id, editedBook)
      await booksQuery.refetch()
    }
  }

  return (
    <div
      className={css`
        display: flex;
        column-gap: 1.5rem;
        flex-direction: row;
        flex-wrap: wrap-reverse;
      `}
    >
      <FlexDiv>
        <BookEditor
          book={bookToEdit}
          onDelete={handleDelete}
          onSave={handleSave}
          onSaveNew={handleSaveNew}
        />
      </FlexDiv>
      <FlexDiv>
        {booksQuery.isError && <div>{ERROR_FAILED_TO_LOAD_BOOKS}</div>}
        {booksQuery.isLoading && <div>{LOADING_BOOKS}</div>}
        {booksQuery.isSuccess && (
          <BookList books={booksQuery.data} onSelect={setBookToEdit} selected={bookToEdit} />
        )}
      </FlexDiv>
    </div>
  )
}

export default BooksView
