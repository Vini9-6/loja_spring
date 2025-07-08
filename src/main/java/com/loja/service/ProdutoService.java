package com.loja.service;

// classe de servico para produto
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.loja.model.Produto;
import com.loja.repository.ItemVendaRepository;
import com.loja.repository.ProdutoRepository;

@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository; // injecao do repositorio de produto
    @Autowired
    private ItemVendaRepository itemVendaRepository; // injecao do repositorio de itens de venda

    // retorna todos os produtos
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    // busca produto por id
    public Optional<Produto> buscarPorId(Integer id) {
        return produtoRepository.findById(id);
    }

    // salva ou atualiza produto
    public Produto salvar(Produto produto) {
        return produtoRepository.save(produto);
    }

    // remove produto se nao estiver vinculado a vendas
    public void deletar(Integer id) {
        if (!itemVendaRepository.findByProdutoId(id).isEmpty()) {
            throw new RuntimeException("nao e possivel remover: produto ja vinculado a vendas.");
        }
        produtoRepository.deleteById(id);
    }

    // lista produtos com estoque abaixo do minimo
    public List<Produto> listarEstoqueBaixo(Integer minimo) {
        return produtoRepository.findByEstoqueBaixo(minimo);
    }
}
