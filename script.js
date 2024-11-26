const images = ['assets/header1.webp', 'assets/header2.webp', 'assets/header3.webp'];
const backgroundDiv = document.querySelector('.rotating-background');

// Add image layers
images.forEach((imageSrc, index) => {
  const layer = document.createElement('div');
  layer.classList.add('background-layer');
  layer.style.backgroundImage = `url(${imageSrc})`;
  if (index === 0) layer.classList.add('active');
  backgroundDiv.appendChild(layer);
});

// Lazy load other images
images.slice(1).forEach(src => {
  const img = new Image();
  img.src = src;
});

let currentIndex = 0;
const layers = document.querySelectorAll('.background-layer');

function changeBackground() {
  layers[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % layers.length;
  layers[currentIndex].classList.add('active');
}

setInterval(changeBackground, 5000);


const backToTopButton = document.getElementById("backToTop");

let isScrolling;
window.onscroll = function () {
  clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    if (document.documentElement.scrollTop > 100) {
      backToTopButton.style.display = "block";
      backToTopButton.classList.remove("fade-out");
    } else {
      backToTopButton.classList.add("fade-out");
      setTimeout(() => {
        if (backToTopButton.classList.contains("fade-out")) {
          backToTopButton.style.display = "none";
        }
      }, 500);
    }
  }, 100); // Adjust delay to reduce frequency
};


backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom > 0 &&
          rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
          rect.right > 0
        );
      }
  
      // Function to add 'visible' class when appear element is in view with random delay
      function handleScroll() {
        const appearElements = document.querySelectorAll('.appear');
        appearElements.forEach(appearElement => {
          if (isInViewport(appearElement) && !appearElement.classList.contains('visible')) {
            // Generate a random delay between 200ms and 1000ms (adjust as needed)
            const randomDelay = Math.floor(Math.random() * (600 - 200 + 1));
  
            setTimeout(() => {
              appearElement.classList.add('visible');
            }, randomDelay);
          }
        });
      }
  
      // Initial check
      handleScroll();
  
      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);
  

function scrollNumber(elementId, end, duration) {
    let start = 0;
    const incrementTime = duration / end; // Time per increment
    const numberElement = document.getElementById(elementId);

    const interval = setInterval(() => {
      start++;
      numberElement.textContent = start;
      numberElement.style.opacity = '1';

      if (start >= end) {
        clearInterval(interval);
      }
    }, incrementTime);
  }

  // Intersection Observer to trigger scrolling numbers
  const options = {
    root: null, // Use the viewport as the container
    rootMargin: '0px',
    threshold: 0.1 // Trigger when at least 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger scrolling effect when the element is in view
        if (entry.target.id === 'number1') {
          scrollNumber('number1', 100, 2000); // Scroll from 0 to 100
        } else if (entry.target.id === 'number2') {
          scrollNumber('number2', 20, 800); // Scroll from 0 to 50
        }
        // Stop observing the element after it's been triggered
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Observe both number elements
  observer.observe(document.getElementById('number1'));
  observer.observe(document.getElementById('number2'));



const showFormBtn = document.getElementById('showFormBtn');
const showFormBtn2 = document.getElementById('showFormBtn2');
const overlayForm = document.getElementById('overlayForm');
const overlayBg = document.getElementById('overlayBg');
const closeFormBtn = document.getElementById('closeFormBtn');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

function showForm() {
  overlayForm.classList.add('show');
  overlayBg.classList.add('show');
}

function hideForm() {
  overlayForm.classList.remove('show');
  overlayBg.classList.remove('show');
}

showFormBtn.addEventListener('click', showForm);
showFormBtn2.addEventListener('click', showForm);
closeFormBtn.addEventListener('click', hideForm);
overlayBg.addEventListener('click', hideForm);

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      mode: 'no-cors', // Necessary for cross-origin requests
    });

    // Display a success message
    formMessage.style.display = 'block';
    formMessage.innerHTML = '<div class="alert alert-success">Your submission has been received! Thank you.</div>';

    // Optionally, reset the form fields
    contactForm.reset();
  } catch (error) {
    console.error('Error:', error);
    formMessage.style.display = 'block';
    formMessage.innerHTML = '<div class="alert alert-danger">There was an error submitting your form. Please try again.</div>';
  }
});


document.addEventListener('DOMContentLoaded', function () {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const header = document.querySelector('.transparent_header'); // Targeting the header

    navbarToggler.addEventListener('click', function () {
      // Toggle the expanded class
      header.classList.toggle('expanded');

      // Set background color based on the expanded state
      if (header.classList.contains('expanded')) {
        header.style.backgroundColor = '#0b5394'; // Set to your desired color
      } else {
        header.style.backgroundColor = ''; // Remove the color
      }
    });
  });

document.addEventListener("DOMContentLoaded", function () {
    // Define elements for phone number and email address
    const phoneLink = document.querySelector("a[href^='tel:']");
    const emailTextElement = document.getElementById("copyEmail");

    // Check if the user is on a mobile device using user agent detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // If the user is not on a mobile device (desktop or laptop)
    if (!isMobile) {
      // 1. Remove the href attribute from the phone link to disable it on desktop
      if (phoneLink) {
        phoneLink.removeAttribute("href");
      }

      // 2. Handle click event on the email text to copy email to clipboard
      if (emailTextElement) {
        const originalEmailText = emailTextElement.innerText; // Store original email text

        emailTextElement.addEventListener("click", function () {
          // Copy the email text to the clipboard
          navigator.clipboard.writeText(originalEmailText).then(() => {
            // Replace the email text with feedback message
            emailTextElement.innerText = "Email copied to clipboard!";

            // Restore original email text after 10 seconds
            setTimeout(() => {
              emailTextElement.innerText = originalEmailText;
            }, 10000); // 10 seconds
          }).catch(err => {
            console.error("Failed to copy text: ", err);
          });
        });
      }
    } else {
      // If the user is on a mobile device

      // 1. Add `tel:` link to the phone number (if not already present)
      if (phoneLink && !phoneLink.href.includes("tel:")) {
        phoneLink.setAttribute("href", "tel:+17133643754");
      }

      // 2. Change the behavior of the email element to use `mailto:`
      if (emailTextElement) {
        const emailAddress = "sales@informatica59.com";
        emailTextElement.style.textDecoration = "underline"; // Ensure it looks clickable
        emailTextElement.style.color = "#0b5394"; // Set appropriate color

        // Make it behave like a link using `mailto:`
        emailTextElement.addEventListener("click", function () {
          window.location.href = `mailto:${emailAddress}`;
        });
      }
    }
  });
