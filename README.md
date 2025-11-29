# Stock Management - React + Spring Boot CRUD Application

This is a full-stack CRUD application with React frontend and Spring Boot backend, implemented as a Gradle multi-module project.

## Project Structure

```
stock-management/
├── api/                    # Spring Boot REST API module
│   └── src/main/java/com/github/api/
│       ├── controller/     # REST Controllers
│       ├── repository/     # JPA Repositories & Entities
│       └── configuration/  # Spring Configuration
├── application/            # Common application utilities
├── web/                    # React frontend module
│   └── frontend/          # React application
│       └── src/
│           ├── App.js
│           ├── ClientList.js
│           ├── ClientEdit.js
│           ├── AppNavbar.js
│           └── Home.js
└── build.gradle           # Root Gradle build file
```

## Prerequisites

- Java 17
- PostgreSQL database
- Node.js and npm (will be automatically downloaded by Gradle node plugin)

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE base_spring_test;
```

2. Update database credentials in `api/src/main/resources/application.properties` if needed:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/base_spring_test
spring.datasource.username=postgres
spring.datasource.password=password
```

## Running the Application

### Option 1: Development Mode (Separate Frontend and Backend)

**Terminal 1 - Start Spring Boot API:**
```bash
./gradlew :api:bootRun
```
The API will run on http://localhost:8080

**Terminal 2 - Start React Dev Server:**
```bash
cd web/frontend
npm start
```
The React app will run on http://localhost:3000

### Option 2: Production Mode (Integrated Build)

Build and run the complete application:
```bash
./gradlew :web:build
./gradlew :api:bootRun
```

Access the application at http://localhost:8080

The React build will be automatically copied to the Spring Boot static resources folder.

## Available Gradle Tasks

### Web Module Tasks:
- `./gradlew :web:webInstall` - Install npm dependencies
- `./gradlew :web:npmBuild` - Build React production bundle
- `./gradlew :web:npmStart` - Start React development server
- `./gradlew :web:copyReactBuild` - Copy React build to Spring Boot static folder

### API Module Tasks:
- `./gradlew :api:bootRun` - Run Spring Boot application
- `./gradlew :api:build` - Build Spring Boot JAR
- `./gradlew :api:test` - Run tests

### Build Complete Application:
```bash
./gradlew build
```

## API Endpoints

### Clients CRUD Operations:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/clients` | Get all clients |
| GET | `/clients/{id}` | Get client by ID |
| POST | `/clients` | Create new client |
| PUT | `/clients/{id}` | Update client |
| DELETE | `/clients/{id}` | Delete client |

### Example Request:

**Create Client:**
```bash
curl -X POST http://localhost:8080/clients \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john.doe@example.com"}'
```

## React Components

- **Home.js** - Landing page with navigation to Clients
- **ClientList.js** - Display all clients with Edit/Delete actions
- **ClientEdit.js** - Form for creating/editing clients
- **AppNavbar.js** - Navigation bar component

## Features

- ✅ Full CRUD operations for Clients
- ✅ React Router for navigation
- ✅ Bootstrap styling with Reactstrap
- ✅ RESTful API with Spring Boot
- ✅ JPA with PostgreSQL database
- ✅ Liquibase database migrations
- ✅ CORS configuration for development
- ✅ Gradle multi-module build
- ✅ Automated frontend build integration

## Key Differences from Maven Tutorial

This implementation differs from the Baeldung tutorial in the following ways:

1. **Build Tool**: Uses Gradle instead of Maven
2. **Node Plugin**: Uses `com.github.node-gradle.node` plugin instead of `frontend-maven-plugin`
3. **Module Structure**: React is in `web` module, backend in `api` module
4. **Database**: Uses PostgreSQL instead of H2
5. **Migrations**: Uses Liquibase for database schema management

## Troubleshooting

### CORS Issues
If you encounter CORS errors when running React dev server, ensure:
- Spring Boot app is running on port 8080
- React dev server is running on port 3000
- CORS configuration in `WebMvcConfig.java` allows origin `http://localhost:3000`

### Database Connection
If the application fails to start:
- Verify PostgreSQL is running
- Check database credentials in `application.properties`
- Ensure database `base_spring_test` exists

### Build Issues
If Gradle build fails:
```bash
./gradlew clean build --refresh-dependencies
```

## Technology Stack

**Backend:**
- Spring Boot 2.7.17
- Spring Data JPA
- PostgreSQL
- Liquibase
- Lombok

**Frontend:**
- React 19
- React Router 5.3.0
- Bootstrap 5.1.3
- Reactstrap 8.10.0

**Build:**
- Gradle 7+
- Node Gradle Plugin 7.0.2
