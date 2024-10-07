# Frello - Project Management Application

Frello is an interactive and user-friendly project management application inspired by Trello. Built with React, it allows users to manage boards, lists, and tasks seamlessly with real-time updates. The frontend is styled with SCSS, providing a modern and responsive design.

## Live Demo

Check out the live version of the project [here](https://frello-lion.onrender.com/).

## Features

- **Board Management:** Create, edit, and delete boards to organize your projects.
- **Task Management:** Add, edit, delete, and reorder tasks within lists.
- **Lists:** Organize tasks into lists for better management and tracking.
- **Real-time Collaboration:** Experience real-time updates, allowing multiple users to collaborate efficiently.
- **Responsive Design:** The interface is styled using SCSS for a responsive and dynamic user experience.

## Technologies Used

- **React** for building the interactive UI components.
- **SCSS** for customized and responsive styling.
- **Socket.IO** for real-time updates and collaboration.
- **Redux** for state management.
- **Axios** for API requests.
- **Vite** for fast development.
- **Date pickers:** `react-datepicker`, `react-day-picker`.
- **Styled-components** for component-level styling.
- **React-beautiful-dnd** for drag-and-drop functionality.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A package manager like npm or yarn.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/natiapa/frello.git
    ```
2. Navigate to the frontend directory:
    ```bash
    cd frello-frontend
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open your browser and navigate to `http://localhost:3030`.

## Usage

1. Create boards to represent different projects.
2. Add lists and tasks to each board.
3. Edit, reorder, or delete tasks as needed.
4. Collaborate with others in real-time.

## Folder Structure

- `src/components` - Contains all React components used in the app.
- `src/styles` - Contains SCSS files for styling the app.
- `src/services` - Includes services for API calls and real-time updates.

## Credits

This project was developed collaboratively by:
- [Yana Pletner](https://github.com/YanaPletner)
- [Avi Friedman](https://github.com/avi-friedman-IL)
- [Nati Apa](https://github.com/natiapa)


## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh.


