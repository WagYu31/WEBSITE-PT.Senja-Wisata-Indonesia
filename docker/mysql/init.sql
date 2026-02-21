-- ============================================
-- Senja Wisata Indonesia - Database Init
-- ============================================

CREATE DATABASE IF NOT EXISTS senja_wisata;
USE senja_wisata;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('owner', 'admin', 'user') NOT NULL DEFAULT 'user',
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Destinations table
CREATE TABLE IF NOT EXISTS destinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    island VARCHAR(50) NOT NULL,
    country VARCHAR(100) DEFAULT 'Indonesia',
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tours table
CREATE TABLE IF NOT EXISTS tours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(150) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    destination_id INT,
    location VARCHAR(150),
    duration VARCHAR(50),
    price DECIMAL(15, 2) NOT NULL,
    original_price DECIMAL(15, 2),
    category VARCHAR(50),
    badge VARCHAR(50),
    description TEXT,
    image VARCHAR(255),
    max_pax INT DEFAULT 20,
    min_age INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE SET NULL
);

-- Tour gallery
CREATE TABLE IF NOT EXISTS tour_galleries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tour_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);

-- Tour includes
CREATE TABLE IF NOT EXISTS tour_includes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tour_id INT NOT NULL,
    item VARCHAR(100) NOT NULL,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);

-- Tour itinerary
CREATE TABLE IF NOT EXISTS tour_itineraries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tour_id INT NOT NULL,
    day INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_code VARCHAR(20) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    tour_id INT NOT NULL,
    tour_date DATE NOT NULL,
    guests INT NOT NULL DEFAULT 1,
    total_price DECIMAL(15, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    special_request TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tour_id INT NOT NULL,
    user_id INT NOT NULL,
    booking_id INT,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Promos table
CREATE TABLE IF NOT EXISTS promos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    description VARCHAR(200),
    discount_type ENUM('percentage', 'fixed') DEFAULT 'percentage',
    discount_value DECIMAL(10, 2) NOT NULL,
    min_order DECIMAL(15, 2) DEFAULT 0,
    max_uses INT,
    used_count INT DEFAULT 0,
    expires_at DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    tour_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_wishlist (user_id, tour_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);

-- ============================================
-- Seed Data
-- ============================================

-- Demo users (password: hashed 'owner123', 'admin123', 'user123')
INSERT INTO users (name, email, password, role) VALUES
('Senja Owner', 'owner@senja.com', '$2b$10$rOxDFhAvt5eHHxoYU6r8L.AJpxYMFmJNg0LJmAMJtR7iBXW39kQQm', 'owner'),
('Admin Senja', 'admin@senja.com', '$2b$10$rOxDFhAvt5eHHxoYU6r8L.AJpxYMFmJNg0LJmAMJtR7iBXW39kQQm', 'admin'),
('Budi Santoso', 'user@senja.com', '$2b$10$rOxDFhAvt5eHHxoYU6r8L.AJpxYMFmJNg0LJmAMJtR7iBXW39kQQm', 'user');

-- Destinations
INSERT INTO destinations (name, island, description, image) VALUES
('Bali', 'Bali', 'Pulau Dewata dengan budaya unik dan alam memukau', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600'),
('Raja Ampat', 'Papua', 'Keajaiban bawah laut terbaik dunia', 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600'),
('Yogyakarta', 'Jawa', 'Pusat kebudayaan Jawa dengan warisan UNESCO', 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=600'),
('Komodo', 'NTT', 'Rumah naga Komodo dan perairan kristal', 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=600'),
('Labuan Bajo', 'NTT', 'Gerbang menuju kepulauan Komodo yang eksotis', 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=600'),
('Bromo', 'Jawa', 'Gunung api aktif dengan sunrise spektakuler', 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=600');

-- Sample promo
INSERT INTO promos (code, description, discount_type, discount_value, min_order, max_uses, expires_at) VALUES
('SENJA10', 'Diskon 10% untuk semua paket', 'percentage', 10.00, 1000000, 100, '2025-12-31'),
('WELCOME50', 'Diskon Rp 50.000 untuk member baru', 'fixed', 50000.00, 500000, 50, '2025-06-30');

-- ============================================
-- Live Chat Tables
-- ============================================

-- Chat Sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
    id VARCHAR(36) PRIMARY KEY,
    visitor_name VARCHAR(100) NOT NULL,
    visitor_email VARCHAR(150),
    status ENUM('bot','waiting','live','closed') DEFAULT 'bot',
    unread_by_admin INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_updated (updated_at)
);

-- Chat Messages
CREATE TABLE IF NOT EXISTS chat_messages (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) NOT NULL,
    sender ENUM('user','bot','admin') NOT NULL,
    sender_name VARCHAR(100),
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE,
    INDEX idx_session (session_id)
);

