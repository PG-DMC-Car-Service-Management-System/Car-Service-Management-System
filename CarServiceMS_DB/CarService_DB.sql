CREATE DATABASE IF NOT EXISTS car_service_db;
USE car_service_db;

-- All Tables

-- Customers Table
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    address TEXT,
    vehicle_model VARCHAR(100),
    vehicle_no VARCHAR(20)
);

-- Vehicle Categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(250) NOT NULL,
    status TINYINT(1) DEFAULT 1,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Mechanics Table
CREATE TABLE mechanics_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    contact VARCHAR(50),
    email VARCHAR(150),
    status TINYINT(1) DEFAULT 1,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE service_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    icon VARCHAR(255),          
    rating FLOAT DEFAULT 0,      
    status TINYINT DEFAULT 1,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Mechanics Table
CREATE TABLE mechanics_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    contact VARCHAR(50),
    email VARCHAR(150),
    status TINYINT(1) DEFAULT 1,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE service_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    category_id INT,
    rating DECIMAL(2,1),
    status TINYINT(1) DEFAULT 1,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: registration
CREATE TABLE registration (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    service_id INT NOT NULL,
    service_type VARCHAR(100),
    vehicle_no VARCHAR(50),
    vehicle_model VARCHAR(100),
    booking_date DATE,
    status ENUM('Pending', 'Confirmed', 'Completed') DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (service_id) REFERENCES service_list(id)
);

-- Billing Table
CREATE TABLE billing (
    bill_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    amount DECIMAL(10,2),
    bill_date DATE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- Service Requests Table
CREATE TABLE service_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_name TEXT NOT NULL,
    category_id INT,
    service_type TEXT NOT NULL,
    mechanic_id INT,
    status TINYINT(1) DEFAULT 0,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (mechanic_id) REFERENCES mechanics_list(id)
);

-- Feedback Table
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    service_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (service_id) REFERENCES service_list(id)
);

-- Admin Users Table
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role ENUM('admin', 'manager') DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data for Services
INSERT INTO service_list (service, price, description, icon, category_id, rating)
VALUES
('Change Oil', 2550.00, 'Complete oil change with filter replacement', 'local_gas_station', 1, 4.8),
('Engine Tune Up', 5250.00, 'Complete engine maintenance and optimization', 'settings', 2, 4.9),
('Overall Checkup', 6280.00, 'Complete Overall Checkup', 'search', 3, 4.7),
('Tire Replacement', 5350.00, 'Tire Replacement with Brake inspection and pad replacement', 'tire_repair', 4, 4.6),
('Tire Balancing', 2850.00, 'Professional tire rotation and balancing', 'trip_origin', 5, 4.6),
('Wash', 5800.00, 'Complete Clean and Wash', 'local_car_wash', 6, 4.5),
('Battery Check', 4999.00, 'Battery health assessment and replacement if needed', 'battery_charging_full', 7, 4.6),
('Brake Service', 5900.00, 'Brake system inspection and maintenance', 'build', 8, 4.6),
('AC Service', 6500.00, 'Complete AC system inspection and maintenance', 'ac_unit', 9, 4.6);
