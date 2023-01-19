import { css } from "@emotion/css"
import styled from "@emotion/styled"
import React, { useState } from "react"
import { useQuery } from "react-query"

import { getBooks, postBook } from "../services/backend"
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

  const handleAdd = async (newBook: NewBook) => {
    await postBook(newBook)
    await booksQuery.refetch()
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
            onSaveNew={handleAdd}
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
