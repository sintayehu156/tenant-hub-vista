-- 1. Create Enums for various states and roles
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('owner', 'manager', 'staff', 'tenant', 'vendor');
    CREATE TYPE property_type AS ENUM ('residential', 'commercial', 'industrial', 'mixed');
    CREATE TYPE unit_type AS ENUM ('studio', '1br', '2br', '3br', 'commercial', 'penthouse');
    CREATE TYPE unit_status AS ENUM ('vacant', 'occupied', 'maintenance', 'reserved');
    CREATE TYPE lease_status AS ENUM ('active', 'pending', 'expired', 'terminated');
    CREATE TYPE invoice_status AS ENUM ('paid', 'unpaid', 'overdue', 'void');
    CREATE TYPE invoice_type AS ENUM ('rent', 'utility', 'maintenance', 'deposit', 'other');
    CREATE TYPE payment_method AS ENUM ('bank_transfer', 'credit_card', 'cash', 'check');
    CREATE TYPE payment_status AS ENUM ('completed', 'pending', 'failed');
    CREATE TYPE maintenance_priority AS ENUM ('low', 'medium', 'high', 'emergency');
    CREATE TYPE maintenance_status AS ENUM ('open', 'assigned', 'in_progress', 'resolved', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Organizations Table
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT,
    address JSONB,
    subscription_level TEXT DEFAULT 'basic',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Profiles Table (Extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    org_id UUID REFERENCES organizations(id),
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role user_role DEFAULT 'tenant',
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Properties Table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    address JSONB,
    type property_type NOT NULL,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Buildings Table
CREATE TABLE IF NOT EXISTS buildings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    floors INTEGER,
    units_count INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Units Table
CREATE TABLE IF NOT EXISTS units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
    unit_number TEXT NOT NULL,
    floor INTEGER,
    type unit_type NOT NULL,
    rent_amount NUMERIC(12, 2) NOT NULL,
    status unit_status DEFAULT 'vacant',
    size_sqft INTEGER,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Leases Table
CREATE TABLE IF NOT EXISTS leases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES profiles(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    rent_amount NUMERIC(12, 2) NOT NULL,
    deposit_amount NUMERIC(12, 2) NOT NULL,
    status lease_status DEFAULT 'pending',
    terms TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lease_id UUID NOT NULL REFERENCES leases(id),
    tenant_id UUID NOT NULL REFERENCES profiles(id),
    amount NUMERIC(12, 2) NOT NULL,
    due_date DATE NOT NULL,
    status invoice_status DEFAULT 'unpaid',
    type invoice_type DEFAULT 'rent',
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES invoices(id),
    tenant_id UUID NOT NULL REFERENCES profiles(id),
    amount NUMERIC(12, 2) NOT NULL,
    date TIMESTAMPTZ DEFAULT now(),
    method payment_method NOT NULL,
    status payment_status DEFAULT 'completed',
    transaction_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Maintenance Requests Table
CREATE TABLE IF NOT EXISTS maintenance_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id UUID NOT NULL REFERENCES units(id),
    tenant_id UUID NOT NULL REFERENCES profiles(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    priority maintenance_priority DEFAULT 'medium',
    status maintenance_status DEFAULT 'open',
    assigned_vendor_id UUID,
    images TEXT[],
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 11. Vendors Table
CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT,
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    rating NUMERIC(3, 2) DEFAULT 0,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE leases ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can view their own profile. Admins/Managers can view all in the same org.
CREATE POLICY "Users can view own profile" ON profiles 
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Managers can view org profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles AS p 
            WHERE p.id = auth.uid() AND p.role IN ('owner', 'manager') AND p.org_id = profiles.org_id
        )
    );

-- Properties: Viewable by anyone in the organization
CREATE POLICY "Org members can view properties" ON properties
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() AND profiles.org_id = properties.org_id
        )
    );

-- Maintenance Requests: Tenants can view/create their own. Staff/Managers can view/update all in org.
CREATE POLICY "Tenants can view own maintenance" ON maintenance_requests
    FOR SELECT USING (tenant_id = auth.uid());

CREATE POLICY "Tenants can create maintenance" ON maintenance_requests
    FOR INSERT WITH CHECK (tenant_id = auth.uid());

CREATE POLICY "Staff can manage maintenance" ON maintenance_requests
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() AND profiles.role IN ('owner', 'manager', 'staff')
        )
    );

-- Automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, avatar_url, role)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'avatar_url',
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'tenant'::user_role)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();