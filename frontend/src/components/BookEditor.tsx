import { css } from "@emotion/css"
import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"

import useTextArea from "../hooks/useTextArea"
import useTextInput from "../hooks/useTextInput"
import { Book, NewBook } from "../services/backend.types"

// Localizations
const AUTHOR = "Author"
const DESCRIPTION = "Description"
const SAVE_NEW = "Save New"
const TITLE = "Title"

const flexOne = css`
  flex: 1;
`

const StyledFormRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export interface BookEditorProps {
  /** Book to edit. Null means editing a new one instead. */
  book: Book | null
  /** Callback for when user clicks to save a new book. */
  onSaveNew: (newBook: NewBook) => Promise<void>
}

const BookEditor: React.FC<BookEditorProps> = ({ book, onSaveNew }) => {
  const [authorInput, setAuthorValue] = useTextInput("")
  const [canSubmit, setCanSubmit] = useState(true)
  const [descriptionArea, setDescriptionValue] = useTextArea("")
  const [titleInput, setTitleValue] = useTextInput("")

  useEffect(() => {
    setAuthorValue(book?.author ?? "")
    setDescriptionValue(book?.description ?? "")
    setTitleValue(book?.title ?? "")
  }, [book, setAuthorValue, setDescriptionValue, setTitleValue])

  const handleCreate = async () => {
    setCanSubmit(false)
    try {
      await onSaveNew({
        author: authorInput.value,
        description: descriptionArea.value,
        title: titleInput.value,
      }).finally(() => setCanSubmit(false))
    } catch (e) {
      // Handle error
    } finally {
      setCanSubmit(true)
    }
  }

  return (
    <div
      className={css`
        row-gap: 1rem;
        display: flex;
        flex-direction: column;
      `}
    >
      <StyledFormRow>
        <label className={flexOne} htmlFor={titleInput.id}>
          {TITLE}
        </label>
        <input className={flexOne} {...titleInput} />
      </StyledFormRow>
      <StyledFormRow>
        <label className={flexOne} htmlFor={authorInput.id}>
          {AUTHOR}
        </label>
        <input className={flexOne} {...authorInput} />
      </StyledFormRow>
      <StyledFormRow>
        <label className={flexOne} htmlFor={descriptionArea.id}>
          {DESCRIPTION}
        </label>
        <textarea
          className={css`
            resize: vertical;
            width: auto;
          `}
          {...descriptionArea}
          rows={7}
        />
      </StyledFormRow>
      <div>
        <button disabled={!canSubmit} onClick={handleCreate}>
          {SAVE_NEW}
        </button>
      </div>
    </div>
  )
}

export default BookEditor
