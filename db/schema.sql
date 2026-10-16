CREATE TABLE IF NOT EXISTS wallet_users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  balance_paise BIGINT NOT NULL DEFAULT 0 CHECK (balance_paise >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id UUID PRIMARY KEY,
  operation_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES wallet_users(id),
  type TEXT NOT NULL CHECK (type IN ('ADD','WITHDRAW','SENT','RECEIVED')),
  counterparty_email TEXT,
  amount_paise BIGINT NOT NULL CHECK (amount_paise > 0),
  note TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS wallet_tx_user_created ON wallet_transactions(user_id,created_at DESC);
