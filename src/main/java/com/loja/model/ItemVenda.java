package com.loja.model;

// entidade item de venda
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "itens_venda")
public class ItemVenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // id do item de venda

    @ManyToOne
    @JoinColumn(name = "id_venda", nullable = false)
    @com.fasterxml.jackson.annotation.JsonBackReference
    private Venda venda; // venda associada

    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    private Produto produto; // produto vendido

    @Column(name = "quantidade", nullable = false)
    private Integer quantidade = 1; // quantidade vendida

    @Column(name = "preco_unitario", nullable = false)
    private Double precoUnitarioVenda; // preco unitario na venda

    // getters e setters
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
