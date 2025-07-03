package com.loja.service;

import com.loja.model.Venda;
import com.loja.model.ItemVenda;
import com.loja.model.Produto;
import com.loja.repository.VendaRepository;
import com.loja.repository.ItemVendaRepository;
import com.loja.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
public class VendaService {
    @Autowired
    private VendaRepository vendaRepository;
    @Autowired
    private ItemVendaRepository itemVendaRepository;
    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Venda> listarTodos() {
        return vendaRepository.findAll();
    }

    public Optional<Venda> buscarPorId(Integer id) {
        return vendaRepository.findById(id);
    }

    @Transactional
    public Venda salvar(Venda venda) {
        double valorTotal = 0.0;
        if (venda.getItens() != null) {
            for (ItemVenda item : venda.getItens()) {
                Produto produto = produtoRepository.findById(item.getProduto().getId()).orElseThrow();
                if (item.getId() == null) {
                    // Nova venda: subtrai do estoque
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

    @Transactional
    public void deletar(Integer id) {
        Venda venda = vendaRepository.findById(id).orElseThrow();
        if (venda.getItens() != null) {
            for (ItemVenda item : venda.getItens()) {
                Produto produto = produtoRepository.findById(item.getProduto().getId()).orElseThrow();
                // Estorna o estoque
                produto.setQuantidadeEstoque(produto.getQuantidadeEstoque() + item.getQuantidade());
                produtoRepository.save(produto);
            }
        }
        vendaRepository.deleteById(id);
    }

    public List<Venda> listarPorPeriodo(LocalDateTime inicio, LocalDateTime fim) {
        return vendaRepository.findByPeriodo(inicio, fim);
    }
}
