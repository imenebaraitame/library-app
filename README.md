# Book API

A simple RESTful API for managing books using Node.js, Express, and MongoDB.

## Features

- Get all books
- Get a book by ID
- Get a book by Title
- Add a new book
- Update a book
- Delete a book
- Filter books by category

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Postman (for testing)

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
```

2. Navigate to the project folder:

```bash
cd <project-folder>
```

3. Install dependencies:

```bash
npm install 
```
4. Create a `.env` file in the root and add your MongoDB URI:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

5. Start the server:

```bash
npm start
```

The server should run on `http://localhost:3000`.

## API Endpoints

- `GET /api/books` - Get all books  
- `GET /api/books/:bookId` - Get a book by ID  
- `POST /api/books` - Add a new book  
- `PUT /api/books/:bookId` - Update a book  
- `DELETE /api/books/:bookId` - Delete a book  
- `GET /api/books/category/:category` - Get books by category  

## Testing

Use **Postman** or any API client to test the endpoints.  
Send JSON in the body for POST and PUT requests.

### Example POST body

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "price": 18.99,
  "category": "Self-Help",
  "quantity": 12
}
```

### Example PUT body

```json
{
  "title": "Atomic Habits - Updated",
  "author": "James Clear",
  "price": 19.99,
  "category": "Self-Help",
  "quantity": 15
}
```
## License

This project is [MIT](https://github.com/imenebaraitame/library-app/blob/main/LICENSE) licensed.


