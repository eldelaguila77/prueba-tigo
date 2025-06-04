package com.carrito_deportivo.item.dto;
import lombok.Data;

@Data
public class ItemDto {
    private Long id;
    private String descripcion;
    private Double monto;
    private Integer cantidadDisponible;
    private byte[] imagen;
}
