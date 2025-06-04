package com.carrito_deportivo.item.controller;

import com.carrito_deportivo.item.dto.ItemDto;
import com.carrito_deportivo.item.dto.ItemUpdateRequest;
import com.carrito_deportivo.item.model.Item;
import com.carrito_deportivo.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor

public class ItemController {
    private final ItemService itemService;

    @PostMapping
    public ResponseEntity<ItemDto> crearArticulo(@RequestBody ItemUpdateRequest dto) {
        ItemDto newItem = itemService.createItem(dto);
        return ResponseEntity.ok(newItem);
    }

    @GetMapping
    public ResponseEntity<List<ItemDto>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDto> getItemById(@PathVariable Long id) {
        ItemDto item = itemService.getItemById(id);
        return ResponseEntity.ok(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemDto> updatedItem(@PathVariable Long id, @RequestBody ItemUpdateRequest dto) {
        ItemDto updatedItem = itemService.updateItem(id, dto);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
