const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

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
  let name = signupName.value;
  let email = signupEmail.value;
  let pass = signupPass.value;
  let uploadedFile = signupImg.files[0]
  let filePath =`public/${encodeURIComponent(uploadedFile.name)}`

  const { data: existingUser, error: existingError } = await supabase
  .from("users")
  .select("email")
  .eq("email", email)
  .single();

   

    // if (existingError && existingError.code !== "PGRST116") {  // Ignore if no row found
    //     console.log("Error fetching user:", existingError);
    //     return;
    //   }
  if(existingUser){
    console.log('user already signup --->' , existingUser);
    Swal.fire('user already signup');

        signupName.value = "";
        signupEmail.value = "";
        signupPass.value = "";
    return
  }

  //signup user

  if(!name || !email || !pass || !signupImg){
      Swal.fire("Enter the all fields!");
      console.log("Enter the all fields!");
      return
      
    }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: pass,
  });

  if (error) {
    console.log("Error signup --->", error.message);
    Swal.fire(error.message);
    return;
  }

  //   if(!error){
  // console.log(data.user.id);

  // const avatarFile = event.target.files[0]
const { data: userImgData , error: userImgError } = await supabase
  .storage
  .from('userImg')
  .upload(filePath, uploadedFile, {
    cacheControl: '3600',
    upsert: false
  })

  if (userImgError) {
    console.error('Error uploading image:', userImgError);
  } else {
    console.log('Image uploaded successfully:', userImgData)


  const { data: getUrlData,  error: urlError } = supabase
  .storage
  .from('userImg')
  .getPublicUrl(filePath);

  if (urlError) {
    console.error('Error getting public URL:', urlError);
  } else {
    console.log('Public URL:',  getUrlData.publicUrl);
    // You can now save this public URL to your user table or do other operations.
 

  const { data: usersData, Dataerror: usersError } = await supabase
    .from("users")
    .insert({
      userId: data.user.id,
      name: name,
      email: email,
      imgUrl: getUrlData.publicUrl
    })
    .select(); 

  if (usersError) {
    console.log("userError ", usersError);
    return;
  }
  if (usersData) {
    console.log(usersData);
    console.log("users data ", usersData[0].name);
  }
}



}
  // let currentuserData = {
  //   userName : usersData[0].name,
  //   userEmial : usersData[0].email
  // }

  // localStorage.setItem("currentUser",JSON.stringify(currentuserData))

  if (data) {
    console.log("data signup --->", data);
    Swal.fire("signUp successfully!");
    // return
  }

  signupName.value = "";
  signupEmail.value = "";
  signupPass.value = "";
};


const userSignIn =async (e) =>{
    e.preventDefault()
    let signinEmailValue = signinEmail.value;
    let signinpassValue = signinPass.value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: signinEmailValue,
        password: signinpassValue,
      })

      if(error){
        console.log('signin error', error.message);
        Swal.fire("Signin error", error.message);
        return
        
      }
      if(data){
        console.log('signin data', data);
        Swal.fire("signIn successfully!");

        localStorage.setItem('currentuserEmail',signinEmailValue)
        window.location.href = '../pages/dashboard.html'
        
      }


      
      signinEmail.value = "";
      signinPass.value = "";
      
}

signupBtn.addEventListener("click", userSignup);
signinBtn.addEventListener("click", userSignIn);


// ----------------------------------------------------------------------
