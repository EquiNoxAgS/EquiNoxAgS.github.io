/* global React, ReactDOM */

// Global variables for i18n
let translations = {};
let currentLanguage = 'en';

// Load translations from JSON file
async function loadTranslations() {
  try {
    const response = await fetch('translations.json');
    translations = await response.json();
    console.log('Translations loaded:', translations);
  } catch (error) {
    console.error('Error loading translations:', error);
  }
}

// Get current language from localStorage or browser
function getCurrentLanguage() {
  const saved = localStorage.getItem('language');
  if (saved) return saved;
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('zh')) return 'cn';
  return 'en';
}

// Get nested value from object using dot notation
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
}

// Set language and update all elements
function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const value = getNestedValue(translations[lang], key);
    if (value) {
      element.innerHTML = value; // Use innerHTML to support <br> tags
    }
  });
  
  // Update language switcher buttons
  document.querySelectorAll('.language-switcher button').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.querySelector(`[onclick="switchLanguage('${lang}')"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}

// Switch language function
window.switchLanguage = function(lang) {
  setLanguage(lang);
};

const Preloader = function () {
  return React.createElement(
    "div",
    { className: "preloader" },
    React.createElement(
      "div",
      { className: "sk-spinner sk-spinner-wordpress" },
      React.createElement("span", { className: "sk-inner-circle" })
    )
  );
};

function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = React.useState(currentLanguage);
  
  const switchLanguage = (lang) => {
    setCurrentLang(lang);
    window.switchLanguage(lang);
  };
  
  return React.createElement(
    "div",
    { className: "language-switcher" },
    React.createElement(
      "button",
      {
        className: currentLang === 'en' ? 'active' : '',
        onClick: () => switchLanguage('en')
      },
      "EN"
    ),
    React.createElement("span", { className: "divider" }),
    React.createElement(
      "button",
      {
        className: currentLang === 'cn' ? 'active' : '',
        onClick: () => switchLanguage('cn')
      },
      "CN"
    )
  );
}

function Navbar(props) {
  var active = props.active || "";
  var logoSrc = "resources/LOGO_MONO.svg";
  
  // Set navigation text based on current language
  const navText = {
    projects: currentLanguage === 'cn' ? '项目' : 'Projects',
    gallery: currentLanguage === 'cn' ? '画廊' : 'Gallery',
    resume: currentLanguage === 'cn' ? '简历' : 'Resume'
  };
  
  return React.createElement(
    "nav",
    { className: "navbar navbar-default navbar-expand-lg navbar-static-top" },
    React.createElement(
      "div",
      { className: "container animated fadeInUp" },
      React.createElement(
        "div",
        { className: "navbar-brand" },
        React.createElement(
          "a",
          { href: "index.html", className: "navbar-brand-link" },
          React.createElement("img", { 
            src: "resources/LOGO_MONO.svg", 
            className: "navbar-logo navbar-logo-mono",
            alt: "Logo"
          }),
          React.createElement("img", { 
            src: "resources/LOGO_CHROME.svg", 
            className: "navbar-logo navbar-logo-chrome",
            alt: "Logo"
          })
        )
      ),
      React.createElement(
        "button",
        {
          className: "navbar-toggler",
          type: "button",
          "data-toggle": "collapse",
          "data-target": "#navbarSupportedContent",
          "aria-controls": "navbarSupportedContent",
          "aria-expanded": "false",
          "aria-label": "Toggle navigation"
        },
        React.createElement("span", { className: "fa fa-navicon fa-2x" })
      ),
      React.createElement(
        "div",
        { className: "collapse navbar-collapse", id: "navbarSupportedContent" },
        React.createElement(
          "ul",
          { className: "navbar-nav ml-auto" },
          React.createElement(
            "li",
            { className: "nav-item ml-auto" + (active === "projects" ? " active" : "") },
            React.createElement(
              "a",
              { href: "index.html" },
              navText.projects
            )
          ),
          React.createElement(
            "li",
            { className: "nav-item ml-auto" + (active === "gallery" ? " active" : "") },
            React.createElement(
              "a",
              { href: "gallery.html" },
              navText.gallery
            )
          ),
          React.createElement(
            "li",
            { className: "nav-item ml-auto" + (active === "about" ? " active" : "") },
            React.createElement(
              "a",
              { href: "about.html" },
              navText.resume
            )
          )
        )
      )
    )
  );
}

const Footer = function () {
  return React.createElement(
    "footer",
    null,
    React.createElement(
      "div",
      { className: "container animated fadeInUp" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-md-6 col-sm-6" },
          React.createElement(
            "p",
            null,
            React.createElement("strong", null, "E-mail"),
            " ",
            React.createElement(
              "a",
              { href: "mailto:equinox.ags@gmail.com" },
              "equinox.ags@gmail.com"
            )
          ),
          React.createElement("p", null, React.createElement("strong", null, "Wechat"), " EquiNoxAgS")
        ),
        React.createElement(
          "div",
          { className: "col-md-6 col-sm-6" },
          React.createElement(
            "ul",
            { className: "social-icon", style: { position: "absolute", right: 0 } },
            React.createElement(
              "li",
              null,
              React.createElement("a", { href: "https://www.linkedin.com/in/liuhuilin-xyz/", className: "fa fa-linkedin" })
            )
          ),
          React.createElement(
            "ul",
            { className: "social-icon", style: { position: "absolute", right: 30 } },
            React.createElement(
              "li",
              null,
              React.createElement("a", { href: "https://github.com/EquiNoxAgS/", className: "fa fa-github" })
            )
          )
        ),
        React.createElement(
          "div",
          { className: "clearfix col-md-12 col-sm-12" }
        ),
        React.createElement(
          "div",
          { className: "col-md-6 col-sm-6" },
          React.createElement(
            "div",
            { className: "footer-copyright" },
            React.createElement("p", null, "\xA9 2025 Liu Huilin")
          )
        )
      )
    )
  );
};

function renderIfExists(rootId, element) {
  var container = document.getElementById(rootId);
  if (!container) return;
  if (window.ReactDOM && ReactDOM.createRoot) {
    var root = ReactDOM.createRoot(container);
    root.render(element);
  } else if (window.ReactDOM && ReactDOM.render) {
    ReactDOM.render(element, container);
  }
}

function onDocumentReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

onDocumentReady(async function () {
  // Render preloader first
  renderIfExists("preloader-root", React.createElement(Preloader));
  
  // Load translations and render components in parallel
  const [translationsLoaded] = await Promise.all([
    loadTranslations(),
    // Render navbar immediately
    new Promise((resolve) => {
      var navbarRoot = document.getElementById("navbar-root");
      var active = navbarRoot && navbarRoot.dataset && navbarRoot.dataset.active ? navbarRoot.dataset.active : "";
      var logoSrc = "resources/LOGO_MONO.svg";
      if (navbarRoot) {
        if (window.ReactDOM && ReactDOM.createRoot) {
          ReactDOM.createRoot(navbarRoot).render(React.createElement(Navbar, { active: active, logo: logoSrc }));
        } else if (window.ReactDOM && ReactDOM.render) {
          ReactDOM.render(React.createElement(Navbar, { active: active, logo: logoSrc }), navbarRoot);
        }
      }
      resolve();
    }),
    // Render footer immediately
    new Promise((resolve) => {
      renderIfExists("footer-root", React.createElement(Footer));
      resolve();
    })
  ]);
  
  // Set initial language
  const initialLang = getCurrentLanguage();
  currentLanguage = initialLang;
  
  // Create language switcher container if it doesn't exist
  var langSwitcherContainer = document.getElementById("language-switcher-root");
  if (!langSwitcherContainer) {
    langSwitcherContainer = document.createElement("div");
    langSwitcherContainer.id = "language-switcher-root";
    document.body.appendChild(langSwitcherContainer);
  }
  
  // Render language switcher
  if (window.ReactDOM && ReactDOM.createRoot) {
    ReactDOM.createRoot(langSwitcherContainer).render(React.createElement(LanguageSwitcher));
  } else if (window.ReactDOM && ReactDOM.render) {
    ReactDOM.render(React.createElement(LanguageSwitcher), langSwitcherContainer);
  }
  
  // Set initial language content
  setLanguage(initialLang);
  
  // Initialize home menu functionality
  initializeHomeMenu();
});

// Home Menu functionality
function initializeHomeMenu() {
  let currentFilter = null;
  
  // Handle menu item clicks and language switching
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('menu-item')) {
      e.preventDefault();
      
      const filterValue = e.target.getAttribute('data-filter');
      
      // Toggle active state
      document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
      });
      e.target.classList.add('active');
      
      // Apply filter
      if (filterValue === currentFilter) {
        // If clicking the same filter, clear it
        clearFilter();
        currentFilter = null;
      } else {
        // Apply new filter
        applyFilter(filterValue);
        currentFilter = filterValue;
      }
    }
    
    // Handle clicks on menu section background to clear filter
    if (e.target.classList.contains('home-menu') || e.target.classList.contains('menu-line') || e.target.classList.contains('menu-separator')) {
      clearFilter();
      currentFilter = null;
    }
    
    // Handle clicks on portfolio section background to clear filter
    if (e.target.id === 'portfolio' || e.target.classList.contains('container') || e.target.classList.contains('row')) {
      clearFilter();
      currentFilter = null;
    }
  });
  
  // Update menu items when language changes
  const originalSetLanguage = setLanguage;
  setLanguage = function(lang) {
    originalSetLanguage(lang);
    updateMenuItems();
  };
  
  // Filter functions
  function applyFilter(filterValue) {
    const portfolioItems = document.querySelectorAll('#portfolio .col-md-4');
    const portfolioSection = document.getElementById('portfolio');
    let visibleIndex = 0;
    let matchingItems = [];
    
    // Step 1: Immediately hide all items and reset all styles
    portfolioItems.forEach((item) => {
      item.classList.remove('filtered-in', 'filtered-in-animation', 'restore-animation');
      item.classList.add('filtered-out');
      // Reset any inline styles that might interfere
      item.style.animationDelay = '0s';
      // item.style.transform = '';
      item.style.opacity = 0;
    });
    
    // Step 2: Start repositioning matching items immediately (while hiding)
    portfolioItems.forEach((item) => {
      const itemTag = item.getAttribute('data-tag');
      if (itemTag === filterValue) {
        matchingItems.push(item);
        
        // Calculate new position
        const itemsPerRow = 3;
        const row = Math.floor(visibleIndex / itemsPerRow);
        const col = visibleIndex % itemsPerRow;
        
        // Calculate position based on Bootstrap grid
        const itemWidth = 33.333333; // Bootstrap col-md-4 width percentage
        const itemHeight = 300; // Approximate height
        const rowSpacing = 32;
        
        const leftPosition = col * itemWidth;
        const topPosition = row * (itemHeight + rowSpacing);
        
        // Set position and classes
        item.style.left = leftPosition + '%';
        item.style.top = topPosition + 'px';
        item.classList.remove('filtered-out');
        item.classList.add('filtered-in');
        
        visibleIndex++;
      }
    });
    
    // Step 3: Calculate matching items count and set portfolio height
    const itemsPerRow = 3; // Bootstrap col-md-4 means 3 items per row
    const rows = Math.ceil(matchingItems.length / itemsPerRow);
    const itemHeight = 300; // Approximate height of each portfolio item
    const rowSpacing = 32; // margin-top spacing
    const marginTop = 32; // 每个项目的margin-top
    const paddingTop = 32; // CSS中定义的padding-top
    const paddingBottom = 120; // CSS中定义的padding-bottom
    const newHeight = (rows * itemHeight) + ((rows - 1) * rowSpacing) + marginTop + paddingTop + paddingBottom;
    
    // Set portfolio section height immediately
    portfolioSection.style.height = newHeight + 'px';
    portfolioSection.style.transition = 'height 0.1s ease-in-out';
    
    // Step 4: Wait 500ms for complete hiding and repositioning
    setTimeout(() => {
      // Items are already positioned, add fadeInUp animation
      matchingItems.forEach((item) => {
        item.classList.add('filtered-in-animation');
        item.style.opacity = '1';
      });
    }, 500);
  }
  
  function clearFilter() {
    const portfolioSection = document.getElementById('portfolio');
    const portfolioItems = document.querySelectorAll('#portfolio .col-md-4');
    
    // Remove active state from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Calculate original height for all items
    const itemsPerRow = 3;
    const rows = Math.ceil(portfolioItems.length / itemsPerRow);
    const itemHeight = 300;
    const rowSpacing = 32;
    const marginTop = 32; // 每个项目的margin-top
    const paddingTop = 32; // CSS中定义的padding-top
    const paddingBottom = 120; // CSS中定义的padding-bottom
    const originalHeight = (rows * itemHeight) + ((rows - 1) * rowSpacing) + marginTop + paddingTop + paddingBottom;
    
    // Reset portfolio section height
    portfolioSection.style.height = originalHeight + 'px';
    portfolioSection.style.transition = 'height 0.1s ease-in-out';
    
    // Show all portfolio items with fadeInUp animation
    portfolioItems.forEach((item, index) => {
      item.classList.remove('filtered-out', 'filtered-in', 'filtered-in-animation', 'restore-animation');
      
      // Reset position styles
      item.style.left = '';
      item.style.top = '';
      item.style.position = '';
      
      // Force reflow to ensure class removal takes effect
      item.offsetHeight;
      
      // Ensure all items start with opacity 0 for consistent animation
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      
      // Add fadeInUp animation for restoration with slight delay to ensure reflow
      setTimeout(() => {
        item.classList.add('restore-animation');
      }, 10);
    });
  }
}

// Update menu items based on current language
function updateMenuItems() {
  document.querySelectorAll('.menu-item').forEach(item => {
    const textEn = item.getAttribute('data-text-en');
    const textCn = item.getAttribute('data-text-cn');
    
    if (currentLanguage === 'cn' && textCn) {
      item.textContent = textCn;
    } else if (textEn) {
      item.textContent = textEn;
    }
  });
}


