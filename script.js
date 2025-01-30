// const container = document.getElementById("container");
// const registerBtn = document.getElementById("register");
// const loginBtn = document.getElementById("login");

// if (registerBtn) {
//   registerBtn.addEventListener("click", () => {
//     container.classList.add("active");
//   });
// }

// if (loginBtn) {
//   loginBtn.addEventListener("click", () => {
//     container.classList.remove("active");
//   });
// }


// // ---------------------------------------------------
// let signupName = document.querySelector("#signupName");
// let signupEmail = document.querySelector("#signupEmail");
// let signupPass = document.querySelector("#signupPass");
// let signupBtn = document.querySelector("#signupBtn");

// let signinEmail = document.querySelector("#signinEmail");
// let signinPass = document.querySelector("#signinPass");
// let signinBtn = document.querySelector("#signinBtn");

// const profileUsername = document.getElementById('profile-username')
//   const profileImage1 = document.getElementById('profile-image')
  
// let userSignup = async (e) => {
//   e.preventDefault();


//   let name = signupName.value;
//   let email = signupEmail.value;
//   let pass = signupPass.value;
// let profileImage = document.querySelector("#signupProfile").files[0];

// if(!name || !email || !pass || !profileImage){
//   Swal.fire("All fields are required");
//   return;
// }
// try {

//   const { data: existingUser, error: existingError } = await supabase
//   .from("users")
//   .select("email, profileImage, name")
//   .eq("email", email)
//   .single(); 

  
//   if(existingUser){
//     console.log('user already signup --->' , existingUser);
    
//     // if (!profileUsername || !profileImage1) {
//     //   console.error("Profile elements not found in the DOM.");
//     //   return;
//     // }
//     Swal.fire('user already signup');
    
//     return
//   } 
  
//   const { data: uploadData, error: uploadError } = await supabase.storage
//   .from("profile-images")  
//   .upload(`public/${Date.now()}_${profileImage.name}`, profileImage, {
//     cacheControl: "3600",
//       upsert: false,
//     });
//     if (uploadError) {
//       console.error("Error uploading profile image:", uploadError);
//       return;
//     }
//     // profileUsername.textContent = existingUser.name;
//     // profileImage1.src = existingUser.profileImage;

//     const { data: publicURLData }  = supabase.storage.from("profile-images").getPublicUrl(uploadData.path);
//     const publicURL = publicURLData.publicUrl;
//     if (!publicURL) throw new Error("Failed to get public URL of image");

//     profileUsername.textContent = existingUser.name;
//     profileImage1.src = existingUser.profileImage;


//     // const { data: publicURL, error: urlError } = await supabase.storage
//     // .from("profile-images")
//     // // .getPublicURL({ path: `public/${uploadData.path}` });
//     // .getPublicURL(uploadData.path);
 
//     const { data, error } = await supabase.auth.signUp({
//       email: email,
//       password: pass,
//     });
  
//     if (error) {
//       console.log("Error signup --->", error.message);
//       Swal.fire(error.message);
//       return;
//     }
  
//   console.log('User sign up successfully',data.user.id);

//   const {  error: usersError } = await supabase
//   .from("users")
//   .upsert({
//     userId: data.user.id,
//     name: name,
//     email: email,
//     profileImage: publicURL,
//   })

//   if (usersError) {
//     console.log("userError ", usersError);
//     return;
//   }

//   alert("User signed up successfully");
//   // window.location.href = "/dashboard.html";

//   signupName.value = "";
//   signupEmail.value = "";
//   signupPass.value = "";
//   document.getElementById("signupProfile").value = "";

// } catch (error) {
//   console.log(error);
  
// }

//   signupName.value = "";
//   signupEmail.value = "";
//   signupPass.value = "";
// };


// const userSignIn =async (e) =>{
//     e.preventDefault()
//     let signinEmailValue = signinEmail.value;
//     let signinpassValue = signinPass.value;

//     const { data, error } = await supabase.auth.signInWithPassword({
//         email: signinEmailValue,
//         password: signinpassValue,
//       })

//       if(error){
//         console.log('signin error', error.message);
//         Swal.fire("Signin error", error.message);
//         return
        
//       } else {

//       }
//       if(data){
//         console.log('signin data', data);
//         Swal.fire("signIn successfully!");

//         localStorage.setItem('currentuserEmail',signinEmailValue)
//         window.location.href = 'dashboard.html' 
        
//       }


      
//       signinEmail.value = "";
//       signinPass.value = "";
      
// }

// if(signupBtn) {
//   signupBtn.addEventListener("click", userSignup);
// }

// if(signinBtn)  {
//   signinBtn.addEventListener("click", userSignIn);
// }
// signupBtn.addEventListener("click", userSignup);
// signinBtn.addEventListener("click", userSignIn);


// ----------------------------------------------------------------------

// let imagepreview = null;
let uploadProfileImage = async () => {
  let profileImage = document.querySelector("#profileImage");
let file = profileImage.files[0];
  if (!file) {
    console.log("No file selected.");
    return;
  }
  let currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const { data: userData, error: userError } = await supabase
  .from("users")
  .select("id")
  .eq("email", localStorage.getItem('currentuserEmail'))
  let fileName = `public/${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
  .from("profile-images")  
  .upload(fileName, file);
  if (error) {
    console.log("Upload Error:", error);
    return;
  }

  const { data: urldata } = supabase
    .storage
    .from('profile-images')
    .getPublicUrl(fileName)
  
    console.log(data, urldata, urldata.publicUrl, );
    if (urldata) {
      const {data: userdata} = await supabase
      .from("users")
      .update({ profileImage: urldata.publicUrl }) // Store the URL in the database
      .eq("id", userData[0].id); // Update the specific post
    }
    rpost()
    return urldata.publicUrl;
  }

  if (document.getElementById('uploadbtn')) {
document.getElementById('uploadbtn').addEventListener('click', uploadProfileImage);
}
async function rpost() {
  const gallery = document.getElementById('gallery');
  if (gallery) {
    gallery.innerHTML = ''; // Clear existing content
  } else {
    console.error("Gallery element not found!");
    return;
  }

  const { data, error } = await supabase
.from('users')
.select()

console.log(data);
data.forEach((user) => {
  document.getElementById('gallery').innerHTML += `
     <div class="col-md-4 mx-auto">
  <div class="card shadow-lg text-center p-3" style="border: none; border-radius: 15px; overflow: hidden;">
    <!-- Gradient Background -->
    <div class="card-header" style="background: linear-gradient(135deg, #6a11cb, #2575fc); height: 100px;"></div>
    
    <!-- Profile Image -->
    <div class="card-body mt-n5">
      <img 
        src="${ user.profileImage }"
        id="profile-img"
        class="rounded-circle border border-4 border-white mb-3 shadow-sm"
        alt="User Profile"
        width="120"
        height="120"
        style="object-fit: cover;"
      />
      
      <!-- User Name -->
      <h4 class="card-title fw-bold mb-2" id="profile-name" style="color: #2c3e50;">${user.name}</h4>
      
      <!-- Join Date -->
      <p class="card-text text-muted mb-3" style="font-size: 0.9rem;">
        <i class="fas fa-calendar-alt me-2"></i>
        Joined on <span id="profile-date">${new Date(user.created_at).toLocaleString()}</span>
      </p>
      
      <!-- View Profile Button -->
      <a href="#" class="btn btn-primary w-100 mt-2" style="border-radius: 25px; background: linear-gradient(135deg, #6a11cb, #2575fc); border: none;">
        <i class="fas fa-user-circle me-2"></i>View Profile
      </a>
    </div>
  </div>
</div>
  `

})
  
}
window.rpost = rpost
rpost()
  

