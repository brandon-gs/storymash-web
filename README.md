# Storymash web

## Getting Started

First, install all the packages

```bash
yarn install
```

After run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODO

- [ ] Create page for activate the account

- [ ] Create login page

  - [ ] Create form login
  - [ ] Create reducer to save user information after login at redux

- [ ] Create layout

  - [ ] Create navbar
  - [ ] Create sidebar

- [ ] Stories module

  - [ ] Create page to read all stories "/"
  - [ ] Create page to create a story
  - [ ] Create page to read one story
    - [ ] Show story with pagination for the chapters
    - [ ] Add a comment
    - [ ] If I'm the owner I can:
      - [ ] Delete the story
        - [ ] Create modal to delete a story asking if user is sure
      - [ ] Edit one chapter of the story
    - [ ] If I'm not the owner I can:
      - [ ] Add it to favorites
      - [ ] Like any chapter of the story
  - [ ] Create page to edit a story

- Profile module
