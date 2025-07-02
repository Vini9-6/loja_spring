package com.loja.controller;

import com.loja.model.Fornecedor;
import com.loja.service.FornecedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/fornecedores")
public class FornecedorController {
    @Autowired
    private FornecedorService fornecedorService;

    @GetMapping
    public List<Fornecedor> listarTodos() {
        return fornecedorService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fornecedor> buscarPorId(@PathVariable Integer id) {
        Optional<Fornecedor> fornecedor = fornecedorService.buscarPorId(id);
        return fornecedor.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Fornecedor salvar(@RequestBody Fornecedor fornecedor) {
        return fornecedorService.salvar(fornecedor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fornecedor> atualizar(@PathVariable Integer id, @RequestBody Fornecedor fornecedor) {
        if (!fornecedorService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        fornecedor.setId(id);
        return ResponseEntity.ok(fornecedorService.salvar(fornecedor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (!fornecedorService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        fornecedorService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
