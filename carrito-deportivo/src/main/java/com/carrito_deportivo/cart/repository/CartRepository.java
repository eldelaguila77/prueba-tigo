package com.carrito_deportivo.cart.repository;

import com.carrito_deportivo.cart.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findAll();
    Optional <Cart> findById(Long id);
    List<Cart> findByUserId(Long userId);
    List<Cart> findByStatus(String status);
    void deleteById(Long id);
}
