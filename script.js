// Dynamic Greeting for Homepage
document.addEventListener("DOMContentLoaded", function () {
  const greeting = document.getElementById("greeting");
  if (greeting) {
    // Only run if greeting element exists
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

function showDetails(name, description) {
  const modal = document.getElementById("snackModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const closeBtn = document.querySelector(".close");

  modalTitle.textContent = name;
  modalDescription.textContent = description;
  modal.style.display = "block";

  closeBtn.onclick = () => (modal.style.display = "none");
  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
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

//Show Toast is a function that when a User adds an item in the cart a message pops aout and it fades after 3 seconds.
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  //Let it fade After 3 Seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
// MENU PAGE SCRIPT

function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price: Number(price), quantity: 1, image });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast(`${name} added to your cart!`);
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
    document.querySelectorAll(".remove-btn").forEach((button) => {
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

//Contact US Submission with Flask Backend
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("name").value.trim();
      const emailInput = document.getElementById("email").value.trim();
      const messageInput = document.getElementById("message").value.trim();
      const submitBtn = document.getElementById("submitBtn");

      if (!emailInput.includes("@")) {
        showToast("❌ Please enter a valid email address.");
        return; //Stops the function from hitting the serever
      }

      if (messageInput.length < 20) {
        showToast("❌ Message must be at least 20 characters long.");
        return;
      }

      submitBtn.disabled = true; // Disable the button to prevent multiple submissions
      submitBtn.textContent = "Sending...";
      submitBtn.style.cursor = "not-allowed"; // Change cursor to indicate disabled state
      submitBtn.style.opacity = "0.7"; // Reduce opacity to indicate disabled state

      const contactData = {
        name: nameInput,
        email: emailInput,
        message: messageInput,
      };

      try {
        const response = await fetch("/api/contactUs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        });

        const result = await response.json();

        if (response.ok) {
          showToast("✅ " + result.message);
          contactForm.reset();
        } else {
          showToast("❌ Error sending message.");
        }
      } catch (error) {
        console.error("Backend Error:", error);
        showToast("❌ Could not connect to the server.");
      } finally {
        submitBtn.disabled = false; // Re-enable the button after submission
        submitBtn.textContent = "Send Message"; // Reset button text
        submitBtn.style.cursor = "pointer"; // Reset cursor style
        submitBtn.style.opacity = "1"; // Reset opacity
      }
    });
  }
});

// Checkout form submission with Flask Backend
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");
  if (form) {
    const responseDiv = document.getElementById("checkout-response");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Gather all the data using exact HTML IDs
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = document.getElementById("cart-total").textContent;

      const orderData = {
        customer_name: document.getElementById("name").value,
        customer_email: document.getElementById("email").value,
        customer_address: document.getElementById("address").value,
        payment_method: document.getElementById("payment-method").value,
        cart_items: cart,
        total_amount: total,
      };

      // 2. Show a loading message
      showToast("⏳ Securely processing order...");

      try {
        // 3. Send the data to your Python Flask Backend
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        const result = await response.json();

        // 4. Handle the successful response from Python
        if (response.ok) {
          showToast("✅ " + result.message);

          form.reset();
          localStorage.removeItem("cart");
          document.getElementById("cart-items").innerHTML =
            "<p>Your cart is now empty.</p>";
          document.getElementById("cart-total").textContent = "0.00";
        } else {
          showToast("❌ Error processing order.");
        }
      } catch (error) {
        console.error("Backend Error:", error);
        showToast("❌ Could not connect to the server.");
      }
    });
  }
});
