const galleryContainer = document.querySelector("#galleryContainer");
const closeModal = document.querySelector(".closeModal");

const checkSession = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // console.log(user);
      try {
        const { data, error } = await supabase
          .from("users")
          .select("email, userId, name")
          .eq("userId", user.id);
        if (error) throw error;
        if (data) {
          // console.log(data);
          const activeUserData = {
            name: data[0].name,
            email: data[0].email,
            userId: data[0].userId,
          };
          // console.log(activeUserData);
          localStorage.setItem(
            "activeUserData",
            JSON.stringify(activeUserData)
          );
        }
      } catch (error) {
        // console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const activeUserData = JSON.parse(localStorage.getItem("activeUserData"));
// console.log(activeUserData);

const getUserData = async () => {};

// console.log(activeUserData);
const showMemoriesData = async () => {
  try {
    const { data, error } = await supabase.from("memories").select();
    if (error) throw error;
    if (data) {
      // console.log("Memory Data:", data);
      try {
        const { data: usersData, error: usersError } = await supabase
          .from("users")
          .select();
        if (usersError) throw usersError;
        if (usersData) {
          const usersMap = {};
          usersData.forEach((user) => {
            usersMap[user.userId] = user;
          });
          // console.log("Users Map:", usersMap);

          galleryContainer.innerHTML = "";
          data.reverse();
          data.forEach((memory) => {
            let activeUser = usersMap[memory.userId];
            if (!activeUser) {
              console.log(
                `User with userId ${memory.userId} not found in usersMap`
              );
              return;
            }

            // console.log("Active User:", activeUser);

            let activeUserPost = false;
            if (activeUser.userId === activeUserData.userId) {
              activeUserPost = true;
            }
            // console.log("Active User Post:", activeUserPost);

            if (!memory.imageUrl) {
              console.error(
                `Image URL for memory with id ${memory.id} is not defined`
              );
              return;
            }

            galleryContainer.innerHTML += `
              <div class="col-lg-4 col-sm-6 col-12 p-2">
                <div class="main border rounded p-3 hover-scale shadow-lg">
                  <div class="thumbnail img-responsive position-relative overflow-hidden">
                    
                      <img class="img-fluid img-thumbnail" src="${
                        memory.imageUrl
                      }">
                    
                  </div>
                  <div class="content">
                    <h5 class="mt-3 text-primary fw-bold">${memory.title}</h5>
                    <p class="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </div>
                  <div class="reaction_btn d-flex justify-content-between align-items-center mt-auto">
                    <button class="reaction like-btn" data-id="${
                      memory.id
                    }">👍 <span class="like-count">0</span></button>
                    <button class="reaction dislike-btn" data-id="${
                      memory.id
                    }">👎 <span class="dislike-count">0</span></button>
                    ${
                      activeUserPost
                        ? "<button class='btn btn-danger delete-btn' data-id='" +
                          memory.id +
                          "'>X</button>"
                        : ""
                    }
                  </div>
                </div>
              </div>
            `;
          });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  } catch (error) {
    console.error("Error fetching memories:", error);
  }
};

const addMemoryBtn = document.querySelector("#addMemoryBtn");
const addMemory = document.querySelector("#addMemory");
const memoryImg = document.querySelector("#memoryImg");
const memoryTitle = document.querySelector("#memoryTitle");

// file and tilte
const noTitleMsg = document.querySelector("#noTitleMsg");
const noFilesMsg = document.querySelector("#noFilesMsg");

addMemoryBtn?.addEventListener("click", () => {
  noFilesMsg.style.visibility = "hidden";
  noTitleMsg.style.visibility = "hidden";
});

addMemory?.addEventListener("click", async () => {
  noFilesMsg.style.visibility = "hidden";
  noTitleMsg.style.visibility = "hidden";
  if (memoryImg.files.length) {
    if (memoryTitle.value) {
      try {
        // console.log(memoryImg.files[0]);
        // console.log(memoryTitle.value);

        const { data, error } = await supabase
          .from("memories")
          .insert({
            title: memoryTitle.value,
            userId: activeUserData.userId,
            memoryOf: activeUserData.name,
          })
          .select();

        if (error) throw error;
        if (data) {
          try {
            // console.log(data);
            let newMemoyDetails = memoryImg.files[0];
            const { data: setDataToBucket, error: setDataToBucketError } =
              await supabase.storage
                .from("sharedMemories")
                .upload(`${data[0].id}`, newMemoyDetails, {
                  cacheControl: "3600",
                  upsert: false,
                });
            if (setDataToBucketError) throw setDataToBucketError;
            if (setDataToBucket) {
              // console.log(setDataToBucket);
              try {
                const { data: getMemoryUrl } = supabase.storage
                  .from("sharedMemories")
                  .getPublicUrl(setDataToBucket.path);
                if (getMemoryUrl) {
                  // console.log(getMemoryUrl);
                  try {
                    const { data: updatedUrl, error: updatedUrlError } =
                      await supabase
                        .from("memories")
                        .update({ imageUrl: getMemoryUrl.publicUrl })
                        .eq("id", data[0].id)
                        .select();

                    if (updatedUrlError) throw updatedUrlError;
                    if (updatedUrl) {
                      // console.log(updatedUrl);
                      memoryImg.value = "";
                      memoryTitle.value = "";
                      closeModal.click();
                      showMemoriesData();
                    }
                  } catch (error) {}
                }
              } catch (error) {}
            }
          } catch (setDataToBucketError) {
            // console.log(setDataToBucketError);
          }
        }
      } catch (error) {
        // console.log(error);
      }
    } else {
      noTitleMsg.style.visibility = "visible";
    }
  } else {
    noFilesMsg.style.visibility = "visible";
  }

  closeModal.click();
  showMemoriesData();
});

window.onload = showMemoriesData();

checkSession();

// ------------------------------------------------------
document
  .getElementById("galleryContainer")
  .addEventListener("click", async function (event) {
    if (
      event.target.classList.contains("like-btn") ||
      event.target.classList.contains("dislike-btn")
    ) {
      const isLike = event.target.classList.contains("like-btn");
      const likeBtn = event.target
        .closest(".reaction_btn")
        .querySelector(".like-btn");
      const dislikeBtn = event.target
        .closest(".reaction_btn")
        .querySelector(".dislike-btn");
      const likeCount = likeBtn.querySelector(".like-count");
      const dislikeCount = dislikeBtn.querySelector(".dislike-count");

      let likeValue = parseInt(likeCount.innerText);
      let dislikeValue = parseInt(dislikeCount.innerText);

      if (isLike) {
        // Toggle like button
        if (likeBtn.classList.contains("active")) {
          likeBtn.classList.remove("active");
          likeCount.innerText = likeValue - 1;
        } else {
          likeBtn.classList.add("active");
          likeCount.innerText = likeValue + 1;

          // Remove dislike if active
          if (dislikeBtn.classList.contains("active")) {
            dislikeBtn.classList.remove("active");
            dislikeCount.innerText = dislikeValue - 1;
          }
        }
      } else {
        // Toggle dislike button
        if (dislikeBtn.classList.contains("active")) {
          dislikeBtn.classList.remove("active");
          dislikeCount.innerText = dislikeValue - 1;
        } else {
          dislikeBtn.classList.add("active");
          dislikeCount.innerText = dislikeValue + 1;

          // Remove like if active
          if (likeBtn.classList.contains("active")) {
            likeBtn.classList.remove("active");
            likeCount.innerText = likeValue - 1;
          }
        }
      }
    } else if (event.target.classList.contains("delete-btn")) {
      const memoryCard = event.target.closest(".col-lg-4");
      const memoryId = event.target.dataset.id; // Get memory ID from data attribute

      if (
        swal.fire({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this memory!",
          icon: "warning",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
      ) {
        memoryCard.remove(); // Remove from UI immediately
        await deleteMemory(memoryId); // Delete from database & storage
      }
    }
  });

async function deleteMemory(memoryId) {
  try {
    await supabase.from("memories").delete().eq("id", memoryId);
    await supabase.storage
      .from("sharedMemories")
      .remove(["folder/" + memoryId + ".png"]);
    showMemoriesData(); // Refresh the UI after deletion
  } catch (error) {
    console.error("Error deleting memory:", error);
  }
}

// ------------------------------------------------
