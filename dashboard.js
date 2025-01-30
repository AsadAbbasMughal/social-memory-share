let logoutBtn = document.querySelector("#logoutBtn");
let deleteBtn = document.querySelector("#deleteBtn");
let welcomeUser = document.getElementById('welcomeUser')
let userProfileImg = document.getElementById('userImg')


const logoutUser = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log("User error: ", userError);
  }

  const { data, error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    return;
  }

  console.log("Signed out successfully!", data);

  // Swal.fire("Signed out successfully!")
  window.location.href = "/";
};


// ---------------------------------------------------------

const deleteUserAcc = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log(user);

  if (userError) {
    console.log("User error: ", userError);
    return
  }

  const response = await supabase
    .from("users")
    .delete()
    .eq("uid", user.id);




  window.location.href = '/'


};

if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutUser);
}
if (deleteBtn) {
  deleteBtn.addEventListener("click", deleteUserAcc);
}

let currentuserEmai = localStorage.getItem('currentuserEmail')
console.log(currentuserEmai);

async function showUserInfo() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select()

      if(error) throw error

      if(data){
        console.log(data);
        data.map(function (user){
          // console.log(uName.email);
          if(user.email == currentuserEmai){
            // console.log("matched" );
            console.log(user.name);
            welcomeUser.innerHTML = user.name
            userProfileImg.src = user.imgUrl
          }
        })
      }
  } catch (error) {
    console.log(error);
  }
}


window.onload = showUserInfo