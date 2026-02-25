-- Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    image_url TEXT
);

-- Clear existing data (optional)
TRUNCATE TABLE products;
INSERT INTO products (name, description, price, category, image_url) VALUES 
('Elite Wireless Headphones', 'Noise-canceling over-ear headphones with 50-hour battery.', 14999.00, 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'),
('Minimalist Desk Lamp', 'Adjustable LED lamp with 3 color modes and USB charging.', 2499.00, 'Home', 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800'),
('Mechanical Gaming Keyboard', 'Clicky Blue switches with full RGB backlighting.', 5999.00, 'Computing', 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800'),
('Steel Smart Watch', 'Track heart rate, sleep, and fitness with 10-day battery.', 8999.00, 'Electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'),
('Premium Leather Backpack', 'Water-resistant laptop bag with hidden security pockets.', 4500.00, 'Fashion', 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800'),
('Espresso Coffee Maker', 'Italian style moka pot for professional home brewing.', 3200.00, 'Kitchen', 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=800'),
('Studio Microphone', 'USB condenser mic for streaming and high-quality recording.', 11200.00, 'Electronics', 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800'),
('Ceramic Plant Pot', 'Modern matte finish pot with drainage and bamboo saucer.', 1200.00, 'Home', 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800'),
('Quantum Wireless Mouse', 'Ergonomic 24,000 DPI sensor with zero-latency wireless tech.', 6499.00, 'Computing', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800'),
('Aura RGB Desk Mat', 'Liquid-resistant micro-weave surface with 16.8M color RGB edge.', 1899.00, 'Accessories', 'https://images.unsplash.com/photo-1616533316447-aa2665c1d630?w=800'),
('Titan Mech Keyboard', 'Hot-swappable tactile switches in a compact 65% frame.', 12499.00, 'Computing', 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800'),
('Focus 4K Webcam', 'Autofocus 60FPS streaming camera with dual noise-canceling mics.', 9200.00, 'Video', 'https://images.unsplash.com/photo-1588591795084-1770cb3be374?w=800'),
('Zenith ANC Headphones', 'Smart active noise cancellation with 45 hours of studio sound.', 24500.00, 'Audio', 'https://images.unsplash.com/photo-1546435770-a3e426da471b?w=800'),
('Hyperion 34" Curved Monitor', 'Ultrawide 144Hz display with professional color accuracy.', 48999.00, 'Computing', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800'),
('Nova Studio Mic', 'Cardioid condenser mic designed for crisp, professional vocals.', 15800.00, 'Audio', 'https://images.unsplash.com/photo-1598466173997-3499b03f2243?w=800'),
('Nomad Tech Backpack', 'Antitheft design with dedicated padded laptop and drone slots.', 7200.00, 'Fashion', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'),
('Quantum Wireless Mouse', '24K DPI Hero Sensor, 140h Battery life.', 6499.00, 'Peripherals', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600'),
('Carbon Fiber Keyboard', 'Mechanical switches with hot-swappable PCB.', 12999.00, 'Peripherals', 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600'),
('4K Developer Monitor', '32-inch IPS, 99% sRGB, USB-C Power Delivery.', 42000.00, 'Display', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600'),
('Studio Condenser Mic', 'Professional XLR/USB mic for streaming.', 14500.00, 'Audio', 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600'),
('Ergonomic Mesh Chair', 'Full lumbar support with 4D armrests.', 28000.00, 'Furniture', 'https://images.unsplash.com/photo-1505797149-43b0ad76620e?w=600'),
('Noise Cancelling Pods', 'Active ANC with transparency mode.', 18900.00, 'Audio', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600');
