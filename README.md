# Code Block

**Code Block** is an online compiler for frontend development with HTML, CSS, and Vanilla JavaScript. It simplifies the process by eliminating the need to create new files and folders for each project. Users can save and share their code, and explore code saved by other users.

**Tech Stack**:  
- **Frontend**: React, TypeScript, Tailwind CSS, Redux Toolkit, Shadcn
- **Backend**: Node.js, Express, TypeScript

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tanay0209/code-block.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd code-block
   ```
3. **Install Client dependencies:**
   ```bash
   cd client
   npm install
   ```
4. **Install Server dependencies:**
   ```bash
   cd ../server
   npm install
   ```
   > *(Or use `yarn install` if you prefer Yarn)*

---

## Environment Variables

In the `server` directory, create a `.env` file with the following variables:

```plaintext
MONGODB_URI=your_mongodb_connection_string
PORT=3000
JWT_KEY=key_for_jwt
CLIENT_URL=http://localhost:5173 # or link_of_hosted_client if deployed
```

Replace placeholders with your actual configuration.

---

## API Routes

Available API endpoints:

**User Routes:**
- `POST /user/signup` - User registration
- `POST /user/login` - User login
- `GET /user/logout` - User logout
- `GET /user/user-details` - Fetch user details
- `GET /user/my-codes` - Fetch user-specific saved codes

**Compiler Routes:**
- `POST /compiler/save` - Save a new code snippet
- `GET /compiler/get-code/:id` - Fetch a specific code snippet by ID
- `GET /compiler/get-all-codes` - Fetch all saved code snippets
- `PUT /compiler/update-code/:id` - Update an existing code snippet by ID
- `DELETE /compiler/delete-code/:id` - Delete a code snippet by ID

---

## Usage

### Starting the Server and Client

1. **Start the Server:**
   - Open a terminal in the `server` directory:
     ```bash
     cd server
     npm run dev
     ```
   - The server should be running on `http://localhost:3000`.

2. **Start the Client:**
   - Open a separate terminal in the `client` directory:
     ```bash
     cd client
     npm run dev
     ```
   - Access the client at `http://localhost:5173`.

3. **Interacting with API Endpoints:**
   - Use tools like Postman or `curl` for API testing.
   
   Example with `curl`:
   ```bash
   curl http://localhost:3000/user/login
   ```
---

