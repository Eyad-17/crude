// let to get the data from the input from the html file.
let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCatgory = document.getElementById("productCatgory");
let productDesc = document.getElementById("productDesc");


// array data.
let productsContainer;
let errors = ``;
if (localStorage.getItem("productList") == null) {
    productsContainer = [];
}
else {
    productsContainer = JSON.parse(localStorage.getItem("productList"))
    displayProduct();
}


// addProduct function.
function addProduct() {

    if (validateProductName() == true) {

        let product = {
            name: productName.value,
            price: productPrice.value,
            catgory: productCatgory.value,
            desc: productDesc.value
        }

        // take all the data from this function then go and add to the array.
        productsContainer.push(product);

        // local storge a small database in the web site.
        //*local storage must be contain of only string so we use json because it convert the let into string
        localStorage.setItem("productList", JSON.stringify(productsContainer))

        //clear form call.  
        clearForm()

        // displayproduct call.
        displayProduct()


    }
    else {
        document.getElementById("alert").innerHTML = errors;
    }

}


// clear form.
function clearForm() {
    productName.value = ``;
    productPrice.value = ``;
    productCatgory.value = ``;
    productDesc.value = ``;
}


// display data.
function displayProduct() {
    // cartoona.
    let cartoona = ``;

    // loop to move on any object and add to the table.
    for (let i = 0; i < productsContainer.length; i++) {
        cartoona +=
            `
        <tr>
            <td>
                ${i + 1}
            </td>
            <td>
                ${productsContainer[i].name}
            </td>
            <td>
                ${productsContainer[i].price}
            </td>
            <td>
                ${productsContainer[i].catgory}
            </td>
            <td>
                ${productsContainer[i].desc}
            </td>
            <td><button onclick="changeFormForUpdate(`+ i + `)" class="btn btn-outline-warning"><i class="fas fa-edit"></i></button></td>
            <td><button onclick="deletProduct(`+ i + `)" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML = cartoona;

}


// delet btn to delet data from the page when ypu click on the btn.
function deletProduct(productIndix) {
    productsContainer.splice(productIndix, 1);
    displayProduct();
    localStorage.setItem("productList", JSON.stringify(productsContainer))
}


// update btn to send the data agin to the form and edit in
function changeFormForUpdate(productIndix) {
    productName.value = productsContainer[productIndix].name;
    productPrice.value = productsContainer[productIndix].price;
    productCatgory.value = productsContainer[productIndix].catgory;
    productDesc.value = productsContainer[productIndix].desc;
}

// search bar
function searchBar(searchTerm) {
    let cartoona = ``;
    for (let i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true
            ||
            productsContainer[i].catgory.toLowerCase().includes(searchTerm.toLowerCase()) == true
            ||
            productsContainer[i].price.toLowerCase().includes(searchTerm.toLowerCase()) == true
            ||
            productsContainer[i].desc.toLowerCase().includes(searchTerm.toLowerCase()) == true
        ) {
            cartoona +=
                `
        <tr>
            <td>
                ${i + 1}
            </td>
            <td>
                ${productsContainer[i].name}
            </td>
            <td>
                ${productsContainer[i].price}
            </td>
            <td>
                ${productsContainer[i].catgory}
            </td>
            <td>
                ${productsContainer[i].desc}
            </td>
            <td><button onclick="changeFormForUpdate(`+ i + `)" class="btn btn-outline-warning"><i class="fas fa-edit"></i></button></td>
            <td><button onclick="deletProduct(`+ i + `)" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button></td>
        </tr>
        `
        }
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}

// valdiation the data
function validateProductName() {
    let regex = /^01[0-9]{8,}$/;
    if (regex.test(productName.value) == true) {
        return true;
    }
    else {
        errors += `<p class = "mt-3 ">sorry your data is in-valide</p>`
        return false;
    }
}