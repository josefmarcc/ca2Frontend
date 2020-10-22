const URL = "https://dachma.dk/ca2backend/api/person/"

function getPersons(){
    return fetch(URL + "all")
    .then(handleHttpErrors)
    .catch(err =>{
        if(err.status){
          err.fullError.then(e=>
            console.log(e.message),
            document.getElementById("error").innerHTML = e.message
            )
        }
        else{ console.log("Network error"); }
     })
    }
    
function addPerson(person) {
    const options = makeOptions("POST",person)
    return fetch(URL, options)
    .then(handleHttpErrors)
    .catch(err =>{
        if(err.status){
          err.fullError.then(e=>
            console.log(e.message),
            document.getElementById("error").innerHTML = e.message
            )
        }
        else{ console.log("Network error"); }
     })
    }

    function deletePerson(id) {
        const options = makeOptions("DELETE")
        return fetch(URL + id, options)
        .then(handleHttpErrors)
        .catch(err =>{
            if(err.status){
              err.fullError.then(e=>
                console.log(e.message),
                document.getElementById("error").innerHTML = e.message
                )
            }
            else{ console.log("Network error"); }
         })
    }



const personFacade = {
    getPersons,
    addPerson,
    deletePerson
}


function makeOptions(method, body) {
    var opts =  {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if(body){
      opts.body = JSON.stringify(body);
    }
    return opts;
   }
   
   function handleHttpErrors(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
   }
   

export default personFacade;