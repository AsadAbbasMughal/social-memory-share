let logoutBtn = document.querySelector("#logoutBtn");
let deleteBtn = document.querySelector("#deleteBtn");

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

logoutBtn.addEventListener("click", logoutUser);
deleteBtn.addEventListener("click", deleteUserAcc);
