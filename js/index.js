const productsList = document.querySelector(".products-list");
const seeMoreBtn = document.querySelector(".see-more-btn");
const productScroll = document.querySelector(".productScroll");

seeMoreBtn.addEventListener('click', () => {
    productsList.scrollIntoView({behavior: "smooth"})
});

productScroll.addEventListener('click', () => {
    productsList.scrollIntoView({behavior: "smooth"})
});


const productsElements = document.querySelector(".products");
const cartItemsElements = document.querySelector(".cart-items");
const subTotalElements = document.querySelector(".subtotal");
const totalItemsCartElements = document.querySelector(".total-items-in-cart");

// ESP: Mostrar o renderizar los productos
// ENG: Render products
function renderProducts(){
    products.forEach((product)=> {
        productsElements.innerHTML += `
        <div class="item ${product.console}">
        <div class="item-container">
            <div class="item-img">
                <img src="${product.imgSrc}" alt="${product.name}">
            </div>
            <div class="desc">
                <h2 class="productName">${product.name}</h2>
                <h2 class="price"><small>$</small>${product.price}</h2>
                <p class="stock">Stock Available: ${product.instock}</p>
            </div>
            <div class="add-to-wishlist">
                <img src="${product.consoleIcon}" alt="add to wish list">
            </div>
            <div class="add-to-cart" id="buy" onclick="addToCart(${product.id})">
                <img src="./assets/icons/bag-plus.png" alt="add to cart">
            </div>
        </div>
    </div>
        `;
    });
}

renderProducts();

// ESP: Agregar producto al carrito
// ENG: Add product to the shopping cart

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();

function addToCart(id){
    //ESP: Comprobar si el product existe en el carrito
    //ENG: Check if the product exist in the cart
    if(cart.some((item) => item.id === id)){
        changeNumberOfUnits("plus", id);
    }else{
        const item = products.find((product) => product.id === id);
        cart.push({
            ...item,
            numberOfUnits: 1
        });
    }

    updateCart();
}

//ESP: Mantener actualizado el carrito
//ENG: Update cart

function updateCart(){
    renderCartItems();
    renderSubTotal();

    // LocalStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}

//ESP: Calcular el subtotal y renderizarlo
//ENG: Calculate and render subtotal

function renderSubTotal(){
    let totalPrice = 0, totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    subTotalElements.innerHTML = `
        Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}
    `;
    totalItemsCartElements.innerHTML = totalItems;
}


//ESP: Renderizar carrito
//ENG: Render cart

function renderCartItems(){
    //Add one item to the cart and not repeat the first one / Agregar item al carrito pero que no se repita el anterior
    cartItemsElements.innerHTML = "";

    cart.forEach( (item) => {
        cartItemsElements.innerHTML += `
        <div class="cart-item">
                    <div class="item-info" onclick="removeItem(${item.id})">
                        <img src="${item.imgSrc}" alt="${item.name}">
                        <h4>${item.name}</h4>
                    </div>
                    <div class="unit-price">
                        <small>$</small>${item.price}
                    </div>
                    <div class="units">
                        <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                        <div class="number">${item.numberOfUnits}</div>
                        <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
                    </div>
                </div>
        `;
    })
}

//ESP: Sacar el producto del carrito
//ENG: Remove product from cart
function removeItem(id){
    cart = cart.filter( (item) => item.id !== id);

    updateCart();
}

// ESP: Cambiar numero de unidad de un item
// ENG: Change number of units for an item

function changeNumberOfUnits(action, id){

    cart = cart.map( (item) => {

        let numberOfUnits = item.numberOfUnits;

        if(item.id === id){
            if(action === "minus" && numberOfUnits > 1){
                numberOfUnits --;
            }else if(action === "plus" && numberOfUnits < item.instock){
                numberOfUnits++;
            }

        }

        return {
            ...item,
            numberOfUnits,
        };

    });

    updateCart();
}


/* ------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------- */

//Scroll Behavior - Scroll


let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".model", { delay: 600 });
sr.reveal(".products", { origin:"top" , delay: 200 });
sr.reveal(".products-preview", { origin: "left", delay: 550});


/* ------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------- */

/* Filter */

const btns = document.querySelectorAll('.btn');
const storeProducts = document.querySelectorAll('.item');

for (i = 0; i < btns.length; i++) {

    btns[i].addEventListener('click', (e) => {
        e.preventDefault()
        
        const filter = e.target.dataset.filter;
        console.log(filter);
        
        storeProducts.forEach((product)=> {
            if (filter === 'all'){
                product.style.display = 'flex'
            } else {
                if (product.classList.contains(filter)){
                    product.style.display = 'flex'
                } else {
                    product.style.display = 'none'
                }
            }
        });
    });
};