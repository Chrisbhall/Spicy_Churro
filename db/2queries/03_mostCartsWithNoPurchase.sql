--incomplete


SELECT COUNT(carts.id) as num_of_carts, users.name, COUNT(cart_and_ordered_items.*) as total_items_in_cart, SUM(items.price_cents) as total_cost_for_order
FROM orders
FULL OUTER JOIN carts on orders.cart_id = carts.id
JOIN cart_and_ordered_items ON carts.id = cart_and_ordered_items.cart_id
JOIN items ON items.id = item_id
JOIN users ON users.id = carts.user_id
WHERE order_id IS NULL
GROUP BY users.name
ORDER BY SUM(items.price_cents) DESC;
