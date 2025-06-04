package com.carrito_deportivo.cart.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartDetailDto {
    private Long id;
    private Long itemId;
    private int quantity;
    private String itemDescription;
    private double itemPrice;
    private int itemAvailableQuantity;
}