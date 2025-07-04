package com.loja.model;

import jakarta.persistence.*;

@Entity
@Table(name = "itens_venda")
public class ItemVenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_venda", nullable = false)
    @com.fasterxml.jackson.annotation.JsonBackReference
    private Venda venda;

    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    private Produto produto;

    @Column(name = "quantidade", nullable = false)
    private Integer quantidade = 1;

    @Column(name = "preco_unitario", nullable = false)
    private Double precoUnitarioVenda;

    // Getters e Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Venda getVenda() { return venda; }
    public void setVenda(Venda venda) { this.venda = venda; }
    public Produto getProduto() { return produto; }
    public void setProduto(Produto produto) { this.produto = produto; }
    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }
    public Double getPrecoUnitarioVenda() { return precoUnitarioVenda; }
    public void setPrecoUnitarioVenda(Double precoUnitarioVenda) { this.precoUnitarioVenda = precoUnitarioVenda; }
}
