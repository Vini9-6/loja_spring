package com.loja.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Fornecedores")
public class Fornecedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 100)
    private String contato;

    @OneToMany(mappedBy = "fornecedor")
    private List<Produto> produtos;

    // Getters e Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getContato() { return contato; }
    public void setContato(String contato) { this.contato = contato; }
    public List<Produto> getProdutos() { return produtos; }
    public void setProdutos(List<Produto> produtos) { this.produtos = produtos; }
}
