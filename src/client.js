import { createClient } from "@supabase/supabase-js";
const URL = 'https://mvzttbqusuavefvpzkqh.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12enR0YnF1c3VhdmVmdnB6a3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3ODg5OTgsImV4cCI6MjAzODM2NDk5OH0.er3Dn_lHqxKpxhL-tIFaQhPKWpiBppebm-ODirOQ_A4';


export const supabase = createClient(URL, API_KEY);
console.log(supabase); // Check if this logs the Supabase client