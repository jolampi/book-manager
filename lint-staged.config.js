module.exports = {
  "*.{css,html,java,json,md}": ["prettier --write"],
  "*.{js,jsx,ts,tsx}": ["eslint --cache --fix"],
}
