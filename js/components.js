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

// Password Protection Component
class PasswordProtection {
  constructor(options = {}) {
    this.password = options.password || '210322';
    this.targetSelector = options.targetSelector || '#single-project';
    this.containerId = options.containerId || 'password-overlay';
    
    this.init();
  }

  init() {
    this.addStyles();
    this.createPasswordOverlay();
    this.bindEvents();
    this.applyTranslations();
    this.addProtectionMeasures();
  }

  addStyles() {
    // Styles are now injected immediately when script loads
    // This method is kept for compatibility but does nothing
  }

  createPasswordOverlay() {
    if (document.getElementById(this.containerId)) return;

    const overlay = `
      <div id="${this.containerId}" class="password-overlay">
        <div class="password-container">
          <h4 data-i18n="password.title">请输入访问密码</h4>
          <input type="password" id="password-input" data-i18n-placeholder="password.placeholder" placeholder="请输入密码" />
          <button onclick="window.passwordProtection.checkPassword()" data-i18n="password.confirm">Enter</button>
          <div id="error-message" class="error-message" style="display: none;" data-i18n="password.error">密码错误，请重试</div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', overlay);
  }

  bindEvents() {
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
      passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.checkPassword();
        }
      });
    }
  }

  applyTranslations() {
    // Apply translations when they become available
    const applyTranslationsToPassword = () => {
      const passwordElements = document.querySelectorAll('[data-i18n^="password"]');
      passwordElements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const placeholderKey = element.getAttribute('data-i18n-placeholder');
        
        if (key && translations[currentLanguage]?.password?.[key.split('.')[1]]) {
          element.textContent = translations[currentLanguage].password[key.split('.')[1]];
        }
        if (placeholderKey && translations[currentLanguage]?.password?.[placeholderKey.split('.')[1]]) {
          element.placeholder = translations[currentLanguage].password[placeholderKey.split('.')[1]];
        }
      });
    };

    // Apply translations immediately if available
    if (Object.keys(translations).length > 0) {
      applyTranslationsToPassword();
    }

    // Apply translations when language changes
    const originalSetLanguage = window.setLanguage;
    window.setLanguage = (lang) => {
      originalSetLanguage(lang);
      setTimeout(applyTranslationsToPassword, 100);
    };

    // Also listen for translation updates from the main translation system
    const checkForTranslations = () => {
      if (Object.keys(translations).length > 0) {
        applyTranslationsToPassword();
      } else {
        setTimeout(checkForTranslations, 100);
      }
    };
    checkForTranslations();
  }

  checkPassword() {
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    
    if (!passwordInput || !errorMessage) return;

    const inputPassword = passwordInput.value;
    
    if (inputPassword === this.password) {
      // Remove password protection
      document.getElementById(this.containerId).style.display = 'none';
      document.querySelector(this.targetSelector).classList.remove('password-protected');
      
      // Load protected content after password verification
      this.loadProtectedContent();
    } else {
      // Show error message
      errorMessage.style.display = 'block';
      passwordInput.value = '';
    }
  }

  loadProtectedContent() {
    // Show protected content sections
    const protectedSections = document.querySelectorAll('.protected-content');
    protectedSections.forEach(section => {
      section.style.display = 'block';
    });

    // Replace placeholder images with actual content
    const protectedImages = document.querySelectorAll('img[data-protected-src]');
    protectedImages.forEach(img => {
      const actualSrc = img.getAttribute('data-protected-src');
      if (actualSrc) {
        img.src = actualSrc;
        img.removeAttribute('data-protected-src');
      }
    });

    // Replace placeholder videos with actual content
    const protectedVideoSources = document.querySelectorAll('source[data-protected-src]');
    protectedVideoSources.forEach(source => {
      const actualSrc = source.getAttribute('data-protected-src');
      if (actualSrc) {
        source.src = actualSrc;
        source.removeAttribute('data-protected-src');
        // Reload the video element
        const video = source.parentElement;
        if (video && video.tagName === 'VIDEO') {
          video.load();
        }
      }
    });
  }

  show() {
    document.getElementById(this.containerId).style.display = 'flex';
    document.querySelector(this.targetSelector).classList.add('password-protected');
  }

  hide() {
    document.getElementById(this.containerId).style.display = 'none';
    document.querySelector(this.targetSelector).classList.remove('password-protected');
  }

  addProtectionMeasures() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });

    // Disable common keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (e.keyCode === 123 || // F12
          (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I/J
          (e.ctrlKey && e.keyCode === 85)) { // Ctrl+U
        e.preventDefault();
        return false;
      }
    });

    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
      e.preventDefault();
      return false;
    });

    // Disable text selection
    document.addEventListener('selectstart', function(e) {
      e.preventDefault();
      return false;
    });

    // Detect developer tools (basic detection)
    let devtools = {open: false, orientation: null};
    setInterval(function() {
      if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        if (!devtools.open) {
          devtools.open = true;
          // Optionally redirect or show warning
          console.clear();
          console.log('%cWarning: Developer tools detected!', 'color: red; font-size: 20px;');
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Clear console periodically
    setInterval(function() {
      console.clear();
    }, 1000);
  }
}

// Inject styles immediately when script loads (before DOMContentLoaded)
(function() {
  // Remove existing styles first to allow updates
  const existingStyles = document.getElementById('password-protection-styles');
  if (existingStyles) {
    existingStyles.remove();
  }

  const styles = `
    <style id="password-protection-styles">
      .password-protected {
        filter: blur(10px);
        pointer-events: none;
        user-select: none;
      }
      .password-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        pointer-events: none;
      }
      .password-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        pointer-events: auto;
      }
      .password-overlay .password-container h4 {
        margin: 0;
        padding: 0;
        color: #333;
        text-align: center;
        font-size: 15px;
        font-weight: 500;
      }
      .password-overlay .password-container input {
        width: 200px;
        height: 30px;
        padding: 0 20px !important;
        border: 2px solid #ddd;
        border-radius: 15px;
        font-size: 16px;
        text-align: center;
        background: white;
        color: #333;
        transition: all 0.3s ease;
        margin: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
      .password-overlay .password-container input::placeholder {
        color: #999 !important;
      }
      .password-overlay .password-container input:focus {
        outline: none;
        border-color: #ddd;
        border-width: 3px;
        background: white;
      }
      .password-overlay .password-container button {
        background: white;
        color: #333;
        height: 30px;
        padding: 0 20px;
        margin: 3px;
        border: 1px solid #333;
        border-radius: 15px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
        box-shadow: none;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
      .password-overlay .password-container button:hover {
        background: #f8f9fa !important;
        border-color: #999 !important;
        transform: translateY(-2px) !important;
        color: #333 !important;
      }
      .password-overlay .password-container button:focus {
        background: #f8f9fa !important;
        border-color: #999 !important;
        color: #333 !important;
        box-shadow: none !important;
        outline: none !important;
      }
      .password-overlay .password-container button:active {
        background: #f8f9fa !important;
        border-color: #999 !important;
        color: #333 !important;
        box-shadow: none !important;
      }
      .error-message {
        color: #dc3545;
        margin-top: 10px;
        font-size: 14px;
        text-align: center;
      }
    </style>
  `;

  // Insert styles immediately
  document.head.insertAdjacentHTML('beforeend', styles);
})();

// Initialize password protection when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Auto-initialize if password-protection-container exists
  if (document.getElementById('password-protection-container')) {
    window.passwordProtection = new PasswordProtection({
      targetSelector: '#single-project'
    });
  }
});

// Export for manual initialization
window.PasswordProtection = PasswordProtection;

