package com.carrito_deportivo.cart.repository;

import com.carrito_deportivo.cart.model.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {
}
