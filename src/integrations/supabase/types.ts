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
      agency_settings: {
        Row: {
          address: string | null
          agent_name: string | null
          created_at: string
          description_background_url: string | null
          email: string | null
          google_maps_api_key: string | null
          icon_bathrooms: string | null
          icon_bedrooms: string | null
          icon_build_year: string | null
          icon_energy_class: string | null
          icon_garages: string | null
          icon_living_space: string | null
          icon_sqft: string | null
          id: string
          logo_url: string | null
          name: string
          phone: string | null
          primary_color: string | null
          secondary_color: string | null
          typography_h1: Json | null
          typography_h2: Json | null
          typography_label: Json | null
          typography_list: Json | null
          typography_p: Json | null
          typography_price: Json | null
          typography_title: Json | null
          updated_at: string
          xml_import_url: string | null
        }
        Insert: {
          address?: string | null
          agent_name?: string | null
          created_at?: string
          description_background_url?: string | null
          email?: string | null
          google_maps_api_key?: string | null
          icon_bathrooms?: string | null
          icon_bedrooms?: string | null
          icon_build_year?: string | null
          icon_energy_class?: string | null
          icon_garages?: string | null
          icon_living_space?: string | null
          icon_sqft?: string | null
          id?: string
          logo_url?: string | null
          name: string
          phone?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          typography_h1?: Json | null
          typography_h2?: Json | null
          typography_label?: Json | null
          typography_list?: Json | null
          typography_p?: Json | null
          typography_price?: Json | null
          typography_title?: Json | null
          updated_at?: string
          xml_import_url?: string | null
        }
        Update: {
          address?: string | null
          agent_name?: string | null
          created_at?: string
          description_background_url?: string | null
          email?: string | null
          google_maps_api_key?: string | null
          icon_bathrooms?: string | null
          icon_bedrooms?: string | null
          icon_build_year?: string | null
          icon_energy_class?: string | null
          icon_garages?: string | null
          icon_living_space?: string | null
          icon_sqft?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          phone?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          typography_h1?: Json | null
          typography_h2?: Json | null
          typography_label?: Json | null
          typography_list?: Json | null
          typography_p?: Json | null
          typography_price?: Json | null
          typography_title?: Json | null
          updated_at?: string
          xml_import_url?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string | null
          areaPhotos: string[] | null
          areas: Json[] | null
          bathrooms: string | null
          bedrooms: string | null
          buildYear: string | null
          created_at: string
          description: string | null
          energyLabel: string | null
          featuredImage: string | null
          features: Json | null
          floorplans: string[] | null
          garages: string | null
          gridImages: string[] | null
          hasGarden: boolean | null
          id: string
          images: string[] | null
          latitude: number | null
          livingArea: string | null
          longitude: number | null
          object_id: string | null
          price: string | null
          sqft: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          areaPhotos?: string[] | null
          areas?: Json[] | null
          bathrooms?: string | null
          bedrooms?: string | null
          buildYear?: string | null
          created_at?: string
          description?: string | null
          energyLabel?: string | null
          featuredImage?: string | null
          features?: Json | null
          floorplans?: string[] | null
          garages?: string | null
          gridImages?: string[] | null
          hasGarden?: boolean | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          livingArea?: string | null
          longitude?: number | null
          object_id?: string | null
          price?: string | null
          sqft?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          areaPhotos?: string[] | null
          areas?: Json[] | null
          bathrooms?: string | null
          bedrooms?: string | null
          buildYear?: string | null
          created_at?: string
          description?: string | null
          energyLabel?: string | null
          featuredImage?: string | null
          features?: Json | null
          floorplans?: string[] | null
          garages?: string | null
          gridImages?: string[] | null
          hasGarden?: boolean | null
          id?: string
          images?: string[] | null
          latitude?: number | null
          livingArea?: string | null
          longitude?: number | null
          object_id?: string | null
          price?: string | null
          sqft?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      property_web_views: {
        Row: {
          created_at: string | null
          id: string
          property_id: string | null
          view_token: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          view_token: string
        }
        Update: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          view_token?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_web_views_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties"
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

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
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
