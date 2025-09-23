import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Camera, Video, X, Upload, CheckCircle2, AlertCircle } from "lucide-react";

interface VideoUploadProps {
  currentVideoUrl?: string;
  onVideoUploaded: (videoUrl: string) => void;
}

export function VideoUpload({ currentVideoUrl, onVideoUploaded }: VideoUploadProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [videoURL, setVideoURL] = useState<string>(currentVideoUrl || "");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  
  const { toast } = useToast();
  const { session } = useAuth();
  
  const MAX_RECORDING_TIME = 120; // 2 minutes in seconds
  
  useEffect(() => {
    return () => {
      // Clean up on unmount
      stopMediaTracks();
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, []);
  
  useEffect(() => {
    if (currentVideoUrl) {
      setVideoURL(currentVideoUrl);
    }
  }, [currentVideoUrl]);
  
  const stopMediaTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };
  
  const startRecording = async () => {
    setError(null);
    setSuccess(false);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 1280, height: 720 },
        audio: true 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9') 
          ? 'video/webm;codecs=vp9' 
          : 'video/webm'
      });
      
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordedBlob(blob);
        
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = url;
          videoRef.current.play();
        }
      };
      
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000);
      
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer to track recording time
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          
          // Auto-stop recording when reaching max time
          if (newTime >= MAX_RECORDING_TIME) {
            stopRecording();
          }
          
          return newTime;
        });
      }, 1000);
      
    } catch (err) {
      console.error("Error accessing media devices:", err);
      setError("Could not access camera and microphone. Please check permissions.");
    }
  };
  
  const stopRecording = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    
    stopMediaTracks();
    setIsRecording(false);
  };
  
  const discardRecording = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    setRecordedBlob(null);
    setPreviewUrl("");
    setRecordingTime(0);
    setError(null);
    setSuccess(false);
  };
  
  const uploadVideo = async () => {
    if (!recordedBlob || !session?.access_token) {
      setError("No video recorded or not authenticated");
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    
    try {
      // Create form data for the upload
      const formData = new FormData();
      formData.append("video", recordedBlob, "intro_video.webm");
      
      // Use XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total);
          setUploadProgress(progress);
        }
      });
      
      xhr.addEventListener("loadend", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.success && response.video.url) {
              setVideoURL(response.video.url);
              onVideoUploaded(response.video.url);
              setSuccess(true);
              toast({
                title: "Upload successful!",
                description: "Your introduction video has been saved.",
              });
            } else {
              setError("Unexpected response format");
            }
          } catch (e) {
            setError("Failed to parse response");
          }
        } else {
          try {
            const error = JSON.parse(xhr.responseText);
            setError(error.error || "Upload failed");
          } catch (e) {
            setError(`Upload failed: ${xhr.statusText}`);
          }
        }
        
        setIsUploading(false);
      });
      
      xhr.addEventListener("error", () => {
        setError("Network error occurred");
        setIsUploading(false);
      });
      
      xhr.addEventListener("abort", () => {
        setError("Upload was aborted");
        setIsUploading(false);
      });
      
      // Open and send the request
      xhr.open("POST", `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/cloudflare-stream`);
      xhr.setRequestHeader("Authorization", `Bearer ${session.access_token}`);
      xhr.send(formData);
      
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload video");
      setIsUploading(false);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const removeVideo = () => {
    setVideoURL("");
    onVideoUploaded("");
    setSuccess(false);
  };
  
  const renderRecordingInterface = () => (
    <div className="space-y-4">
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        <video 
          ref={videoRef} 
          className="w-full h-full object-cover"
          muted={isRecording} // Mute during recording to prevent feedback
        />
        
        {isRecording && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 px-3 py-1 rounded-full text-on-dark">
            <span className="animate-pulse h-3 w-3 rounded-full bg-red-500"></span>
            <span className="font-secondary text-sm">{formatTime(recordingTime)} / {formatTime(MAX_RECORDING_TIME)}</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-3">
        {isRecording ? (
          <Button 
            onClick={stopRecording}
            variant="primary" 
            className="w-full bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))] hover:bg-[hsl(var(--error-bg))]/90"
          >
            <X className="mr-2 h-4 w-4" />
            Stop Recording
          </Button>
        ) : (
          <>
            {previewUrl ? (
              <>
                <Button 
                  onClick={uploadVideo} 
                  variant="primary"
                  className="w-full"
                  disabled={isUploading}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isUploading ? "Uploading..." : "Upload Video"}
                </Button>
                <Button 
                  onClick={discardRecording}
                  variant="outline" 
                  className="w-1/3"
                  disabled={isUploading}
                >
                  <X className="mr-2 h-4 w-4" />
                  Discard
                </Button>
              </>
            ) : (
              <Button 
                onClick={startRecording} 
                variant="primary" 
                className="w-full"
              >
                <Camera className="mr-2 h-4 w-4" />
                Start Recording
              </Button>
            )}
          </>
        )}
      </div>
      
      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-center text-sm text-[hsl(var(--text-secondary))]">
            Uploading: {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  );
  
  const renderExistingVideo = () => (
    <div className="space-y-4">
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        <video 
          src={videoURL}
          controls 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="flex justify-between gap-3">
        <Button 
          onClick={() => {
            setVideoURL("");
            setPreviewUrl("");
            setRecordedBlob(null);
          }}
          variant="outline" 
          className="w-full"
        >
          <Camera className="mr-2 h-4 w-4" />
          Record New Video
        </Button>
        
        <Button 
          onClick={removeVideo} 
          variant="destructive"
        >
          <X className="mr-2 h-4 w-4" />
          Remove Video
        </Button>
      </div>
    </div>
  );
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-primary text-[hsl(var(--text-primary))]">Introduction Video</CardTitle>
        <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
          Record a 1-2 minute video introducing yourself to potential clients
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert>
            <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success-text))]" />
            <AlertDescription>Video uploaded successfully!</AlertDescription>
          </Alert>
        )}
        
        {videoURL ? renderExistingVideo() : renderRecordingInterface()}
        
        <div className="text-sm text-[hsl(var(--text-secondary))]">
          <div className="flex items-start gap-2">
            <Video className="h-4 w-4 mt-0.5" />
            <div>
              <p><strong>Tips for a great introduction video:</strong></p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>Speak clearly and be yourself</li>
                <li>Share your therapy approach and specialties</li>
                <li>Mention what clients can expect in sessions</li>
                <li>Keep it under 2 minutes</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
