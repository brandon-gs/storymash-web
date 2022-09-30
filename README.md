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

- [x] Register page

  - [ ] Disable all fields in register page while sending request

- [x] Activate account page

  - [x] If the account is already activated redirect to the next step page

- [x] Create login page

  - [x] Create form login

- [ ] Create onboarding process

  - [ ] Page for select user personal information (/onboarding/information)
    - [x] Create interfaz with name, lastname, birthdate
    - [x] Connect with api to save the user's information
    - [ ] Disable all fields in while sending request
  - [x] Page for select user gender (/onboarding/gender)
    - [x] Create interfaz with male, female and custom gender
    - [x] Connect with api to save the user's gender
    - [ ] Disable all fields in while sending request
  - [ ] Page for customize profile (/onboarding/profile)
    - [ ] upload profile image
    - [ ] send "about me"
    - [ ] Connect with api to save user's image and about
    - [ ] Disable all fields in while sending request
    - [ ] user can skip this step and make it later (save this data in database to avoid redirect the user to this page)

- [ ] Create user wrapper to use at page level

  - [ ] get user information and store it in redux

  - [ ] Allow enter your personal information

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

- Error pages
  - [ ] Create 404 page
  - [ ] Create 500 page when the api is down
