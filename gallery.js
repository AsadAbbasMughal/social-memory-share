const galleryContainer = document.querySelector("#galleryContainer");
const closeModal = document.querySelector(".closeModal");

const activeUserData = JSON.parse(localStorage.getItem("activeUserData"));
console.log(activeUserData);
const showMemoriesData = async () => {
  try {
    const { data, error } = await supabase.from("memories").select();
    if (error) throw error;
    if (data) {
      console.log(data);
      try {
        const { data : usersData, error : usersError } = await supabase.from("users").select();
        if(usersError) throw usersError;
        if(usersData){
          // console.log(usersData)
          const usersMap = {};
          usersData.forEach((user)=>{
            usersMap[user.userId] = user;
          })
          console.log(data);
          console.log(usersMap)
          galleryContainer.innerHTML = ""
          console.log(data)
          data.forEach((newData) => {
            console.log(newData);
          });
          console.log(data);
          data.forEach((memory)=>{
            let activeUser = usersMap[memory.userId];
            console.log(activeUser)
            let activeUserPost = false;
            if(activeUser.userId === activeUserData.userId){
              activeUserPost = true;
            }
            console.log(activeUserPost)
            galleryContainer.innerHTML += `<div class="col-lg-4 col-sm-6 col-12  p-2">
        <div class="main border rounded p-3">
          <div class="thumbnail img-responsive border">
            <a href="#" title="Image 1"><img class="img-fluid " style="height : 200px; width : 100%; object-fit : contain"
                src="${memory.imageUrl}">
            </a>
          </div>
          <h5>${memory.title}</h5>
          <div class="reaction_btn d-flex justify-content-between">
           <div class='likes'>
            <button>👍</button>
            <button>👎</button>
            </div>
            ${activeUserPost ? "<button>delete</button>": ''}
          </div>
        </div>
      </div>`;
          })
        }

      } catch (error) {
        
      }
    }
  } catch (error) {
    console.log(error);
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
        console.log(memoryImg.files[0]);
        console.log(memoryTitle.value);

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
            console.log(data);
            let newMemoyDetails = memoryImg.files[0];
            const { data: setDataToBucket, error: setDataToBucketError } =
              await supabase.storage
                .from("sharedMemories")
                .upload(`${data[0].id}`, newMemoyDetails, {
                  cacheControl: "3600",
                  upsert: false,
                });
                if(setDataToBucketError) throw setDataToBucketError;
                if(setDataToBucket){
                  console.log(setDataToBucket)
                  try {
                    const { data :getMemoryUrl } = supabase.storage
                      .from("sharedMemories")
                      .getPublicUrl(setDataToBucket.path);
                      if(getMemoryUrl){
                        console.log(getMemoryUrl)
                        try {
                          const { data: updatedUrl, error: updatedUrlError } =
                            await supabase
                              .from("memories")
                              .update({ imageUrl: getMemoryUrl.publicUrl })
                              .eq("id", data[0].id)
                              .select();

                              if(updatedUrlError) throw updatedUrlError;
                              if(updatedUrl){
                                console.log(updatedUrl)
                                memoryImg.value = '';
                                memoryTitle.value = '';
                                closeModal.click()
                                showMemoriesData()
                              }

                        } catch (error) {
                          
                        }
                      }

                  } catch (error) {
                    
                  }
                }
          } catch (setDataToBucketError) {
            console.log(setDataToBucketError)
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      noTitleMsg.style.visibility = "visible";
    }
  } else {
    noFilesMsg.style.visibility = "visible";
  }
});

window.onload = showMemoriesData();

const checkSession = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      console.log(user);
      try {
        // const { data, error } = await supabase
        //   .from("users")
        //   .select()
        //   .eq(;
        //   if(error) throw error;
        //   if(data){
        //     console.log(data)
        //   }
        const { data, error } = await supabase
          .from("users")
          .select("email, userId, name")
          .eq("userId", user.id);
        if (error) throw error;
        if (data) {
          console.log(data);
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
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

checkSession();
