import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { useNavigate } from "react-router-dom";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react";

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
    
    localStorage.setItem('therapistOnboarding', JSON.stringify({
      ...existing,
      currentStep: 6,
      profileData: {
        ...existing.profileData,
        ...formData
      },
      timestamp: Date.now()
    }));
  };

  const handleComplete = () => {
    handleSave();
    // Clear the onboarding data since it's complete
    localStorage.removeItem('therapistOnboarding');
    navigate("/t/dashboard");
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
    { key: 'qualification', label: 'Qualification Certificate', required: true },
    { key: 'registration', label: 'Professional Registration', required: true },
    { key: 'insurance', label: 'Professional Indemnity Insurance', required: true },
    { key: 'id', label: 'Photo ID (Driving License/Passport)', required: true },
    { key: 'cv', label: 'Professional CV', required: false }
  ];

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
                Upload your credentials
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-[hsl(var(--surface-accent))] p-6 rounded-lg">
                <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-3">
                  Verification Process
                </h3>
                <ul className="font-secondary text-[hsl(var(--text-secondary))] space-y-2 text-sm">
                  <li>• Verification typically takes 24-48 hours</li>
                  <li>• You can start with chemistry calls while waiting</li>
                  <li>• Clear photos work best - ensure text is readable</li>
                  <li>• All documents are handled securely and confidentially</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-primary font-semibold text-[hsl(var(--text-primary))]">
                  Required Documents
                </h4>
                
                {documentTypes.map((docType) => (
                  <div key={docType.key} className="space-y-2">
                    <Label htmlFor={docType.key}>
                      {docType.label}
                      {docType.required && <span className="text-red-500 ml-1">*</span>}
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
                                ? `${formData.documents[docType.key].name} uploaded`
                                : `Upload ${docType.label.toLowerCase()}`}
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
              </div>

              <HStack className="justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/t/onboarding/video")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleComplete} className="bg-primary">
                  Complete Onboarding
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                </Button>
              </HStack>
            </CardContent>
          </Card>
        </Stack>
      </div>
    </OnboardingLayout>
  );
}