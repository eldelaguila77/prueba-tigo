package com.carrito_deportivo.cart.service;
import com.carrito_deportivo.auth.model.User;
import com.carrito_deportivo.auth.repository.UserRepository;
import com.carrito_deportivo.cart.dto.CartDto;
import com.carrito_deportivo.cart.dto.CartUpdateRequest;
import com.carrito_deportivo.cart.dto.CartDetailDto;
import com.carrito_deportivo.cart.model.Cart;
import com.carrito_deportivo.cart.model.CartDetail;
import com.carrito_deportivo.cart.model.CartStatus;
import com.carrito_deportivo.cart.repository.CartDetailRepository;
import com.carrito_deportivo.cart.repository.CartRepository;
import com.carrito_deportivo.item.model.Item;
import com.carrito_deportivo.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class CartService {
    private final CartRepository cartRepository;
    private final CartDetailRepository cartDetailRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    
    @Transactional
    public CartDto createCart(CartUpdateRequest cartDto) {
        User user = userRepository.findById(cartDto.getUserId()).orElseThrow();

        Cart cart = Cart.builder()
            .user(user)
            .status(CartStatus.valueOf(cartDto.getStatus()))
            .createdAt(LocalDateTime.now())
            .build();

        Cart savedCart = cartRepository.save(cart); // Guardar cart primero

        List<CartDetail> details = cartDto.getDetails().stream().map(detailDTO -> {
            Item item = itemRepository.findById(detailDTO.getItemId())
                .orElseThrow(() -> new RuntimeException("Item no encontrado: " + detailDTO.getItemId()));
    
            if (item.getCantidadDisponible() < detailDTO.getQuantity()) {
                throw new RuntimeException("No hay suficiente cantidad disponible para el item: " + item.getDescripcion());
            }
    
            // Descontar cantidad
            item.setCantidadDisponible(item.getCantidadDisponible() - detailDTO.getQuantity());
            itemRepository.save(item); // Persistir cambio en inventario
    
            return CartDetail.builder()
                    .cart(savedCart)
                    .item(item)
                    .quantity(detailDTO.getQuantity())
                    .build();
        }).collect(Collectors.toList());
    
        cartDetailRepository.saveAll(details);
        savedCart.setDetails(details);
    
        return toDTO(savedCart);
    }

    public List<CartDto> getAllCarts() {
        return cartRepository.findAll().stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public CartDto getCartById(Long id) {
        return cartRepository.findById(id)
        .map(this::toDTO)
        .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
    }

    public List<CartDto> getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId).stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }

    private CartDto toDTO(Cart cart) {
        return CartDto.builder()
                .id(cart.getId())
                .userId(cart.getUser().getId())
                .createdAt(cart.getCreatedAt())
                .status(cart.getStatus().name())
                .details(cart.getDetails().stream().map(detail ->
                        CartDetailDto.builder()
                                .id(detail.getId())
                                .itemId(detail.getItem().getId())
                                .quantity(detail.getQuantity())
                                .itemDescription(detail.getItem().getDescripcion())
                                .itemPrice(detail.getItem().getMonto())
                                .itemAvailableQuantity(detail.getItem().getCantidadDisponible())
                                .build()
                ).collect(Collectors.toList()))
                .build();
    }
}
