# 🎯 Betting Challenge – Login Automation with Playwright

This repository contains an automated test suite created for the **Codere login functionality challenge**, using the [Playwright](https://playwright.dev/) framework.

## 📌 Objective

The goal is to validate the **login flow** of [https://m.apuestas.codere.es](https://m.apuestas.codere.es), ensuring that the interface behaves correctly for users trying to access their accounts.

---

## ✅ What’s Covered

The following test scenarios are automated:

* 🔒 Attempting login with **empty credentials**
* ❌ Logging in with **invalid username/password**
* 🔁 Trying to **recover password** with invalid input (captcha included)
* 🔗 Redirect from login alert to **"Forgot password"** flow
* 🔐 Logging in with valid credentials and being **prompted to change password**

Each test includes:

* Visibility checks
* Message assertions
* Proper alert handling

---

## 🧱 Tech Stack

* ⚙️ **Playwright** for browser automation
* 📐 **Page Object Model** for clean and reusable code
* 💻 Tests written in **TypeScript**
* 📊 Generates an **HTML report** on completion

---

## 📁 Project Structure

```
.
├── pages/              # Page Objects (Navbar, LoginModal, CookieBanner, UiAlert)
├── tests/
│   └── login.spec.ts   # Main test suite for login functionality
├── playwright.config.ts
└── package.json
```

---

## 🚀 How to Run the Tests

Install dependencies:

```bash
npm install
```

### Run all tests (headless, in all browsers)

```bash
npm test
```

### Run in a specific browser (headless)

```bash
npm run test:chrome      # Chromium
npm run test:firefox     # Firefox
```

### Run with UI (headed mode)

```bash
npm run test:chrome:ui
npm run test:firefox:ui
```

### View HTML test report

```bash
npm run test:report
```

---

## ℹ️ Notes

* The site includes a **CAPTCHA**, but it was **not required as part of the challenge**, so it is **simulated** in tests where necessary.
* The suite is **CI-friendly**: retries are enabled and `.only` tests are forbidden in CI environments.

---

## 🧑‍💻 Author

Crafted with ❤️ by Diego

