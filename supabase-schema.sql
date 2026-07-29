-- Being Clinical Supervisor - rancangan awal Supabase
create extension if not exists "uuid-ossp";

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('client','professional','admin','superadmin')),
  full_name text not null,
  phone text,
  birth_date date,
  gender text,
  occupation text,
  health_history text,
  avatar_url text,
  created_at timestamptz default now()
);

create table professional_profiles (
  user_id uuid primary key references profiles(id) on delete cascade,
  certifications text[],
  expertise_tags text[],
  experience_years int default 0,
  bio text,
  rating numeric(2,1) default 0,
  verified boolean default false,
  base_price numeric default 0
);

create table service_requests (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references profiles(id),
  category text not null,
  title text not null,
  description text not null,
  attachment_url text,
  status text default 'matching',
  created_at timestamptz default now()
);

create table matches (
  id uuid primary key default uuid_generate_v4(),
  request_id uuid references service_requests(id) on delete cascade,
  professional_id uuid references profiles(id),
  score numeric,
  rank int,
  created_at timestamptz default now()
);

create table bookings (
  id uuid primary key default uuid_generate_v4(),
  request_id uuid references service_requests(id),
  client_id uuid references profiles(id),
  professional_id uuid references profiles(id),
  service_model text check (service_model in ('text','teleconsultation','in_person')),
  scheduled_at timestamptz,
  duration_minutes int default 60,
  price numeric,
  status text default 'pending',
  meeting_url text,
  location text,
  created_at timestamptz default now()
);

create table consultation_messages (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references bookings(id) on delete cascade,
  sender_id uuid references profiles(id),
  message text not null,
  created_at timestamptz default now()
);

create table consultation_reports (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references bookings(id) unique,
  summary text,
  analysis text,
  recommendation text,
  follow_up text,
  pdf_url text,
  finalized_at timestamptz
);

create table payments (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references bookings(id),
  invoice_number text unique,
  method text,
  amount numeric not null,
  status text default 'pending',
  gateway_reference text,
  paid_at timestamptz,
  created_at timestamptz default now()
);

create table reviews (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references bookings(id) unique,
  client_id uuid references profiles(id),
  professional_id uuid references profiles(id),
  rating int check (rating between 1 and 5),
  review text,
  created_at timestamptz default now()
);
