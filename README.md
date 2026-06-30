# Playwright Automation Framework

This project is an automation framework developed using **Playwright with JavaScript** following the **Page Object Model (POM)** design pattern. It automates the core functionalities of the SauceDemo application, including login validation, adding products to the cart, checkout flow, product sorting, and logout.

---

# Tech Stack

- Playwright
- JavaScript (Node.js)
- Page Object Model (POM)
- Chromium Browser

---

# Project Structure

```
project/
│
├── tests/
│   └── datas.spec.js          # Main test execution file
│
├── pages/
│   ├── login.js               # Login Page Object
│   ├── cart.js                # Cart Page Object
│   └── checkout.js            # Checkout Page Object
│
├── playwright.config.js
├── package.json
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the project

```bash
cd project-folder
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

# Execute Tests

Run all tests

```bash
npx playwright test
```

Run specific test

```bash
npx playwright test datas.spec.js
```

Run in headed mode

```bash
npx playwright test datas.spec.js --headed
```

Generate HTML Report

```bash
npx playwright show-report
```

---

# Framework Design

The framework follows the **Page Object Model (POM)**.

### login.js

Responsible for

- Opening SauceDemo website
- Username validation
- Password validation
- Login functionality
- Invalid login verification
- Clearing login fields

---

### cart.js

Responsible for

- Selecting multiple products
- Adding products to cart
- Verifying cart badge count

---

### checkout.js

Responsible for

- Opening shopping cart
- Checkout process
- Filling customer information
- Completing purchase
- Verifying successful order message
- Product sorting
- Logout functionality

---

# Test Scenarios Covered

## Login

✔ Invalid Password

- Verify error message

✔ Invalid Username

- Verify error message

✔ Valid Username and Password

- Verify successful login

Example

```
Attempt 1 : Login Failed
Attempt 2 : Login Failed
Attempt 3 : Login Successful
```

---

## Cart

- Add multiple products

Products Added

- Sauce Labs Backpack
- Sauce Labs Bike Light

Verification

- Cart badge count equals **2**

---

## Checkout

Verify complete checkout flow

- Open Cart
- Checkout
- Enter First Name
- Enter Last Name
- Enter Postal Code
- Continue
- Finish Order
- Verify

```
Thank you for your order!
```

---

## Product Sorting

Select filter

```
Price (low to high)
```

Verify sorting is successfully applied.

---

## Logout

- Open Side Menu
- Verify Logout button
- Logout successfully
- Verify redirected to Login page

---

# Assertions Used

The framework uses Playwright assertions such as

```javascript
toBeVisible()

toBeEditable()

toBeEnabled()

toBeEmpty()

toContainText()

toHaveText()

toHaveURL()
```

---

# Features

- Page Object Model
- Multiple Login Validation
- Loop-based Product Selection
- Cart Verification
- Checkout Automation
- Product Sorting
- Logout Validation
- Clean and Reusable Methods

---