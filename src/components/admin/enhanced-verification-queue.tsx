import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, FileText, User, Calendar, Clock, Eye, ExternalLink, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DecisionReasonSelector } from "./DecisionReasonSelector";
import { DocumentPreview } from "./DocumentPreview";
import { format } from "date-fns";
import type { Database } from "@/database.types";

type DbTherapistApplication = Database['public']['Tables']['therapist_applications']['Row'];

interface TherapistApplication {
  id: string;
  user_id: string;
  name: string;
  email: string;
  submitted_at: string;
  status: "pending" | "under_review" | "approved" | "rejected";
  license_number: string;
  registration_body: string | null;
  license_jurisdiction: string | null;
  license_expiry: string | null;
  insurance_provider: string | null;
  insurance_expiry: string | null;
  public_register_url: string | null;
  specialties: string[];
  experience: string;
  documents: Record<string, any>;
  background_check: boolean;
  decision_reason?: string | null;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
}

interface DecisionHistory {
  id: string;
  decision_date: string;
  created_at: string;
  action: string;
  reviewer_name: string;
  reviewer_email: string;
  old_status: string;
  new_status: string;
  reason: string;
  ip_address: string;
}

export function EnhancedVerificationQueue() {
  const [selectedApplication, setSelectedApplication] = useState<TherapistApplication | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [decisionReason, setDecisionReason] = useState("");
  const [decisionType, setDecisionType] = useState<'approve' | 'reject' | null>(null);
  const [documentPreview, setDocumentPreview] = useState<{
    isOpen: boolean;
    documentType: string;
    documentPath: string;
    therapistName: string;
  }>({
    isOpen: false,
    documentType: "",
    documentPath: "",
    therapistName: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch applications
  const { data: applications = [], isLoading, isError, error } = useQuery({
    queryKey: ['therapist_applications'],
    queryFn: async (): Promise<TherapistApplication[]> => {
      const { data, error } = await supabase
        .from('therapist_applications')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw new Error(error.message);
      
      // Transform the data to match our interface
      return (data || []).map((item: DbTherapistApplication): TherapistApplication => ({
        id: item.id,
        user_id: item.user_id,
        name: item.name,
        email: item.email,
        submitted_at: item.submitted_at || '',
        status: item.status as "pending" | "under_review" | "approved" | "rejected",
        license_number: item.license_number,
        registration_body: item.registration_body,
        license_jurisdiction: item.license_jurisdiction,
        license_expiry: item.license_expiry,
        insurance_provider: item.insurance_provider,
        insurance_expiry: item.insurance_expiry,
        public_register_url: item.public_register_url,
        specialties: Array.isArray(item.specialties) ? item.specialties : [],
        experience: item.experience,
        documents: typeof item.documents === 'object' && item.documents !== null ? item.documents as Record<string, any> : {},
        background_check: item.background_check,
        decision_reason: item.decision_reason,
        reviewed_by: item.reviewed_by,
        reviewed_at: item.reviewed_at,
      }));
    },
  });

  // Fetch decision history for selected application (simplified for now)
  const { data: decisionHistory = [] } = useQuery({
    queryKey: ['decision_history', selectedApplication?.id],
    queryFn: async (): Promise<DecisionHistory[]> => {
      if (!selectedApplication?.id) return [];
      
      // For now, return empty array since the function doesn't exist yet
      // TODO: Implement get_application_decision_history function
      return [];
    },
    enabled: !!selectedApplication?.id,
  });

  // Decision mutation
  const decisionMutation = useMutation({
    mutationFn: async ({ applicationId, status, reason }: { applicationId: string; status: 'approved' | 'rejected'; reason: string }) => {
      const { error } = await supabase
        .from('therapist_applications')
        .update({ 
          status, 
          decision_reason: reason,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (error) throw error;
    },
    onSuccess: (_, { status }) => {
      toast({
        title: status === 'approved' ? "Application Approved" : "Application Rejected",
        description: `Therapist has been ${status} and notified.`,
        variant: status === 'approved' ? 'default' : 'destructive',
      });
      queryClient.invalidateQueries({ queryKey: ['therapist_applications'] });
      queryClient.invalidateQueries({ queryKey: ['decision_history'] });
      setDetailsOpen(false);
      setSelectedApplication(null);
      setDecisionReason("");
      setDecisionType(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Decision Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDecision = () => {
    if (!selectedApplication || !decisionType || !decisionReason.trim()) return;
    
    // Convert approve/reject to approved/rejected for database
    const dbStatus = decisionType === 'approve' ? 'approved' : 'rejected';
    
    decisionMutation.mutate({
      applicationId: selectedApplication.id,
      status: dbStatus,
      reason: decisionReason
    });
  };

  const handleViewDetails = (application: TherapistApplication) => {
    setSelectedApplication(application);
    setDetailsOpen(true);
    setDecisionReason("");
    setDecisionType(null);
  };

  const handleDocumentPreview = (documentType: string, documentPath: string, therapistName: string) => {
    setDocumentPreview({
      isOpen: true,
      documentType,
      documentPath,
      therapistName,
    });
  };

  const closeDocumentPreview = () => {
    setDocumentPreview({
      isOpen: false,
      documentType: "",
      documentPath: "",
      therapistName: "",
    });
  };

  const getStatusBadge = (status: TherapistApplication["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]">Pending</Badge>;
      case "under_review":
        return <Badge variant="secondary" className="bg-[hsl(var(--info-bg))] text-[hsl(var(--info-text))]">Under Review</Badge>;
      case "approved":
        return <Badge variant="secondary" className="bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))]">Rejected</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPp");
  };

  const pendingApplications = (applications || []).filter(app => app.status === "pending");
  const reviewingApplications = (applications || []).filter(app => app.status === "under_review");
  const processedApplications = (applications || []).filter(app => ["approved", "rejected"].includes(app.status));

  const renderApplicationsList = (apps: TherapistApplication[], hideActions = false) => {
    if (apps.length === 0) {
      return (
        <Card className="min-w-0 overflow-hidden">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 text-[hsl(var(--text-secondary))] mb-4" />
              <p className="font-secondary text-[hsl(var(--text-secondary))]">No applications in this category</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="min-w-0 overflow-hidden">
        <CardContent className="p-0">
          <Table role="table" aria-label="Therapist applications table">
            <TableHeader role="rowgroup">
              <TableRow role="row">
                <TableHead className="font-secondary">Therapist</TableHead>
                <TableHead className="font-secondary">Registration</TableHead>
                <TableHead className="font-secondary">Specialties</TableHead>
                <TableHead className="font-secondary">Experience</TableHead>
                <TableHead className="font-secondary">Submitted</TableHead>
                <TableHead className="font-secondary">Status</TableHead>
                {!hideActions && <TableHead className="font-secondary">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody role="rowgroup">
              {apps.map((application) => (
                <TableRow key={application.id} role="row">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[hsl(var(--surface-accent))] flex items-center justify-center">
                        <User className="h-5 w-5 text-[hsl(var(--text-primary))]" />
                      </div>
                      <div>
                        <h4 className="font-secondary font-bold text-[hsl(var(--text-primary))]">{application.name}</h4>
                        <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">{application.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--tag-specialty-text))]">
                          {application.registration_body || 'N/A'}
                        </Badge>
                      </div>
                      <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">{application.license_number}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {application.specialties?.slice(0, 2).map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="bg-[hsl(var(--tag-modality-bg))] text-[hsl(var(--tag-modality-text))]">
                          {specialty}
                        </Badge>
                      ))}
                      {application.specialties?.length > 2 && (
                        <Badge variant="secondary" className="bg-[hsl(var(--tag-misc-bg))] text-[hsl(var(--tag-misc-text))]">
                          +{application.specialties.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-secondary text-[hsl(var(--text-primary))]">{application.experience}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[hsl(var(--text-secondary))]" />
                      <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                        {formatDate(application.submitted_at)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(application.status)}
                  </TableCell>
                  {!hideActions && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(application)}
                          className="min-h-[--touch-target-min] min-w-[--touch-target-min]"
                          aria-label={`View details for ${application.name}'s application`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--jovial-jade))] mx-auto mb-4"></div>
          <p className="font-secondary text-[hsl(var(--text-secondary))]">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="bg-[hsl(var(--error-bg))] border-[hsl(var(--error-text))]/20">
        <CardContent className="p-6 flex items-center gap-4">
          <XCircle className="h-8 w-8 text-[hsl(var(--error-text))]" />
          <div>
            <h3 className="font-primary font-bold text-[hsl(var(--error-text))]">Failed to load applications</h3>
            <p className="font-secondary text-sm text-[hsl(var(--error-text))]/90">{error?.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">Therapist Verification Queue</h1>
          <p className="font-secondary text-[hsl(var(--text-secondary))]">Review and process therapist applications with structured decision tracking</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))]">
            {pendingApplications.length} Pending
          </Badge>
          <Badge variant="secondary" className="bg-[hsl(var(--info-bg))] text-[hsl(var(--info-text))]">
            {reviewingApplications.length} In Review
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3" role="tablist">
          <TabsTrigger value="pending" className="flex items-center gap-2 min-h-[--touch-target-min]">
            <Clock className="h-4 w-4" />
            Pending ({pendingApplications.length})
          </TabsTrigger>
          <TabsTrigger value="reviewing" className="flex items-center gap-2 min-h-[--touch-target-min]">
            <Eye className="h-4 w-4" />
            In Review ({reviewingApplications.length})
          </TabsTrigger>
          <TabsTrigger value="processed" className="flex items-center gap-2 min-h-[--touch-target-min]">
            <CheckCircle className="h-4 w-4" />
            Processed ({processedApplications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {renderApplicationsList(pendingApplications)}
        </TabsContent>

        <TabsContent value="reviewing" className="space-y-4">
          {renderApplicationsList(reviewingApplications)}
        </TabsContent>

        <TabsContent value="processed" className="space-y-4">
          {renderApplicationsList(processedApplications, true)}
        </TabsContent>
      </Tabs>

      {/* Application Details Dialog */}
      {selectedApplication && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-primary text-[hsl(var(--text-primary))]">
                Application Details - {selectedApplication.name}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Application Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card className="min-w-0 overflow-hidden">
                  <CardHeader className="p-4 md:p-5 lg:p-6 pb-0">
                    <CardTitle className="font-primary text-lg">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-5 lg:p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Name</Label>
                        <p className="font-secondary font-bold text-[hsl(var(--text-primary))]">{selectedApplication.name}</p>
                      </div>
                      <div>
                        <Label className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Email</Label>
                        <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{selectedApplication.email}</p>
                      </div>
                      <div>
                        <Label className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Registration Body</Label>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--tag-specialty-text))]">
                            {selectedApplication.registration_body}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="font-secondary text-sm text-[hsl(var(--text-secondary))]">License Number</Label>
                        <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{selectedApplication.license_number}</p>
                      </div>
                      <div>
                        <Label className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Experience</Label>
                        <p className="font-secondary font-medium text-[hsl(var(--text-primary))]">{selectedApplication.experience}</p>
                      </div>
                      <div>
                        <Label className="font-secondary text-sm text-[hsl(var(--text-secondary))]">Status</Label>
                        <div className="mt-1">
                          {getStatusBadge(selectedApplication.status)}
                        </div>
                      </div>
                    </div>
                    
                    {selectedApplication.specialties && (
                      <div>
                        <Label className="font-secondary text-sm text-[hsl(var(--text-secondary))] mb-2 block">Specialties</Label>
                        <div className="flex flex-wrap gap-2">
                          {selectedApplication.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="bg-[hsl(var(--tag-modality-bg))] text-[hsl(var(--tag-modality-text))]">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Documents */}
                <Card className="min-w-0 overflow-hidden">
                  <CardHeader className="p-4 md:p-5 lg:p-6 pb-0">
                    <CardTitle className="font-primary text-lg">Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-5 lg:p-6 space-y-3">
                    {Object.entries(selectedApplication.documents || {}).map(([type, filename]) => (
                      <div key={type} className="flex items-center justify-between p-3 border border-[hsl(var(--border))] rounded-md">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-[hsl(var(--text-secondary))]" />
                          <div>
                            <p className="font-secondary font-medium text-[hsl(var(--text-primary))] capitalize">{type.replace('_', ' ')}</p>
                            <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">{filename}</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="min-h-[--touch-target-min]"
                          onClick={() => handleDocumentPreview(type, filename as string, selectedApplication.name)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Decision History */}
                {decisionHistory.length > 0 && (
                  <Card className="min-w-0 overflow-hidden">
                    <CardHeader className="p-4 md:p-5 lg:p-6 pb-0">
                      <CardTitle className="font-primary text-lg flex items-center gap-2">
                        <History className="w-5 h-5" />
                        Decision History
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-5 lg:p-6">
                      <div className="space-y-3">
                        {(decisionHistory || []).map((decision, index) => (
                          <div key={decision.id || index} className="flex items-start gap-3 p-3 border-l-2 border-[hsl(var(--jovial-jade))]">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Badge variant={decision.action.includes('APPROVED') ? 'default' : 'destructive'}>
                                  {decision.action}
                                </Badge>
                                <span className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                                  by {decision.reviewer_name}
                                </span>
                              </div>
                              <p className="font-secondary text-sm mt-1">{decision.reason}</p>
                              <p className="font-secondary text-xs text-[hsl(var(--text-secondary))] mt-1">
                                {formatDate(decision.created_at || decision.decision_date)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Decision Panel */}
              <div className="space-y-6">
                {selectedApplication.status === "pending" && (
                  <Card className="min-w-0 overflow-hidden">
                    <CardHeader className="p-4 md:p-5 lg:p-6 pb-0">
                      <CardTitle className="font-primary text-lg">Make Decision</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-5 lg:p-6">
                      <DecisionReasonSelector
                        registrationBody={selectedApplication.registration_body}
                        registrationNumber={selectedApplication.license_number}
                        licenseExpiry={selectedApplication.license_expiry}
                        insuranceProvider={selectedApplication.insurance_provider}
                        insuranceExpiry={selectedApplication.insurance_expiry}
                        documents={selectedApplication.documents}
                        onReasonChange={setDecisionReason}
                        onDecisionTypeChange={setDecisionType}
                      />
                      
                      <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-[hsl(var(--border))]">
                        <Button
                          variant="outline"
                          onClick={() => setDetailsOpen(false)}
                          className="min-h-[--touch-target-min]"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleDecision}
                          disabled={!decisionType || !decisionReason.trim() || decisionMutation.isPending}
                          className="min-h-[--touch-target-min]"
                        >
                          {decisionMutation.isPending ? "Processing..." : `${decisionType === 'approve' ? 'Approve' : 'Reject'} Application`}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Display existing decision for processed applications */}
                {(selectedApplication.status === "approved" || selectedApplication.status === "rejected") && selectedApplication.decision_reason && (
                  <Card className="min-w-0 overflow-hidden">
                    <CardHeader className="p-4 md:p-5 lg:p-6 pb-0">
                      <CardTitle className="font-primary text-lg">Decision Record</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-5 lg:p-6">
                      <div className="space-y-3">
                        <Badge variant={selectedApplication.status === 'approved' ? 'default' : 'destructive'}>
                          {selectedApplication.status.toUpperCase()}
                        </Badge>
                        <p className="font-secondary text-[hsl(var(--text-primary))]">{selectedApplication.decision_reason}</p>
                        {selectedApplication.reviewed_at && (
                          <p className="font-secondary text-xs text-[hsl(var(--text-secondary))]">
                            Decided on {formatDate(selectedApplication.reviewed_at)}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Document Preview Modal */}
      <DocumentPreview
        isOpen={documentPreview.isOpen}
        onClose={closeDocumentPreview}
        documentType={documentPreview.documentType}
        documentPath={documentPreview.documentPath}
        therapistName={documentPreview.therapistName}
      />
    </div>
  );
}
