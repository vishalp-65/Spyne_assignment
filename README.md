# Node.js Backend Project

## Project Overview
This project is a Node.js-based backend system divided into microservices. It handles user management, discussions, and comments. Each service runs on its dedicated port and can be individually managed and deployed.

## Postman routes link
Link: [Postman collection](https://drive.google.com/file/d/1dNNKWQuTtxqeyEBll7GkJeOXBoPJAbbM/view?usp=sharing)

## Folder structure
- `API_gateway`: Acts as a central entry point for all requests.
- `comment-service`: Manages comments on discussions.
- `discussion-service`: Manages user discussions.
- `user-service`: Manages user data and authentication.

## Installation and Setup

To set up the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies for each service:

    ```
    cd API_gateway && npm install
    cd ../comment-service && npm install
    cd ../discussion-service && npm install
    cd ../user-service && npm install
    ```

## Running the services
Each service runs on a specific port. Start each service individually:
- API_gateway:
  ```
  cd API_gateway
  npm start
  # Runs on port 9000
  ```
- comment-service:
  ```
  cd comment-service
  npm start
  # Runs on port 8084
  ```

- discussion-service:
  ```
  cd discussion-service
  npm start
  # Runs on port 8083
  ```

- user-service:
  ```
  cd user-service
  npm start
  # Runs on port 8082
  ```


##API Endpoints
> User Service
- Create User: POST /users
- Update User: PUT /users/:id
- Delete User: DELETE /users/:id
- List Users: GET /users
- Search User: GET /users/search?name=<name>
> Discussion Service
- Create Discussion: POST /discussions
- Update Discussion: PUT /discussions/:id
- Delete Discussion: DELETE /discussions/:id
- List Discussions by Tag: GET /discussions?tags=<tags>
- Search Discussions: GET /discussions/search?text=<text>
> Comment Service
- Add Comment: POST /comments
- Update Comment: PUT /comments/:id
- Delete Comment: DELETE /comments/:id
- Like Comment: POST /comments/:id/like
- Reply to Comment: POST /comments/:id/reply

