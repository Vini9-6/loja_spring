package com.loja.repository;

// repositorio de produto
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.loja.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
    // busca produtos com estoque abaixo do minimo
    @Query("SELECT p FROM Produto p WHERE p.quantidadeEstoque < :minimo")
    List<Produto> findByEstoqueBaixo(@Param("minimo") Integer minimo);
}
