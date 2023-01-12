var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["correo"] = document.getElementById("correo").value;
    formData["nombre"] = document.getElementById("nombre").value;
    formData["product"] = document.getElementById("product").value;
    formData["detalles"] = document.getElementById("detalles").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.correo;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.nombre;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.product;
    cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.detalles;
    cell4 = newRow.insertCell(4);
        cell4.innerHTML = `<button onClick="onEdit(this)">Editar</button> <button onClick="onDelete(this)">Eliminar</button>`;
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("correo").value = selectedRow.cells[0].innerHTML;
    document.getElementById("nombre").value = selectedRow.cells[1].innerHTML;
    document.getElementById("product").value = selectedRow.cells[2].innerHTML;
    document.getElementById("detalles").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.correo;
    selectedRow.cells[1].innerHTML = formData.nombre;
    selectedRow.cells[2].innerHTML = formData.product;
    selectedRow.cells[3].innerHTML = formData.detalles;
}

//Delete the data
function onDelete(td) {
    if (confirm('Estas seguro que quieres eliminar?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("correo").value = '';
    document.getElementById("nombre").value = '';
    document.getElementById("product").value = '';
    document.getElementById("detalles").value = '';
    selectedRow = null;
}