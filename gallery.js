const galleryContainer = document.querySelector("#galleryContainer");


const showMemoriesData = async () => {
  try {
    const { data, error } = await supabase.from("memories").select();
    if (error) throw error;
    if (data) {
      console.log(data);
      

    }
  } catch (error) {
    console.log(error)
  }
};

const addMemoryBtn = document.querySelector("#addMemoryBtn");
const addMemory = document.querySelector("#addMemory");
const memoryImg = document.querySelector("#memoryImg");
const memoryTitle = document.querySelector("#memoryTitle");


// file and tilte 
 const noTitleMsg = document.querySelector("#noTitleMsg");
 const noFilesMsg = document.querySelector("#noFilesMsg");

 addMemoryBtn?.addEventListener("click", ()=>{
  noFilesMsg.style.visibility = "hidden";
  noTitleMsg.style.visibility = "hidden";
 })

addMemory?.addEventListener("click", async ()=>{
  
    noFilesMsg.style.visibility = "hidden";
    noTitleMsg.style.visibility = "hidden";
  if(memoryImg.files.length){
    
    if(memoryTitle.value){
      
      console.log("title")
    } else{
     
      noTitleMsg.style.visibility = "visible";
    }
   

  } else{
   
    noFilesMsg.style.visibility = 'visible';
    console.log(noFilesMsg)
    // alert("no file")
  }
})

window.onload = showMemoriesData();

