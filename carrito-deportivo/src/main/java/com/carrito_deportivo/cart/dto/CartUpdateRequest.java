package com.carrito_deportivo.cart.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Data

public class CartUpdateRequest {
    private Long userId;
    private LocalDateTime createdAt;
    private String status;
    private List<CartDetailDto> details;
}
