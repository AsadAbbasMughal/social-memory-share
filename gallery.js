const galleryContainer = document.querySelector("#galleryContainer");
const activeUserData = JSON.parse(localStorage.getItem("activeUserData"));
console.log(activeUserData);
const showMemoriesData = async () => {
  try {
    const { data, error } = await supabase.from("memories").select();
    if (error) throw error;
    if (data) {
      console.log(data);
      try {
        

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
