
# Shop-Light 🚦
Shoplight is a community marketplace app focused on connecting users wishing to buy and sell items. Connect with people in your area and across nearby neighbourhoods and check out whats available 

## Typical User Experience
A user can sign up for an account and browse items that have been listed by other users within their local community, or neighbouring regions. If a user has an item they would like to sell they can also create listings of their own. 

Often users will reach out and message each other for offers or discussions regarding listed items. Typically after a back and forth messaging interaction, the two parties can meet and exchange the item in person for the agreed upon price. When a transaction has completed, the original listing poster can mark their item as sold.


## Functionality checklist
Shoplight has a list of core features available to logged-in users:

- Browsing Listings
- Filtering Listings by price `'Low to high'` and `'High to low'`
- Searching listings by `'Keyword'`, `'Minimum Price'`,  `'Maximum Price'`
- Favouriting listings
- Creating our own listing
- Marking our listings as `'Sold'`
- Messaging Users
- Viewing incoming messages
- Replying to other user's messages

##  User Data Safety Precautions
In order to maintain safe handling and storage of our users data, we have taken precautions and implemented:

- Session based cookies
- Cookie Encryption
- Password Encryption
- Cross Site Scripting (XSS) Prevention
- SQL Injection Prevention

## Getting Started
1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
-  DB_HOST= `localhost`
-  DB_USER= `insert_your_username`
-  DB_PASS= `insert_your_password`
-  DB_NAME= `insert_your_database_name`
-  DB_PORT= `5432`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`. Check the db folder to see what gets created and seeded in the DB
7. Run the server with the command: `npm run local`.
8. Visit `http://localhost:8080/`

## Dependencies
- Node 10.x or above
- NPM 5.x or above
- PG 8.5.0 or above
- Node 10.x or above
- NPM 5.x or above
- Bcryptjs 2.4.3 or above
- Chalk 2.4.2 or above
- Cookie-session 2.1.0 or above
- Dotenv 2.0.0 or above
- EJS 2.6.2 or above
- Express 4.17.1 or above
- Morgan 1.9.1 or above 
- SASS 1.35.1 or above

Nodemon 2.0.10 as a dev dependency

## Our Team
Cynthia Lam - https://github.com/cynthia-lam <br>
Lubi Islam - https://github.com/lubi25 <br>
Christopher Pytel - https://github.com/ChrisPytel<br>

## Shoplight in Action
Below are a few clips to demonstrate how Shop-light looks and behaves for an end user. Click an image to see each functionality being showcased.

### Landing page
[![Landing Page Preview](./resources/previews/Landing%20Page.JPG)](https://images2.imgbox.com/d9/d8/73PzeHd7_o.jpg)

### Saving Favourite Listings
[![Saving Favourite Listings Webm Preview](./resources/previews/Favourites.jpg)](https://s1.webmshare.com/dGXLw.webm)

### Featured Section and Sending Messages
[![Featured Section and Sending Messages Webm Preview](./resources/previews/Featured.jpg)](https://s1.webmshare.com/qOoD3.webm)

### Back and Forth Messaging Between Two Users
[![Back and Forth Messaging Webm Preview](./resources/previews/Messaging.jpg)](https://s1.webmshare.com/oO8Kn.webm)

### Viewing All Listings and Price Sorting
[![Price Sorting Webm Preview](./resources/previews/Price_sort.jpg)](https://s1.webmshare.com/mOD74.webm)

### Creating a New Listing
[![Creating a new Listing Webm Preview](./resources/previews/Creating_listings.jpg)](https://s1.webmshare.com/ZJNa0.webm)

### Search Function
[![Search Function Webm Preview](./resources/previews/Search.jpg)](https://s1.webmshare.com/3g4rn.webm)

### Login Credential Verification
[![Login Webm Preview](./resources/previews/Login.jpg)](https://s1.webmshare.com/Vb6N3.webm)