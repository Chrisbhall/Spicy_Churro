SELECT order_id, users.name, COUNT(cart_and_ordered_items.*) as total_items_purchased, SUM(items.price_cents)
FROM items
JOIN cart_and_ordered_items ON items.id = item_id
JOIN users ON users.id = user_id
WHERE order_id = 1 --change this for specific order_id
GROUP BY order_id, users.name;
