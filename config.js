const { createClient } = supabase;
const supabaseUrl = ''
const supabaseKey = ''
const supabaseCreate = createClient(supabaseUrl, supabaseKey)

window.supabase = supabaseCreate;

console.log(supabase)



