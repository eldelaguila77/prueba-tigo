package com.carrito_deportivo.cart.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartDto {
    private Long id;
    private Long userId;
    private LocalDateTime createdAt;
    private String status;
    private List<CartDetailDto> details;
}