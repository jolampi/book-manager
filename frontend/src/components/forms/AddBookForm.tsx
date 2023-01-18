import React, { FormEventHandler } from "react"

import useTextInput from "../../hooks/useTextInput"
import { NewBook } from "../../services/backend.types"

// Localizations
const AUTHOR = "Author"
const DESCRIPTION = "Description"
const SAVE_NEW = "Save New"
const TITLE = "Title"

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={titleInput.id}>{TITLE}</label>
        <input {...titleInput} required />
      </div>
      <div>
        <label htmlFor={authorInput.id}>{AUTHOR}</label>
        <input {...authorInput} required />
      </div>
      <div>
        <label htmlFor={descriptionInput.id}>{DESCRIPTION}</label>
        <input {...descriptionInput} />
      </div>
      <input type="submit" value={SAVE_NEW} />
    </form>
  )
}

export default AddBookForm
