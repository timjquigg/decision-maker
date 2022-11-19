# Decision Maker

## USER STORIES:

ROLE: 
- Person creating the poll (HOST)
GOAL:
- Be able to make a poll to send to my friends regarding group decisions, and share the poll using url.
BENEFIT:
- Convenience, collaboration, consensus.

ROLE:
- People answering the poll (PARTICIPANTS)
GOAL:
- To be able to respond to polls easily.
BENEFIT:
- Convenience, accessible, at users' leisure

## LIST OF FEATURES

- User authentication (host to login)

app.get('/login/:id', (req, res) => {
 req.session.user_id = req.params.id;
 response.redirect('/');
});

- Create Poll with options and descriptions
- Drag and drop (jQeury Sortable)
- APP will send link to host (result link, access link) via email (mailgun)
- Users visiting submission link will see poll options w/ descriptions and be able to submit ranked response
- Real time updates from others respondants
- Mobile-first design

## STRETCH FEATURE OPTIONS

- SMS for links (with icons:D)
- Cookies to track visits to disallow multiple votes
- Bar graph results
- Record user poll history

## WIREFRAME

## APP USER FLOW

## ROUTES

### Index
get / - Home page

### API - POLLS
get /polls - Logged in used list of historical polls
get /polls/new - New poll form
post /polls - submit new poll to server

get /polls:id - Logged in host sees results
get /polls:id - Non-host sees poll to respond to
post /poll:id - Submits response to poll

### Users
get /users - Login / sign up forms
<!-- get /users/login - login page -->
post /users/login - sends login credentials
post /users/signup - sends signup credentials

post /users/logout - sends logout request
<!-- get /users/signup - signup page -->

### EXTERNAL ROUTES?
mailgun???

## STACK:

- SASS
- jQuery (chart.js, jQueryUI)
- NodeJs
- ExpressJS
- PostgreSQL

## MULTI VS SPA

- Multi-page app

## DIVIDE TASKS

Horizontal
- DB setup
- Express Router setup
- SASS setup

Vertical
- DB design
- Create poll
- Display poll
- Login/Signup

Integrate mailgun?


