const {createClient} = supabase;

const supabaseUrl = 'https://tgeouiprsvwtrccffqxe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnZW91aXByc3Z3dHJjY2ZmcXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3MjYxMDQsImV4cCI6MjA1MzMwMjEwNH0.LL6nRJSzfZRW7QnCPPiGIm77MlOZGfc8dUdTEFybDrQ'
const supabaseCreate = createClient(supabaseUrl, supabaseKey)

window.supabase = supabaseCreate;

console.log(supabase); 


