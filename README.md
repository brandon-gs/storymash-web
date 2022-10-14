# Storymash web

API for this project is required the [Storymash-API](https://github.com/brandon-gs/storymash-api)

## Project stack

## Getting Started

Get the api repo or the url

```bash
git clone git@github.com:brandon-gs/storymash-api.git
```

Install all the packages

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

## Cypress

To run cypress tests is required to have the next dependencies:

- node
- [storymash-api repo](https://github.com/brandon-gs/storymash-api) or url for the development env
- [mongodb]

Execute the following steps

1. Start the storymash-api or config .env with the url of the api test server

```bash
# /storymash-api
yarn start:test
```

2. Build the web client and start the server

```bash
yarn build
yarn start
```

3. Open cypress and run tests

```bash
yarn cypress
```

## TODO

- [x] Register page

  - [ ] Disable all fields in register page while sending request

- [x] Activate account page

  - [x] If the account is already activated redirect to the next step page
  - [ ] Refactor ActivateEmail slice and use just the endpoint mutation to show the errors

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
    - [x] upload profile image
    - [x] send "about me"
    - [x] Connect with api to save user's image and about
    - [ ] Disable all fields in while sending request
    - [x] user can skip this step and make it later (save this data in database to avoid redirect the user to this page)

- [ ] Create redux slices

  - [ ] Create redux user slice to save user information
    - [ ] add user endpoints fullfiled in extraRedeucers (getUser, getUserAccount)
    - [ ] add auth endpoints fullfiled in extraRedeucers (login, logout, register, activateUser)
  - [ ] Create redux allstories slice to allow modify the state
    - [ ] add getAllStories endpoint fullfiled in extraRedeucers (getAllStories)

- [] Create layout

  - [x] Create navbar
    - [ ] Add "Crear historia" element
    - [ ] Add "Notifications" element
    - [ ] Add User avatar with username
      - [ ] Redirect to the User profile
  - [x] Create sidebar
    - [ ] Add "Me gustan" element above "Favoritos"
    - [ ] Sub menu
      - [ ] Add "Mis historias" element
    - [ ] Sub menu
      - [ ] Add "Configuración" element
      - [ ] Add "Preguntas frecuentes" element
      - [ ] Add "Ayuda y Feedback" element
      - [ ] Add "Cerrar sesión" element

- [ ] Stories module

  - [ ] Read all stories /stories

    - [x] Create page to read all stories
    - [x] Add stories service
    - [x] Create StoryCard component
      - [ ] Add "..." if the first chapter text is too long
    - [x] Create StoryList component
      - [ ] Refactor to get stories from props
      - [ ] Add masonry layout for the stories
    - [ ] Add pagination feature
    - [ ] Add form or button to start to create a story

  - [ ] Story like

    - [x] Create StoryLike component
    - [x] Disable button if the user is the author
    - [ ] Like it
      - [ ] Create service to add a like to a story
      - [ ] Use optimistic update to update likes before the service response
    - [ ] Remove like
      - [ ] Create service to remove a like to a story
      - [ ] Use optimistic update to update likes before the service response

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
  - [ ] Favorite stories
    - [ ] Refactor StoryList to allow get stories from props

- Profile module

- Error pages

  - [ ] Create 404 page
  - [ ] Create 500 page when the api is down

- Refactors
  - [ ] Refactor form inputs use useController hook instead Controller component
  - [ ] Remove redux persist
