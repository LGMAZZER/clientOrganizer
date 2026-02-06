# Client Organizer - Sistema de Gerenciamento de Clientes Jurídicos

Sistema web desenvolvido em Node.js/TypeScript para gerenciamento de clientes e processos jurídicos, com funcionalidades de calendário, upload de arquivos e autenticação de usuários.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
- [Funcionalidades](#funcionalidades)
- [Rotas da API](#rotas-da-api)
- [Screenshots](#screenshots)

---

## Visão Geral

O **Client Organizer** é uma aplicação web projetada para escritórios de advocacia e profissionais jurídicos, permitindo:

- Cadastro e gerenciamento completo de clientes
- Controle de processos jurídicos vinculados aos clientes
- Gerenciamento de datas importantes (audiências, prazos, pagamentos)
- Upload e organização de documentos por processo
- Calendário interativo com visualização de compromissos
- Dashboard com eventos próximos da semana
- Sistema de autenticação seguro

---

## Tecnologias Utilizadas

### Backend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Node.js** | - | Runtime JavaScript |
| **Express** | 5.1.0 | Framework web |
| **TypeScript** | - | Superset tipado do JavaScript |
| **Sequelize** | 6.37.7 | ORM para banco de dados |
| **MySQL2** | 3.16.0 | Driver do banco de dados |

### Autenticação e Segurança
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **bcrypt** | 6.0.0 | Hash de senhas |
| **express-session** | 1.19.0 | Gerenciamento de sessões |

### Templates e Upload
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Mustache-Express** | 1.3.2 | Template engine |
| **Multer** | 2.0.2 | Upload de arquivos |
| **UUID** | 13.0.0 | Geração de nomes únicos para arquivos |

### Utilitários
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **dotenv** | 17.2.3 | Variáveis de ambiente |
| **method-override** | 3.0.0 | Suporte a métodos HTTP (PUT/DELETE) |
| **validator** | 13.15.20 | Validação de dados |

---

## Arquitetura do Projeto

```
node copy/
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
├── README.md               # Documentação
│
├── public/                 # Arquivos estáticos
│   ├── css/
│   │   └── style.css       # Estilos da aplicação
│   ├── images/             # Imagens estáticas
│   └── uploads/            # Arquivos uploadados (por processo)
│       └── processo_{id}/  # Pasta de cada processo
│
└── src/                    # Código fonte
    ├── server.ts           # Ponto de entrada da aplicação
    │
    ├── config/
    │   └── multer.ts       # Configuração do upload de arquivos
    │
    ├── controllers/        # Lógica de negócio
    │   ├── arquivoController.ts    # Gerenciamento de arquivos
    │   ├── calendarioController.ts # Calendário de eventos
    │   ├── clienteController.ts    # CRUD de clientes/processos
    │   ├── homeController.ts       # Dashboard principal
    │   └── loginContoller.ts       # Autenticação
    │
    ├── instances/
    │   └── mysql.ts        # Conexão com banco de dados
    │
    ├── models/             # Modelos do Sequelize
    │   ├── Arquivo.ts      # Modelo de arquivos
    │   ├── Cliente.ts      # Modelo de clientes/processos
    │   └── Users.ts        # Modelo de usuários
    │
    ├── routes/
    │   └── index.ts        # Definição de rotas
    │
    ├── utils/
    │   └── hashSenha.ts    # Utilitário para gerar hash de senha
    │
    └── views/              # Templates Mustache
        ├── pages/          # Páginas da aplicação
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
        │   └── processoEdit.mustache
        │
        └── partials/       # Componentes reutilizáveis
            ├── footer.mustache
            └── header.mustache
```

---

## Instalação

### Pré-requisitos
- Node.js (versão 18 ou superior recomendada)
- MySQL 8.0+
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd node\ copy
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Crie o banco de dados**
```sql
CREATE DATABASE client_organizer;
```

5. **Inicie a aplicação**
```bash
# Modo desenvolvimento (com hot reload)
npm run start-dev

# Modo produção
npm run watch-ts  # Em um terminal
npm start         # Em outro terminal
```

---

## Configuração

### Variáveis de Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto:

```env
# Servidor
PORT=3000

# Banco de Dados MySQL
MYSQL_DB=client_organizer
MYSQL_USER=seu_usuario
MYSQL_PASSWORD=sua_senha
MYSQL_PORT=3306

# Sessão
SESSION_SECRET=sua_chave_secreta_muito_segura_aqui
```

### Configuração do Banco de Dados

O sistema utiliza Sequelize ORM. As tabelas são criadas automaticamente baseadas nos models.

---

## Estrutura do Banco de Dados

### Tabela: `clientes_processos`

Armazena informações de clientes e seus processos jurídicos.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT (PK) | Identificador único |
| `id2` | INT | Referência ao cliente principal |
| `nome_completo` | VARCHAR | Nome completo do cliente |
| `cpf` | VARCHAR | CPF (único) |
| `rg` | VARCHAR | RG |
| `data_nascimento` | DATE | Data de nascimento |
| `estado_civil` | VARCHAR | Estado civil |
| `naturalidade` | VARCHAR | Naturalidade |
| `telefone_contato` | VARCHAR | Telefone |
| `email` | VARCHAR | E-mail |
| `endereco_residencial` | TEXT | Endereço residencial |
| `profissao` | VARCHAR | Profissão |
| `nome_conjuge` | VARCHAR | Nome do cônjuge |
| `profissao_conjuge` | VARCHAR | Profissão do cônjuge |
| `numero_filhos` | INT | Número de filhos |
| `idade_filhos` | VARCHAR | Idades dos filhos |
| `empresa_trabalho` | VARCHAR | Empresa onde trabalha |
| `endereco_comercial` | TEXT | Endereço comercial |
| `telefone_comercial` | VARCHAR | Telefone comercial |
| `numero_processo` | VARCHAR | Número do processo (único) |
| `acao` | VARCHAR | Tipo de ação judicial |
| `vara` | VARCHAR | Vara do processo |
| `data_protocolo` | DATE | Data de protocolo |
| `data_audiencia` | DATETIME | Data/hora da audiência |
| `data_contestacao` | DATETIME | Data de contestação |
| `data_alegacoes` | DATETIME | Data das alegações finais |
| `data_recurso` | DATETIME | Data do recurso |
| `data_sentenca` | DATETIME | Data da sentença |
| `data_transito_julgado` | DATE | Data do trânsito em julgado |
| `honorarios` | DECIMAL(15,2) | Valor dos honorários |
| `data_pagamento` | DATE | Data de pagamento |
| `plano_pagamento` | TEXT | Descrição do plano pagamento |
| `observacoes` | TEXT | Observações gerais |
| `criado_em` | DATETIME | Data de criação |

### Tabela: `arquivos_processos`

Armazena os arquivos anexados aos processos.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT (PK) | Identificador único |
| `processo_id` | INT | ID do processo relacionado |
| `nome_original` | VARCHAR | Nome original do arquivo |
| `nome_salvo` | VARCHAR | Nome único (UUID) no servidor |
| `tipo` | VARCHAR | Tipo MIME do arquivo |
| `tamanho` | INT | Tamanho em bytes |
| `caminho` | VARCHAR | Caminho no servidor |
| `criado_em` | DATETIME | Data de upload |

### Tabela: `users`

Armazena os usuários do sistema.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT (PK) | Identificador único |
| `email` | VARCHAR | E-mail (único) |
| `senha` | VARCHAR | Senha (hash bcrypt) |
| `nome` | VARCHAR | Nome do usuário |
| `criado_em` | DATETIME | Data de criação |

### Script SQL para Criar Tabelas

```sql
-- Tabela de usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de clientes e processos
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

-- Tabela de arquivos
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

-- Criar usuário inicial (senha: admin123)
-- Use o utilitário src/utils/hashSenha.ts para gerar novos hashes
INSERT INTO users (email, senha, nome) VALUES (
    'admin@email.com',
    '$2b$10$...(hash_gerado)',
    'Administrador'
);
```

---

## Funcionalidades

### Autenticação
- Login com e-mail e senha
- Sessões com duração de 24 horas
- Middleware de proteção de rotas
- Logout seguro com destruição de sessão

### Gerenciamento de Clientes
- **Cadastro completo**: dados pessoais, contato, profissionais e familiares
- **Edição**: atualização de informações do cliente
- **Exclusão**: remove cliente e todos os arquivos associados
- **Busca**: pesquisa por nome ou número de processo
- **Paginação**: navegação com 10 itens por página
- **Validação de CPF**: evita duplicidade de cadastro

### Gerenciamento de Processos
- Um cliente pode ter múltiplos processos
- Cada processo contém:
  - Número do processo
  - Ação judicial
  - Vara
  - Datas importantes (protocolo, audiência, contestação, etc.)
  - Honorários e plano de pagamento
  - Observações

### Calendário
- Visualização mensal de eventos
- Navegação entre meses e anos
- Filtro por mês e ano específicos
- Exibe automaticamente:
  - Audiências (com horário)
  - Prazos de protocolo
  - Datas de pagamento
  - Contestações, alegações, recursos e sentenças
  - Trânsito em julgado

### Dashboard (Home)
- Exibe eventos dos próximos 7-14 dias
- Informação do dia atual
- Acesso rápido às principais funcionalidades
- Lista ordenada por proximidade da data

### Gerenciamento de Arquivos
- **Upload**: PDF, DOC, DOCX, JPG, PNG
- **Limite**: 500MB por arquivo
- **Organização**: arquivos separados por pasta do processo
- **Nomes únicos**: uso de UUID para evitar conflitos
- **Download**: acesso direto aos arquivos
- **Exclusão**: remove arquivo do disco e do banco

---

## Rotas da API

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/login` | Página de login |
| POST | `/login` | Processar login |
| GET | `/logout` | Fazer logout |
| GET | `/loginerrado` | Página de erro de login |

### Clientes
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Dashboard (home) |
| GET | `/addcliente` | Formulário novo cliente |
| POST | `/novocliente` | Criar cliente |
| GET | `/vizualizarclientes` | Listar clientes |
| GET | `/cliente/:id` | Detalhes do cliente |
| GET | `/editarcliente/:id` | Formulário editar cliente |
| POST | `/clienteeditado/:id` | Atualizar cliente |
| GET | `/deletarcliente/:id` | Confirmação exclusão |
| DELETE | `/deletarcliente/:id` | Excluir cliente |

### Processos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/clienteaddprocesso/:id` | Formulário novo processo |
| POST | `/clientenovoprocesso/:id` | Criar processo |
| GET | `/editarprocesso/:id` | Formulário editar processo |
| POST | `/processoeditado/:id` | Atualizar processo |

### Calendário
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/calendario` | Página do calendário |

**Query Parameters do Calendário:**
- `numMonth`: número do mês (0-11)
- `year`: ano
- `mais`: próximo mês
- `menos`: mês anterior
- `month_dateNum`: ir para mês específico (1-12)
- `year_dateNum`: ir para ano específico

### Arquivos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/arquivosprocessos/:id` | Listar arquivos do processo |
| GET | `/uploadarquivo/:id` | Formulário upload |
| POST | `/uploadnovoarquivo/:id` | Upload de arquivo |
| GET | `/arquivodelete/:id` | Confirmação exclusão |
| DELETE | `/arquivodelete/:id` | Excluir arquivo |

---

## Scripts NPM

```bash
# Iniciar em modo desenvolvimento (com nodemon)
npm run start-dev

# Compilar TypeScript em modo watch
npm run watch-ts

# Iniciar versão compilada (produção)
npm start

# Executar testes (não configurado)
npm test
```

---

## Criando Usuário Inicial

Para criar o primeiro usuário do sistema:

1. Edite o arquivo `src/utils/hashSenha.ts`:
```typescript
const senha = "sua_senha_aqui";
```

2. Execute o utilitário:
```bash
npx ts-node src/utils/hashSenha.ts
```

3. Copie o SQL gerado e execute no MySQL:
```sql
INSERT INTO users (email, senha, nome) VALUES ('email@exemplo.com', '$2b$10$...hash...', 'Nome');
```

---

## Estilização

O sistema utiliza CSS puro com:
- Design moderno com gradientes em tons de verde
- Layout responsivo
- Fonte Inter do Google Fonts
- Componentes consistentes (botões, formulários, tabelas)
- Feedback visual em interações (hover, focus)

---

## Segurança

- Senhas armazenadas com hash bcrypt (salt rounds: 10)
- Sessões com chave secreta configurável
- Middleware de autenticação em rotas protegidas
- Validação de tipos de arquivo no upload
- Sanitização de inputs com conversão de valores vazios para null

---

## Observações Importantes

1. **Timezone**: O sistema converte horários de audiência do UTC para GMT-3 (Brasil)
2. **Relacionamento Cliente/Processo**: O campo `id2` vincula processos ao cliente principal
3. **Arquivos**: São organizados em pastas por processo (`processo_{id}`)
4. **CPF**: Armazenado sem formatação (apenas dígitos), formatado na exibição

---

## Possíveis Melhorias Futuras

- [ ] Implementar testes automatizados
- [ ] Adicionar validação de CPF
- [ ] Implementar recuperação de senha
- [ ] Adicionar níveis de permissão de usuário
- [ ] Criar API REST com autenticação JWT
- [ ] Implementar backup automático de arquivos
- [ ] Adicionar notificações por e-mail de eventos
- [ ] Criar relatórios exportáveis (PDF)

---

## Licença

Este projeto está sob a licença ISC.

---

## Autor

Desenvolvido para gerenciamento de clientes jurídicos.
