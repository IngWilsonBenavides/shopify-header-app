# Shopify Header App

A **Shopify Theme App Extension** that injects a fully-customisable header (top bar + navbar) into any Shopify storefront — without modifying the theme code directly.

The header design is based on the [simple-shopify-theme](https://github.com/IngWilsonBenavides/simple-shopify-theme) and is delivered as an **App Embed Block** (appears under *App Embeds* in the Shopify theme customiser).

---

## Features

| Feature | Details |
|---|---|
| Top bar | Email link + social icons (Facebook, Instagram, TikTok, LinkedIn) |
| Navbar | Logo, configurable nav menu from the store's link lists, account + cart icons |
| Cart badge | Live item count via Shopify Cart API |
| Mobile menu | Accessible hamburger menu with dropdown support |
| Customisable | All colours, links, logo and menu are editable in the theme customiser |
| No theme edits | Installed purely as an app embed — works with any theme |

---

## Project structure

```
shopify-header-app/
├── shopify.app.toml                         # Shopify CLI app config
├── package.json
└── extensions/
    └── header-extension/
        ├── shopify.extension.toml           # Theme App Extension config
        ├── blocks/
        │   └── header.liquid                # App embed block (top bar + navbar)
        ├── assets/
        │   ├── header.css                   # Scoped styles (sha- prefix)
        │   └── header.js                    # Mobile menu, body padding, cart sync
        └── locales/
            └── en.default.json
```

---

## Setup & development

### Prerequisites

- [Shopify CLI 3.x](https://shopify.dev/docs/apps/tools/cli)
- A Shopify Partner account and a development store

### 1. Configure the app

Edit `shopify.app.toml` and fill in your `client_id` and `application_url`.

### 2. Start the development server

```bash
shopify app dev
```

This will install the app on your development store and open the theme customiser.

### 3. Enable the header in your theme

1. Open the **Online Store → Themes → Customise** editor.
2. Click **App Embeds** (the puzzle-piece icon in the left panel).
3. Toggle on **Header Section**.
4. Configure the email, social links, logo, menu and colours.
5. Save.

---

## Deployment

```bash
shopify app deploy
```

---

## Customisation options

| Setting | Description |
|---|---|
| Show top bar | Toggle the email/social bar on or off |
| Email | Contact email shown in the top bar |
| Social message | Text displayed before the social icons |
| Facebook / Instagram / TikTok / LinkedIn | Social profile URLs |
| Logo | Image picker for the store logo |
| Navigation menu | Any link list from the store admin |
| Top bar background / text colour | Full colour pickers |
| Navbar background / text colour | Full colour pickers |
| Accent / hover colour | Colour used for hover states and the cart badge |
