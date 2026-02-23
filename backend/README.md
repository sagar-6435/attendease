# Backend - Student Attendance Tracker

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/signup
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /api/auth/login
Login existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /api/auth/fcm-token
Update FCM token for push notifications (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request Body:**
```json
{
  "fcmToken": "fcm_token_from_device"
}
```

### Subject Endpoints

#### POST /api/subjects/add
Add a new subject (requires authentication).

**Request Body:**
```json
{
  "subjectName": "Mathematics"
}
```

#### GET /api/subjects/list
Get all subjects for authenticated user.

**Response:**
```json
{
  "subjects": [
    {
      "_id": "subject_id",
      "subjectName": "Mathematics",
      "totalClasses": 10,
      "attendedClasses": 8,
      "attendancePercentage": "80.00"
    }
  ]
}
```

#### POST /api/subjects/mark-attendance
Mark attendance for a subject.

**Request Body:**
```json
{
  "subjectId": "subject_id",
  "status": "present"
}
```

#### GET /api/subjects/dashboard
Get dashboard data with overall statistics.

**Response:**
```json
{
  "userName": "John Doe",
  "overallPercentage": 75.50,
  "isSafe": true,
  "warningMessage": null,
  "subjects": [...]
}
```

#### DELETE /api/subjects/:subjectId
Delete a subject.

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/attendance-tracker
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

## Cron Job

Runs daily at 5:00 PM (17:00) to check for users who haven't marked attendance and sends push notifications.

**Schedule:** `0 17 * * *`

## Development

```bash
npm run dev  # Start with nodemon
```

## Testing

Use tools like Postman or Thunder Client to test API endpoints.

Example request:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```
