-- Upgrade user role to admin
UPDATE public.profiles 
SET role = 'admin'
WHERE id = '3982d0fc-9a3e-4d4f-8e67-449086469717';