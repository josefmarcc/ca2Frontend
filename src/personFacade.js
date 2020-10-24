const URL = "https://dachma.dk/ca2Backend/api/persons"

function getPersons(){
    return fetch(URL)
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
        return fetch(URL + "/" + id, options)
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

    function editPerson(person) {
      const options = makeOptions("PUT", person)
      return fetch(URL + "/" + person.id, options)
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

  function getHobbyCount(hobby) {
    const options = makeOptions("GET",hobby)
    return fetch(URL + "/count/" + hobby)
    .then(handleHttpErrors)
}

function getPersonByZip(zip) {
  const options = makeOptions("GET",zip)
  return fetch(URL + "/" + zip)
  .then(handleHttpErrors)
}

  function getZips(){
    return fetch(URL + "/zipcodes")
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

    function getHobbies(){
      return fetch(URL + "hobbies")
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
    deletePerson,
    editPerson,
    getZips,
    getHobbies,
    getHobbyCount,
    getPersonByZip
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