# Travel Buddy - Client

## Description

Travel Buddy is an app for managing or exploring travel plans. Users can create public or private itineraries of their trips and can share their experiences so others can take advantage of them. Users can also add general travel tips related to travel, hotel bookings, flights, activities, etc.

## User Stories

-  **Create itinerary:** As a user I can create an itinerary.
-  **Update itinerary:** As a user I can update my itinerary.
-  **Delete itinerary:** As a user I can delete my itinerary from my itineraries.
-  **Public itinerary:** As a non-registered user I can only see a list of public create itineraries.
-  **Contributor to the itinerary:** As a user I can contribute to my itinerary so that contributor should be registered and can see and edit that itinerary.
-  **Travel tips:** As a user I can add general common travel-related tips and can filter only mine.
-  **Check profile:** As a user I can check my profile can update my profile picture and can check my itineraries from there.

<br>

# Client / Frontend

## React Router Routes (React App)
| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/`                       | Index                   | public `<Route>`            | Index Page                                        |
| `/signup`                 | Signup                     | anon only  `<IsAnon>`    | Signup form, link to login, navigate to home page after signup |
| `/login`                  | Login                      | anon only `<IsAnon>`     | Login form, link to signup, navigate to home page after login  |
| `/logout`                 | n/a                            | user only `<IsPrivate>`  | Navigate to landing page after logout, expire session             |
| `/api/profile`                 | Profile                            | user only `<IsPrivate>`  | User can update their profile picture.             |
| `/api/itineraries`                 | Itineraries                           | public `<Route>`  | Public can only see all public visible itineraries             |
| `/api/itineraries`                 | NewItineraries                            | user only `<IsPrivate>`  | user can create public or private itineraries. itineraries             |
| `/api/itineraries/:id`                 | ItinerariesEdit                           | user only `<IsPrivate>`  | Only owner / contributor has access to update itinerary.|
| `/api/itineraries/:id`                 | ItinerariesDetails                          | user only `<IsPrivate>`  | Only registered user can see details.|
| `/api/my-itineraries`                 | UserSpecificItineraries                          | user only `<IsPrivate>`  | User can see list of his own itineraries.|
| `/api/traveltips`                 | TravelTips                          | public `<Route>`  | User can see list of all travel tips and filter own travel tips if logged in.|
| `/api/traveltips`                 | NewTravelTip                          | user only `<IsPrivate>`  | User can create new travel tip.|

<br>
          
## Components
- Navbar
- Footer
- Login
- Sign up
- Profile
- Hero Section
- Feature Section
- Create itinerary
- Update itinerary
- Itinerary Detail
- Itinerary list
- Travel tips
- 404 Page not found


## Backlog

- Add multiple contributors.
- Contributor should receive a invitation link.
- Comment / review model
- thumbs up / like model.
- Sign up email verification
- Social authentication.

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()

- Backlog Service
  
<br>

User model

```javascript
{
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true, unique: true},
  imageUrl: { type: String },
  itineraries: [{ type: Schema.Types.ObjectId, ref: "Itinerary" }], 
}
```

Itinerary model

```javascript
{
  isPublic: { type: Boolean, default: false },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80'},
  countries: { type: [String], required: true },
  cities: { type: [String], required: true },
  flightDetails: { type: [Object] },
  hotelDetails: { type: [Object] },
  activities: { type: [Object], required: true },
  notes: { type: [String] },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  contributor: { type: Schema.Types.ObjectId, ref: "User" }
}
```

Travel Tip model

```javascript
{
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["Transport", "Flight", "Hotel", "Other"],
    default: "Travel",
    required: true
   },
  user: { type: Schema.Types.ObjectId, ref: "User" }
}
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session    |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                          |

<br>

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/FbfHT8EH/travel-buddy) 

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/Sunairaa/travel-buddy-client)

[Server repository Link](https://github.com/Sunairaa/travel-buddy-server)

[Deployed App Link](https://travel-buddy-client.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1XsC16eyqehPcwO6THRFyBN-j5KP5g2K9aktBAi2ZV_g/edit#slide=id.g15526f35b1a_0_10)
