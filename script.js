document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('a[data-page]');  // Select all links with data-page attribute
    const contentDiv = document.getElementById('content'); // Where dynamic content will go

    // Function to load content dynamically into the main content area
    function loadPageContent(page) {
        fetch(`${page}.html`)  // Dynamically fetch the HTML for the page
            .then(response => {
                if (!response.ok) {
                    throw new Error('Page not found');
                }
                return response.text();
            })
            .then(data => {
                contentDiv.innerHTML = data;  // Insert the fetched content into the #content div
                const currentLanguage = localStorage.getItem("language") || "en"; // Get the language preference
                setLanguage(currentLanguage); // Ensure the language is set after the new content is loaded
            })
            .catch(error => {
                contentDiv.innerHTML = `<p>Error loading page: ${error.message}</p>`;  // Handle errors
            });
    }

    // Attach event listeners to each link
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();  // Prevent the default navigation behavior
            const page = this.getAttribute('data-page');  // Get the page from the data-page attribute
            loadPageContent(page);  // Load the content dynamically
        });
    });

    // Load the default page content (e.g., home page) when the page is first loaded
    loadPageContent('home');
});

const links = document.querySelectorAll('.nav-link');
const currentPage = window.location.pathname.split('/').pop(); // Get current page file name

links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active'); // Add 'active' class to the link
    }
});

// Function to set the language
function setLanguage(language) {
    // Save the language preference in localStorage
    localStorage.setItem("language", language);

    // Toggle button text
    const languageToggle = document.getElementById('language-toggle');
    if (language === "ja") {
        languageToggle.textContent = 'ENG';  // Button text for Japanese
    } else {
        languageToggle.textContent = '日本語';  // Button text for English
    }

    // Select all elements with data-en and data-ja attributes
    const elementsToTranslate = document.querySelectorAll('[data-en], [data-ja]');
    elementsToTranslate.forEach(el => {
        const lang = language === "ja" ? 'ja' : 'en';  // Decide whether to show Japanese or English

        // Get the corresponding translation from data- attributes
        const text = el.getAttribute(`data-${lang}`);
        
        // Apply translation or original content if it exists
        if (text) {
            el.textContent = text;
        }
    });

    // Also update the page title
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
        const titleText = pageTitle.getAttribute(`data-${language}`);
        if (titleText) {
            pageTitle.textContent = titleText;
        }
    }
}

document.getElementById('language-toggle').addEventListener('click', function() {
    const isJapanese = this.textContent.includes("日本語");

    // Toggle button text
    this.textContent = isJapanese ? 'ENG' : '日本語';

    // Select all elements with data-en and data-ja attributes
    const elementsToTranslate = document.querySelectorAll('[data-en], [data-ja]');

    elementsToTranslate.forEach(el => {
        const lang = isJapanese ? 'ja' : 'en'; // Decide whether to show Japanese or English

        // Get the corresponding translation from data- attributes
        const text = el.getAttribute(`data-${lang}`);
        
        // Apply translation or original content if it exists
        if (text) {
            el.textContent = text;
        }
    });

    // Also update the page title
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
        const titleText = pageTitle.getAttribute(`data-${isJapanese ? 'ja' : 'en'}`);
        if (titleText) {
            pageTitle.textContent = titleText;
        }
    }

    // Store the selected language in localStorage
    const currentLanguage = isJapanese ? 'ja' : 'en';
    setLanguage(currentLanguage);
});
