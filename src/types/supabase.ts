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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      balance_histories: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          divide_id: number | null
          id: number
          order_id: number | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          divide_id?: number | null
          id?: number
          order_id?: number | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          divide_id?: number | null
          id?: number
          order_id?: number | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "balance_histories_divide_id_fkey"
            columns: ["divide_id"]
            isOneToOne: false
            referencedRelation: "money_divides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "balance_histories_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "balance_histories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      money_divides: {
        Row: {
          created_at: string | null
          created_by_id: string | null
          deleted_at: string | null
          event_date: string | null
          handled_person_count: number | null
          id: number
          is_handled: boolean | null
          is_include_me: boolean | null
          name: string
          note: string | null
          photo_paths: Json | null
          status: Database["public"]["Enums"]["divide_status"] | null
          total_amount: number
          total_person_count: number | null
          updated_at: string | null
          updated_by_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: string | null
          deleted_at?: string | null
          event_date?: string | null
          handled_person_count?: number | null
          id?: number
          is_handled?: boolean | null
          is_include_me?: boolean | null
          name: string
          note?: string | null
          photo_paths?: Json | null
          status?: Database["public"]["Enums"]["divide_status"] | null
          total_amount: number
          total_person_count?: number | null
          updated_at?: string | null
          updated_by_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: string | null
          deleted_at?: string | null
          event_date?: string | null
          handled_person_count?: number | null
          id?: number
          is_handled?: boolean | null
          is_include_me?: boolean | null
          name?: string
          note?: string | null
          photo_paths?: Json | null
          status?: Database["public"]["Enums"]["divide_status"] | null
          total_amount?: number
          total_person_count?: number | null
          updated_at?: string | null
          updated_by_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "money_divides_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "money_divides_updated_by_id_fkey"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          created_by_id: string | null
          deleted_at: string | null
          deleted_by_id: string | null
          discount_amount: number | null
          id: number
          is_allow_add_dish: boolean | null
          name: string
          note: string | null
          order_from: string | null
          order_to: string | null
          photo_paths: Json | null
          ref_link: string | null
          shipping_fee: number | null
          status: Database["public"]["Enums"]["order_status"] | null
          updated_at: string | null
          updated_by_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by_id?: string | null
          deleted_at?: string | null
          deleted_by_id?: string | null
          discount_amount?: number | null
          id?: number
          is_allow_add_dish?: boolean | null
          name: string
          note?: string | null
          order_from?: string | null
          order_to?: string | null
          photo_paths?: Json | null
          ref_link?: string | null
          shipping_fee?: number | null
          status?: Database["public"]["Enums"]["order_status"] | null
          updated_at?: string | null
          updated_by_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by_id?: string | null
          deleted_at?: string | null
          deleted_by_id?: string | null
          discount_amount?: number | null
          id?: number
          is_allow_add_dish?: boolean | null
          name?: string
          note?: string | null
          order_from?: string | null
          order_to?: string | null
          photo_paths?: Json | null
          ref_link?: string | null
          shipping_fee?: number | null
          status?: Database["public"]["Enums"]["order_status"] | null
          updated_at?: string | null
          updated_by_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_created_by_id_fkey"
            columns: ["created_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_deleted_by_id_fkey"
            columns: ["deleted_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_updated_by_id_fkey"
            columns: ["updated_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_path: string | null
          balance: number | null
          cover_path: string | null
          created_at: string | null
          deleted_at: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          status: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_path?: string | null
          balance?: number | null
          cover_path?: string | null
          created_at?: string | null
          deleted_at?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_path?: string | null
          balance?: number | null
          cover_path?: string | null
          created_at?: string | null
          deleted_at?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      divide_status: "ACTIVE" | "HANDLED"
      order_status: "ACTIVE" | "LOCKED" | "CLOSED"
      user_role: "SuperAdmin" | "Admin" | "User"
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
      divide_status: ["ACTIVE", "HANDLED"],
      order_status: ["ACTIVE", "LOCKED", "CLOSED"],
      user_role: ["SuperAdmin", "Admin", "User"],
    },
  },
} as const
