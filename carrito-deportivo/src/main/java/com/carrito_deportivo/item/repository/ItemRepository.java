package com.carrito_deportivo.item.repository;

import com.carrito_deportivo.item.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findById(Long id);
    List<Item> findAll();
    void deleteById(Long id);
}
