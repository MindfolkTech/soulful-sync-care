export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_actions: {
        Row: {
          action_type: string
          admin_id: string
          created_at: string
          details: Json | null
          id: string
          target_id: string
          target_type: string
        }
        Insert: {
          action_type: string
          admin_id: string
          created_at?: string
          details?: Json | null
          id?: string
          target_id: string
          target_type: string
        }
        Update: {
          action_type?: string
          admin_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          target_id?: string
          target_type?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          client_id: string
          created_at: string
          currency: string | null
          daily_room_name: string | null
          daily_room_url: string | null
          duration_minutes: number | null
          id: string
          notes: string | null
          price_cents: number | null
          scheduled_at: string
          session_type: string
          status: string | null
          therapist_id: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          currency?: string | null
          daily_room_name?: string | null
          daily_room_url?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          price_cents?: number | null
          scheduled_at: string
          session_type?: string
          status?: string | null
          therapist_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          currency?: string | null
          daily_room_name?: string | null
          daily_room_url?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          price_cents?: number | null
          scheduled_at?: string
          session_type?: string
          status?: string | null
          therapist_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapist_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      assessment_answers: {
        Row: {
          answer_score: number | null
          answer_value: string | null
          assessment_id: string
          created_at: string
          id: string
          question_id: string
        }
        Insert: {
          answer_score?: number | null
          answer_value?: string | null
          assessment_id: string
          created_at?: string
          id?: string
          question_id: string
        }
        Update: {
          answer_score?: number | null
          answer_value?: string | null
          assessment_id?: string
          created_at?: string
          id?: string
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_answers_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "user_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          flagged_reason: string | null
          id: string
          is_flagged: boolean | null
          is_read: boolean | null
          message_type: string | null
          recipient_id: string
          sender_id: string
          thread_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          flagged_reason?: string | null
          id?: string
          is_flagged?: boolean | null
          is_read?: boolean | null
          message_type?: string | null
          recipient_id: string
          sender_id: string
          thread_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          flagged_reason?: string | null
          id?: string
          is_flagged?: boolean | null
          is_read?: boolean | null
          message_type?: string | null
          recipient_id?: string
          sender_id?: string
          thread_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_cents: number
          appointment_id: string | null
          client_id: string
          created_at: string
          currency: string | null
          id: string
          paid_at: string | null
          platform_fee_cents: number | null
          status: string | null
          stripe_payment_intent_id: string | null
          therapist_id: string
          therapist_payout_cents: number | null
          updated_at: string
        }
        Insert: {
          amount_cents: number
          appointment_id?: string | null
          client_id: string
          created_at?: string
          currency?: string | null
          id?: string
          paid_at?: string | null
          platform_fee_cents?: number | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          therapist_id: string
          therapist_payout_cents?: number | null
          updated_at?: string
        }
        Update: {
          amount_cents?: number
          appointment_id?: string | null
          client_id?: string
          created_at?: string
          currency?: string | null
          id?: string
          paid_at?: string | null
          platform_fee_cents?: number | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          therapist_id?: string
          therapist_payout_cents?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapist_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          clerk_user_id: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          first_name: string | null
          gender: string | null
          id: string
          is_verified: boolean | null
          language_preference: string | null
          last_name: string | null
          location_city: string | null
          location_country: string | null
          phone: string | null
          role: string
          timezone: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          clerk_user_id?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          first_name?: string | null
          gender?: string | null
          id?: string
          is_verified?: boolean | null
          language_preference?: string | null
          last_name?: string | null
          location_city?: string | null
          location_country?: string | null
          phone?: string | null
          role?: string
          timezone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          clerk_user_id?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          first_name?: string | null
          gender?: string | null
          id?: string
          is_verified?: boolean | null
          language_preference?: string | null
          last_name?: string | null
          location_city?: string | null
          location_country?: string | null
          phone?: string | null
          role?: string
          timezone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          appointment_id: string | null
          client_id: string
          created_at: string
          flagged_reason: string | null
          id: string
          is_flagged: boolean | null
          is_published: boolean | null
          rating: number
          review_text: string | null
          therapist_id: string
          updated_at: string
        }
        Insert: {
          appointment_id?: string | null
          client_id: string
          created_at?: string
          flagged_reason?: string | null
          id?: string
          is_flagged?: boolean | null
          is_published?: boolean | null
          rating: number
          review_text?: string | null
          therapist_id: string
          updated_at?: string
        }
        Update: {
          appointment_id?: string | null
          client_id?: string
          created_at?: string
          flagged_reason?: string | null
          id?: string
          is_flagged?: boolean | null
          is_published?: boolean | null
          rating?: number
          review_text?: string | null
          therapist_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapist_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      sessions: {
        Row: {
          appointment_id: string
          client_feedback_rating: number | null
          client_feedback_text: string | null
          created_at: string
          duration_minutes: number | null
          ended_at: string | null
          id: string
          session_notes: string | null
          started_at: string | null
          therapist_notes: string | null
          updated_at: string
        }
        Insert: {
          appointment_id: string
          client_feedback_rating?: number | null
          client_feedback_text?: string | null
          created_at?: string
          duration_minutes?: number | null
          ended_at?: string | null
          id?: string
          session_notes?: string | null
          started_at?: string | null
          therapist_notes?: string | null
          updated_at?: string
        }
        Update: {
          appointment_id?: string
          client_feedback_rating?: number | null
          client_feedback_text?: string | null
          created_at?: string
          duration_minutes?: number | null
          ended_at?: string | null
          id?: string
          session_notes?: string | null
          started_at?: string | null
          therapist_notes?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_by: string | null
          category: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_by?: string | null
          category?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_by?: string | null
          category?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "therapist_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      therapist_identity_tags: {
        Row: {
          created_at: string
          id: string
          identity_tag: string
          therapist_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          identity_tag: string
          therapist_id: string
        }
        Update: {
          created_at?: string
          id?: string
          identity_tag?: string
          therapist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapist_identity_tags_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      therapist_modalities: {
        Row: {
          created_at: string
          id: string
          modality: string
          therapist_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          modality: string
          therapist_id: string
        }
        Update: {
          created_at?: string
          id?: string
          modality?: string
          therapist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapist_modalities_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      therapist_personality_tags: {
        Row: {
          created_at: string
          id: string
          personality_tag: string
          therapist_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          personality_tag: string
          therapist_id: string
        }
        Update: {
          created_at?: string
          id?: string
          personality_tag?: string
          therapist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapist_personality_tags_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      therapist_profiles: {
        Row: {
          bio: string | null
          clerk_user_id: string | null
          created_at: string
          currency: string | null
          education: string | null
          hourly_rate_cents: number | null
          id: string
          is_accepting_clients: boolean | null
          license_expiry: string | null
          license_number: string | null
          license_state: string | null
          stripe_account_id: string | null
          updated_at: string
          user_id: string | null
          verification_status: string | null
          video_intro_url: string | null
          years_experience: number | null
        }
        Insert: {
          bio?: string | null
          clerk_user_id?: string | null
          created_at?: string
          currency?: string | null
          education?: string | null
          hourly_rate_cents?: number | null
          id?: string
          is_accepting_clients?: boolean | null
          license_expiry?: string | null
          license_number?: string | null
          license_state?: string | null
          stripe_account_id?: string | null
          updated_at?: string
          user_id?: string | null
          verification_status?: string | null
          video_intro_url?: string | null
          years_experience?: number | null
        }
        Update: {
          bio?: string | null
          clerk_user_id?: string | null
          created_at?: string
          currency?: string | null
          education?: string | null
          hourly_rate_cents?: number | null
          id?: string
          is_accepting_clients?: boolean | null
          license_expiry?: string | null
          license_number?: string | null
          license_state?: string | null
          stripe_account_id?: string | null
          updated_at?: string
          user_id?: string | null
          verification_status?: string | null
          video_intro_url?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      therapist_specialties: {
        Row: {
          created_at: string
          id: string
          specialty: string
          therapist_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          specialty: string
          therapist_id: string
        }
        Update: {
          created_at?: string
          id?: string
          specialty?: string
          therapist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "therapist_specialties_therapist_id_fkey"
            columns: ["therapist_id"]
            isOneToOne: false
            referencedRelation: "therapist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      therapy_goals: {
        Row: {
          created_at: string
          goal_category: string
          goal_description: string | null
          id: string
          is_active: boolean | null
          priority: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          goal_category: string
          goal_description?: string | null
          id?: string
          is_active?: boolean | null
          priority?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          goal_category?: string
          goal_description?: string | null
          id?: string
          is_active?: boolean | null
          priority?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_assessments: {
        Row: {
          assessment_type: string
          completed_at: string | null
          created_at: string
          id: string
          score: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          assessment_type: string
          completed_at?: string | null
          created_at?: string
          id?: string
          score?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          assessment_type?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          score?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid: string }
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_therapist: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
