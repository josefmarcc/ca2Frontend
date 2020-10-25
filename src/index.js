import "./style.css"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import SERVER_URL from "./constants.js"
import personFacade from "./personFacade"

/* LOAD PERSONS */
function loadPersons(){
personFacade.getPersons()
.then(data => {
  const persons = data.all;
  const personRows = persons.map(person => `
  <tr>
   <td>${person.id}</td>
   <td>${person.fName}</td>
   <td>${person.lName}</td>
   <td>${person.email}</td>
   <td>${person.street}</td>
   <td>${person.zip}</td>
   <td>${person.hobbyName}</td>
   <td>${person.phoneNumber}</td>
   <td><a href="#" class="btnDelete" id=${person.id} >delete</a>
   <td><a href="#" class="btnEdit" id="${person.id}" data-whatever="id="${person.id}" data-toggle="modal" data-target="#myModal2">edit</a></td>
  </tr>
 `)
 const personRowsAsString = personRows.join("");
 document.getElementById("tbody-1").innerHTML = personRowsAsString;
})
}
loadPersons()
document.getElementById("reload").addEventListener("click", loadPersons)

document.getElementById("tbody-1").addEventListener("click", (event) => {
  personFacade.deletePerson(event.target.id)
});
  
/* ADD NEW PERSON */
function addNewPerson(){
  let newPerson = {
    "fName" : document.getElementById("personFname").value,
    "lName" : document.getElementById("personLname").value,
    "email" : document.getElementById("personEmail").value,
    "phoneNumber" : document.getElementById("personPhoneNumber").value,
    "phoneDesc" : document.getElementById("personPhoneDesc").value,
    "street" : document.getElementById("personStreet").value,
    "zip" : document.getElementById("personZip").value,
    "hobbyName" : document.getElementById("personHobbyName").value,
  }
  personFacade.addPerson(newPerson)
}
document.getElementById("savebtn").addEventListener("click", addNewPerson)

/*DELETE & EDIT PERSON BUTTONS */
document.getElementById("tbody-1").addEventListener('click',function(e){
  if(e.target && e.target.className== 'btnDelete'){
    personFacade.deletePerson(e.target.id)
   } 
   if(e.target && e.target.className== 'btnEdit'){
    let personToEdit = e.target.id
    document.getElementById("editBtn").addEventListener("click", function(e){               
      let newPerson = personFacade.getPerson(personToEdit)
      newPerson = {
        id: personToEdit,
        fName: document.getElementById("editPersonFname").value,
        lName: document.getElementById("editPersonLname").value,
        phone: document.getElementById("editPersonEmail").value,
        street: document.getElementById("editPersonStreet").value,
        zip: document.getElementById("editPersonZip").value,
        city: document.getElementById("editPersonHobby").value,
        phone: document.getElementById("editPersonPhone").value
        }
        personFacade.editPerson(newPerson)    
      
    });
  }
}); 

/* GET PERSON BY CITY */
function getPersonByZip() {
let zipInput = document.getElementById("zipInput").value;
const zip = personFacade.getPersonByZip(zipInput)
.then(data => {
  const persons = data.all;
  const personRows = persons.map(person => `
  <tr>
   <td>${person.id}</td>
   <td>${person.fName}</td>
   <td>${person.lName}</td>
   <td>${person.email}</td>
   <td>${person.street}</td>
   <td>${person.zip}</td>
   <td>${person.hobbyName}</td>
   <td>${person.phoneNumber}</td>
   <td><a href="#" class="btnDelete" id=${person.id} >delete</a>
   <td><a href="#" class="btnEdit" id="${person.id}" data-whatever="id="${person.id}" data-toggle="modal" data-target="#myModal2">edit</a></td>
  </tr>
 `)
 const personRowsAsString = personRows.join("");
 document.getElementById("tbody-1").innerHTML = personRowsAsString;
})
}
document.getElementById("saveBtnZip").addEventListener("click", getPersonByZip);

/* GET PERSOM BY HOBBY */
function getPersonByHobby() {
  let hobbyNameInsput = document.getElementById("hobbyName").value;
  const hobby = personFacade.getPersonByHobby(hobbyNameInsput)
  .then(data => {
    const persons = data.all;
    const personRows = persons.map(person => `
    <tr>
     <td>${person.id}</td>
     <td>${person.fName}</td>
     <td>${person.lName}</td>
     <td>${person.email}</td>
     <td>${person.street}</td>
     <td>${person.zip}</td>
     <td>${person.hobbyName}</td>
     <td>${person.phoneNumber}</td>
     <td><a href="#" class="btnDelete" id=${person.id} >delete</a>
     <td><a href="#" class="btnEdit" id="${person.id}" data-whatever="id="${person.id}" data-toggle="modal" data-target="#myModal2">edit</a></td>
    </tr>
   `)
   const personRowsAsString = personRows.join("");
   document.getElementById("tbody-1").innerHTML = personRowsAsString;
  })
}
document.getElementById("saveBtnHobby").addEventListener("click", getPersonByHobby);


function getAllZips(){
    personFacade.getZips()
    .then(data => {
      const cityInfos = data.all;
      const cityInfoRows = cityInfos.map(cityInfo => 
      `<tr>
       <td>${cityInfo.zip}</td>
       <td>${cityInfo.city}</td>      
      </tr>
     `)
     const cityInfoRowsAsString = cityInfoRows.join("");
     document.getElementById("tbody-3").innerHTML = cityInfoRowsAsString;
    })
    }
    getAllZips()
    document.getElementById("allZips").addEventListener("click", getAllZips);
