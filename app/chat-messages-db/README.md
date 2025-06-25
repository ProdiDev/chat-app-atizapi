# Chat Messages Database

This project is designed to manage chat messages and user information using a SQLite database. It provides functionalities to store, retrieve, and manage chat messages and user data.

## Project Structure

```
chat-messages-db
├── src
│   ├── database
│   │   ├── bancoChat.js       # Handles database operations related to chat messages
│   │   └── bancoUsuarios.js    # Manages user-related database operations
│   └── types
│       └── index.d.ts          # TypeScript types and interfaces for chat messages and user data
├── package.json                # Configuration file for npm dependencies
└── README.md                   # Documentation for the project
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd chat-messages-db
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   Follow the instructions in the respective files to start the application.

## Usage Guidelines

- The `bancoChat.js` file contains functions to manage chat messages, including creating a table for messages, inserting new messages, retrieving messages, and deleting messages.
- The `bancoUsuarios.js` file is responsible for user management, including creating user records and retrieving user information.
- Type definitions for chat messages and user data can be found in `src/types/index.d.ts`, ensuring type safety throughout the application.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.