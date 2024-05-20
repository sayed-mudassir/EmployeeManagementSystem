const modalToggelButton = document.querySelector("#modal-toggel-button");
const modal = document.getElementById("modal");
const closeIcon = document.getElementById("close-icon");
const form = document.getElementById("form");
const tableBody = document.querySelector("#employee-list > tbody");
function toggelModal(){
    modal.classList.toggle("hide-modal");
    modal.classList.toggle("show-modal");
}
let id = 1;
const employees = {};
function getNewId(){
    return id++;
}
function deleteRecord(e){
    const deleteButton = e.target;
    const td = deleteButton.parentNode;
    const tr = td.parentNode;
    tr.remove(); 
}
function editRecord(e){
    
    // under porcess 
}
function createNewEmployeeList(e){
    const record = document.createElement("tr");
    for(let key in e){
        const cell = document.createElement("td");
        cell.innerText = e[key];
        record.appendChild(cell)
    }
    const option = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.className = "material-symbols-outlined";

    editButton.addEventListener("click",editRecord);
    
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.className = "material-symbols-outlined";

    deleteButton.addEventListener("click",deleteRecord);

    option.append(editButton,deleteButton);
    record.appendChild(option);
    tableBody.appendChild(record);
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const employee = {
        name : e.target.fullname.value,
        email: e.target.email.value,
        id: getNewId(),
        role: e.target.role.value,
        DOJ: e.target.DOJ.value,
        gender: e.target.gender.value,
        
    }
    // console.log(employee);
    employees[employee.id] = employee;
    form.reset();
    createNewEmployeeList(employee);
    toggelModal();
})
modalToggelButton.addEventListener("click",toggelModal);
closeIcon.addEventListener("click",toggelModal);

