CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT
);

CREATE TABLE technicians (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  job_number TEXT NOT NULL,
  customer_id INTEGER REFERENCES customers(id),
  item_type TEXT,
  brand TEXT,
  model TEXT,
  serial_number TEXT,
  fault_reported TEXT,
  status TEXT,
  is_customer_job BOOLEAN DEFAULT false
);

CREATE TABLE job_parts (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id),
  part_name TEXT,
  cost NUMERIC
);

CREATE TABLE job_technicians (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES jobs(id),
  technician_id INTEGER REFERENCES technicians(id),
  minutes_worked INTEGER
);

