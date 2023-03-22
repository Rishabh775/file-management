const dragArea = document.querySelector(`.drag-area`);
const dragText = document.querySelector(`.header`);

let button = document.querySelector(`.button`);

let input = document.querySelector(`input`);


let file;

button.onclick = () => {
  input.click();
};

input.addEventListener('change' , function() {
   
    file = this.files[0];
    dragArea.classList.add('active');
    

   displayFile();
   
   
});


dragArea.addEventListener(`dragover`,(event)=>{
    event.preventDefault();
    dragText.textContent = `Release to Upload`;
    dragArea.classList.add('active')
    
    //console.log(`File is inside`);
} );

dragArea.addEventListener(`dragleave`,()=>{
    dragText.textContent = `Drag & Drop`;
    dragArea.classList.remove('active')
    //console.log(`File is outside`);
});

dragArea.addEventListener(`drop`, (event) => {
   event.preventDefault();
   file = event.dataTransfer.files[0];
   
   

  //  console.log(`File is dropped`);  
});

function displayFile() {
    
   let fileType = file.type;
   //console.log(fileType);

 
   let validExtensions = ['image/jpeg','image/jpg','image/png','pdf/pdf'];

   if(validExtensions.includes(fileType)){
     let fileReader = new FileReader();

     fileReader.onload = () => {
        let fileURL = fileReader.result;
        
       // console.log(fileURL);
      let imgTag = `<img src="${fileURL}" alt="">`;
      dragArea.innerHTML = imgTag;
     
      
     };
     fileReader.readAsDataURL(file);
     
    } else  {
        alert('This file is not an correct input');
        dragArea.classList.remove('active');
    } 
    file.mv('./Uploads' + fileType,function(err) {
       if(err) {
        res.send(err);
       }
       else{
        alert('This file is uploaded');
       }
    })
    
}

