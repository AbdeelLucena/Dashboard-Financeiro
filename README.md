# FinControl — React + Spring Boot + PostgreSQL

Projeto de controle de gastos baseado no dashboard da referência.

## Stack
- Frontend: React + Vite + CSS + Lucide React
- Backend: Java 17 + Spring Boot + Spring Data JPA
- Banco: PostgreSQL 16
- API REST: `/api/expenses`

## 1. Banco de dados
Dentro de `backend`:
```bash
docker compose up -d
```

Isso cria o PostgreSQL com:
- Banco: `fincontrol`
- Usuário: `postgres`
- Senha: `postgres`
- Porta: `5432`

## 2. Backend
```bash
cd backend
mvn spring-boot:run
```

API em `http://localhost:8080`.

## 3. Frontend
Na raiz do projeto:
```bash
npm install
npm run dev
```

Frontend em `http://localhost:5173`.

## CRUD implementado
- `GET /api/expenses` — lista despesas
- `POST /api/expenses` — cadastra despesa
- `DELETE /api/expenses/{id}` — exclui despesa

O React já está configurado para consumir a API. As despesas deixam de depender do `localStorage` e passam a ser persistidas no PostgreSQL.
