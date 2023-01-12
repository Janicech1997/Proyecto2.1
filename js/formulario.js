var selectRow = null;
var employees = [];

updateAfterPageRefresh();



function onSubmitForm(){
    if(validate()){
        var formData = readForm();
        if(selectRow == null){
            insertNewRecord(formData);
        }
        else{
            updateRecord(formData);
        }
        resetForm();
    }
    
    
}
function readForm(){
    var formData = {};
    formData["Nombre"] = document.getElementById("Nombre").value;
    formData["Email"] = document.getElementById("Email").value;
    formData["Producto"] = document.getElementById("Producto").value;
    formData["Especificaciones"] = document.getElementById("Especificaciones").value;
    return formData
}
function insertNewRecord(formData){
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.Nombre;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.Email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = formData.Producto;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = formData.Especificaciones;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onClick=editForm(this)>Edit</a><a onClick=deleteRecord(this)>Delete</a>`
    employees.push(formData);
    localStorage.setItem("employees",JSON.stringify(employees));
}
function resetForm(){
    document.getElementById("Nombre").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("Producto").value = "";
    document.getElementById("Especificaciones").value = "";
    selectRow = null;
}
function deleteRecord(a){
    var row = a.parentElement.parentElement
    if(confirm("Estas seguro de eliminar esta fila")){
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        employees.splice(row.rowIndex-1,1);
        localStorage.setItem("employees",JSON.stringify(employees));

    }
}
function editForm(a){
    selectRow = a.parentElement.parentElement;
    document.getElementById("Nombre").value = selectRow.cells[0].innerHTML;
    document.getElementById("Email").value = selectRow.cells[1].innerHTML;
    document.getElementById("Producto").value = selectRow.cells[2].innerHTML;
    document.getElementById("Especificaciones").value = selectRow.cells[3].innerHTML;
}
function updateRecord(formData){
    selectRow.cells[0].innerHTML = formData.Nombre;
    selectRow.cells[1].innerHTML = formData.Email;
    selectRow.cells[2].innerHTML = formData.Producto;
    selectRow.cells[3].innerHTML = formData.Especificaciones;
    employees.splice(selectRow.rowIndex-1,1,{Nombre:formData.Nombre,Email:formData.Email,Producto:formData.Producto,Especificaciones:formData.Especificaciones});
    localStorage.setItem("employees",JSON.stringify(employees));
}
function validate(){
    isValid = true;
    if(document.getElementById("Nombre").value == ""){
        isValid = false;
        document.getElementById("labelId").classList.remove("hide");
    }
    else{
        isValid = true;
        if(!document.getElementById("labelId").classList.contains("hide")){
            document.getElementById("labelId").classList.add("hide");
        }
    }
    return isValid;
}

function updateAfterPageRefresh(){
    if(localStorage.getItem("employees")==null){
        console.log("No hay nada en el almacenamiento local.")
    }
    else{
        employees = JSON.parse(localStorage.getItem("employees"));
        for (let index = 0; index < employees.length; index++) {
            let Nombre = employees[index].Nombre;
            let Email = employees[index].Email;
            let Producto = employees[index].Producto;
            let Especificaciones = employees[index].Especificaciones;

            document.getElementById("tbody").innerHTML +=
            `<tr>
                <td>${Nombre}</td>
                <td>${Email}</td>
                <td>${Producto}</td>
                <td>${Especificaciones}</td>
                <td><a onClick=editForm(this)>Editar</a><a onClick=deleteRecord(this)>Eliminar</a></td>
            </tr>
            `
            
        }
    }
    
}