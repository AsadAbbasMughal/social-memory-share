let logoutBtn = document.querySelector("#logoutBtn");
let deleteBtn = document.querySelector("#deleteBtn");
let welcomeUser = document.getElementById("welcomeUser");
let userProfileImg = document.getElementById("userImg");

//  Get current logged-in user email from localStorage
let currentuserEmail = localStorage.getItem("currentuserEmail");
console.log("Stored User Email:", currentuserEmail);

// Logout User
const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      return;
    }
    console.log("Signed out successfully!");
    window.location.href = "/";
  } catch (error) {
    console.log("Logout Error:", error);
  }
};

//  Delete User Account
const deleteUserAcc = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.log("User error: ", userError);
      return;
    }

    console.log("Deleting user:", user.id);

    // Delete from database
    const { error } = await supabase.from("users").delete().eq("uid", user.id);
    
    if (error) {
      console.log("Error deleting user:", error);
      return;
    }

    console.log("User deleted successfully!");
    window.location.href = "/";
  } catch (error) {
    console.log("Delete Account Error:", error);
  }
};


async function showUserInfo() {
  try {
    console.log("showUserInfo function called!");

    const { data, error } = await supabase.from("users").select();
    if (error) throw error;

    console.log("Fetched Users:", data);

    if (data.length > 0) {
      data.forEach(user => {
        // console.log("Checking:", user.email, "vs", currentuserEmail);

        if (user.email === currentuserEmail) {
          console.log("User Matched:", user.name);
          welcomeUser.innerHTML = `Welcome ${user.name}!`;

          if (user.imgUrl) {
            console.log("User Image Found:", user.imgUrl);
            userProfileImg.src = user.imgUrl;
          } else {
            console.log("No user image found!");
          }
        }
      });
    }
  } catch (error) {
    console.log("Error fetching user info:", error);
  }
}

//  Profile Click Redirection
const user_profile = document.getElementById("user-profile");
if (user_profile) {
  user_profile.style.cursor = "pointer";
  user_profile.style.display = "inline-block";
  user_profile.addEventListener("click", () => {
    window.location.href = "profile_with_photos_and_posts.html";
  });
}


if (logoutBtn) logoutBtn.addEventListener("click", logoutUser);
if (deleteBtn) deleteBtn.addEventListener("click", deleteUserAcc);


document.addEventListener("DOMContentLoaded", showUserInfo);
