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

// ---------------------------------------------------
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

  // Show loader before starting the sign-up process
  loader.style.display = "block";

  let name = signupName.value;
  let email = signupEmail.value;
  let pass = signupPass.value;
  let uploadedFile = signupImg.files[0];

  if (!name || !email || !pass || !uploadedFile) {
    let missingFields = [];

    if (!name) missingFields.push("Name");
    if (!email) missingFields.push("Email");
    if (!pass) missingFields.push("Password");
    if (!uploadedFile) missingFields.push("Picture");

    Swal.fire(`Please enter: ${missingFields.join(", ")}`);

    // Hide loader after process completes
    loader.style.display = "none";
    return;
}


  // Issue: The filePath is constructed using encodeURIComponent, but filenames with special characters (e.g., ~, —) can still cause issues.
  // Fix: Sanitize the filename to remove special characters and spaces:
  const sanitizeFilename = (filename) => {
    return filename
      .replace(/[~—]/g, '')        // Remove ~ and —
      .replace(/\s+/g, '_')        // Replace spaces with underscores
      .toLowerCase();
  };

  const sanitizedFileName = sanitizeFilename(uploadedFile.name);
  const filePath = `public/${sanitizedFileName}`;

  // let filePath = `public/${encodeURIComponent(uploadedFile.name)}`; // Issue: Special characters in filename can cause issues

  const { data: existingUser, error: existingError } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .single();

  if (existingUser) {
    
    console.log('User already signed up --->', existingUser);
    Swal.fire('User already signed up');

    // Hide loader after process completes
    loader.style.display = "none";

   resetForm();
    return;
  }

  
//   if (!uploadedFile) {
//     Swal.fire("Please upload an image!");
//     loader.style.display = "none";
//     return;
// }
  

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: pass,
  });

  if (error) {
    console.log("Error during sign-up --->", error.message);
    Swal.fire(error.message);

    // Hide loader after process completes
    loader.style.display = "none";
    return;
  }

  const { data: userImgData, error: userImgError } = await supabase
    .storage
    .from('userImg')
    .upload(filePath, uploadedFile, {
      cacheControl: '3600',
      upsert: false
    });

  if (userImgError) {
    console.error('Error uploading image:', userImgError);
    await supabase.auth.admin.deleteUser(data.user.id); // Delete the user if DB insert fails
    Swal.fire('Error uploading image. Please try again.');
    loader.style.display = "none";  // Hide loader on error
    return;
  }

  const { data: getUrlData, error: urlError } = supabase
    .storage
    .from('userImg')
    .getPublicUrl(filePath);

  if (urlError) {
    console.error('Error getting public URL:', urlError);
    loader.style.display = "none";  // Hide loader on error
    return;
  }

  const { data: usersData, error: usersError } = await supabase
    .from("users")
    .insert({
      userId: data.user.id,
      name: name,
      email: email,
      imgUrl: getUrlData.publicUrl
    })
    .select();

  if (usersError) {
    console.log("User error:", usersError);
    loader.style.display = "none";  // Hide loader on error
    return;
  }

  console.log(usersData);
  Swal.fire("Sign-up successful!");

  // Hide loader after sign-up is complete
  loader.style.display = "none";

resetForm();
};

const userSignIn = async (e) => {
  e.preventDefault();

  // Show loader before starting the sign-in process
  loader.style.display = "block";

  let signinEmailValue = signinEmail.value;
  let signinpassValue = signinPass.value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: signinEmailValue,
    password: signinpassValue,
  });

  if (error) {
    console.log('Sign-in error:', error.message);
    Swal.fire("Sign-in error", error.message);

    // Hide loader after process completes
    loader.style.display = "none";
    return;
  }

  if (data) {
    console.log('Sign-in data:', data);
    Swal.fire("Sign-in successful!");

    localStorage.setItem('currentuserEmail', signinEmailValue);
    window.location.href = '/pages/dashboard.html';
  }

  // Hide loader after sign-in is complete
  loader.style.display = "none";

  signinEmail.value = "";
  signinPass.value = "";
};
// reset form
const resetForm = () => {
  signupName.value = "";
  signupEmail.value = "";
  signupPass.value = "";
  signupImg.value = "";
};

signupBtn.addEventListener("click", userSignup);
signinBtn.addEventListener("click", userSignIn);
