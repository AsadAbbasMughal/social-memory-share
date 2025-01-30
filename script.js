const signupEmail = document.querySelector("#signupEmail");
const signupPassword = document.querySelector("#signupPassword");
const signupName = document.querySelector("#signupName");
const signinEmail = document.querySelector("#signinEmail");
const signinpPassword = document.querySelector("#signinpPassword");
const signupBtn = document.querySelector("#signupBtn");
const signinpBtn = document.querySelector("#signinpBtn");
const signupContainer = document.querySelector("#signupContainer");
const signinpContainer = document.querySelector("#signinpContainer");
const switchToSignup = document.querySelector(".switchToSignup");
const switchToSignip = document.querySelector(".switchToSignip");

async function signup() {
  event.preventDefault();
  try {
    const { data, error } = await supabase.auth.signUp({
      email: signupEmail.value,
      password: signupPassword.value,
    });

    if (error) throw error;

    if (data) {
        console.log(data)
      try {
        const { data :userData, error : userError } = await supabase
          .from("users")
          .insert({ userId: data.user.id, name: signupName.value, email : signupEmail.value })
          .select();

          if(userError) throw userError;
          if(userData){
            console.log(userData)
          }

        
          
      } catch (userError) {
        console.log(userError)
      }
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
}

async function signin() {
  event.preventDefault();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: signinEmail.value,
      password: signinpPassword.value,
    });

    if (error) throw error;
    if (data) {
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

if (signupBtn) {
  signupBtn.addEventListener("click", signup);
}

if (signinpBtn) {
  signinpBtn.addEventListener("click", signin);
}
