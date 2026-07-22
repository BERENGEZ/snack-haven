/* eslint-disable no-unused-vars */
// Dynamic Greeting for Homepage
document.addEventListener('DOMContentLoaded', function() {
    const greeting = document.getElementById('greeting');
    if (greeting) { // Only run if greeting element exists
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            greeting.textContent = "Good Morning! Welcome to our Snack Haven!";
        } else if (currentHour < 18) {
            greeting.textContent = "Good Afternoon! Welcome to our Snack Haven!";
        } else {
            greeting.textContent = "Good Evening! Welcome to our Snack Haven!";
        }
    }
});

// Contact Form Submission
const form = document.getElementById('contactForm');
if (form) { // Only run if contactForm exists
    const responseMessage = document.getElementById('contact-response');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        responseMessage.textContent = "Thank you for contacting us! We'll get back to you soon.";
        responseMessage.style.color = 'green';
    });
}

function showDetails(name, description) {
    const modal = document.getElementById('snackModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.close');

    modalTitle.textContent = name;
    modalDescription.textContent = description;
    modal.style.display = 'block';

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };
}

const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) {
            slide.classList.add("active");
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

setInterval(nextSlide, 3000); // Change every 3 seconds
showSlide(currentIndex);

// MENU PAGE SCRIPT

function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price: Number(price), quantity: 1, image });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart.`);
}


// CART PAGE SCRIPT
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsDiv = document.getElementById("cart-items");
    const cartTotalSpan = document.getElementById("cart-total");
  
    function loadCart() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartItemsDiv.innerHTML = "";
      let total = 0;
  
      if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalSpan.textContent = "0.00";
        return;
      }
  
      cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
  
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-image" />
          <div class="cart-details">
            <p><strong>${item.name}</strong> × ${item.quantity}</p>
            <p>$${itemTotal.toFixed(2)}</p>
          </div>
          <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
      });
  
      cartTotalSpan.textContent = total.toFixed(2);
  
      // Attach remove handlers
      document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", () => {
          const index = parseInt(button.getAttribute("data-index"));
          removeFromCart(index);
        });
      });
    }
  
    function removeFromCart(index) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1); // Remove the item at the index
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    }
  
    window.clearCart = function () {
      localStorage.removeItem("cart");
      loadCart();
    };
  
    loadCart(); // Initial load
  });
  
  // Checkout form submission
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checkout-form");
    const responseDiv = document.getElementById("checkout-response");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      responseDiv.textContent = "✅ Thank you for your order! We'll contact you soon.";
  
      form.reset();
      localStorage.removeItem("cart");
  
      document.getElementById("cart-items").innerHTML = "<p>Your cart is now empty.</p>";
      document.getElementById("cart-total").textContent = "0.00";
    });
  });


