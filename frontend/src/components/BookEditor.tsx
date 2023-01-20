import { css } from "@emotion/css"
import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"

import useTextArea from "../hooks/useTextArea"
import useTextInput from "../hooks/useTextInput"
import { Book, NewBook } from "../services/backend.types"

// Localizations
const AUTHOR = "Author"
const DELETE = "Delete"
const DESCRIPTION = "Description"
const SAVE = "Save"
const SAVE_NEW = "Save New"
const TITLE = "Title"

const EditorElement = styled.div`
  margin-bottom: 1rem;
`

const StyledButton = styled.button`
  margin-right: 0.5rem;
`

const StyledInput = styled.input`
  width: 100%;
`

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.3rem;
`

type EditMode = "create" | "edit"

export interface BookEditorProps {
  /** Book to edit. Null means editing a new one instead. */
  book: Book | null
  /** Callback for when user deletes a book. */
  onDelete: () => Promise<void>
  /** Callback for when user saves changes to an existing book.  */
  onSave: (editedBook: NewBook) => Promise<void>
  /** Callback for when user saves a new book. */
  onSaveNew: (newBook: NewBook) => Promise<void>
}

const BookEditor: React.FC<BookEditorProps> = ({ book, onDelete, onSave, onSaveNew }) => {
  const [authorInput, setAuthorValue] = useTextInput("")
  const [canSubmit, setCanSubmit] = useState(true)
  const [descriptionArea, setDescriptionValue] = useTextArea("")
  const [titleInput, setTitleValue] = useTextInput("")

  useEffect(() => {
    setAuthorValue(book?.author ?? "")
    setDescriptionValue(book?.description ?? "")
    setTitleValue(book?.title ?? "")
  }, [book, setAuthorValue, setDescriptionValue, setTitleValue])

  const getNewBook = (): NewBook => ({
    author: authorInput.value,
    description: descriptionArea.value,
    title: titleInput.value,
  })

  const preventSubmissionUntil = async (f: () => Promise<void>) => {
    setCanSubmit(false)
    try {
      await f()
    } catch (e) {
      // Handle error
    } finally {
      setCanSubmit(true)
    }
  }

  const handleSaveNew = () => {
    return preventSubmissionUntil(async () => {
      await onSaveNew(getNewBook())
      setAuthorValue("")
      setDescriptionValue("")
      setTitleValue("")
    })
  }

  const canSeave = !!(authorInput.value && titleInput.value)
  const editMode: EditMode = book === null ? "create" : "edit"

  return (
    <div>
      <EditorElement>
        <StyledLabel htmlFor={titleInput.id}>{TITLE}</StyledLabel>
        <StyledInput {...titleInput} />
      </EditorElement>
      <EditorElement>
        <StyledLabel htmlFor={authorInput.id}>{AUTHOR}</StyledLabel>
        <StyledInput {...authorInput} />
      </EditorElement>
      <EditorElement>
        <StyledLabel htmlFor={descriptionArea.id}>{DESCRIPTION}</StyledLabel>
        <textarea
          className={css`
            resize: vertical;
            width: 100%;
          `}
          {...descriptionArea}
          rows={7}
        />
      </EditorElement>
      <div>
        <StyledButton
          disabled={!canSubmit || !canSeave || editMode !== "create"}
          onClick={handleSaveNew}
        >
          {SAVE_NEW}
        </StyledButton>
        <StyledButton
          disabled={!canSubmit || !canSeave || editMode !== "edit"}
          onClick={() => preventSubmissionUntil(() => onSave(getNewBook()))}
        >
          {SAVE}
        </StyledButton>
        <StyledButton
          disabled={!canSubmit || editMode !== "edit"}
          onClick={() => preventSubmissionUntil(onDelete)}
        >
          {DELETE}
        </StyledButton>
      </div>
    </div>
  )
}

export default BookEditor
