var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var products = [];
var lastIndex;
if (localStorage.getItem("allProdects")) {
  products = JSON.parse(localStorage.getItem("allProdects"));
  display(products);
}
function addProduct() {
  if (
    inputsValidtion(productName) &
    inputsValidtion(productPrice) &
    inputsValidtion(productCategory) &
    inputsValidtion(productDescription) &
    inputsValidtion(productImage)
  ) {
    var product = {
      pName: productName.value,
      pPrice: productPrice.value,
      pCate: productCategory.value,
      pDesc: productDescription.value,
      pImg: productImage.files[0]?.name,
    };
    products.push(product);
    localStorage.setItem("allProdects", JSON.stringify(products));

    clearInputs();
    display(products);
  }
}
function clearInputs() {
  productName.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productDescription.value = null;
  productImage.value = null;
}
function display(displayProduct) {
  resalt = ``;
  for (var i = 0; i < displayProduct.length; i++) {
    resalt += `
 <div class="col-12 col-sm-12 col-md-4 col-lg-4 p-3">
            <div class="product bg-light p-3 rounded">
              <div class="product-image">
                <img src="./images/${displayProduct[i].pImg}" alt="" />
              </div>
              <div class="product-body">
                <h2 class="h3">Name: <span>${displayProduct[i].pName}</span></h2>
                <h3 class="h4">Category: <span>${displayProduct[i].pCate}</span></h3>
                <h3 class="h4">Price: <span>${displayProduct[i].pPrice}</span></h3>
                <p class="lead">
                  <span>Description:</span>${displayProduct[i].pDesc}
                </p>
                <div class="product-btns">
                  <button onclick='setFormUpdate(${i})' class="btn w-100 btn-outline-warning my-2">
                    Update Product 🛠
                  </button>
                  <button onclick="deleteProduct(${i})" class="btn w-100 btn-outline-danger my-2">
                    Delete Product 🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
`;
  }
  document.getElementById("rowElement").innerHTML = resalt;
}
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("allProdects", JSON.stringify(products));
  display(products);
}
function setFormUpdate(index) {
  lastIndex = index;
  productName.value = products[index].pName;
  productPrice.value = products[index].pPrice;
  productCategory.value = products[index].pCate;
  productDescription.value = products[index].pDesc;
  btnAdd.classList.toggle("d-none");
  btnUpdate.classList.toggle("d-none");
}
function updateProduct() {
  products[lastIndex].pName = productName.value;
  products[lastIndex].pPrice = productPrice.value;
  products[lastIndex].pCate = productCategory.value;
  products[lastIndex].pDesc = productDescription.value;
  if (productImage.files[0]) {
    products[lastIndex].pImg = productDescription.files[0]?.name;
  } else {
    products[lastIndex].pImg = products[lastIndex].pImg;
  }
  localStorage.setItem("allProdects", JSON.stringify(products));
  display(products);
  clearInputs();
  btnAdd.classList.toggle("d-none");
  btnUpdate.classList.toggle("d-none");
}
function searchProduct(searchUser) {
  var resalt = [];
  for (var i = 0; i < products.length; i++) {
    if (
      products[i].pName.toLowerCase().includes(searchUser.trim().toLowerCase())
    ) {
      resalt.push(products[i]);
    }
  }
  display(resalt);
}
// function nameValidtion(nameInput) {
//   var nameRegex = /^[A-Z][a-z]{2,6}.{2,10}$/;
//   if (nameRegex.test(nameInput)) {
//     console.log("hello");
//     productName.classList.remove("is-invalid");
//     productName.classList.add("is-valid");
//   } else {
//     console.log("not hello");
//     productName.classList.add("is-invalid");
//   }
// }
// function priceValidtion(nameInput) {
//   var nameRegex = /^[1-9]\d{2,5}$/;
//   if (nameRegex.test(nameInput)) {
//     console.log("hello");
//     productPrice.classList.remove("is-invalid");
//     productPrice.classList.add("is-valid");
//   } else {
//     console.log("not hello");
//     productPrice.classList.add("is-invalid");
//   }
// }
// function cateValidtion(nameInput) {
//   var nameRegex = /^(tv|mobile|Screens|Electronic)$/i;
//   if (nameRegex.test(nameInput)) {
//     console.log("hello");
//     productCategory.classList.remove("is-invalid");
//     productCategory.classList.add("is-valid");
//   } else {
//     console.log("not hello");
//     productCategory.classList.add("is-invalid");
//   }
// }
function inputsValidtion(element) {
  console.log(element.id);
  var regexs = {
    productName: /^[A-Z][a-z]{2,6}.{2,10}$/,
    productPrice: /^[1-9]\d{2,5}$/,
    productCategory: /^(tv|mobile|Screens|Electronic)$/i,
    productDescription: /.{2,100}/,
    productImage: /^.{1,20}\.(jpg|png|webp|jpeg|svg)$/i,
  };
  if (regexs[element.id].test(element.value)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
