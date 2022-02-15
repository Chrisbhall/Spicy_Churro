SELECT order_id, users.name, COUNT(cart_and_ordered_items.*) as total_items_purchased, ROUND(1.13*(SUM(items.price_cents))) as total_cost_for_order
FROM orders
JOIN cart_and_ordered_items ON orders.id = order_id
JOIN items ON items.id = item_id
JOIN users ON users.id = orders.user_id
GROUP BY order_id, users.name
ORDER BY order_id;
