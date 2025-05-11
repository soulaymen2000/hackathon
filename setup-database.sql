-- Create the database if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'stock_chain_db')
BEGIN
    CREATE DATABASE stock_chain_db;
END
GO

USE stock_chain_db;
GO

-- Create Products table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Products')
BEGIN
    CREATE TABLE Products (
        id INT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(255) NOT NULL,
        sku NVARCHAR(50) NOT NULL UNIQUE,
        category NVARCHAR(100) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        threshold INT NOT NULL DEFAULT 10,
        expiryDate DATE,
        image NVARCHAR(MAX),
        price DECIMAL(10,2) NOT NULL,
        cost DECIMAL(10,2) NOT NULL,
        createdAt DATETIME2 NOT NULL DEFAULT GETDATE(),
        updatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
    );
END

-- Create Users table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    CREATE TABLE Users (
        id INT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(255) NOT NULL,
        email NVARCHAR(255) NOT NULL UNIQUE,
        password NVARCHAR(255) NOT NULL,
        role NVARCHAR(50) NOT NULL DEFAULT 'user',
        status NVARCHAR(50) NOT NULL DEFAULT 'active',
        lastActive DATETIME2,
        createdAt DATETIME2 NOT NULL DEFAULT GETDATE(),
        updatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
    );
END

-- Create SalesOrders table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SalesOrders')
BEGIN
    CREATE TABLE SalesOrders (
        id INT PRIMARY KEY IDENTITY(1,1),
        customerId INT,
        date DATETIME2 NOT NULL DEFAULT GETDATE(),
        status NVARCHAR(50) NOT NULL DEFAULT 'pending',
        total DECIMAL(10,2) NOT NULL,
        createdAt DATETIME2 NOT NULL DEFAULT GETDATE(),
        updatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
    );
END

-- Create SalesOrderItems table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SalesOrderItems')
BEGIN
    CREATE TABLE SalesOrderItems (
        id INT PRIMARY KEY IDENTITY(1,1),
        orderId INT NOT NULL,
        productId INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (orderId) REFERENCES SalesOrders(id),
        FOREIGN KEY (productId) REFERENCES Products(id)
    );
END

-- Create PurchaseOrders table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'PurchaseOrders')
BEGIN
    CREATE TABLE PurchaseOrders (
        id INT PRIMARY KEY IDENTITY(1,1),
        supplier NVARCHAR(255) NOT NULL,
        date DATETIME2 NOT NULL DEFAULT GETDATE(),
        status NVARCHAR(50) NOT NULL DEFAULT 'pending',
        total DECIMAL(10,2) NOT NULL,
        createdAt DATETIME2 NOT NULL DEFAULT GETDATE(),
        updatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
    );
END

-- Create PurchaseOrderItems table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'PurchaseOrderItems')
BEGIN
    CREATE TABLE PurchaseOrderItems (
        id INT PRIMARY KEY IDENTITY(1,1),
        orderId INT NOT NULL,
        productId INT NOT NULL,
        quantity INT NOT NULL,
        cost DECIMAL(10,2) NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (orderId) REFERENCES PurchaseOrders(id),
        FOREIGN KEY (productId) REFERENCES Products(id)
    );
END

-- Create ActivityLog table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ActivityLog')
BEGIN
    CREATE TABLE ActivityLog (
        id INT PRIMARY KEY IDENTITY(1,1),
        userId INT,
        action NVARCHAR(MAX) NOT NULL,
        ipAddress NVARCHAR(45),
        timestamp DATETIME2 NOT NULL DEFAULT GETDATE(),
        FOREIGN KEY (userId) REFERENCES Users(id)
    );
END

-- Insert sample admin user
IF NOT EXISTS (SELECT * FROM Users WHERE email = 'admin@example.com')
BEGIN
    INSERT INTO Users (name, email, password, role)
    VALUES ('Admin', 'admin@example.com', 'hashed_password_here', 'admin');
END
