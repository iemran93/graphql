- suggested folder structure:

graphql-project/
├── public/                # Public assets (e.g., favicon, static images)
├── src/                   # Main source folder
│   ├── apollo/            # Apollo Client setup
│   │   └── apollo-client.js
│   ├── components/        # Reusable UI components
│   │   ├── Profile.jsx
│   │   ├── Login.jsx
│   │   └── Graphs/        # Subfolder for graph-related components
│   │       ├── XPGraph.jsx
│   │       └── StatsGraph.jsx
│   ├── graphql/           # GraphQL queries, mutations, and fragments
│   │   ├── queries.js
│   │   ├── mutations.js
│   │   └── fragments.js
│   ├── pages/             # Page components (used with routing)
│   │   ├── HomePage.jsx
│   │   └── LoginPage.jsx
│   ├── styles/            # CSS or styling files
│   │   └── App.css
│   ├── utils/             # Utility functions or helpers
│   │   └── auth.js        # E.g., JWT management
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Entry point of the application
│   └── index.css          # Global CSS
├── .env                   # Environment variables (e.g., API URL)
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
