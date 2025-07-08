package com.loja.model;

// entidade produto
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "produtos")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // id do produto

    @Column(name = "nome", nullable = false, length = 100)
    private String nome; // nome do produto

    @Column(name = "descricao", columnDefinition = "TEXT")
    private String descricao; // descricao do produto

    @Column(name = "preco_unitario", nullable = false)
    private Double precoUnitario; // preco unitario

    @Column(name = "quantidade_estoque", nullable = false)
    private Integer quantidadeEstoque = 0; // quantidade em estoque

    @ManyToOne(optional = true)
    @JoinColumn(name = "id_categoria", nullable = true)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties("produtos")
    private Categoria categoria; // categoria opcional

    @ManyToOne(optional = true)
    @JoinColumn(name = "id_fornecedor", nullable = true)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties("produtos")
    private Fornecedor fornecedor; // fornecedor opcional

    // getters e setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public Double getPrecoUnitario() { return precoUnitario; }
    public void setPrecoUnitario(Double precoUnitario) { this.precoUnitario = precoUnitario; }
    public Integer getQuantidadeEstoque() { return quantidadeEstoque; }
    public void setQuantidadeEstoque(Integer quantidadeEstoque) { this.quantidadeEstoque = quantidadeEstoque; }
    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }
    public Fornecedor getFornecedor() { return fornecedor; }
    public void setFornecedor(Fornecedor fornecedor) { this.fornecedor = fornecedor; }
}
