export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      contractor_costs: {
        Row: {
          "0.1.1.1": number | null;
          "0.1.1.2": number | null;
          "0.1.2.1": number | null;
          "0.1.2.2": number | null;
          "0.1.3.1": number | null;
          "0.1.3.2": number | null;
          "0.2.1.1": number | null;
          "0.2.1.2": number | null;
          "0.2.1.3": number | null;
          contractor_id: string | null;
          id: string;
        };
        Insert: {
          "0.1.1.1"?: number | null;
          "0.1.1.2"?: number | null;
          "0.1.2.1"?: number | null;
          "0.1.2.2"?: number | null;
          "0.1.3.1"?: number | null;
          "0.1.3.2"?: number | null;
          "0.2.1.1"?: number | null;
          "0.2.1.2"?: number | null;
          "0.2.1.3"?: number | null;
          contractor_id?: string | null;
          id?: string;
        };
        Update: {
          "0.1.1.1"?: number | null;
          "0.1.1.2"?: number | null;
          "0.1.2.1"?: number | null;
          "0.1.2.2"?: number | null;
          "0.1.3.1"?: number | null;
          "0.1.3.2"?: number | null;
          "0.2.1.1"?: number | null;
          "0.2.1.2"?: number | null;
          "0.2.1.3"?: number | null;
          contractor_id?: string | null;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "builder_costs_contractor_id_fkey";
            columns: ["contractor_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      default_costs: {
        Row: {
          "0.1.1.1": number | null;
          "0.1.1.2": number | null;
          "0.1.2.1": number | null;
          "0.1.2.2": number | null;
          "0.1.3.1": number | null;
          "0.1.3.2": number | null;
          "0.2.1.1": number | null;
          "0.2.1.2": number | null;
          "0.2.1.3": number | null;
          created_at: string | null;
          id: string;
        };
        Insert: {
          "0.1.1.1"?: number | null;
          "0.1.1.2"?: number | null;
          "0.1.2.1"?: number | null;
          "0.1.2.2"?: number | null;
          "0.1.3.1"?: number | null;
          "0.1.3.2"?: number | null;
          "0.2.1.1"?: number | null;
          "0.2.1.2"?: number | null;
          "0.2.1.3"?: number | null;
          created_at?: string | null;
          id?: string;
        };
        Update: {
          "0.1.1.1"?: number | null;
          "0.1.1.2"?: number | null;
          "0.1.2.1"?: number | null;
          "0.1.2.2"?: number | null;
          "0.1.3.1"?: number | null;
          "0.1.3.2"?: number | null;
          "0.2.1.1"?: number | null;
          "0.2.1.2"?: number | null;
          "0.2.1.3"?: number | null;
          created_at?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      nrm: {
        Row: {
          el_1: string | null;
          el_2: string | null;
          el_3: string | null;
          el_3_note: string | null;
          el_4: string | null;
          el_4_unit: string | null;
          flag_1: number | null;
          flag_2: number | null;
          flag_3: number | null;
          flag_4: number | null;
          id: number;
          measurement_rules: string | null;
          note_excluded: string | null;
          note_included: string | null;
        };
        Insert: {
          el_1?: string | null;
          el_2?: string | null;
          el_3?: string | null;
          el_3_note?: string | null;
          el_4?: string | null;
          el_4_unit?: string | null;
          flag_1?: number | null;
          flag_2?: number | null;
          flag_3?: number | null;
          flag_4?: number | null;
          id?: number;
          measurement_rules?: string | null;
          note_excluded?: string | null;
          note_included?: string | null;
        };
        Update: {
          el_1?: string | null;
          el_2?: string | null;
          el_3?: string | null;
          el_3_note?: string | null;
          el_4?: string | null;
          el_4_unit?: string | null;
          flag_1?: number | null;
          flag_2?: number | null;
          flag_3?: number | null;
          flag_4?: number | null;
          id?: number;
          measurement_rules?: string | null;
          note_excluded?: string | null;
          note_included?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          app_role: Database["public"]["Enums"]["app_role"];
          created_at: string;
          id: string;
          name: string | null;
        };
        Insert: {
          app_role: Database["public"]["Enums"]["app_role"];
          created_at?: string;
          id: string;
          name?: string | null;
        };
        Update: {
          app_role?: Database["public"]["Enums"]["app_role"];
          created_at?: string;
          id?: string;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          client_email: string;
          client_name: string;
          contractor_preliminaries: string | null;
          created_at: string;
          desired_ohp: number;
          google_drive_folder_link: string;
          id: string;
          project_city: string;
          project_description: string | null;
          project_name: string;
          project_postcode: string;
          project_status: Database["public"]["Enums"]["project_status"];
          project_street_address: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          client_email: string;
          client_name: string;
          contractor_preliminaries?: string | null;
          created_at?: string;
          desired_ohp: number;
          google_drive_folder_link: string;
          id?: string;
          project_city: string;
          project_description?: string | null;
          project_name: string;
          project_postcode: string;
          project_status?: Database["public"]["Enums"]["project_status"];
          project_street_address: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          client_email?: string;
          client_name?: string;
          contractor_preliminaries?: string | null;
          created_at?: string;
          desired_ohp?: number;
          google_drive_folder_link?: string;
          id?: string;
          project_city?: string;
          project_description?: string | null;
          project_name?: string;
          project_postcode?: string;
          project_status?: Database["public"]["Enums"]["project_status"];
          project_street_address?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_projects_user_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      quotes: {
        Row: {
          contractor_id: string | null;
          created_at: string;
          id: string;
          project_id: string;
          quote_flags: Json;
          quote_inputs: Json;
        };
        Insert: {
          contractor_id?: string | null;
          created_at?: string;
          id?: string;
          project_id: string;
          quote_flags: Json;
          quote_inputs: Json;
        };
        Update: {
          contractor_id?: string | null;
          created_at?: string;
          id?: string;
          project_id?: string;
          quote_flags?: Json;
          quote_inputs?: Json;
        };
        Relationships: [
          {
            foreignKeyName: "quotes_contractor_id_fkey";
            columns: ["contractor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      app_role: "admin" | "client" | "contractor";
      project_status: "pending" | "ready" | "cancelled" | "on hold";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
