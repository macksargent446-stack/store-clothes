<script>

let cart = [];

let selectedProduct = null;

let selectedSize = null;


/* PRODUCT DATA */

const products = {

  "CORE TEE — BLACK":{
    name:"CORE TEE — BLACK",
    price:49,
    colour:"Black",
    description:
      "A clean everyday T-shirt with a relaxed silhouette and understated NOIRE chest branding."
  },

  "CORE TEE — WHITE":{
    name:"CORE TEE — WHITE",
    price:49,
    colour:"White",
    description:
      "A clean everyday T-shirt in white with understated NOIRE branding and a relaxed silhouette."
  },

  "N/01 GRAPHIC TEE":{
    name:"N/01 GRAPHIC TEE",
    price:59,
    colour:"Black",
    description:
      "An oversized black T-shirt featuring the N/01 graphic treatment. Replace this description with your final garment specifications."
  }

};


/* OPEN PRODUCT */

function openProduct(name,price,colour,design){

  const product = products[name];

  selectedProduct = product;

  selectedSize = null;

  document.getElementById("modalName").textContent =
    product.name;

  document.getElementById("modalPrice").textContent =
    "$" + product.price + " AUD";

  document.getElementById("modalDescription").textContent =
    product.description;

  document.querySelectorAll(".size-option")
    .forEach(btn => btn.classList.remove("selected"));

  if(product.colour === "White"){

    document.getElementById("modalShirtBody")
      .style.background="#f7f7f5";

    document.getElementById("modalSleeveLeft")
      .style.background="#f7f7f5";

    document.getElementById("modalSleeveRight")
      .style.background="#f7f7f5";

    document.getElementById("modalLogo")
      .style.color="#111";

  }else{

    document.getElementById("modalShirtBody")
      .style.background="#111";

    document.getElementById("modalSleeveLeft")
      .style.background="#111";

    document.getElementById("modalSleeveRight")
      .style.background="#111";

    document.getElementById("modalLogo")
      .style.color="#fff";

  }

  if(name.includes("N/01")){

    document.getElementById("modalLogo").textContent =
      "N / 01";

  }else{

    document.getElementById("modalLogo").textContent =
      "NOIRE";

  }

  document.getElementById("productModal")
    .classList.add("active");

  document.body.classList.add("locked");

}


/* CLOSE PRODUCT */

function closeProduct(){

  document.getElementById("productModal")
    .classList.remove("active");

  document.body.classList.remove("locked");

}


/* SIZE */

function selectSize(button,size){

  selectedSize = size;

  document.querySelectorAll(".size-option")
    .forEach(btn => btn.classList.remove("selected"));

  button.classList.add("selected");

}


/* ADD PRODUCT */

function addSelectedProduct(){

  if(!selectedProduct){

    return;

  }

  if(!selectedSize){

    alert("Please select a size.");

    return;

  }

  cart.push({

    name:selectedProduct.name,

    price:selectedProduct.price,

    size:selectedSize

  });

  updateCart();

  closeProduct();

  openCart();

}


/* CART */

function removeItem(index){

  cart.splice(index,1);

  updateCart();

}


function updateCart(){

  document.getElementById("count").textContent =
    cart.length;

  const items =
    document.getElementById("cartItems");

  if(!cart.length){

    items.innerHTML =
      '<p style="color:#777;font-size:13px">Your bag is empty.</p>';

  }else{

    items.innerHTML =
      cart.map((item,index)=>`

        <div class="cartitem">

          <div class="cartitemtop">

            <strong>
              ${item.name}
            </strong>

            <strong>
              $${item.price}
            </strong>

          </div>

          <small>
            Size: ${item.size}
          </small>

          <button
            onclick="removeItem(${index})">

            Remove

          </button>

        </div>

      `).join("");

  }

  const total =
    cart.reduce(
      (total,item)=>total + item.price,
      0
    );

  document.getElementById("total").textContent =
    "$" + total + " AUD";

}


/* CART OPEN/CLOSE */

function openCart(){

  document
    .getElementById("cartOverlay")
    .classList.add("active");

}

function closeCart(){

  document
    .getElementById("cartOverlay")
    .classList.remove("active");

}


/* CHECKOUT */

function checkout(){

  if(!cart.length){

    alert("Your bag is empty.");

    return;

  }

  closeCart();

  document
    .getElementById("checkoutModal")
    .classList.add("active");

  const total =
    cart.reduce(
      (total,item)=>total + item.price,
      0
    );

  document.getElementById("summary").innerHTML =
    cart.map(item=>`

      <div
        style="
        display:flex;
        justify-content:space-between;
        margin-bottom:12px;
        font-size:13px">

        <span>
          ${item.name}<br>
          <small style="color:#777">
            Size ${item.size}
          </small>
        </span>

        <strong>
          $${item.price}
        </strong>

      </div>

    `).join("");

  document.getElementById("summaryTotal")
    .textContent =
      "$" + total + " AUD";

  document.body.classList.add("locked");

}


function closeCheckout(){

  document
    .getElementById("checkoutModal")
    .classList.remove("active");

  document.body.classList.remove("locked");

}


/* START */

updateCart();

</script>
