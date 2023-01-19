import { ChangeEventHandler, Dispatch, SetStateAction, useId, useState } from "react"

export interface TextInput {
  id: string
  onChange: ChangeEventHandler<HTMLInputElement>
  type: "text"
  value: string
}

export type UseTextInputHook = [TextInput, Dispatch<SetStateAction<string>>]

export default function useTextInput(initialState: string): UseTextInputHook {
  const id = useId()
  const [value, setValue] = useState(initialState)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => setValue(e.target.value)

  return [{ id, onChange, type: "text", value }, setValue]
}
