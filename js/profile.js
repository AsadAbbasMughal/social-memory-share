// js/profile.js

async function loadUserProfile() {
  // Get session from Supabase
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.error("Error fetching session:", error);
    return;
  }
  if (!session) {
    // If no session, redirect to login/auth page
    window.location.href = "/pages/auth.html";
    return;
  }

  // const user = session.user;
  // console.log(user)

  let datauser = JSON.parse(localStorage.getItem("activeUserData"));
  console.log(datauser);
  // Update profile information
  const profilePictureEl = document.querySelectorAll(".profile-picture");
  const userNameEl = document.querySelectorAll(".user-name");
  // const userEmailEl = document.getElementById("user-email");

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select();
  console.log(userData);
  if (userData.length > 0) {
    userData.forEach((user) => {
      // console.log("Checking:", user.email, "vs", currentuserEmail);

      if (user.email === datauser.email) {
        console.log("User Matched:", user.name);
       userNameEl.forEach((u) => {
         u.textContent = user.name || "Anonymous User";
       });
        // userEmailEl.innerText = user.email;

        if (user.imgUrl) {
          console.log("User Image Found:", user.imgUrl);
          // profilePictureEl.src = user.imgUrl || "default-profile.png";
           profilePictureEl.forEach((uI) => {
             uI.src = user.imgUrl;
           });
          // userProfileImg.src = user.imgUrl;
        } else {
          console.log("No user image found!");
        }
      }
    });
  }
  // Assume user metadata holds avatar_url and full_name; adjust as needed

    const cardContainer = document.querySelector(".card_container");
  // Optionally, fetch user images (if you have a table for them)
      const { data: images, error: imagesError } = await supabase
        .from('memories')
        .select('*')
        .eq('userId', datauser.userId);

      if (imagesError) {
        console.error("Error fetching user images:", imagesError);
      } else if (images) {
        console.log(images)
        
        images.forEach(image => {
          cardContainer.innerHTML += ` 
            <div class="card-body border-bottom">
             
              <p class="text-dark my-3">
                ${image.title}
              </p>
              <img src="${image.imageUrl}" alt="" class="img-fluid rounded-4 w-100 object-fit-cover" style="height: 360px;">
              
                
              
            </div>
          `;
        });
      }
}

// Load profile once the DOM content is ready
document.addEventListener("DOMContentLoaded", loadUserProfile);
