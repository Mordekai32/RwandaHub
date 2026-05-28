# Rwanda Market Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Rwanda Market](https://img.shields.io/badge/Rwanda-Market-green?logo=rwanda)](https://github.com/yourusername/rwanda-market-platform)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**Empowering local commerce in Rwanda – a digital marketplace for farmers, artisans, and small businesses.**

The Rwanda Market Platform connects producers directly with buyers across the country. From fresh produce in Musanze to handcrafted baskets in Kigali, this platform reduces middlemen, increases price transparency, and supports the Rwandan economy.

![Screenshot Placeholder](./docs/screenshot.png)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact & Support](#contact--support)

## Features

- **Multi‑vendor marketplace** – Farmers, artisans, and shops can register and list products.
- **Geo‑based search** – Find products near you (Kigali, Rubavu, Huye, etc.) with map integration.
- **Price comparison** – View current market prices for staple goods (maize, beans, cassava, etc.).
- **Secure payments** – Mobile money (MTN MoMo, Airtel Money) and cash on delivery.
- **Order tracking** – Real‑time status from “preparing” to “delivered”.
- **Multi‑language** – Kinyarwanda, English, and French interfaces.
- **Farmer alerts** – SMS/WhatsApp notifications for price drops or bulk purchase requests.
- **Admin dashboard** – Manage users, approve vendors, and view market analytics.
- **Offline‑first PWA** – Works in low‑connectivity areas typical in rural Rwanda.

## Tech Stack

| Layer        | Technology |
|--------------|------------|
| Frontend     | React 18 + Vite, Tailwind CSS, Leaflet (maps) |
| Backend      | Node.js + Express (TypeScript) |
| Database     | PostgreSQL + PostGIS (for geolocation) |
| Cache        | Redis (session & rate limiting) |
| File Storage | AWS S3 / Cloudflare R2 (product images) |
| SMS          | Africa’s Talking API |
| Payments     | MTN Momo API, Airtel Money API |
| Deployment   | Docker + Nginx, hosted on DigitalOcean (LON1 region) |

## Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+ with PostGIS)
- Redis (v7+)
- Package manager: npm or yarn
- Africa’s Talking account (SMS)
- Mobile money merchant credentials (MTN & Airtel)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mordekai32/RwandaHub.git
   cd RwandaHub
