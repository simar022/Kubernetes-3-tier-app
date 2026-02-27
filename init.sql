CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL,
    category VARCHAR(50),
    image_url TEXT,
    eta VARCHAR(20) -- Added for Q-Commerce feel
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    items_count INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, category, image_url, eta) VALUES 
-- GROCERIES
('Organic Alphonso Mangoes', 'Sweet, handpicked premium mangoes (Pack of 2).', 299, 'Groceries', 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600', '12 mins'),
('Greek Yogurt Berry', 'High-protein blueberry infused yogurt 200g.', 95, 'Groceries', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600', '8 mins'),
('Instant Coffee Gold', 'Rich aroma, freeze-dried 100g.', 450, 'Groceries', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600', '8 mins'),
('Organic Bananas', 'Fresh bunch of 6, ripened naturally without pesticides.', 55, 'Groceries', 'https://images.unsplash.com/photo-1571771894821-ad99024177c6?w=600', '10 mins'),
('Fresh Avocado', 'Imported Mexican Hass Avocado, 1 unit.', 199, 'Groceries', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600', '9 mins'),

-- ELECTRONICS
('Ultra Slim Power Bank', '10000mAh fast charging with Type-C output.', 1299, 'Electronics', 'https://images.unsplash.com/photo-1609091839311-d5368196c0ff?w=600', '15 mins'),
('Mechanical Gaming Mouse', 'RGB lighting with 6 adjustable DPI levels.', 1899, 'Electronics', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600', '14 mins'),
('Noise-Cancelling Earbuds', 'Wireless bluetooth 5.3 with deep bass.', 2499, 'Electronics', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', '15 mins'),
('Fast Charging Cable', 'USB-C to Lightning, 2 meters.', 899, 'Electronics', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600', '12 mins'),

-- KITCHEN
('Electric Milk Frother', 'Handheld whisk for cafe-style coffee at home.', 499, 'Kitchen', 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600', '10 mins'),
('Ceramic Coffee Mug', 'Matte black minimalist mug (350ml).', 350, 'Kitchen', 'https://images.unsplash.com/photo-1517256010206-35a00a6b49ad?w=600', '12 mins'),
('Non-Stick Frying Pan', '24cm induction bottom, granite finish coating.', 1450, 'Kitchen', 'https://images.unsplash.com/photo-1599940732386-81523456c7f4?w=600', '18 mins'),
('Pro Chef Knife', '8-inch stainless steel, full tang German steel blade.', 1899, 'Kitchen', 'https://images.unsplash.com/photo-1593611664162-ef307a631e6c?w=600', '12 mins'),

-- CLOTHES
('Linen Summer Shirt', 'Breathable white linen, half sleeves.', 1499, 'Clothes', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600', '20 mins'),
('Canvas Tote Bag', 'Eco-friendly heavy duty canvas bag.', 299, 'Clothes', 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600', '18 mins'),
('Cotton Oversized Tee', '100% Cotton, Breathable Navy Blue.', 799, 'Clothes', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', '20 mins'),

-- FOOD ITEMS
('Artisan Sourdough', 'Freshly baked, crusty exterior, soft inside.', 180, 'Food Items', 'https://images.unsplash.com/photo-1585478259715-876a6a81fc08?w=600', '15 mins'),
('Dark Chocolate Truffles', '70% Cocoa, sea salt caramel centers.', 550, 'Food Items', 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600', '9 mins'),
('Fresh Strawberries', 'Farm-fresh sweet strawberries 250g.', 120, 'Food Items', 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600', '11 mins'),
('Avocado Toast Box', 'Ready-to-eat sourdough with mashed avocado.', 240, 'Food Items', 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600', '13 mins');
