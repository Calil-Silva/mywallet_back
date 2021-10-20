CREATE TABLE balances (
    id SERIAL PRIMARY KEY, 
    date DATE NOT NULL, 
    description TEXT, 
    balance NUMERIC
);