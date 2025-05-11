USE stock_chain_db;
GO

-- Insert sample products
INSERT INTO Products (name, sku, category, stock, threshold, expiryDate, image, price, cost)
VALUES 
('Laptop Pro X1', 'LP001', 'Electronics', 50, 10, '2025-12-31', '/placeholder.svg', 1299.99, 899.99),
('Wireless Mouse', 'WM002', 'Electronics', 200, 20, '2026-12-31', '/placeholder.svg', 49.99, 19.99),
('Office Chair', 'OC003', 'Furniture', 30, 5, '2030-12-31', '/placeholder.svg', 299.99, 149.99),
('Desk Lamp', 'DL004', 'Lighting', 75, 15, '2027-12-31', '/placeholder.svg', 79.99, 39.99),
('Coffee Machine', 'CM005', 'Appliances', 25, 5, '2026-06-30', '/placeholder.svg', 399.99, 249.99);

-- Insert sample users
INSERT INTO Users (name, email, password, role, status)
VALUES 
('Admin User', 'admin@example.com', 'hashed_password', 'admin', 'active'),
('Sales Manager', 'sales@example.com', 'hashed_password', 'manager', 'active'),
('Stock Clerk', 'stock@example.com', 'hashed_password', 'user', 'active');

-- Insert sample purchase orders
INSERT INTO PurchaseOrders (supplier, date, status, total)
VALUES 
('Tech Supplies Inc.', '2025-05-01', 'completed', 5999.95),
('Office Solutions Ltd.', '2025-05-05', 'pending', 1499.95),
('Global Electronics', '2025-05-10', 'processing', 2999.95);

-- Insert sample purchase order items
INSERT INTO PurchaseOrderItems (orderId, productId, quantity, cost, total)
VALUES 
(1, 1, 5, 899.99, 4499.95),
(1, 2, 50, 19.99, 999.50),
(2, 3, 10, 149.99, 1499.90),
(3, 5, 12, 249.99, 2999.88);

-- Insert sample sales orders
INSERT INTO SalesOrders (customerId, date, status, total)
VALUES 
(1, '2025-05-02', 'completed', 1349.98),
(2, '2025-05-06', 'processing', 599.98),
(3, '2025-05-11', 'pending', 479.98);

-- Insert sample sales order items
INSERT INTO SalesOrderItems (orderId, productId, quantity, price, total)
VALUES 
(1, 1, 1, 1299.99, 1299.99),
(1, 2, 1, 49.99, 49.99),
(2, 3, 2, 299.99, 599.98),
(3, 4, 6, 79.99, 479.94);
