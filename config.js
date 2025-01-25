 gallery-feature
// console.log(supabase)

const { createClient } = supabase;

const supabaseUrl = "https://hpnhxannetfthfsdcehp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhwbmh4YW5uZXRmdGhmc2RjZWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MjgxODQsImV4cCI6MjA1MzMwNDE4NH0.XmbaaBzzanaUYl5J3n9oa9VohqtmISVDHeEGxwEwTx4";
const supabaseClient = createClient(supabaseUrl, supabaseKey);

window.supabase = supabaseClient;



// console.log(supabase);




