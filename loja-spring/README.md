# API Loja Vendas

Este projeto é uma **API RESTful** desenvolvida em **Java** utilizando o framework **Spring Boot** para gerenciar uma loja de vendas. A API permite operações básicas de cadastro, consulta, atualização e exclusão de dados relacionados a produtos, categorias, fornecedores, clientes, funcionários e vendas.

---

## Objetivo

Construir uma API robusta para facilitar a gestão de vendas e estoque, integrando funcionalidades essenciais para um sistema comercial, como:

- Gerenciamento de produtos e suas categorias;
- Controle de fornecedores;
- Cadastro e manutenção de clientes e funcionários;
- Registro e acompanhamento de vendas e seus itens.

---

## Banco de Dados

A API utiliza um banco de dados MySQL, com o esquema `loja_vendas`, que contém as tabelas necessárias para armazenar as informações da loja, como produtos, clientes, funcionários e vendas. O script SQL para criação do banco está incluído no projeto para facilitar a configuração inicial.

---

## Tecnologias Utilizadas

- **Java 17+**
- **Spring Boot**
- **Spring Data JPA** para persistência de dados
- **MySQL** como banco de dados relacional
- **Maven** para gerenciamento de dependências
- **Spring Web** para criação de endpoints REST


---

## Funcionalidades da API

- CRUD (Create, Read, Update, Delete) para:
  - Categorias
  - Fornecedores
  - Produtos
  - Clientes
  - Funcionários
- Registro e consulta de vendas, incluindo seus itens detalhados
- Validações básicas para integridade dos dados
- Relacionamentos entre entidades mapeados com JPA

---

## Como Rodar o Projeto

1. Configure um banco de dados MySQL e execute o script SQL `loja_vendas.sql` para criar o esquema e as tabelas.
2. Ajuste as configurações de conexão no arquivo `application.properties` (URL, usuário e senha do banco).
3. Execute a aplicação Spring Boot (ex: via IDE ou `mvn spring-boot:run`).
4. Acesse os endpoints REST para interagir com a API.

---

## Exemplos de Endpoints

| Método | URL                  | Descrição                   |
|--------|----------------------|-----------------------------|
| GET    | `/produtos`          | Lista todos os produtos      |
| POST   | `/clientes`          | Cadastra um novo cliente     |
| PUT    | `/vendas/{id}`       | Atualiza uma venda existente |
| DELETE | `/fornecedores/{id}` | Remove um fornecedor         |

---

## Contato

Dúvidas e sugestões: [vssoliveir@gmail.com]

---

## Licença

Este projeto é open-source e pode ser utilizado livremente.
