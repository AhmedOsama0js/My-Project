let ddlCategory = document.querySelector("#ddlcategory");
let category = document.querySelector("#category");
let product = document.querySelector("#product");
let quantity = document.querySelector("#quantity");
let Price = document.querySelector("#Price");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");

let saveBtn = document.querySelector("#save-btn-product");

let arrCategory;
let arrProduct;
let btnStatus = "create";
let proID;

localStorage.category != null
  ? (arrCategory = JSON.parse(localStorage.category))
  : (arrCategory = []);

localStorage.product != null
  ? (arrProduct = JSON.parse(localStorage.product))
  : (arrProduct = []);

//save category

function saveCategory() {
  let objCategory = {
    category: category.value,
  };

  //validation category

  if (!objCategory.category == "") {
    arrCategory.push(objCategory.category);
  }

  localStorage.setItem("category", JSON.stringify(arrCategory));
  resetCategory();
  showCategory();
  showTableCategory();
}

//reset category

function resetCategory() {
  category.value = "";
}

//show data

function showCategory() {
  let item = "";
  item += `<option value="">Select Category......</option>`;
  for (let i = 0; i < arrCategory.length; i++) {
    item += `<option value="${i}">${arrCategory[i]}</option>`;
  }
  ddlCategory.innerHTML = item;
}

//show table category

function showTableCategory() {
  let showTableCategory = document.querySelector("#showTableCategory");
  let countCategoryShow = document.querySelector("#counter-Category");

  let showTable = "";
  for (let i = 0; i < arrCategory.length; i++) {
    showTable += `
                <tr class="text-center">
              <td>${i + 1}</td>
              <td>${arrCategory[i]}</td>
              <td>
                <button onclick="deleteCategory(${i})" class="btn btn-danger" type="button" title="del">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
    `;
  }
  countCategoryShow.innerHTML = `(${arrCategory.length})`;
  //count category
  showTableCategory.innerHTML = showTable;
}

//delete category
function deleteCategory(id) {
  arrCategory.splice(id, 1);
  localStorage.category = JSON.stringify(arrCategory);
  showCategory();
  showTableCategory();
}

////////////////////////////////////////////////

//get Total

function GetTotal() {
  total.value = Price.value * quantity.value - discount.value;
  if (total.value > 0) {
    total.className.replace = "form-control text-center bg-danger";
    total.className = "form-control text-center bg-success";
  } else {
    total.value = 0;
    total.className.replace = "form-control text-center bg-success";
    total.className = "form-control text-center bg-danger";
  }
}

//Save Product

function saveProduct() {
  let newProduct = {
    ddlCategory: ddlCategory.options[ddlCategory.selectedIndex].text,
    product: product.value,
    quantity: quantity.value,
    price: Price.value,
    discount: discount.value,
    total: total.value,
  };
  if (btnStatus === "create") {
    arrProduct.push(newProduct);
  } else {
    arrProduct[proID] = newProduct;
    saveBtn.classList.remove("btn-success");
    saveBtn.classList.add("btn-primary");
    btnStatus = "create";
  }
  localStorage.setItem("product", JSON.stringify(arrProduct));
  resetProduct();
  showTableData();
}

//rest data
function resetProduct() {
  product.value = "";
  quantity.value = 0;
  Price.value = 0;
  discount.value = 0;
  total.value = 0;
  saveBtn.classList.remove("btn-success");
  saveBtn.classList.add("btn-primary");
}

//show data

function showTableData() {
  TablePro = "";
  for (let i = 0; i < arrProduct.length; i++) {
    TablePro += `
            <tr class="text-center">
                <td>${i + 1}</td>
                <td>${arrProduct[i].ddlCategory}</td>
                <td>${arrProduct[i].product}</td>
                <td>${arrProduct[i].quantity}</td>
                <td>${arrProduct[i].price}</td>
                <td>${arrProduct[i].discount}</td>
                <td>${arrProduct[i].total}</td>
                <td class="px-0">
                  <button class="btn btn-primary" type="button" title="edit" onclick = "editProductFromTable(${i})">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button class="btn btn-danger" type="button" title="del" onclick = "deleteProductFromTable(${i})" >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
            </tr>
    `;
  }
  let tableBody = document.querySelector("#table-body");
  tableBody.innerHTML = TablePro;
}

//////////////////////////////////////////

//delete product from table

function deleteProductFromTable(id) {
  if (confirm("Are You Sur From Deleted")) {
    arrProduct.splice(id, 1);
    localStorage.product = JSON.stringify(arrProduct);
    showTableData();
  }
}

//edit product from table

function editProductFromTable(id) {
  ddlCategory.options[ddlCategory.selectedIndex].text =
    arrProduct[id].ddlCategory;
  product.value = arrProduct[id].product;
  quantity.value = arrProduct[id].quantity;
  Price.value = arrProduct[id].price;
  discount.value = arrProduct[id].discount;
  total.value = arrProduct[id].total;

  btnStatus = "edit";
  proID = id;
  saveBtn.classList.remove("btn-primary");
  saveBtn.classList.add("btn-success");
}

//validation product from table

function validationProductFromTable() {
  let lbCateg = document.querySelector("#lbcateg"); 
  let lbPro = document.querySelector("#lbPro"); 
  let lbQun = document.querySelector("#lbQun"); 
  let lbPrice = document.querySelector("#lbPrice"); 

  if (ddlCategory.options[ddlCategory.selectedIndex].text == "Select Category......") {
    lbCateg.style.color = "red"
  } else {
    lbCateg.style.color = "white";
  }
  product.value == 0 ? lbPro.style.color = "red" : lbPro.style.color = "white";
  quantity.value == 0 ? lbQun.style.color = "red" : lbQun.style.color = "white";
  Price.value == 0 ? lbPrice.style.color = "red" : lbPrice.style.color = "white";

  if (ddlCategory.options[ddlCategory.selectedIndex].text != "Select Category......" && product.value != 0 && quantity.value != 0 && Price.value != 0) {
    saveProduct();
  }

}


//data table
$(document).ready(function () {
  showCategory();
  showTableCategory();
  showTableData();
  $("#tablePro").DataTable();
});
