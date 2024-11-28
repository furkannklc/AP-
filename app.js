const apiURL = 'https://fakestoreapi.com/products';
const container = document.getElementById('container');
const modaldiv = document.getElementById('modal');


async function fetchProducts() {
    try {
        const response = await fetch(apiURL);
        const products = await response.json();
        urunler(products);
    } catch (error) {
        console.error("Veriler çekilirken bir hata oluştu:", error);
    }
    
}

function urunler(products) {
    products.forEach(product => {
        const urunDiv = document.createElement('div');
        const stars = renderStars(product.rating.rate);
        
        urunDiv.className = 'urunler';
        urunDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h5>${product.title}</h5>
            <div class="stars">${stars} <i style="color:grey">(${product.rating.count})<i/></div>
            <p class="price">${product.price} $</p>
            <button class="buton">Sepete Ekle</button>
        `;
        
        urunDiv.addEventListener('click', () => openModal(product));
        container.appendChild(urunDiv);
    });
}

function renderStars(rating) {
    const fullStars = Math.floor(rating); 
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; 
    const emptyStars = 5 - fullStars - halfStar; 
    
    return '<i class="fa-solid fa-star"></i>'.repeat(fullStars) +
           (halfStar ? '<i class="fa-regular fa-star-half-stroke"></i>' : '') +
           '<i class="fa-regular fa-star"></i>'.repeat(emptyStars);
}

function openModal(product) {
    modaldiv.innerHTML = ''; 
    
    const stars = renderStars(product.rating.rate); 
    const modalContent = document.createElement('div');
    modalContent.className="modal-ic"
    modalContent.innerHTML = `
        <div class="modal-image-div">
            <img src="${product.image}" alt="${product.title}" class="modal-image">
        </div>
        <div class="modal-right">
        <i onclick="cikis()" id="exit"  style="float:right" class="fa-regular fa-circle-xmark"></i>
            <h4>${product.title}</h4>
             <div class="stars">${stars} (${product.rating.count})</div>
            <p class="icerik">${product.description}</p>
            <p class="price2" style="float:right;">${product.price} $</p>
            <br><br><br>
            <button class="buton" style="float:right">Sepete Ekle</button>
        </div>
    `;
    
    modaldiv.appendChild(modalContent);
    modaldiv.style.display = "flex";
    
    console.log("Ürün bilgisi:", product);
}

window.addEventListener('load', fetchProducts);

function cikis(){
    modaldiv.style.display = "none";

}
