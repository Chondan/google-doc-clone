# Google doc clone

## Related Resources 

- [QuillJS](https://quilljs.com/docs/quickstart/)
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)

## Lesson Learned

- When you use `useEffect`, it'll sometimes occur before all of your refs are properly set. In order to ensure your ref is always defined we can actually use `useCallback` instead.
- SCSS
    - `:local` and `:global` keywords
- Styling when printing a document
    - `@page`, `@media print` keywords

## Idea

- [ ] create cli command to construct a new react component
    - `Component.tsx`, `Component.scss`, `index.ts`