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
- Setup project with typescript
    - [ts-node](https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change)
    - [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths)
## Idea

- [ ] create cli command to construct a new react component
    - `Component.tsx`, `Component.scss`, `index.ts`