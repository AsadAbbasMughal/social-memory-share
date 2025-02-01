async function checkSession() {
    try {
        const { data, error } = await supabase.auth.getSession();
  
      const authPages = ["/index.html", "/gallery.html", "/"];
      const currentPath = window.location.pathname;
      const isAuthPage = authPages.some((page) => page.includes(currentPath));
  
      const { session } = data;   
  
      if(session) {
          if(isAuthPage) {
              window.location.href = "/gallery.html";
          }
      } else {
          if(!isAuthPage) {
              window.location.href = "/index.html";
          }
      }
  
      console.log(session);
    } catch (error) {
      console.log(error);
    }
  }
  
  window.onload = checkSession;
