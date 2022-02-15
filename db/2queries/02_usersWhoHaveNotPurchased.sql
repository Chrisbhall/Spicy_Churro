SELECT name
FROM (SELECT order_id, users.name, COUNT(cart_and_ordered_items.*) as total_items_purchased, SUM(items.price_cents) as total_cost_for_order
FROM orders
JOIN cart_and_ordered_items ON orders.id = order_id
JOIN items ON items.id = item_id
FULL OUTER JOIN users ON users.id = orders.user_id
GROUP BY order_id, users.name
ORDER BY order_id) as total_cost_table
GROUP BY name
HAVING COUNT(order_id) = 0

