(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }

        // Change logo on scroll
        if ($(window).width() > 768) {
            if ($(this).scrollTop() > 50) {
                $('#logo').attr('src', 'img/crossbar.png').css({ 'width': '180px', 'height': '80px' }); // New logo when scrolled
            } else {
                $('#logo').attr('src', 'img/crossbar white.svg').css({ 'width': '180px', 'height': '80px' }); // Original logo
            }
        } else {
            // If the screen is mobile-sized, keep the original logo
            $('#logo').attr('src', 'img/crossbar.png').css({ 'width': '180px', 'height': '80px' });
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });
    
})(jQuery);

// Open the modal with the clicked image
function openModal(thumbnail) {
    const modal = document.getElementById("imageModal");
    const enlargedImage = document.getElementById("enlargedImage");
  
    if (thumbnail && enlargedImage) {
      enlargedImage.src = thumbnail.src; // Set the enlarged image to the clicked image's source
      modal.style.display = "flex"; // Display the modal with flexbox to center it
    } else {
      console.error("Thumbnail or enlarged image element not found.");
    }
  }
  
  // Close the modal
  function closeModal() {
    const modal = document.getElementById("imageModal");
    if (modal) {
      modal.style.display = "none"; // Hide the modal
    } else {
      console.error("Modal element not found.");
    }
  }
  
  // Close modal on click outside of the image
  window.onclick = function (event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  function searchKeyword() {
    const query = document.getElementById("searchInput").value.toLowerCase(); // Get the keyword input and convert to lowercase
    const resultsContainer = document.getElementById("searchResults");

    if (query === "") {
        resultsContainer.innerHTML = ""; // Clear results when input is empty
        resultsContainer.style.display = "none"; // Hide results when input is empty
        return;
    }

    const images = document.querySelectorAll(".img-fluid.thumbnail"); // Get all images with the specified class
    const results = [];

    images.forEach(image => {
        const altText = image.alt.toLowerCase(); // Get the alt text of the image and convert to lowercase
        const regex = new RegExp(query, "gi");

        // Check if the alt text contains the query
        if (altText.includes(query)) {
            // Highlight matching text
            let highlightedAlt = image.alt.replace(regex, match => {
                return `<span style="background-color: yellow">${match}</span>`;
            });

            // Add the image in smaller size (40px width) to the results
            results.push(`<div class="search-result-item" style="display: flex; align-items: center; margin-bottom: 10px;" onclick="openModal('${image.src}', '${image.alt}')">
                            <img src="${image.src}"/>
                            <span>${highlightedAlt}</span>
                           </div>`);
        }
    });

    if (results.length > 0) {
        resultsContainer.innerHTML = results.join(""); // Insert the results into the container
        resultsContainer.style.display = "block"; // Show the dropdown with results
    } else {
        resultsContainer.innerHTML = "<div>No results found.</div>"; // Show "No results found"
        resultsContainer.style.display = "block"; // Show the dropdown with the "No results" message
    }
}

