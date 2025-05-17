# API Routes Documentation

This document describes the backend API routes for managing **Users**, **Samples**, and **Sessions** (authentication) in the application.

---

## Authentication Routes (`/api/session`)

### POST `/api/session` - Log in

- Request Body:
  {
    "credential": "username or email",
    "password": "user password"
  }
- Success Response:
  - Status: 200
  - Body:
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "username": "johndoe",
        "role": "client"
      }
    }
- Errors:
  - 401 Unauthorized if invalid credentials.

### DELETE `/api/session` - Log out

- Clears the user session token cookie.
- Response:
  - Status: 200
  - Body:
    {
      "message": "success"
    }

### GET `/api/session` - Restore session user

- Returns the currently authenticated user based on the session cookie.
- Response:
  - Status: 200
  - Body:
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "username": "johndoe",
        "role": "client"
      }
    }
  - Or
    {
      "user": null
    }
    if no user is logged in.

---

## User Routes (`/api/users`)

### POST `/api/users` - Sign up new user

- Request Body:
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "password": "password123",
    "role": "client" // must be one of: "admin", "employee", "client"
  }
- Success Response:
  - Status: 201 Created
  - Body:
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "username": "johndoe",
        "role": "client"
      }
    }
- Validation Errors:
  Returns 400 with details on missing or invalid fields.

### GET `/api/users` - Get all users

- Returns a list of all users.
- Response:
  - Status: 200
  - Body:
    {
      "Users": [
        {
          "id": 1,
          "firstName": "John",
          "lastName": "Doe",
          "email": "john@example.com",
          "username": "johndoe",
          "role": "client"
        },
        ...
      ]
    }
- Errors:
  Returns 500 if an internal server error occurs.

---

## Sample Routes (`/api/samples`)

### GET `/api/samples` - Get all samples

- Returns all samples with their associated orders.
- Response:
  - Status: 200
  - Body:
    {
      "Samples": [
        {
          "id": 1,
          "sample_name": "Sample A",
          "sample_type": "Flower",
          "test_type": "R&D",
          "status": "placed",
          "orderId": 10,
          "Order": {
            "id": 10,
            "status": "pending",
            "number_of_samples": 5
          }
        },
        ...
      ]
    }

### GET `/api/samples/current` - Get samples for logged-in user

- Requires authentication.
- Returns all samples owned by the current user with selected order details.
- Response:
  - Status: 200
  - Body:
    {
      "userSamples": [
        {
          "id": 1,
          "sample_name": "Sample A",
          "sample_type": "Flower",
          "test_type": "R&D",
          "status": "placed",
          "createdAt": "2023-01-01T00:00:00.000Z",
          "updatedAt": "2023-01-01T00:00:00.000Z",
          "Order": {
            "id": 10,
            "status": "pending"
          }
        },
        ...
      ]
    }

### GET `/api/samples/search?term=flower` - Search samples by term

- Requires authentication.
- Query Parameters:
  - term (string): Search term (sample type, test type, sample name, or ID)
- Search behavior:
  - Filters samples by test_type or sample_type if term matches known types.
  - Searches by sample_name with partial match.
  - Searches by exact id if term is numeric.
  - If user role is client, results are restricted to their samples.
- Response:
  - Status: 200
  - Body:
    {
      "samples": [
        {
          "id": 1,
          "sample_name": "Sample A",
          "sample_type": "Flower",
          "test_type": "R&D",
          "status": "placed"
        },
        ...
      ]
    }

### GET `/api/samples/:sampleId` - Get sample details by ID

- Returns a single sample by ID.
- Response:
  - Status: 200
  - Body:
    {
      "id": 1,
      "sample_name": "Sample A",
      "sample_type": "Flower",
      "test_type": "R&D",
      "status": "placed",
      "orderId": 10,
      ...
    }
- Errors:
  - 404 if sample not found.

### POST `/api/samples/current` - Create a new sample for logged-in user

- Requires authentication.
- Request Body:
  {
    "sample_name": "Sample A",
    "sample_type": "Flower",
    "test_type": "R&D",
    "orderId": 10
  }
- Response:
  - Status: 201 Created
  - Body: Newly created sample object.

### PUT `/api/samples/:sampleId` - Update a sample

- Requires authentication.
- Request Body:
  {
    "sample_name": "New Sample Name",
    "sample_type": "Oil",
    "test_type": "Full Compliance"
  }
- Only sample owner can update.
- Errors:
  - 400 if missing required fields.
  - 400 if sample not found.
  - 400 if user is not owner.
- Response:
  - Status: 200
  - Body: Updated sample object.

### DELETE `/api/samples/:sampleId` - Delete a sample

- Requires authentication.
- Only sample owner can delete.
- Errors:
  - 400 if sample not found.
  - 400 if user is not owner.
- Response:
  - Status: 200
  - Body:
    {
      "message": "Successfully deleted"
    }

---

## Notes

- Authentication is required for routes that modify or retrieve user-specific data.
- The logged-in user's info is available as req.user.
- The API uses Sequelize ORM for database operations.
- Validation is performed using express-validator.

---

## Contact

For questions or issues with the API, please reach out to the development team.
