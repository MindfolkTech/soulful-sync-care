import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ExternalLink } from "lucide-react";

interface DecisionReasonSelectorProps {
  applicationType?: string;
  registrationNumber?: string;
  registrationBody?: string;
  licenseExpiry?: string;
  insuranceProvider?: string;
  insuranceExpiry?: string;
  documents?: Record<string, any>;
  onReasonChange: (reason: string) => void;
  onDecisionTypeChange?: (type: 'approve' | 'reject') => void;
}

export function DecisionReasonSelector({
  applicationType,
  registrationNumber,
  registrationBody,
  licenseExpiry,
  insuranceProvider,
  insuranceExpiry,
  documents,
  onReasonChange,
  onDecisionTypeChange
}: DecisionReasonSelectorProps) {
  const [decisionType, setDecisionType] = useState<'approve' | 'reject' | ''>('');
  const [category, setCategory] = useState('');
  const [specificReason, setSpecificReason] = useState('');
  const [customDetails, setCustomDetails] = useState('');

  // Dynamic approval reasons based on application data
  const approvalReasons = {
    "Professional Registration": [
      `${registrationBody || 'Professional body'} registration verified - license number ${registrationNumber || '[number]'} confirmed on public register`,
      `Professional registration valid and current${licenseExpiry ? ` until ${licenseExpiry}` : ''}`,
      `Registration with ${registrationBody || 'professional body'} meets UK therapeutic practice standards`,
    ],
    "Documentation": [
      "All required documents provided and verified - qualification, registration, insurance, ID",
      "Professional qualification certificate verified and meets platform standards",
      `Professional indemnity insurance certificate valid${insuranceExpiry ? ` until ${insuranceExpiry}` : ''}`,
      "Photo ID verified - identity confirmed and matches registration details",
    ],
    "Experience & Profile": [
      "Experience level appropriate for therapeutic practice on platform",
      "Professional profile complete and meets platform quality standards",
      "Therapeutic approach and specialties align with platform client needs",
      "Application demonstrates competency for independent practice",
    ]
  };

  const rejectionReasons = {
    "Registration Issues": [
      `Unable to verify ${registrationBody || 'professional body'} registration number ${registrationNumber || '[number]'} on public register`,
      `Registration with ${registrationBody || 'professional body'} has expired - renewal required before approval`,
      "Registration number format invalid for specified professional body",
      "Professional body not recognized for UK therapeutic practice",
      "Registration status shows as suspended or inactive on public register",
    ],
    "Documentation Issues": [
      "Qualification certificate missing, unreadable, or does not support claimed professional title",
      "Professional registration document missing, invalid, or does not match provided details",
      "Professional indemnity insurance certificate missing, expired, or insufficient coverage",
      "Photo ID missing, expired, unclear, or does not match registration details",
      "Required documents incomplete - unable to proceed with verification",
    ],
    "Verification Failures": [
      "Documents do not match provided registration details - identity verification failed",
      "Qualification certificate does not support claimed professional title or experience level",
      "Unable to verify identity from provided photo ID against registration records",
      "Registration number belongs to different individual - identity mismatch detected",
      "Insurance coverage insufficient - minimum professional indemnity requirements not met",
    ],
    "Professional Standards": [
      "Experience level insufficient for platform requirements - additional training needed",
      "Professional profile incomplete, inappropriate, or does not meet quality standards",
      "Therapeutic approach not suitable for platform client base or safety requirements",
      "Application lacks evidence of competency for independent therapeutic practice",
    ]
  };

  // Update combined reason when any field changes
  useEffect(() => {
    let combinedReason = '';
    
    if (specificReason) {
      combinedReason = specificReason;
      if (customDetails.trim()) {
        combinedReason += ` - ${customDetails.trim()}`;
      }
    }
    
    onReasonChange(combinedReason);
  }, [specificReason, customDetails, onReasonChange]);

  // Notify parent of decision type changes
  useEffect(() => {
    if (decisionType && onDecisionTypeChange) {
      onDecisionTypeChange(decisionType as 'approve' | 'reject');
    }
  }, [decisionType, onDecisionTypeChange]);

  const handleDecisionTypeChange = (value: string) => {
    setDecisionType(value as 'approve' | 'reject' | '');
    setCategory('');
    setSpecificReason('');
    setCustomDetails('');
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setSpecificReason('');
    setCustomDetails('');
  };

  const handleQuickDecision = (type: 'approve' | 'reject', reason: string) => {
    setDecisionType(type);
    setSpecificReason(reason);
    setCustomDetails('');
    
    // Find the category for this reason
    const reasons = type === 'approve' ? approvalReasons : rejectionReasons;
    for (const [cat, reasonList] of Object.entries(reasons)) {
      if (reasonList.includes(reason)) {
        setCategory(cat);
        break;
      }
    }
  };

  const getPublicRegisterUrl = (body: string) => {
    const urls: Record<string, string> = {
      'BACP': 'https://www.bacp.co.uk/search/Therapists',
      'UKCP': 'https://www.psychotherapy.org.uk/find-a-therapist/',
      'HCPC': 'https://www.hcpc-uk.org/check-the-register/',
      'BPS': 'https://www.bps.org.uk/find-psychologist',
      'BABCP': 'https://www.babcp.com/review/Therapist-Directory.aspx'
    };
    return urls[body] || '';
  };

  return (
    <div className="space-y-6">
      {/* Application Context Card */}
      {(registrationBody || registrationNumber) && (
        <Card>
          <CardHeader className="p-4 md:p-5 lg:p-6 pb-0">
            <CardTitle className="font-primary text-lg">Application Context</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-5 lg:p-6 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {registrationBody && (
                <div>
                  <Label className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Professional Body</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--tag-specialty-text))]">
                      {registrationBody}
                    </Badge>
                    {getPublicRegisterUrl(registrationBody) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => window.open(getPublicRegisterUrl(registrationBody), '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Verify
                      </Button>
                    )}
                  </div>
                </div>
              )}
              {registrationNumber && (
                <div>
                  <Label className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Registration Number</Label>
                  <p className="font-secondary font-medium text-[hsl(var(--text-primary))] mt-1">{registrationNumber}</p>
                </div>
              )}
              {licenseExpiry && (
                <div>
                  <Label className="font-secondary text-sm text-[hsl(var(--text-secondary))]">License Expiry</Label>
                  <p className="font-secondary font-medium text-[hsl(var(--text-primary))] mt-1">{licenseExpiry}</p>
                </div>
              )}
              {insuranceProvider && (
                <div>
                  <Label className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Insurance Provider</Label>
                  <p className="font-secondary font-medium text-[hsl(var(--text-primary))] mt-1">{insuranceProvider}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="space-y-3">
        <Label className="font-secondary font-medium text-[hsl(var(--text-primary))]">Quick Actions</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickDecision('approve', `${registrationBody || 'Professional body'} registration verified - license number ${registrationNumber || '[number]'} confirmed on public register`)}
            className="text-[hsl(var(--success-text))] hover:bg-[hsl(var(--success-bg))] min-h-[--touch-target-min]"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {registrationBody || 'Registration'} Verified
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickDecision('reject', "Required documents incomplete - unable to proceed with verification")}
            className="text-[hsl(var(--error-text))] hover:bg-[hsl(var(--error-bg))] min-h-[--touch-target-min]"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Missing Documents
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickDecision('reject', `Registration with ${registrationBody || 'professional body'} has expired - renewal required before approval`)}
            className="text-[hsl(var(--warning-text))] hover:bg-[hsl(var(--warning-bg))] min-h-[--touch-target-min]"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Registration Expired
          </Button>
        </div>
      </div>

      {/* Decision Type Selection */}
      <div className="space-y-2">
        <Label htmlFor="decisionType" className="font-secondary font-medium text-[hsl(var(--text-primary))]">Decision Type</Label>
        <Select value={decisionType} onValueChange={handleDecisionTypeChange}>
          <SelectTrigger id="decisionType" className="min-h-[--touch-target-min]">
            <SelectValue placeholder="Approve or Reject?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="approve">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[hsl(var(--success-text))]" />
                Approve Application
              </div>
            </SelectItem>
            <SelectItem value="reject">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-[hsl(var(--error-text))]" />
                Reject Application
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category Selection */}
      {decisionType && (
        <div className="space-y-2">
          <Label htmlFor="category" className="font-secondary font-medium text-[hsl(var(--text-primary))]">Reason Category</Label>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category" className="min-h-[--touch-target-min]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(decisionType === 'approve' ? approvalReasons : rejectionReasons).map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Specific Reason Selection */}
      {category && (
        <div className="space-y-2">
          <Label htmlFor="specificReason" className="font-secondary font-medium text-[hsl(var(--text-primary))]">Specific Reason</Label>
          <Select value={specificReason} onValueChange={setSpecificReason}>
            <SelectTrigger id="specificReason" className="min-h-[--touch-target-min]">
              <SelectValue placeholder="Select specific reason" />
            </SelectTrigger>
            <SelectContent>
              {(decisionType === 'approve' ? approvalReasons[category] : rejectionReasons[category])?.map(reason => (
                <SelectItem key={reason} value={reason} className="text-sm">
                  {reason}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Additional Details */}
      {specificReason && (
        <div className="space-y-2">
          <Label htmlFor="customDetails" className="font-secondary font-medium text-[hsl(var(--text-primary))]">Additional Details (Optional)</Label>
          <Textarea
            id="customDetails"
            placeholder="Add any specific details, dates, or additional context..."
            value={customDetails}
            onChange={(e) => setCustomDetails(e.target.value)}
            rows={3}
            className="font-secondary"
          />
          <p className="font-secondary text-xs text-[hsl(var(--text-secondary))]">
            This will be shared with the therapist along with the main reason.
          </p>
        </div>
      )}

      {/* Decision Preview */}
      {specificReason && (
        <Card className="bg-[hsl(var(--surface-accent))]">
          <CardHeader className="p-4 md:p-5 lg:p-6 pb-0">
            <CardTitle className="font-primary text-lg flex items-center gap-2">
              {decisionType === 'approve' ? (
                <CheckCircle className="w-5 h-5 text-[hsl(var(--success-text))]" />
              ) : (
                <XCircle className="w-5 h-5 text-[hsl(var(--error-text))]" />
              )}
              Decision Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-5 lg:p-6">
            <div className="space-y-3">
              <div>
                <Badge 
                  variant={decisionType === 'approve' ? 'default' : 'destructive'}
                  className={decisionType === 'approve' 
                    ? 'bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]' 
                    : 'bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))]'
                  }
                >
                  {decisionType === 'approve' ? 'APPROVED' : 'REJECTED'}
                </Badge>
              </div>
              <div>
                <Label className="font-secondary text-sm font-medium text-[hsl(var(--text-secondary))]">Reason:</Label>
                <p className="font-secondary text-sm text-[hsl(var(--text-primary))] mt-1 leading-relaxed">
                  {specificReason}
                  {customDetails && ` - ${customDetails}`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
