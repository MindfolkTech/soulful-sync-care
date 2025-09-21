-- Extend therapist_applications with unified document keys and audit fields

ALTER TABLE public.therapist_applications
ADD COLUMN IF NOT EXISTS registration_body TEXT,
ADD COLUMN IF NOT EXISTS license_jurisdiction TEXT,
ADD COLUMN IF NOT EXISTS license_expiry DATE,
ADD COLUMN IF NOT EXISTS insurance_provider TEXT,
ADD COLUMN IF NOT EXISTS insurance_expiry DATE,
ADD COLUMN IF NOT EXISTS public_register_url TEXT,
ADD COLUMN IF NOT EXISTS reviewed_by UUID,
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS decision_reason TEXT;

-- Standardize documents payload to expected keys
-- Shape recommendation (not enforced by constraint):
-- {
--   "license": { "path": "storage/path.pdf", "uploaded_at": "2025-09-21T12:34:56Z" },
--   "registration": { ... },
--   "insurance": { ... },
--   "id": { ... },
--   "cv": { ... }
-- }

-- Indexes for admin queue performance
CREATE INDEX IF NOT EXISTS idx_therapist_applications_status_submitted_at
  ON public.therapist_applications (status, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_therapist_applications_user_id
  ON public.therapist_applications (user_id);

-- Trigger: when application is approved, flip therapist_profiles.verified = true
CREATE OR REPLACE FUNCTION public.approve_application_marks_profile_verified()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND NEW.status = 'approved' AND OLD.status IS DISTINCT FROM 'approved' THEN
    UPDATE public.therapist_profiles
      SET verified = true, verification_date = now(), updated_at = now()
    WHERE application_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_application_status_to_profile_verified ON public.therapist_applications;
CREATE TRIGGER trg_application_status_to_profile_verified
  AFTER UPDATE ON public.therapist_applications
  FOR EACH ROW EXECUTE FUNCTION public.approve_application_marks_profile_verified();


