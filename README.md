# CRUD full stack com Next.js e NestJS

Este projeto é uma aplicação **Full Stack** para gerenciamento de usuários, utilizando **Next.js no frontend** e **NestJS no backend**, com persistência de dados em **PostgreSQL** e **cache com Redis**.

---

## Rode o projeto:

git clone <URL_DO_REPOSITORIO>   
cd <nome-do-repositorio>  

### Suba os serviços PostgreSQL e Redis:

Na raíz do projeto, rode:  

docker-compose up -d  

### Instale as dependências:

Backend:  
cd backend  
npm install  

---

Frontend:  
cd frontend  
npm install  

### Rode a API:

cd backend  
npm run start:dev  

---

### Rode o Frontend:

cd frontend  
npm run dev  

---

## Tecnologias Utilizadas

### **Backend (NestJS)**

- Node.js + TypeScript  
- NestJS  
- TypeORM + PostgreSQL  
- Redis para cache  
- Jest para testes automatizados  

### **Frontend (Next.js)**

- Next.js + TypeScript  
- React Query para gerenciamento de estado  
- Material-UI para UI  

---

### Pré-requisitos

- Node.js versão v20.11.0 (ou superior) 
- npm ou yarn  
- Docker e Docker Compose  
