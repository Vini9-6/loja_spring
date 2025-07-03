package com.loja.service;

import com.loja.model.ItemVenda;
import com.loja.repository.ItemVendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemVendaService {
    @Autowired
    private ItemVendaRepository itemVendaRepository;

    public List<ItemVenda> listarTodos() {
        return itemVendaRepository.findAll();
    }

    public Optional<ItemVenda> buscarPorId(Integer id) {
        return itemVendaRepository.findById(id);
    }

    public ItemVenda salvar(ItemVenda itemVenda) {
        return itemVendaRepository.save(itemVenda);
    }

    public void deletar(Integer id) {
        itemVendaRepository.deleteById(id);
    }
}
