import { css } from "@emotion/css"
import styled from "@emotion/styled"
import React, { useState } from "react"
import { useQuery } from "react-query"

import { deleteBook, getBooks, postBook, updateBook } from "../services/backend"
import { Book, NewBook } from "../services/backend.types"

import BookEditor from "./BookEditor"
import BookList from "./BookList"

// Localization
const ERROR = "Error"
const LOADING = "Loading..."

const FlexDiv = styled.div`
  flex: 1;
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

  const handleSelect = (id: number) => {
    if (booksQuery.isSuccess) {
      setBookToEdit(booksQuery.data.find((x) => x.id === id) ?? null)
    }
  }

  if (booksQuery.isError) {
    return <div>{ERROR}</div>
  } else if (booksQuery.isSuccess) {
    return (
      <div
        className={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <FlexDiv>
          <BookEditor
            book={bookToEdit}
            onDelete={handleDelete}
            onSave={handleSave}
            onSaveNew={handleSaveNew}
            onCancel={() => setBookToEdit(null)}
          />
        </FlexDiv>
        <FlexDiv>
          <BookList books={booksQuery.data} onSelect={handleSelect} />
        </FlexDiv>
      </div>
    )
  } else {
    return <div>{LOADING}</div>
  }
}

export default BooksView
