import { css } from "@emotion/css"
import React from "react"

export interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div
      className={css`
        margin-bottom: 1rem;
      `}
    >
      <h1
        className={css`
          font-size: 28px;
          font-weight: 500;
          margin: 0.5rem 2rem 0.2rem;
          line-height: 1.2;
          padding: 0;
          text-align: center;

          @media screen and (min-width: 30rem) {
            text-align: left;
          }
        `}
      >
        {title}
      </h1>
      <div
        className={css`
          background: #295cfb;
          height: 1rem;
          width: 100%;
        `}
      />
    </div>
  )
}

export default Header
