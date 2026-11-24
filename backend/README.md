# FinControl API

## Requisitos
- Java 17+
- Maven 3.9+
- Docker (recomendado para PostgreSQL)

## Subir PostgreSQL
```bash
docker compose up -d
```

## Rodar API
```bash
mvn spring-boot:run
```

API: http://localhost:8080

Endpoints:
- GET /api/expenses
- POST /api/expenses
- DELETE /api/expenses/{id}
