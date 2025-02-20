# Course Management App

## Overview
The **Course Management App** is a web application that allows users to explore different technology courses, enroll in courses, and purchase them. The app features a secure authentication system and a structured dashboard for managing enrolled courses.

## Features
- **User Authentication:**
  - Login and Signup functionality (Unprotected routes)
  - JWT-based authentication
- **Private Routes:**
  - Home Page
  - Courses Page
  - Dashboard
- **Course Management:**
  - Browse available courses
  - Enroll or purchase courses
  - View enrolled courses in the dashboard
- **Backend Integration:**
  - Built using Node.js and Express.js
  - Uses CORS to avoid cross-origin errors
  - UUID package for unique keys

## Technologies Used
### Frontend:
- React.js (Developed using Vite)
- React Router (for navigation and private routes)
- JWT Authentication (Token Storage)

### Backend:
- Node.js
- Express.js
- MongoDB (for storing user and course data)
- CORS (for handling cross-origin requests)
- UUID (for generating unique keys)

## Installation & Setup
### Backend Setup:
1. Clone the repository:
   ```bash
   git clone https://github.com/Rakesh3117/course-management-app.git
   cd course-management-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   ```

### Frontend Setup:
1. Open another Terminal ny using ctrl+shift+`
   ```bash
     npm run dev
   ```

## Usage
- Sign up or log in to access courses.
- Navigate through the home, courses, and dashboard pages.
- Enroll or purchase a course.
- View enrolled courses on the dashboard.

# Login API Documentation

## Endpoint
**POST** `/login`

## Description
This endpoint allows users to log in by providing their email and password. Upon successful authentication, a JWT token is generated and returned.

## Request Body (JSON)
```json
{
  "email": "test@gmail.com",
  "password": "dummyPassword123"
}
```

## Response
### Success Response (200)
```json
{
  "message": "Login successful",
  "user": {
    "id": "12345",
    "email": "user@example.com"
  },
  "jwtToken": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

### Error Responses
#### User Not Found (400)
```json
{
  "message": "User does not exist"
}
```

#### Incorrect Password (400)
```json
{
  "message": "Password is incorrect"
}
```

#### Internal Server Error (500)
```json
{
  "error": "Internal Server Error"
}
```

## Notes
- The JWT token is valid for **24 hours**.
- Ensure to include the token in the `Authorization` header for protected routes.
- Passwords are checked in plain text; it's recommended to use hashing for better security.

# Signup API Documentation

## Endpoint
**POST** `/signup`

## Description
This endpoint allows users to register by providing their email, password, first name, and last name. Upon successful registration, the user is stored in the system.

## Request Body (JSON)
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "firstname": "John",
  "lastname": "Doe"
}
```

## Response
### Success Response (201)
```json
{
  "message": "User created successfully"
}
```

### Error Responses
#### Missing Fields (400)
```json
{
  "message": "All fields are required"
}
```

#### User Already Exists (400)
```json
{
  "message": "User already exists. Please login."
}
```

#### Internal Server Error (500)
```json
{
  "error": "Internal Server Error"
}
```

## Notes
- The email must be unique; duplicate registrations are not allowed.
- The password is stored as plain text in this implementation; it is recommended to use hashing for better security.
- The user is initialized with empty `purchased_courses` and `favourite_courses` arrays.

# Get All Courses API Documentation

## Endpoint
**GET** `/api/all`

## Description
This endpoint retrieves all available course categories. The request requires a valid authentication token.

## Headers
```json
{
  "Authorization": "Bearer your-jwt-token"
}
```

## Response
### Success Response (200)
```json
[
  {
    "id": "1",
    "name": "Web Development",
    "description": "Learn HTML, CSS, and JavaScript."
  },
  {
    "id": "2",
    "name": "Data Science",
    "description": "Learn Python, Machine Learning, and AI."
  }
]
```

### Error Responses
#### No Data Found (400)
```json
{
  "message": "No Data Found. Try again later."
}
```

#### Internal Server Error (500)
```json
{
  "error": "Internal Server Error"
}
```

## Notes
- This route is **protected**, requiring a valid JWT token.
- If no course data is available, a 400 error is returned.
- Ensure to pass the token in the `Authorization` header to access the data.

# Get Specific Technology Courses API Documentation

## Endpoint
**GET** `/api/:tech`

## Description
This endpoint retrieves courses for a specific technology category based on the provided `tech` parameter.

## Parameters
- `tech` (string) - The name of the technology category.

## Example Request
```
GET /api/Web Development
```

## Response
### Success Response (200)
```json
[
  {
    "id": "1",
    "name": "Web Development",
    "description": "Learn HTML, CSS, and JavaScript."
  }
]
```

### Error Responses
#### Technology Not Found (404)
```json
{
  "message": "Technology not found"
}
```

#### Internal Server Error (500)
```json
{
  "error": "Server error"
}
```

## Notes
- This endpoint searches for courses by matching the `tech` parameter with the category name.
- If no courses are found, a 404 response is returned.
- Ensure that the `tech` parameter matches the category name exactly.

# API Documentation - Get Specific Course

## Endpoint

### GET `/api/:technologyId/:id`

This API endpoint retrieves a specific course based on the provided `technologyId` and `id`.

## Authorization
- This route requires a valid token for authentication. Ensure that you include the token in the request headers.

## Request Parameters
- `technologyId` (string): The ID of the technology category.
- `id` (string): The ID of the specific course.

## Response

### Success Response
**Status Code:** `200 OK`

```json
{
  "id": "123",
  "name": "Course Name",
  "description": "Course Description",
  "duration": "6 weeks",
  "technologyId": "1",
  "technologyName": "Technology Name"
}
```

### Error Responses

**Invalid Request:**
**Status Code:** `400 Bad Request`

```json
{
  "message": "Invalid request"
}
```

**Technology Not Found:**
**Status Code:** `404 Not Found`

```json
{
  "message": "Technology Not Found"
}
```

**Course Not Found:**
**Status Code:** `404 Not Found`

```json
{
  "course": {
    "technologyId": "1",
    "name": "Technology Name"
  },
  "message": "Course Not Found"
}
```

**Server Error:**
**Status Code:** `500 Internal Server Error`

```json
{
  "error": "Internal Server Error"
}
```

## Notes
- Ensure that both `technologyId` and `id` are valid before making the request.
- The request requires authentication via token validation.
- The response includes course details along with the technology information if found successfully.

# Course API Documentation

## Overview
This API provides a way to retrieve detailed course information based on a given `technologyId` and `id`. The request is validated using a token before fetching data from the available courses.

## Endpoint

### GET `/api/:technologyId/:id`

#### Description
Retrieves a specific course based on the `technologyId` and `id` provided in the request parameters.

#### Authentication
This endpoint requires token validation using `validateToken` middleware.

#### Request Parameters
| Parameter       | Type   | Required | Description |
|----------------|--------|----------|-------------|
| `technologyId` | String | Yes      | The unique identifier for the technology. |
| `id`          | String | Yes      | The unique identifier for the specific course. |

#### Request Example
```http
GET /api/123/456 HTTP/1.1
Host: example.com
Authorization: Bearer <your_token>
```

#### Response
- **200 OK** - Returns the requested course details.
- **400 Bad Request** - If `technologyId` or `id` is missing or invalid.
- **404 Not Found** - If the technology or course is not found.
- **500 Internal Server Error** - If there is an issue processing the request.

#### Success Response Example
```json
{
  "id": "456",
  "name": "React Advanced Course",
  "description": "A deep dive into React.js advanced concepts.",
  "technologyId": "123",
  "technologyName": "React.js"
}
```

#### Error Response Examples
**Invalid request:**
```json
{
  "message": "Invalid request"
}
```

**Technology not found:**
```json
{
  "message": "Technology Not Found"
}
```

**Course not found:**
```json
{
  "course": {
    "technologyId": "123",
    "technologyName": "React.js"
  },
  "message": "Course Not Found"
}
```

#### Notes
- Ensure that you pass a valid token in the request headers.
- The API fetches data from `FullyDetailedCourses`, so ensure it is properly populated.
- The response structure might vary depending on data availability.


## Contributors
- **[Rakesh Annavarapu]** - Developer

