const { createClient } = supabase;
<<<<<<< HEAD
const supabaseUrl = 'https://tgeouiprsvwtrccffqxe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnZW91aXByc3Z3dHJjY2ZmcXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MjYxMDQsImV4cCI6MjA1MzMwMjEwNH0.LL6nRJSzfZRW7QnCPPiGIm77MlOZGfc8dUdTEFybDrQ'
const supabaseCreate = createClient(supabaseUrl, supabaseKey)
=======
const supabaseUrl = "https://hpnhxannetfthfsdcehp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhwbmh4YW5uZXRmdGhmc2RjZWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MjgxODQsImV4cCI6MjA1MzMwNDE4NH0.XmbaaBzzanaUYl5J3n9oa9VohqtmISVDHeEGxwEwTx4";
const supabaseCreate = createClient(supabaseUrl, supabaseKey);
>>>>>>> ffe5b87828f2f389fafb27ab2e20e0bbc61f1e20

window.supabase = supabaseCreate;

// console.log(supabase);



