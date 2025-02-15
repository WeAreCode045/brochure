
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gjvpptmwijiosgdcozep.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqdnBwdG13aWppb3NnZGNvemVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNDY2MjgsImV4cCI6MjA1NDcyMjYyOH0.-y3EH6GCtlig7d2FGTcSuyAAYtGsKbP4NrKeaMD-OMg";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
