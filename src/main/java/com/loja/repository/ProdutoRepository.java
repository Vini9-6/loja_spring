package com.loja.repository;

import com.loja.model.Produto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
    @Query("SELECT p FROM Produto p WHERE p.quantidadeEstoque < :minimo")
    List<Produto> findByEstoqueBaixo(@Param("minimo") Integer minimo);
}
