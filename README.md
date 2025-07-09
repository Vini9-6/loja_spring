# API Loja SpringBoot

Este projeto é uma **API RESTful** desenvolvida em **Java** com **Spring Boot** para gerenciar vendas e estoque de uma loja. Inclui backend completo, integração com MySQL e frontend minimalista (HTML, CSS, JS) para facilitar testes e uso.

---

## Objetivo

Oferecer um sistema robusto para:
- Gerenciamento de produtos, categorias e fornecedores
- Cadastro de clientes e funcionários
- Controle de vendas e itens de venda
- Atualização automática de estoque
- Relatórios e agrupamento por categoria

---

## Tecnologias Utilizadas

- **Java 17+**
- **Spring Boot 3**
- **Spring Data JPA**
- **MySQL**
- **Maven**
- **Spring Web**
- **HTML, CSS, JavaScript** (frontend minimalista)

---

## Banco de Dados

- Utiliza o schema `loja_vendas` (MySQL)
- Script SQL incluso (`script.sql`) para criar e popular as tabelas
- Nomes de tabelas e colunas padronizados em minúsculo/underline

---

## Funcionalidades da API

- CRUD completo para:
  - Categorias
  - Fornecedores (opcional em Produto)
  - Produtos (categoria e fornecedor opcionais)
  - Clientes
  - Funcionários (opcional em Venda)
- Registro e consulta de vendas e itens
- Atualização automática de estoque ao registrar vendas
- Relacionamentos JPA mapeados e serialização JSON ajustada
- Relatórios e agrupamento de produtos por categoria
- Validação de integridade referencial (não permite remover produtos vinculados a vendas)
- Frontend com selects para clientes, categorias e fornecedores, evitando erros de integridade

---

## Como Rodar e Testar a Aplicação

### 1. Configurar o Banco de Dados

- Crie um banco MySQL local (ou use Docker, se preferir)
- Execute o script `script.sql` para criar e popular as tabelas:
  ```sql
  -- No MySQL CLI ou Workbench:
  SOURCE caminho/para/script.sql;
  ```

### 2. Configurar a Aplicação

- Edite o arquivo `src/main/resources/application.properties` com as credenciais do seu banco:
  ```properties
  spring.datasource.url=jdbc:mysql://localhost:3307/loja_vendas
  spring.datasource.username=root
  spring.datasource.password=admin
  spring.jpa.hibernate.ddl-auto=none
  ```

### 3. Rodar o Backend (Spring Boot)

- Via terminal:
  ```shell
  mvn spring-boot:run
  ```
- Ou execute a classe principal na sua IDE

### 4. Acessar o Frontend

- Após iniciar o backend, abra o arquivo `src/main/resources/static/index.html` no navegador ou acesse [http://localhost:8080](http://localhost:8080)
- O frontend consome os endpoints REST e permite testar cadastros, edições e consultas
- Certifique-se de preencher todos os campos obrigatórios
- O frontend exibe selects para clientes, categorias e fornecedores, evitando IDs inválidos

### 5. Testar Endpoints Manualmente

- Use ferramentas como **Postman** ou **Insomnia** para testar os endpoints REST
- Exemplos:
  - `GET /api/produtos` — lista produtos
  - `POST /api/clientes` — cadastra cliente
  - `POST /api/vendas` — cadastra venda (cliente obrigatório)
  - `DELETE /api/fornecedores/{id}` — remove fornecedor

### 6. Dicas de Teste e Integração

- O frontend já está preparado para enviar os dados no formato correto (JSON)
- Todos os relacionamentos estão ajustados para evitar recursão infinita no JSON
- O backend valida a existência de cliente ao salvar vendas e impede remoção de produtos vinculados a vendas

---

## Exemplos de Endpoints

| Método | URL                        | Descrição                        |
|--------|----------------------------|----------------------------------|
| GET    | `/api/produtos`            | Lista todos os produtos          |
| POST   | `/api/clientes`            | Cadastra um novo cliente         |
| POST   | `/api/vendas`              | Cadastra uma nova venda          |
| DELETE | `/api/fornecedores/{id}`   | Remove um fornecedor             |

---

## Contato

Dúvidas e sugestões: [vssoliveir@gmail.com]

---

## Licença

Este projeto é open-source e pode ser utilizado livremente.
