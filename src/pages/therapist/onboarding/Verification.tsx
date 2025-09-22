import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { ArrowLeft, Upload, CheckCircle2, Info, ArrowRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge";

export default function OnboardingVerification() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    documents: {} as Record<string, File>
  });

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('therapistOnboarding');
    if (saved) {
      const { profileData } = JSON.parse(saved);
      setFormData({
        documents: profileData.documents || {}
      });
    }
  }, []);

  const handleSave = () => {
    const saved = localStorage.getItem('therapistOnboarding');
    const existing = saved ? JSON.parse(saved) : { currentStep: 6, profileData: {} };
    
    // In a real app, you'd upload files to secure storage here
    // and just save the URLs/references in localStorage.
    // For this example, we are not handling actual file objects in localStorage.
    const documentNames = Object.entries(formData.documents).reduce((acc, [key, file]) => {
      if (file instanceof File) {
        acc[key] = { name: file.name, size: file.size, type: file.type };
      }
      return acc;
    }, {} as Record<string, any>);

    localStorage.setItem('therapistOnboarding', JSON.stringify({
      ...existing,
      currentStep: 6,
      profileData: {
        ...existing.profileData,
        documents: documentNames, // Saving file metadata instead of File object
      },
      timestamp: Date.now()
    }));
  };

  const handleFinishLater = () => {
    handleSave();
    navigate("/t/dashboard");
  };
  
  const handleComplete = () => {
    handleSave();
    // Here you would typically have validation to ensure all required docs are uploaded
    // before allowing completion and clearing localStorage.
    // localStorage.removeItem('therapistOnboarding');
    navigate("/t/onboarding/policies");
  };

  const handleFileUpload = (docType: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        documents: { ...prev.documents, [docType]: file }
      }));
    }
  };

  const documentTypes = [
    { key: 'qualification', label: 'Qualification Certificate', required: true, tooltip: 'A copy of your main therapeutic qualification certificate (e.g., MSc, PhD, Diploma).' },
    { key: 'registration', label: 'Professional Registration', required: true, tooltip: 'Proof of current registration/accreditation with a recognised professional body (e.g., BACP, UKCP).' },
    { key: 'insurance', label: 'Professional Indemnity Insurance', required: true, tooltip: 'A valid certificate of professional liability/indemnity insurance.' },
    { key: 'id', label: 'Photo ID', required: true, tooltip: 'A clear copy of a valid government-issued photo ID (e.g., passport or driving license).' },
    { key: 'cv', label: 'Professional CV', required: false, tooltip: 'Your up-to-date CV detailing your professional experience. This is optional but recommended.' }
  ];
  
  const allRequiredDocsUploaded = documentTypes
    .filter(doc => doc.required)
    .every(doc => formData.documents[doc.key]);

  return (
    <OnboardingLayout currentStep={6} totalSteps={6}>
      <div className="p-4 md:p-6 lg:p-8">
        <Stack className="space-y-6">
          <Card className="min-h-[500px] shadow-lg border-0">
            <CardHeader className="text-center pb-8">
              <h1 className="font-primary text-[hsl(var(--text-2xl))] tracking-tight">
                Professional Verification
              </h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-lg">
                Upload your credentials securely. You can save and return later.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-[hsl(var(--surface-accent))] p-6 rounded-lg">
                <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-3">
                  Why we need these documents
                </h3>
                <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">
                  To ensure the safety and quality of our platform, we verify every therapist's credentials. All documents are stored securely and handled with confidentiality. 
                  <Link to="/legal/document-policy" className="text-primary underline ml-1">Learn more.</Link>
                </p>
              </div>

              <div className="space-y-4">
                <TooltipProvider>
                  {documentTypes.map((docType) => (
                    <div key={docType.key} className="space-y-2">
                      <Label htmlFor={docType.key} className="flex items-center">
                        {docType.label}
                        {docType.required ? <Badge variant="destructive" className="ml-2">Required</Badge> : <Badge variant="secondary" className="ml-2">Optional</Badge>}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 ml-2 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{docType.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4">
                        <input
                          type="file"
                          id={docType.key}
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload(docType.key, e)}
                          className="hidden"
                        />
                        <label htmlFor={docType.key} className="cursor-pointer">
                          <div className="flex items-center space-x-3">
                            {formData.documents[docType.key] ? (
                              <CheckCircle2 className="w-6 h-6 text-green-500" />
                            ) : (
                              <Upload className="w-6 h-6 text-text-muted" />
                            )}
                            <div className="flex-1">
                              <p className="font-secondary text-sm text-text-primary">
                                {formData.documents[docType.key] 
                                  ? `${(formData.documents[docType.key] as File).name} uploaded`
                                  : `Upload your file`}
                              </p>
                              <p className="font-secondary text-xs text-text-muted">
                                PDF, JPG, PNG (max 10MB)
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </TooltipProvider>
              </div>

              <HStack className="justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/t/onboarding/video")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div className="flex gap-2">
                    <Button variant="ghost" onClick={handleFinishLater}>
                        Finish Later
                    </Button>
                    <Button onClick={handleComplete} disabled={!allRequiredDocsUploaded}>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
              </HStack>
            </CardContent>
          </Card>
        </Stack>
      </div>
    </OnboardingLayout>
  );
}