# Digital Wallet Transaction System — Group 2

A **Vercel-ready Next.js web adaptation** of the Industrial Practice Java Swing wallet presentation. Virtual INR only: **not a real-money payment platform**.

**Team**: Parth Jitendra Angare (Roll 04), Ifra Qumruzama Ansari (05), Aniruddh Anil Kumar Audichya (06).

## Features
- Register / login using salted scrypt password hashes and an HTTP-only, signed session cookie
- Wallet balance, add and withdraw **simulated** funds
- Transfer virtual funds between registered users (atomic PostgreSQL transaction)
- Transaction history, CSV download, ₹50,000 daily outgoing transfer limit
- All monetary values held as **integer paise**, persistent PostgreSQL storage
- Responsive website and server-side input validation

## Setup locally
1. Install Node.js **20.19+** and a PostgreSQL database (e.g. Neon or Vercel Marketplace Postgres provider).
2. Run the SQL in `db/schema.sql` **once** in your database's SQL editor.
3. Copy `.env.example` to `.env.local`, set `DATABASE_URL` to the PostgreSQL connection URI and `SESSION_SECRET` to a long random value. Keep these private.
4. Run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Sign up two users to test transfers.

## Deploy on Vercel (later)
1. Push this folder to your own GitHub repository.
2. In Vercel select **Add New Project** → Import the GitHub repository (framework: Next.js).
3. Provision a PostgreSQL database with the Vercel Marketplace (or external Neon), and execute `db/schema.sql`.
4. Configure these **server-side environment variables** in Vercel project settings: `DATABASE_URL`, `SESSION_SECRET`.
5. Select **Deploy**. The single Next.js deployment serves both frontend and `/api` backend. No `vercel.json` is necessary.

## Security and scope
This is an educational simulation. Add/withdraw operations do not interact with a bank. Do not connect real payment rails without a dedicated security review, authorization, KYC/compliance review, fraud controls, rate limiting, and operational safeguards. This demo lacks email verification, password recovery, bot protection and production security monitoring. Avoid public production use with sensitive data.

## Architecture change from slides
Original slides describe **Java 17+, Swing, and serialized offline local state**. A Swing desktop UI cannot directly run as a Vercel web app, so this version uses **Next.js/React, Node.js route handlers, and PostgreSQL**. It retains the general wallet experience, but is **not** the original Java code or storage architecture. For your presentation, explain the distinction clearly.
