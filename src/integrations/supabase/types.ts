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
      client_assessments: {
        Row: {
          age_group: string | null
          budget_range: number[]
          communication_preferences: string[]
          created_at: string
          crisis_support: boolean | null
          cultural_considerations: string[] | null
          gender_preferences: string[] | null
          id: string
          identity_preferences: string[]
          language_preferences: string[]
          preferred_times: string[]
          previous_therapy: boolean | null
          religious_preferences: string[] | null
          session_frequency: string | null
          session_length_preference: number | null
          therapist_age_preference: string | null
          therapy_goals: string[]
          therapy_modalities: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          age_group?: string | null
          budget_range?: number[]
          communication_preferences?: string[]
          created_at?: string
          crisis_support?: boolean | null
          cultural_considerations?: string[] | null
          gender_preferences?: string[] | null
          id?: string
          identity_preferences?: string[]
          language_preferences?: string[]
          preferred_times?: string[]
          previous_therapy?: boolean | null
          religious_preferences?: string[] | null
          session_frequency?: string | null
          session_length_preference?: number | null
          therapist_age_preference?: string | null
          therapy_goals?: string[]
          therapy_modalities?: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          age_group?: string | null
          budget_range?: number[]
          communication_preferences?: string[]
          created_at?: string
          crisis_support?: boolean | null
          cultural_considerations?: string[] | null
          gender_preferences?: string[] | null
          id?: string
          identity_preferences?: string[]
          language_preferences?: string[]
          preferred_times?: string[]
          previous_therapy?: boolean | null
          religious_preferences?: string[] | null
          session_frequency?: string | null
          session_length_preference?: number | null
          therapist_age_preference?: string | null
          therapy_goals?: string[]
          therapy_modalities?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      languages: {
        Row: {
          created_at: string
          id: string
          iso_code: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          iso_code?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          iso_code?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      modalities: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      professional_bodies: {
        Row: {
          abbreviation: string | null
          created_at: string
          id: string
          name: string
          region: string
          updated_at: string
        }
        Insert: {
          abbreviation?: string | null
          created_at?: string
          id?: string
          name: string
          region?: string
          updated_at?: string
        }
        Update: {
          abbreviation?: string | null
          created_at?: string
          id?: string
          name?: string
          region?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: []
      }
      specialities: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      therapist_applications: {
        Row: {
          background_check: boolean
          created_at: string
          decision_reason: string | null
          documents: Json
          email: string
          experience: string
          id: string
          insurance_expiry: string | null
          insurance_provider: string | null
          license_expiry: string | null
          license_jurisdiction: string | null
          license_number: string
          name: string
          public_register_url: string | null
          registration_body: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          specialties: string[]
          status: Database["public"]["Enums"]["application_status"]
          submitted_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          background_check?: boolean
          created_at?: string
          decision_reason?: string | null
          documents?: Json
          email: string
          experience: string
          id?: string
          insurance_expiry?: string | null
          insurance_provider?: string | null
          license_expiry?: string | null
          license_jurisdiction?: string | null
          license_number: string
          name: string
          public_register_url?: string | null
          registration_body?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          specialties?: string[]
          status?: Database["public"]["Enums"]["application_status"]
          submitted_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          background_check?: boolean
          created_at?: string
          decision_reason?: string | null
          documents?: Json
          email?: string
          experience?: string
          id?: string
          insurance_expiry?: string | null
          insurance_provider?: string | null
          license_expiry?: string | null
          license_jurisdiction?: string | null
          license_number?: string
          name?: string
          public_register_url?: string | null
          registration_body?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          specialties?: string[]
          status?: Database["public"]["Enums"]["application_status"]
          submitted_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      therapist_profiles: {
        Row: {
          accepts_new_clients: boolean
          age_group: string | null
          application_id: string
          availability: Json
          avatar_url: string | null
          bio: string | null
          cancellation_policy: string | null
          communication_policy: string | null
          communication_style: string | null
          created_at: string
          cultural_background: string[]
          experience_years: number | null
          gender_identity: string | null
          id: string
          identity_tags: string[]
          in_person_sessions: boolean
          is_active: boolean
          languages: string[]
          lateness_policy: string | null
          license_number: string
          location_city: string | null
          location_country: string | null
          location_state: string | null
          modalities: string[]
          name: string
          online_sessions: boolean
          personality_tags: string[]
          pride_attributes: string[] | null
          rescheduling_policy: string | null
          session_focus: string[]
          session_format: string | null
          session_rates: Json
          setup_completed: boolean
          setup_steps: Json
          specialities: string[] | null
          specialties: string[]
          tagline: string | null
          timezone: string | null
          updated_at: string
          user_id: string
          verification_date: string | null
          verified: boolean
          video_url: string | null
          years_experience: string | null
        }
        Insert: {
          accepts_new_clients?: boolean
          age_group?: string | null
          application_id: string
          availability?: Json
          avatar_url?: string | null
          bio?: string | null
          cancellation_policy?: string | null
          communication_policy?: string | null
          communication_style?: string | null
          created_at?: string
          cultural_background?: string[]
          experience_years?: number | null
          gender_identity?: string | null
          id?: string
          identity_tags?: string[]
          in_person_sessions?: boolean
          is_active?: boolean
          languages?: string[]
          lateness_policy?: string | null
          license_number: string
          location_city?: string | null
          location_country?: string | null
          location_state?: string | null
          modalities?: string[]
          name: string
          online_sessions?: boolean
          personality_tags?: string[]
          pride_attributes?: string[] | null
          rescheduling_policy?: string | null
          session_focus?: string[]
          session_format?: string | null
          session_rates?: Json
          setup_completed?: boolean
          setup_steps?: Json
          specialities?: string[] | null
          specialties?: string[]
          tagline?: string | null
          timezone?: string | null
          updated_at?: string
          user_id: string
          verification_date?: string | null
          verified?: boolean
          video_url?: string | null
          years_experience?: string | null
        }
        Update: {
          accepts_new_clients?: boolean
          age_group?: string | null
          application_id?: string
          availability?: Json
          avatar_url?: string | null
          bio?: string | null
          cancellation_policy?: string | null
          communication_policy?: string | null
          communication_style?: string | null
          created_at?: string
          cultural_background?: string[]
          experience_years?: number | null
          gender_identity?: string | null
          id?: string
          identity_tags?: string[]
          in_person_sessions?: boolean
          is_active?: boolean
          languages?: string[]
          lateness_policy?: string | null
          license_number?: string
          location_city?: string | null
          location_country?: string | null
          location_state?: string | null
          modalities?: string[]
          name?: string
          online_sessions?: boolean
          personality_tags?: string[]
          pride_attributes?: string[] | null
          rescheduling_policy?: string | null
          session_focus?: string[]
          session_format?: string | null
          session_rates?: Json
          setup_completed?: boolean
          setup_steps?: Json
          specialities?: string[] | null
          specialties?: string[]
          tagline?: string | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
          verification_date?: string | null
          verified?: boolean
          video_url?: string | null
          years_experience?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "therapist_profiles_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "therapist_applications"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      therapist_profiles_internal: {
        Row: {
          accepts_new_clients: boolean | null
          id: string | null
          is_active: boolean | null
          name: string | null
          published: boolean | null
          setup_completed: boolean | null
          setup_steps: Json | null
          updated_at: string | null
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          accepts_new_clients?: boolean | null
          id?: string | null
          is_active?: boolean | null
          name?: string | null
          published?: never
          setup_completed?: boolean | null
          setup_steps?: Json | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          accepts_new_clients?: boolean | null
          id?: string | null
          is_active?: boolean | null
          name?: string | null
          published?: never
          setup_completed?: boolean | null
          setup_steps?: Json | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      therapist_profiles_public: {
        Row: {
          accepts_new_clients: boolean | null
          age_group: string | null
          availability: Json | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          cultural_background: string[] | null
          id: string | null
          identity_tags: string[] | null
          in_person_sessions: boolean | null
          languages: string[] | null
          modalities: string[] | null
          name: string | null
          online_sessions: boolean | null
          personality_tags: string[] | null
          session_focus: string[] | null
          session_rates: Json | null
          specialties: string[] | null
          tagline: string | null
          updated_at: string | null
          verified: boolean | null
          years_experience: string | null
        }
        Insert: {
          accepts_new_clients?: boolean | null
          age_group?: string | null
          availability?: Json | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          cultural_background?: string[] | null
          id?: string | null
          identity_tags?: string[] | null
          in_person_sessions?: boolean | null
          languages?: string[] | null
          modalities?: string[] | null
          name?: string | null
          online_sessions?: boolean | null
          personality_tags?: string[] | null
          session_focus?: string[] | null
          session_rates?: Json | null
          specialties?: string[] | null
          tagline?: string | null
          updated_at?: string | null
          verified?: boolean | null
          years_experience?: string | null
        }
        Update: {
          accepts_new_clients?: boolean | null
          age_group?: string | null
          availability?: Json | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          cultural_background?: string[] | null
          id?: string | null
          identity_tags?: string[] | null
          in_person_sessions?: boolean | null
          languages?: string[] | null
          modalities?: string[] | null
          name?: string | null
          online_sessions?: boolean | null
          personality_tags?: string[] | null
          session_focus?: string[] | null
          session_rates?: Json | null
          specialties?: string[] | null
          tagline?: string | null
          updated_at?: string | null
          verified?: boolean | null
          years_experience?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["app_role"]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role: "client" | "therapist" | "admin"
      application_status: "pending" | "under_review" | "approved" | "rejected"
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
    Enums: {
      app_role: ["client", "therapist", "admin"],
      application_status: ["pending", "under_review", "approved", "rejected"],
    },
  },
} as const
