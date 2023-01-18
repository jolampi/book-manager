import { css } from "@emotion/css"
import styled from "@emotion/styled"
import React, { FormEventHandler } from "react"

import useTextInput from "../../hooks/useTextInput"
import { NewBook } from "../../services/backend.types"

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

export interface AddBookFormProps {
  onSubmit: (data: NewBook) => Promise<void>
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onSubmit }) => {
  const [authorInput, setAuthorValue] = useTextInput("")
  const [titleInput, setTitleValue] = useTextInput("")
  const [descriptionInput, setDescriptionValue] = useTextInput("")

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault()
    await onSubmit({
      author: authorInput.value,
      description: descriptionInput.value,
      title: titleInput.value,
    })
    setAuthorValue("")
    setDescriptionValue("")
    setTitleValue("")
  }

  return (
    <form
      onSubmit={handleSubmit}
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
        <input className={flexOne} {...titleInput} required />
      </StyledFormRow>
      <StyledFormRow>
        <label className={flexOne} htmlFor={authorInput.id}>
          {AUTHOR}
        </label>
        <input className={flexOne} {...authorInput} required />
      </StyledFormRow>
      <StyledFormRow>
        <label className={flexOne} htmlFor={descriptionInput.id}>
          {DESCRIPTION}
        </label>
        <input className={flexOne} {...descriptionInput} />
      </StyledFormRow>
      <div>
        <input type="submit" value={SAVE_NEW} />
      </div>
    </form>
  )
}

export default AddBookForm
