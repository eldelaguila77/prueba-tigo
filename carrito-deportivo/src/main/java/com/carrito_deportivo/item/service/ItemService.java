package com.carrito_deportivo.item.service;

import com.carrito_deportivo.item.dto.ItemDto;
import com.carrito_deportivo.item.dto.ItemUpdateRequest;
import com.carrito_deportivo.item.model.Item;
import com.carrito_deportivo.item.repository.ItemRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemService {
    private final ItemRepository itemRepository;

    public ItemDto createItem(ItemUpdateRequest dto) {
        Item item = new Item();
        item.setDescripcion(dto.getDescripcion());
        item.setMonto(dto.getMonto());
        item.setCantidadDisponible(dto.getCantidadDisponible());
        item.setImagen(dto.getImagen());
        itemRepository.save(item);
        return toDto(item);
    }

    public List<ItemDto> getAllItems() {
        return itemRepository.findAll().stream()
            .map(this::toDto)
            .collect(Collectors.toList());
    }

    public ItemDto getItemById(Long id) {
        return itemRepository.findById(id)
            .map(this::toDto)
            .orElseThrow(() -> new RuntimeException("Artículo no encontrado"));
    }

    public ItemDto updateItem(Long id, ItemUpdateRequest req) {
        Item item = itemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Artículo no encontrado"));
        if (req.getDescripcion() != null) item.setDescripcion(req.getDescripcion());
        if (req.getMonto() != null) item.setMonto(req.getMonto());
        if (req.getCantidadDisponible() != null) item.setCantidadDisponible(req.getCantidadDisponible());
        if (req.getImagen() != null) item.setImagen(req.getImagen());
        itemRepository.save(item);
        return toDto(item);
    }

    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }

    private ItemDto toDto(Item item) {
        ItemDto dto = new ItemDto();
        dto.setId(item.getId());
        dto.setDescripcion(item.getDescripcion());
        dto.setMonto(item.getMonto());
        dto.setCantidadDisponible(item.getCantidadDisponible());
        dto.setImagen(item.getImagen());
        return dto;
    }
}
