let uploadImgName = document.querySelector("#uploadImgName");
let uploadImgDes = document.querySelector("#uploadImgDes");
let uploadImgFile = document.querySelector("#uploadImgFile");
let uploadImgBtn = document.querySelector("#uploadImgBtn");
let upload = document.querySelector(".upload");
let uploadImgContainer = document.querySelector(".uploadImgContainer");
let myCards = document.querySelector(".myCards");
const supabaseUrl = 'https://tgeouiprsvwtrccffqxe.supabase.co'

//open from
const openForm = () => {
  upload.classList.add("d-none");
  uploadImgContainer.classList.remove("d-none");
};
upload.addEventListener("click", openForm);

// ---------------------

const addUser = async (e) => {
  e.preventDefault();
  let name = uploadImgName.value;
  let des = uploadImgDes.value;
  let file = uploadImgFile.files[0];

  if (!name || !des) {
    alert("Name and description cannot be empty!");
    return;
  }


  if (!file) {
    alert("Please select an image before uploading!");
    return;
  }

  try {
    
    let fileName = `${Date.now()}-${file.name}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

      if (storageError) {
        alert("Image upload failed");
        console.log(storageError);
        return;
      }
      console.log(storageData);

      



    const { error } = await supabase.from("userdata").insert({
      name: name,
      description: des,
      imgUrl: storageData.fullPath,
      uid: "1a7bc86e-5083-4448-add1-5f47328efb4a"
    });
    if (error) throw error;
    

   
    console.log("user added successfully");


     uploadImgName.value = "";
     uploadImgDes.value = "";
     uploadImgFile.value = "";


  } catch (error) {
    console.log("Try Catch  Error --- >", error.message);
  }
};


const fetchUser =async () =>{
    const { data, error } = await supabase
  .from('userdata')
  .select()
  .eq('uid', "1a7bc86e-5083-4448-add1-5f47328efb4a" )

  console.log(data);

  for(let i=0; i<data.length; i++){
    let product = data[i]
    console.log(product)    

    let cardDiv = document.createElement('div');
    cardDiv.className = 'col-md-3 col-sm-6'

    cardDiv.innerHTML = `
    <div class="card" style="width: 18rem;">
       <img src="${supabaseUrl}/storage/v1/object/${product.imgUrl}" class="card-img-top my-height" alt="...">
       <div class="card-body">
       <h5 class="card-title">${product.name}</h5>
       <p class="card-text">${product.description}.</p>
       
       
       
       <div>
           <button class="btn btn-info">
           Update
           </button>
           <button  class="btn btn-danger delete-btn">
               Delete
           </button>
           </div>

       </div>
       </div>
       `;
       myCards.appendChild(cardDiv);
       const deleteBtn = cardDiv.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => deleteProduct(product.id));
       
    }
    
}
fetchUser()
uploadImgBtn.addEventListener("click", addUser);


async function deleteProduct(productId){
    console.log(productId)
    const response = await supabase
  .from('userdata')
  .delete()
  .eq('id', productId)


}
