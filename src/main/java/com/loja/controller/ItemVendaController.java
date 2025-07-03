package com.loja.controller;

import com.loja.model.ItemVenda;
import com.loja.service.ItemVendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/itensvenda")
public class ItemVendaController {
    @Autowired
    private ItemVendaService itemVendaService;

    @GetMapping
    public List<ItemVenda> listarTodos() {
        return itemVendaService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemVenda> buscarPorId(@PathVariable Integer id) {
        Optional<ItemVenda> item = itemVendaService.buscarPorId(id);
        return item.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ItemVenda salvar(@RequestBody ItemVenda itemVenda) {
        return itemVendaService.salvar(itemVenda);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemVenda> atualizar(@PathVariable Integer id, @RequestBody ItemVenda itemVenda) {
        if (!itemVendaService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        itemVenda.setId(id);
        return ResponseEntity.ok(itemVendaService.salvar(itemVenda));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (!itemVendaService.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        itemVendaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
