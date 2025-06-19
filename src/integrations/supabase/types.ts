export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      anomalies: {
        Row: {
          batch: number | null
          id: number
          negative_count: number | null
          z_score: number | null
        }
        Insert: {
          batch?: number | null
          id?: never
          negative_count?: number | null
          z_score?: number | null
        }
        Update: {
          batch?: number | null
          id?: never
          negative_count?: number | null
          z_score?: number | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          category: string | null
          cleaned_review: string | null
          created_at: string | null
          id: number
          original_review: string | null
          review_length: number | null
          sentiment: string | null
        }
        Insert: {
          category?: string | null
          cleaned_review?: string | null
          created_at?: string | null
          id?: never
          original_review?: string | null
          review_length?: number | null
          sentiment?: string | null
        }
        Update: {
          category?: string | null
          cleaned_review?: string | null
          created_at?: string | null
          id?: never
          original_review?: string | null
          review_length?: number | null
          sentiment?: string | null
        }
        Relationships: []
      }
      guest_feedback: {
        Row: {
          contact_info: string | null
          created_at: string
          hotel_id: string
          id: string
          rating: number
          review: string
        }
        Insert: {
          contact_info?: string | null
          created_at?: string
          hotel_id: string
          id?: string
          rating: number
          review: string
        }
        Update: {
          contact_info?: string | null
          created_at?: string
          hotel_id?: string
          id?: string
          rating?: number
          review?: string
        }
        Relationships: []
      }
      hotels: {
        Row: {
          created_at: string | null
          id: string
          location: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          location?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          location?: string | null
          name?: string
        }
        Relationships: []
      }
      keywords: {
        Row: {
          id: number
          keyword: string | null
          score: number | null
        }
        Insert: {
          id?: never
          keyword?: string | null
          score?: number | null
        }
        Update: {
          id?: never
          keyword?: string | null
          score?: number | null
        }
        Relationships: []
      }
      topics: {
        Row: {
          id: number
          terms: string | null
          topic: string | null
          weight: number | null
        }
        Insert: {
          id?: never
          terms?: string | null
          topic?: string | null
          weight?: number | null
        }
        Update: {
          id?: never
          terms?: string | null
          topic?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          category: Database["public"]["Enums"]["category_type"] | null
          created_at: string | null
          email: string
          hotel_id: string | null
          id: string
          name: string
          password_hash: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["category_type"] | null
          created_at?: string | null
          email: string
          hotel_id?: string | null
          id?: string
          name: string
          password_hash: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["category_type"] | null
          created_at?: string | null
          email?: string
          hotel_id?: string | null
          id?: string
          name?: string
          password_hash?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_users_hotel"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      category_type: "service" | "food_quality" | "facilities" | "general"
      user_role:
        | "hotel_manager"
        | "service_manager"
        | "food_manager"
        | "facilities_manager"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      category_type: ["service", "food_quality", "facilities", "general"],
      user_role: [
        "hotel_manager",
        "service_manager",
        "food_manager",
        "facilities_manager",
      ],
    },
  },
} as const
