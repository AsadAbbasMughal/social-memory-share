const signupEmail = document.querySelector("#signupEmail")
const signupPassword = document.querySelector("#signupPassword")
const signinEmail = document.querySelector("#signinEmail");
const signinpPassword = document.querySelector("#signinpPassword");
const signupBtn = document.querySelector("#signupBtn")
const signinpBtn = document.querySelector("#signinpBtn")
const signupContainer = document.querySelector("#signupContainer")
const signinpContainer = document.querySelector("#signinpContainer")
const switchToSignup = document.querySelector(".switchToSignup")
const switchToSignip = document.querySelector(".switchToSignip")

async function signup(){
    try {
        event.preventDefault();
        const { data, error } = await supabase.auth.signUp({
            email: signupEmail.value,
            password: signupPassword.value,
          })
          
          if (error) throw error;

          if(data){
            alert("PLease check your email for your Confirmation");
            console.log(data);
            signupContainer.style.display = "none";
            signinpContainer.style.display = "block";
            
                      Swal.fire({
                        title: "Sign Up",
                        text: "Sign Up Successfully",
                        icon: "success",
                      });
          }
          return data;


    } catch (error) {
        console.log("Error is : " + error.message);
    }
};

async function signin(){
    try {
        event.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: signinEmail.value,
            password: signinpPassword.value,
          })

          if(error) throw error;
          if(data){
            console.log(data);
            // window.location.href = "";
            Swal.fire({
                title: "Sign In",
                text: "Sign In Successfully",
                icon: "success",
              });
          }
          return data;
    } catch (error) {
        console.log("Error is : " + error.message);
    }
}

if(signupBtn){
    signupBtn.addEventListener("click" , signup);
}

if(signinpBtn){
    signinpBtn.addEventListener("click" , signin);
}