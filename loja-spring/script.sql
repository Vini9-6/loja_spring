-- Desabilita restrições temporariamente
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `loja_vendas` DEFAULT CHARACTER SET utf8 ;
USE `loja_vendas` ;

-- DROP das tabelas antigas (nomes antigos e novos)
DROP TABLE IF EXISTS ItensVenda;
DROP TABLE IF EXISTS Vendas;
DROP TABLE IF EXISTS Funcionarios;
DROP TABLE IF EXISTS Clientes;
DROP TABLE IF EXISTS Produtos;
DROP TABLE IF EXISTS Fornecedores;
DROP TABLE IF EXISTS Categorias;

DROP TABLE IF EXISTS itens_venda;
DROP TABLE IF EXISTS vendas;
DROP TABLE IF EXISTS funcionarios;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS fornecedores;
DROP TABLE IF EXISTS categorias;

-- Criação das tabelas no padrão minúsculo/underline

CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS fornecedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    contato VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco_unitario DOUBLE NOT NULL,
    quantidade_estoque INT NOT NULL,
    id_categoria INT,
    id_fornecedor INT,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id),
    FOREIGN KEY (id_fornecedor) REFERENCES fornecedores(id)
);

CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200),
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cargo VARCHAR(50),
    salario DOUBLE
);

CREATE TABLE IF NOT EXISTS vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_cliente INT NOT NULL,
    valor_total DOUBLE DEFAULT 0,
    id_funcionario INT,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id),
    FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id)
);

CREATE TABLE IF NOT EXISTS itens_venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_venda INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT DEFAULT 1,
    preco_unitario DOUBLE NOT NULL,
    FOREIGN KEY (id_venda) REFERENCES vendas(id),
    FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

-- Restaura configurações iniciais
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- Categorias
INSERT INTO categorias (nome) VALUES ('Móveis'), ('Roupas'), ('Alimentos');

-- Fornecedores
INSERT INTO fornecedores (nome, contato) VALUES ('Fornecedor C', 'contato@a.com'), ('Fornecedor D', 'contato@b.com');

-- Produtos
INSERT INTO produtos (nome, descricao, preco_unitario, quantidade_estoque, id_categoria, id_fornecedor)
VALUES
  ('Celular', 'Celular Dell', 3500.00, 10, 1, 1),
  ('Calção', 'Calção 100% algodão', 50.00, 30, 2, 2),
  ('Macarrão', 'Macarrao parafuso', 25.00, 100, 3, 1);

-- Clientes
INSERT INTO clientes (nome, endereco, telefone, email)
VALUES
  ('Joanna Silva', 'Rua A, 123', '11999999999', 'joanna@email.com'),
  ('Marcos Souza', 'Rua B, 456', '11888888888', 'mar@email.com');

-- Funcionários
INSERT INTO funcionarios (nome, cargo, salario)
VALUES
  ('André Balada', 'Vendedor', 2000.00),
  ('Amanda Samudio', 'Caixa', 1600.00);

-- Vendas (exemplo: venda feita pelo cliente 1, funcionário 1)
INSERT INTO vendas (data_venda, id_cliente, valor_total, id_funcionario)
VALUES (NOW(), 1, 3550.00, 1);

-- Itens da venda (exemplo: venda 1, produto 1 e 2)
INSERT INTO itens_venda (id_venda, id_produto, quantidade, preco_unitario)
VALUES
  (1, 1, 1, 2500.00),
  (1, 2, 1, 150.00);