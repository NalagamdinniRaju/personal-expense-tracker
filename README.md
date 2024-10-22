# Personal Expense Tracker API

A comprehensive RESTful API built with Node.js and Express.js for managing personal financial records. Track your income and expenses, manage transactions, and generate detailed financial reports.

## Features

- 🔐 Secure user authentication
- 💰 Transaction management
- 📊 Financial reporting and analytics
- 🗂️ Category-based organization
- 📱 RESTful API endpoints
- 📄 Pagination support
- 🔒 JWT-based security

## Tech Stack

- **Backend Framework**: Node.js + Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs
- **Validation**: Express Validator
- **Documentation**: Postman / Insomnia

## Database Schema

### Users
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```



### Categories
```sql
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Transactions
```sql
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
    category_id INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    date DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/transactions` | Create transaction |
| GET | `/api/transactions` | List transactions |
| GET | `/api/transactions/:id` | Get transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |

### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports/summary` | Overall summary |
| GET | `/api/reports/monthly` | Monthly report |
| GET | `/api/reports/category` | Category report |

## Setup Instructions

1. **Clone the Repository**
```bash
git clone https://github.com/NalagamdinniRaju/personal-expense-tracker.git
cd personal-expense-tracker
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
PORT=5000
JWT_SECRET=mysupersecretkey123
DB_PATH=./src/database.sqlite
NODE_ENV=development
```

4. **Initialize Database**
```bash
npm run init-db
```

5. **Start the Server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```


## Error Handling

The API uses standard HTTP response codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Server Error

## Testing

Run the test suite:
```bash
npm test
```
