-- Create the car_service_db database
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

INSERT INTO customers (name, email, phone, password, address, vehicle_model, vehicle_no) VALUES
('Rahul Sharma', 'rahul.sharma@example.com', '9876543210', 'rahul@123', '123 MG Road, Pune', 'Honda City', 'MH12AB1234'),
('Priya Mehta', 'priya.mehta@example.com', '8765432109', 'priya@123', '45 LBS Marg, Mumbai', 'Hyundai i20', 'MH01CD5678'),
('Amit Verma', 'amit.verma@example.com', '7654321098', 'amit@123', '22 Residency Road, Bangalore', 'Maruti Swift', 'KA05EF4321'),
('Sneha Rao', 'sneha.rao@example.com', '6543210987', 'sneha@123', '88 Jubilee Hills, Hyderabad', 'Tata Nexon', 'TS09GH8765'),
('Rohan Joshi', 'rohan.joshi@example.com', '9123456780', 'rohan@123', '33 Park Street, Kolkata', 'Kia Seltos', 'WB02IJ3456');

-- Vehicle Categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(250) NOT NULL,
    status TINYINT(1) DEFAULT 1,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (category, status, date_created) VALUES
('Two Wheeler', 1, NOW()),
('Four Wheeler - Sedan', 1, NOW()),
('Four Wheeler - SUV', 1, NOW()),
('Luxury Cars', 1, NOW()),
('Electric Vehicles', 1, NOW()),
('Commercial Vehicles', 1, NOW());

-- Bookings Table
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    service_id INT,
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
INSERT INTO service_list (service, description, status, date_created) VALUES
('Change Oil', 'Oil change description...', 1, NOW()),
('Engine Tune Up', 'Engine tune-up description...', 1, NOW()),
('Overall Checkup', 'Overall checkup description...', 1, NOW()),
('Tire Replacement', 'Tire replacement description...', 1, NOW()),
('Wash', 'Car wash description...', 1, NOW());
