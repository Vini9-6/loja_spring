package com.loja.repository;

// repositorio de itens de venda
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.loja.model.ItemVenda;

public interface ItemVendaRepository extends JpaRepository<ItemVenda, Integer> {
    // busca itens de venda por id do produto
    List<ItemVenda> findByProdutoId(Integer produtoId);
}
