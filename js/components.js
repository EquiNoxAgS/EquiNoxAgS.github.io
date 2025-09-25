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
  var logoSrc = "images/LOGO_MONO.svg";
  
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
            src: "images/LOGO_MONO.svg", 
            className: "navbar-logo navbar-logo-mono",
            alt: "Logo"
          }),
          React.createElement("img", { 
            src: "images/LOGO_CHROME.svg", 
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
  // Load translations first
  await loadTranslations();
  
  // Set initial language
  const initialLang = getCurrentLanguage();
  currentLanguage = initialLang;
  
  renderIfExists("preloader-root", React.createElement(Preloader));
  
  // Create language switcher container if it doesn't exist
  var langSwitcherContainer = document.getElementById("language-switcher-root");
  if (!langSwitcherContainer) {
    langSwitcherContainer = document.createElement("div");
    langSwitcherContainer.id = "language-switcher-root";
    document.body.appendChild(langSwitcherContainer);
  }
  
  var navbarRoot = document.getElementById("navbar-root");
  var active = navbarRoot && navbarRoot.dataset && navbarRoot.dataset.active ? navbarRoot.dataset.active : "";
  var logoSrc = "images/LOGO_MONO.svg";
  if (navbarRoot) {
    if (window.ReactDOM && ReactDOM.createRoot) {
      ReactDOM.createRoot(navbarRoot).render(React.createElement(Navbar, { active: active, logo: logoSrc }));
    } else if (window.ReactDOM && ReactDOM.render) {
      ReactDOM.render(React.createElement(Navbar, { active: active, logo: logoSrc }), navbarRoot);
    }
  }
  renderIfExists("footer-root", React.createElement(Footer));
  
  // Render language switcher
  if (window.ReactDOM && ReactDOM.createRoot) {
    ReactDOM.createRoot(langSwitcherContainer).render(React.createElement(LanguageSwitcher));
  } else if (window.ReactDOM && ReactDOM.render) {
    ReactDOM.render(React.createElement(LanguageSwitcher), langSwitcherContainer);
  }
  
  // Set initial language content
  setLanguage(initialLang);
});


