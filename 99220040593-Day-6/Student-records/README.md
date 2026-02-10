# Student Records Management System

A full-stack web application for managing student records with automatic grade calculation.

## Features

- ✨ **Create Student Records**: Add new students with their marks in 3 subjects
- 📊 **Automatic Grade Calculation**: Grades are calculated automatically based on average marks
  - **Grade A**: Average ≥ 80
  - **Grade B**: Average 60-79
  - **Grade C**: Average < 60
- 📝 **View All Students**: Display all student records with their details
- ✏️ **Update Records**: Edit existing student information
- 🗑️ **Delete Records**: Remove student records
- 🎨 **Modern UI**: Glassmorphism design with smooth animations

## Tech Stack

### Frontend
- React 18
- Vite
- Modern CSS with Glassmorphism

### Backend
- Java 17
- Spring Boot 3.2.2
- Spring Data JPA
- PostgreSQL (Neon Database)

## Prerequisites

- Node.js (v18 or higher)
- Java 17 or higher
- Maven
- Neon PostgreSQL account

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd student-records-backend
```

2. Update `src/main/resources/application.properties` with your Neon database credentials:
```properties
spring.datasource.url=jdbc:postgresql://pg.neon.tech:5432/your-database-name
spring.datasource.username=your-username
```

3. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Student-records
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

- `POST /api/students` - Create a new student
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

## Database Schema

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    subject1 INTEGER NOT NULL,
    subject2 INTEGER NOT NULL,
    subject3 INTEGER NOT NULL,
    total INTEGER NOT NULL,
    grade VARCHAR(1) NOT NULL
);
```

## Usage

1. **Add a Student**: Fill in the student name and marks for 3 subjects, then click "Add Student"
2. **View Students**: All students are displayed in cards showing their details and grades
3. **Edit a Student**: Click the "Edit" button on any student card, modify the details, and click "Update Student"
4. **Delete a Student**: Click the "Delete" button on any student card

## Grade Calculation Logic

The system automatically calculates:
- **Total Marks**: Sum of all three subjects
- **Average**: Total marks divided by 3
- **Grade**: Based on average percentage
  - A: 80% and above
  - B: 60% to 79%
  - C: Below 60%

## License

MIT
