const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const loader = document.getElementById("loader");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// --------------------
let signupName = document.querySelector("#signupName");
let signupEmail = document.querySelector("#signupEmail");
let signupPass = document.querySelector("#signupPass");
let signupBtn = document.querySelector("#signupBtn");
let signupImg = document.querySelector("#signupImg");

let signinEmail = document.querySelector("#signinEmail");
let signinPass = document.querySelector("#signinPass");
let signinBtn = document.querySelector("#signinBtn");

let userSignup = async (e) => {
  e.preventDefault();
  loader.style.display = "inline-block"; // Loader Start

  let name = signupName.value.trim();
  let email = signupEmail.value.trim();
  let pass = signupPass.value.trim();
  let uploadedFile = signupImg.files[0];

  if (!name || !email || !pass || !uploadedFile) {
    Swal.fire("Enter all fields!");
    loader.style.display = "none";
    return;
  }

  let filePath = `public/${encodeURIComponent(uploadedFile.name)}`;

  // Check if user already exists
  const { data: existingUser, error: existingError } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .single();

  if (existingUser) {
    Swal.fire("User already signed up!");
    loader.style.display = "none";
    
  signupName.value = "";
  signupEmail.value = "";
  signupPass.value = "";
  signupImg.value = "";
    return;
  }

  // Signup User
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: pass,
  });

  if (error) {
    Swal.fire(error.message);
    loader.style.display = "none";
    return;
  }

  // Upload Image
  const { data: userImgData, error: userImgError } = await supabase
    .storage
    .from("userImg")
    .upload(filePath, uploadedFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (userImgError) {
    Swal.fire("Error uploading image");
    loader.style.display = "none";
    return;
  }

  // Get Image Public URL
  const { data: getUrlData, error: urlError } = await supabase
    .storage
    .from("userImg")
    .getPublicUrl(filePath);

  if (urlError) {
    Swal.fire("Error getting image URL");
    loader.style.display = "none";
    return;
  }

  // Save User Info in Database
  const { data: usersData, error: usersError } = await supabase
    .from("users")
    .insert({
      userId: data.user.id,
      name: name,
      email: email,
      imgUrl: getUrlData.publicUrl,
    });

  if (usersError) {
    Swal.fire("Error storing user info");
    loader.style.display = "none";
    return;
  }

  Swal.fire("Sign Up Successfully!");
  loader.style.display = "none"; 

  signupName.value = "";
  signupEmail.value = "";
  signupPass.value = "";
  signupImg.value = "";
};

const userSignIn = async (e) => {
  e.preventDefault();
  loader.style.display = "inline-block";

  let signinEmailValue = signinEmail.value.trim();
  let signinpassValue = signinPass.value.trim();

  if (!signinEmailValue || !signinpassValue) {
    Swal.fire("Enter Email & Password!");
    loader.style.display = "none";
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: signinEmailValue,
    password: signinpassValue,
  });

  if (error) {
    Swal.fire("Sign-in error: " + error.message);
    loader.style.display = "none";
    return;
  }

  Swal.fire("Sign In Successfully!");
  localStorage.setItem("currentuserEmail", signinEmailValue);
  loader.style.display = "none"; 

  window.location.href = "../pages/dashboard.html";

  signinEmail.value = "";
  signinPass.value = "";
};

signupBtn.addEventListener("click", userSignup);
signinBtn.addEventListener("click", userSignIn);
