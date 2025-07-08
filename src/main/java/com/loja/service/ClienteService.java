package com.loja.service;

// classe de servico para cliente
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.loja.model.Cliente;
import com.loja.repository.ClienteRepository;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository; // injecao do repositorio de cliente

    // retorna todos os clientes
    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    // busca cliente por id
    public Optional<Cliente> buscarPorId(Integer id) {
        return clienteRepository.findById(id);
    }

    // salva ou atualiza cliente
    public Cliente salvar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // remove cliente por id
    public void deletar(Integer id) {
        clienteRepository.deleteById(id);
    }
}
