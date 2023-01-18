import { css } from "@emotion/css"
import styled from "@emotion/styled"
import React from "react"
import { useQuery } from "react-query"

import { getBooks, postBook } from "../services/backend"
import { NewBook } from "../services/backend.types"

import BookList from "./BookList"
import AddBookForm from "./forms/AddBookForm"

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

  const handleAdd = async (newBook: NewBook) => {
    await postBook(newBook)
    await booksQuery.refetch()
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
          <AddBookForm onSubmit={handleAdd} />
        </FlexDiv>
        <FlexDiv>
          <BookList books={booksQuery.data} />
        </FlexDiv>
      </div>
    )
  } else {
    return <div>{LOADING}</div>
  }
}

export default BooksView
