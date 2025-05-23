# Support System Interface (Frontend)

This is the frontend for the technical support system. The application allows you to register and manage **Clients** and **Support Tickets**, with an intuitive web interface, secure authentication, and integration with an API developed in FastAPI.

---

## Features

- JWT authentication
- Protected routes (PrivateRoute)
- Client CRUD
- CRUD for Tickets associated with clients
- Fixed navbar with logout and quick navigation
- Error message display in the interface
- Integration with the API using Axios
- Docker and Makefile for easy execution

---

## Technologies Used

- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Docker](https://www.docker.com/)
- Context API for authentication

---

## How to run locally

### Prerequisites

- Node.js 18
- NPM
- Docker (optional, recommended)

---

### Running with Vite (development mode)

```bash
git clone https://github.com/your-username/support-system-interface.git
cd support-system-interface
npm install
npm run dev
```
Open in your browser: [http://localhost:5173](http://localhost:5173)

---

### Running with Docker + Makefile

```bash
make run

```
Open in your browser: [http://localhost:3000](http://localhost:3000)

---

- URL  [`BACKEND`](https://github.com/yuridomingues/support-system-api)

