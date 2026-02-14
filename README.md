# Client Organizer - Legal Client Management System

Web system developed in Node.js/TypeScript for managing clients and legal cases, featuring calendar, file upload, and user authentication functionalities.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Architecture](#project-architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Structure](#database-structure)
- [Features](#features)
- [API Routes](#api-routes)
- [Screenshots](#screenshots)

---

## Overview

**Client Organizer** is a web application designed for law firms and legal professionals, enabling:

- Complete client registration and management
- Control of legal cases linked to clients
- Management of important dates (hearings, deadlines, payments)
- Upload and organization of documents per case
- Interactive calendar with appointment visualization
- Dashboard with upcoming weekly events
- Secure authentication system

---

## Technologies Used

### Backend
| Technology | Version | Description |
|------------|---------|-------------|
| **Node.js** | - | JavaScript Runtime |
| **Express** | 5.1.0 | Web Framework |
| **TypeScript** | - | Typed JavaScript Superset |
| **Sequelize** | 6.37.7 | Database ORM |
| **MySQL2** | 3.16.0 | Database Driver |

### Authentication and Security
| Technology | Version | Description |
|------------|---------|-------------|
| **bcrypt** | 6.0.0 | Password Hashing |
| **express-session** | 1.19.0 | Session Management |

### Templates and Upload
| Technology | Version | Description |
|------------|---------|-------------|
| **Mustache-Express** | 1.3.2 | Template Engine |
| **Multer** | 2.0.2 | File Upload |


### Utilities
| Technology | Version | Description |
|------------|---------|-------------|
| **dotenv** | 17.2.3 | Environment Variables |
| **method-override** | 3.0.0 | HTTP Methods Support (PUT/DELETE) |
| **validator** | 13.15.20 | Data Validation |

---

## Project Architecture

```
client-organizer/
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── README.md               # Documentation
│
├── public/                 # Static files
│   ├── css/
│   │   └── style.css       # Application styles
│   ├── images/             # Static images
│   └── uploads/            # Uploaded files (per case)
│       └── processo_{id}/  # Folder for each case
│
└── src/                    # Source code
    ├── server.ts           # Application entry point
    │
    ├── config/
    │   └── multer.ts       # File upload configuration
    │
    ├── controllers/        # Business logic
    │   ├── arquivoController.ts    # File management
    │   ├── calendarioController.ts # Event calendar
    │   ├── clienteController.ts    # Client/case CRUD
    │   ├── homeController.ts       # Main dashboard
    │   ├── loginContoller.ts       # Authentication
    │   └── meetingsController.ts   # Meetings management
    │
    ├── instances/
    │   └── mysql.ts        # Database connection
    │
    ├── models/             # Sequelize models
    │   ├── Arquivo.ts      # File model
    │   ├── Cliente.ts      # Client/case model
    │   ├── Meetings.ts     # Meetings model
    │   └── Users.ts        # User model
    │
    ├── routes/
    │   └── index.ts        # Route definitions
    │
    ├── utils/
    │   └── hashSenha.ts    # Password hash utility
    │
    └── views/              # Mustache templates
        ├── pages/          # Application pages
        │   ├── arquivoDelete.mustache
        │   ├── arquivosPage.mustache
        │   ├── arquivoUpload.mustache
        │   ├── calendario.mustache
        │   ├── clienteAdd.mustache
        │   ├── clienteAddProcesso.mustache
        │   ├── clienteDelete.mustache
        │   ├── clienteEdit.mustache
        │   ├── clienteList.mustache
        │   ├── clientePage.mustache
        │   ├── erroCpfCadastro.mustache
        │   ├── home.mustache
        │   ├── login.mustache
        │   ├── loginErrado.mustache
        │   ├── meetingAdd.mustache
        │   ├── meetingDelete.mustache
        │   └── processoEdit.mustache
        │
        └── partials/       # Reusable components
            ├── footer.mustache
            └── header.mustache
```

---

## Installation

### Prerequisites
- Node.js (version 18 or higher recommended)
- MySQL 8.0+
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/LGMAZZER/clientOrganizer
cd client-organizer
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit the .env file with your settings
```

4. **Create the database**
```sql
CREATE DATABASE client_organizer;
```

5. **Start the application**
```bash
# Development mode (with hot reload)
npm run start-dev

# Production mode
npm run watch-ts  # In one terminal
npm start         # In another terminal
```

---

## Configuration

### Environment Variables (.env)

Create a `.env` file in the project root:

```env
# Server
PORT=3000

# MySQL Database
MYSQL_DB=client_organizer
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_PORT=3306

# Session
SESSION_SECRET=your_very_secure_secret_key_here
```

### Database Configuration

The system uses Sequelize ORM. Tables are automatically created based on the models.

---

## Database Structure

### Table: `clientes_processos`

Stores client information and their legal cases.

| Field | Type | Description |
|-------|------|-------------|
| `id` | INT (PK) | Unique identifier |
| `id2` | INT | Reference to main client |
| `nome_completo` | VARCHAR | Client's full name |
| `cpf` | VARCHAR | CPF (unique) |
| `rg` | VARCHAR | RG (ID number) |
| `data_nascimento` | DATE | Date of birth |
| `estado_civil` | VARCHAR | Marital status |
| `naturalidade` | VARCHAR | Place of birth |
| `telefone_contato` | VARCHAR | Phone number |
| `email` | VARCHAR | Email |
| `endereco_residencial` | TEXT | Residential address |
| `profissao` | VARCHAR | Profession |
| `nome_conjuge` | VARCHAR | Spouse's name |
| `profissao_conjuge` | VARCHAR | Spouse's profession |
| `numero_filhos` | INT | Number of children |
| `idade_filhos` | VARCHAR | Children's ages |
| `empresa_trabalho` | VARCHAR | Employer |
| `endereco_comercial` | TEXT | Business address |
| `telefone_comercial` | VARCHAR | Business phone |
| `numero_processo` | VARCHAR | Case number (unique) |
| `acao` | VARCHAR | Type of legal action |
| `vara` | VARCHAR | Court division |
| `data_protocolo` | DATE | Filing date |
| `data_audiencia` | DATETIME | Hearing date/time |
| `data_contestacao` | DATETIME | Response date |
| `data_alegacoes` | DATETIME | Final arguments date |
| `data_recurso` | DATETIME | Appeal date |
| `data_sentenca` | DATETIME | Sentence date |
| `data_transito_julgado` | DATE | Final judgment date |
| `honorarios` | DECIMAL(15,2) | Legal fees |
| `data_pagamento` | DATE | Payment date |
| `plano_pagamento` | TEXT | Payment plan description |
| `observacoes` | TEXT | General notes |
| `criado_em` | DATETIME | Creation date |

### Table: `arquivos_processos`

Stores files attached to cases.

| Field | Type | Description |
|-------|------|-------------|
| `id` | INT (PK) | Unique identifier |
| `processo_id` | INT | Related case ID |
| `nome_original` | VARCHAR | Original filename |
| `nome_salvo` | VARCHAR | Unique name (crypto.randomUUID()) on server |
| `tipo` | VARCHAR | MIME type |
| `tamanho` | INT | Size in bytes |
| `caminho` | VARCHAR | Server path |
| `criado_em` | DATETIME | Upload date |

### Table: `users`

Stores system users.

| Field | Type | Description |
|-------|------|-------------|
| `id` | INT (PK) | Unique identifier |
| `email` | VARCHAR | Email (unique) |
| `senha` | VARCHAR | Password (bcrypt hash) |
| `nome` | VARCHAR | User name |
| `criado_em` | DATETIME | Creation date |

### Table: `meetings`

Stores meetings and appointments.

| Field | Type | Description |
|-------|------|-------------|
| `id` | INT (PK) | Unique identifier |
| `name_meeting` | VARCHAR | Meeting name/description |
| `date_meeting` | DATE | Meeting date |
| `link_meeting` | VARCHAR | Meeting Link |

### SQL Script to Create Tables

```sql
-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Clients and cases table
CREATE TABLE clientes_processos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id2 INT,
    nome_completo VARCHAR(255) NOT NULL,
    cpf VARCHAR(20),
    rg VARCHAR(50),
    data_nascimento DATE,
    estado_civil VARCHAR(50),
    naturalidade VARCHAR(100),
    telefone_contato VARCHAR(20),
    email VARCHAR(255),
    endereco_residencial TEXT,
    profissao VARCHAR(100),
    nome_conjuge VARCHAR(255),
    profissao_conjuge VARCHAR(100),
    numero_filhos INT DEFAULT 0,
    idade_filhos VARCHAR(100),
    empresa_trabalho VARCHAR(255),
    endereco_comercial TEXT,
    telefone_comercial VARCHAR(20),
    numero_processo VARCHAR(100) UNIQUE,
    acao VARCHAR(255),
    vara VARCHAR(100),
    data_protocolo DATE,
    data_audiencia DATETIME,
    data_contestacao DATETIME,
    data_alegacoes DATETIME,
    data_recurso DATETIME,
    data_sentenca DATETIME,
    data_transito_julgado DATE,
    honorarios DECIMAL(15,2) DEFAULT 0.00,
    data_pagamento DATE,
    plano_pagamento TEXT,
    observacoes TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Files table
CREATE TABLE arquivos_processos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    processo_id INT NOT NULL,
    nome_original VARCHAR(255) NOT NULL,
    nome_salvo VARCHAR(255) NOT NULL,
    tipo VARCHAR(100),
    tamanho INT,
    caminho VARCHAR(500),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (processo_id) REFERENCES clientes_processos(id) ON DELETE CASCADE
);

-- Meetings table
CREATE TABLE meetings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_meeting VARCHAR(255) NOT NULL,
    date_meeting DATE NOT NULL,
    link_meeting varchar(255)
);

-- Create initial user (password: admin123)
-- Use the utility src/utils/hashSenha.ts to generate new hashes
INSERT INTO users (email, senha, nome) VALUES (
    'admin@email.com',
    '$2b$10$...(generated_hash)',
    'Administrator'
);
```

---

## Features

### Authentication
- Login with email and password
- Sessions lasting 24 hours
- Route protection middleware
- Secure logout with session destruction

### Client Management
- **Complete registration**: personal, contact, professional, and family data
- **Editing**: update client information
- **Deletion**: removes client and all associated files
- **Search**: search by name or case number
- **Pagination**: navigation with 10 items per page
- **CPF validation**: prevents duplicate registrations

### Case Management
- A client can have multiple cases
- Each case contains:
  - Case number
  - Legal action type
  - Court division
  - Important dates (filing, hearing, response, etc.)
  - Legal fees and payment plan
  - Notes

### Calendar
- Monthly event view
- Navigation between months and years
- Filter by specific month and year
- Automatically displays:
  - Hearings (with time)
  - Filing deadlines
  - Payment dates
  - Responses, arguments, appeals, and sentences
  - Final judgments
  - Meetings

### Dashboard (Home)
- Shows events for the next 7-14 days
- Current day information
- Quick access to main features
- List sorted by date proximity

### File Management
- **Upload**: PDF, DOC, DOCX, JPG, PNG
- **Limit**: 500MB per file
- **Organization**: files separated by case folder
- **Unique names**: crypto.randomUUID() usage to avoid conflicts
- **Download**: direct file access
- **Deletion**: removes file from disk and database

### Meetings Management
- **Create meetings**: add new meetings/appointments
- **View in calendar**: meetings displayed in the calendar view
- **Delete meetings**: remove scheduled meetings

---

## API Routes

### Authentication
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/login` | Login page |
| POST | `/login` | Process login |
| POST | `/logout` | Logout |
| GET | `/loginerrado` | Login error page |

### Clients
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Dashboard (home) |
| GET | `/addcliente` | New client form |
| POST | `/novocliente` | Create client |
| GET | `/vizualizarclientes` | List clients |
| GET | `/cliente/:id` | Client details |
| GET | `/editarcliente/:id` | Edit client form |
| PUT | `/clienteeditado/:id` | Update client |
| GET | `/deletarcliente/:id` | Deletion confirmation |
| DELETE | `/deletarcliente/:id` | Delete client |

### Cases
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/clienteaddprocesso/:id` | New case form |
| POST | `/clientenovoprocesso/:id` | Create case |
| GET | `/editarprocesso/:id` | Edit case form |
| PUT | `/processoeditado/:id` | Update case |

### Calendar
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/calendario` | Calendar page |

**Calendar Query Parameters:**
- `numMonth`: month number (0-11)
- `year`: year
- `mais`: next month
- `menos`: previous month
- `month_dateNum`: go to specific month (1-12)
- `year_dateNum`: go to specific year

### Files
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/arquivosprocessos/:id` | List case files |
| GET | `/uploadarquivo/:id` | Upload form |
| POST | `/uploadnovoarquivo/:id` | Upload file |
| GET | `/arquivodelete/:id` | Deletion confirmation |
| DELETE | `/arquivodelete/:id` | Delete file |

### Meetings
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/novareuniao` | New meeting form |
| POST | `/novareuniao` | Create meeting |
| GET | `/deletarreuniao/:id` | Deletion confirmation |
| DELETE | `/deletarreuniao/:id` | Delete meeting |

---

## NPM Scripts

```bash
# Start in development mode (with nodemon)
npm run start-dev

# Compile TypeScript in watch mode
npm run watch-ts

# Start compiled version (production)
npm start


```

---

## Creating Initial User

To create the first system user:

1. Edit the file `src/utils/hashSenha.ts`:
```typescript
const senha = "your_password_here";
```

2. Run the utility:
```bash
npx ts-node src/utils/hashSenha.ts
```

3. Copy the generated SQL and execute in MySQL:
```sql
INSERT INTO users (email, senha, nome) VALUES ('email@example.com', '$2b$10$...hash...', 'Name');
```

---

## Styling

The system uses pure CSS with:
- Modern design with green gradient tones
- Responsive layout
- Inter font from Google Fonts
- Consistent components (buttons, forms, tables)
- Visual feedback on interactions (hover, focus)

---

## Security

- Passwords stored with bcrypt hash (salt rounds: 10)
- Configurable secret key sessions
- Authentication middleware on protected routes
- File type validation on upload
- Input sanitization with empty values converted to null

---

## Important Notes

1. **Timezone**: The system converts hearing times from UTC to GMT-3 (Brazil)
2. **Client/Case Relationship**: The `id2` field links cases to the main client
3. **Files**: Organized in folders per case (`processo_{id}`)
4. **CPF**: Stored without formatting (digits only), formatted on display


---

## Author

Luis Gustavo Paes de Almeida
