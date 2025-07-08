package com.loja.service;

// classe de servico para venda
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.loja.model.ItemVenda;
import com.loja.model.Produto;
import com.loja.model.Venda;
import com.loja.repository.ItemVendaRepository;
import com.loja.repository.ProdutoRepository;
import com.loja.repository.VendaRepository;

@Service
public class VendaService {
    @Autowired
    private VendaRepository vendaRepository; // injecao do repositorio de venda
    @Autowired
    private ItemVendaRepository itemVendaRepository; // injecao do repositorio de item de venda
    @Autowired
    private ProdutoRepository produtoRepository; // injecao do repositorio de produto

    // retorna todas as vendas
    public List<Venda> listarTodos() {
        return vendaRepository.findAll();
    }

    // busca venda por id
    public Optional<Venda> buscarPorId(Integer id) {
        return vendaRepository.findById(id);
    }

    // salva ou atualiza venda, atualiza estoque dos produtos
    @Transactional
    public Venda salvar(Venda venda) {
        double valorTotal = 0.0;
        if (venda.getItens() != null) {
            for (ItemVenda item : venda.getItens()) {
                Produto produto = produtoRepository.findById(item.getProduto().getId()).orElseThrow();
                if (item.getId() == null) {
                    // nova venda: subtrai do estoque
                    produto.setQuantidadeEstoque(produto.getQuantidadeEstoque() - item.getQuantidade());
                }
                item.setPrecoUnitarioVenda(produto.getPrecoUnitario());
                item.setVenda(venda);
                valorTotal += item.getPrecoUnitarioVenda() * item.getQuantidade();
                produtoRepository.save(produto);
            }
        }
        venda.setValorTotal(valorTotal);
        Venda vendaSalva = vendaRepository.save(venda);
        if (venda.getItens() != null) {
            for (ItemVenda item : venda.getItens()) {
                item.setVenda(vendaSalva);
                itemVendaRepository.save(item);
            }
        }
        return vendaSalva;
    }

    // remove venda e estorna estoque dos produtos
    @Transactional
    public void deletar(Integer id) {
        Venda venda = vendaRepository.findById(id).orElseThrow();
        if (venda.getItens() != null) {
            for (ItemVenda item : venda.getItens()) {
                Produto produto = produtoRepository.findById(item.getProduto().getId()).orElseThrow();
                // estorna o estoque
                produto.setQuantidadeEstoque(produto.getQuantidadeEstoque() + item.getQuantidade());
                produtoRepository.save(produto);
            }
        }
        vendaRepository.deleteById(id);
    }

    // lista vendas por periodo
    public List<Venda> listarPorPeriodo(LocalDateTime inicio, LocalDateTime fim) {
        return vendaRepository.findByPeriodo(inicio, fim);
    }
}
