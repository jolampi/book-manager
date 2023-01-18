import { ChangeEventHandler, Dispatch, useId, useState } from "react"

export interface TextAreaProps {
  id: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  value: string
}

export type UseTextInputHook = [TextAreaProps, Dispatch<string>]

export default function useTextInput(initialState: string): UseTextInputHook {
  const id = useId()
  const [value, setValue] = useState(initialState)

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => setValue(e.target.value)

  return [{ id, onChange, value }, setValue]
}
