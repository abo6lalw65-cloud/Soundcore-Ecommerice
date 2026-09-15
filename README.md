# Soundcore Multi-Vendor E-Commerce Platform

## Project Concept
An advanced multi-vendor e-commerce web platform specialized in "Soundcore" audio products. The platform connects customers with various sellers and administrators in a unified, branded environment.

## Tech Stack
* **Frontend:** React, JavaScript, HTML5, CSS3
* **State Management:** React Hooks (`useState`)
* **Version Control:** Git, GitHub

---

## Current Progress & Features

### 1. Storefront & Marketplace (Guest & Customer View)
* Developed an open marketplace allowing users to browse products uploaded by all trusted vendors immediately upon entering the site.
* Implemented secure cart management with real-time total price calculation and strict stock limit checks.
* Applied consistent brand styling using the primary Soundcore blue (`#00b0ff`).

### 2. Authentication & Role-Based Access Control (RBAC)
* Built a flexible authentication flow (`Auth.js`) supporting both Login and Sign Up for different platform roles (Customer, Seller, Admin).
* Secured features so that guests are prompted to log in as customers before adding items to the cart or checking out.
* Added approval status handling where new seller accounts remain pending until reviewed by the admin.

### 3. Seller Dashboard & Inventory Management
* Created a dedicated inventory management interface for vendors.
* Implemented local file upload functionality allowing sellers to select product images directly from their device with live preview.
* Added dynamic product creation (Name, Price, Category, Stock Quantity, Local Image) and deletion capabilities.

### 4. Live Orders, Notifications & Stock Reduction
* Integrated a secure simulated checkout workflow supporting Stripe and PayPal payment methods.
* Programmed automated inventory updates that deduct purchased quantities from the stock upon successful payment.
* Developed a live notification system inside the seller dashboard alerting vendors instantly of new customer orders and delivery addresses.

---

## Getting Started
To run the frontend application locally:

```bash
cd Frontend
npm install
npm start