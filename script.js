const modalToggelButton = document.querySelector("#modal-toggel-button");
const modal = document.getElementById("modal");
const closeIcon = document.getElementById("close-icon");
const form = document.getElementById("form");
const tableBody = document.querySelector("#employee-list > tbody");
const updateModal = document.getElementById("modal1");
const updateForm = document.getElementById("updateForm");
const closeUpdateIcon = document.getElementById("close-icon2");

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

let editingEmployeeId = null;
function toggelUpadteModal(){
    updateModal.classList.toggle("hide-modal");
    updateModal.classList.toggle("show-modal");
}
function prefill(employees){
    for(let i in employees){
        updateForm[i] && (updateForm[i].value = employees[i])
    }
}
function editRecord(e){
    const empId = e.target.parentNode.parentNode.id;
    editingEmployeeId = empId;
    toggelUpadteModal();
    prefill(employees[empId]);
    console.log(employees[empId]); 
}
updateForm.addEventListener("submit",(e) => {
    e.preventDefault();

    const updatedInfo = {
        name : e.target.name.value,
        email: e.target.email.value,
        id: editingEmployeeId,
        role: e.target.role.value,
        DOJ: e.target.DOJ.value,
        gender: e.target.gender.value,
        
    }

    employees[editingEmployeeId] = updatedInfo;

    updateForm.reset();
    toggelUpadteModal();

    const record = document.getElementById(editingEmployeeId);
    let tdCellIndex = 0;
    for(let i in updatedInfo){
        record.children[tdCellIndex++].innerText = updatedInfo[i];
    }
});

function createNewEmployeeList(e){
    // creating new row for printing new employee detail
    const record = document.createElement("tr");
    record.id = e.id;
    // this loop is used to creating new column to fill the details of new employee
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
closeUpdateIcon.addEventListener("click",toggelUpadteModal);
