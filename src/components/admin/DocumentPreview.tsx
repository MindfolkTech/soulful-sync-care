import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Download, FileText, Image, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DocumentPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: string;
  documentPath: string;
  therapistName: string;
}

export function DocumentPreview({
  isOpen,
  onClose,
  documentType,
  documentPath,
  therapistName,
}: DocumentPreviewProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);

  // Get document URL from Supabase Storage
  const getDocumentUrl = async () => {
    if (!documentPath) return null;
    
    try {
      setLoading(true);
      setError(null);
      
      // Get public URL from Supabase Storage
      const { data } = supabase.storage
        .from('therapist-documents')
        .getPublicUrl(documentPath);
      
      if (data?.publicUrl) {
        setDocumentUrl(data.publicUrl);
        return data.publicUrl;
      } else {
        throw new Error('Could not generate document URL');
      }
    } catch (err) {
      console.error('Error getting document URL:', err);
      setError(err instanceof Error ? err.message : 'Failed to load document');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Load document when dialog opens
  React.useEffect(() => {
    if (isOpen && documentPath && !documentUrl) {
      getDocumentUrl();
    }
  }, [isOpen, documentPath, documentUrl]);

  const handleDownload = async () => {
    if (!documentUrl) return;
    
    try {
      const response = await fetch(documentUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${therapistName}_${documentType}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
      setError('Failed to download document');
    }
  };

  const isImage = (path: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some(ext => path.toLowerCase().endsWith(ext));
  };

  const isPdf = (path: string) => {
    return path.toLowerCase().endsWith('.pdf');
  };

  const renderDocumentContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-[hsl(var(--text-secondary))] mb-4 animate-pulse" />
            <p className="font-secondary text-[hsl(var(--text-secondary))]">Loading document...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    if (!documentUrl) {
      return (
        <Alert>
          <FileText className="h-4 w-4" />
          <AlertDescription>No document available for preview</AlertDescription>
        </Alert>
      );
    }

    // Render image
    if (isImage(documentPath)) {
      return (
        <div className="flex justify-center">
          <img 
            src={documentUrl} 
            alt={`${documentType} for ${therapistName}`}
            className="max-w-full max-h-[600px] object-contain rounded-lg shadow-lg"
            onError={() => setError('Failed to load image')}
          />
        </div>
      );
    }

    // Render PDF
    if (isPdf(documentPath)) {
      return (
        <div className="w-full h-[600px] border rounded-lg overflow-hidden">
          <iframe
            src={`${documentUrl}#toolbar=1&navpanes=1&scrollbar=1`}
            className="w-full h-full"
            title={`${documentType} for ${therapistName}`}
            onError={() => setError('Failed to load PDF')}
          />
        </div>
      );
    }

    // Fallback for other document types
    return (
      <div className="text-center py-16">
        <FileText className="mx-auto h-16 w-16 text-[hsl(var(--text-secondary))] mb-4" />
        <p className="font-secondary text-[hsl(var(--text-primary))] mb-2">
          Document preview not available
        </p>
        <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mb-4">
          Click download to view this {documentType}
        </p>
        <Button onClick={handleDownload} className="min-h-[--touch-target-min]">
          <Download className="h-4 w-4 mr-2" />
          Download Document
        </Button>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <DialogTitle className="font-primary text-xl">
              {documentType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </DialogTitle>
            <p className="font-secondary text-sm text-[hsl(var(--text-secondary))] mt-1">
              {therapistName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {documentUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="min-h-[--touch-target-min]"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="min-h-[--touch-target-min]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {renderDocumentContent()}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
