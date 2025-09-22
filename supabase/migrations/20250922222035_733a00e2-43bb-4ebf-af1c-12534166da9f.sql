-- Create client testimonials table
CREATE TABLE public.client_testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  therapist_id UUID NOT NULL,
  client_id UUID NOT NULL,
  appointment_id UUID REFERENCES public.appointments(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  testimonial_text TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.client_testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for testimonials
CREATE POLICY "Clients can create their own testimonials" 
ON public.client_testimonials 
FOR INSERT 
WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can view and update their own testimonials" 
ON public.client_testimonials 
FOR ALL
USING (auth.uid() = client_id);

CREATE POLICY "Therapists can view testimonials about them" 
ON public.client_testimonials 
FOR SELECT 
USING (auth.uid() = therapist_id);

CREATE POLICY "Public testimonials are viewable by all authenticated users" 
ON public.client_testimonials 
FOR SELECT 
USING (is_public = true);

CREATE POLICY "Admins can manage all testimonials" 
ON public.client_testimonials 
FOR ALL
USING (is_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_client_testimonials_updated_at
BEFORE UPDATE ON public.client_testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();