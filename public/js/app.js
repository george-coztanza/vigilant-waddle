const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener('reset',(event)=>{
  messageOne.textContent = "";
  messageTwo.textContent = "";
});

weatherForm.addEventListener('submit',(event)=>{
  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";
  event.preventDefault();
  const address = search.value;
  fetch(`http://localhost:80/weather?address=${address}`).then((response)=>{
    response.json().then((data)=>{
      if(data.error){
        messageOne.textContent = `${data.error}`;
      } else {
        messageOne.textContent = `${data.location}`;
        messageTwo.textContent = `${data.summary}`;
      }
    });
  });
});
