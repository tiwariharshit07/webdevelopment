let username = document.getElementById("name")
let search = document.getElementById("btn")
 const output = document.getElementsByClassName("nameage")

 
 async function getName(name) {
   try{  
     const promise = await fetch(`https://api.agify.io?name=${name}`)
     
     let p = await promise.json()
     return p;
   }
   catch(error){
       alert("there is error try a little later")
   }
    }
    search.addEventListener("click", async()=>{
        
        let x = username.value
    let result = await getName(x)

    let N = result.age
    let M = result.count
    output[0].innerText = `${x} your most suitable age is ${N} this data came from total ${M} informations `

    if(M==0 || N==0){
 output[0].innerText = `Hey  ${x} You are Unique I have no data regarding your name Nice to Meet YOU :)`
        
    }
})