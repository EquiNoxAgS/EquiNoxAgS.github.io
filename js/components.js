/* global React, ReactDOM */

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
  // Detect current language based on URL path
  const getCurrentLanguage = () => {
    const path = window.location.pathname;
    if (path.includes('/cn/')) {
      return 'CN';
    } else if (path.includes('/en/')) {
      return 'EN';
    }
    return 'EN'; // Default to EN for root pages (will redirect to en/)
  };
  
  const [currentLang, setCurrentLang] = React.useState(getCurrentLanguage());
  
  const switchLanguage = (lang) => {
    setCurrentLang(lang);
    
    // Get current page path
    const currentPath = window.location.pathname;
    
    // Replace the language part in the path
    let targetPath;
    if (currentPath.includes('/cn/')) {
      // Currently in cn folder, replace with en
      targetPath = currentPath.replace('/cn/', '/en/');
    } else if (currentPath.includes('/en/')) {
      // Currently in en folder, replace with cn
      targetPath = currentPath.replace('/en/', '/cn/');
    } else {
      // Currently in root, add language folder
      const currentFile = currentPath.split('/').pop() || 'index.html';
      if (lang === 'CN') {
        targetPath = `cn/${currentFile}`;
      } else {
        targetPath = `en/${currentFile}`;
      }
    }
    
    // Navigate to the target page
    window.location.href = targetPath;
  };
  
  return React.createElement(
    "div",
    { className: "language-switcher" },
    React.createElement(
      "button",
      {
        className: currentLang === 'EN' ? 'active' : '',
        onClick: () => switchLanguage('EN')
      },
      "EN"
    ),
    React.createElement("span", { className: "divider" }),
    React.createElement(
      "button",
      {
        className: currentLang === 'CN' ? 'active' : '',
        onClick: () => switchLanguage('CN')
      },
      "CN"
    )
  );
}

function Navbar(props) {
  var active = props.active || "";
  var logoSrc = "images/LOGO_NAME_CHROME.svg";
  
  // Determine current language and set appropriate paths
  const getCurrentLanguage = () => {
    const path = window.location.pathname;
    if (path.includes('/cn/')) {
      return 'CN';
    } else if (path.includes('/en/')) {
      return 'EN';
    }
    return 'ROOT'; // Indicate we're in root directory
  };
  
  const currentLang = getCurrentLanguage();
  // Set path prefix based on current location
  const pathPrefix = currentLang === 'ROOT' ? 'en/' : '../';
  
  // For Gallery and CV links, point to same language folder
  const getGalleryLink = () => {
    if (currentLang === 'CN') return 'gallery.html';
    if (currentLang === 'EN') return 'gallery.html';
    return 'en/gallery.html'; // for root pages
  };
  const getAboutLink = () => {
    if (currentLang === 'CN') return 'about.html';
    if (currentLang === 'EN') return 'about.html';
    return 'en/about.html'; // for root pages
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
          { href: `${pathPrefix}index.html` },
          React.createElement("img", { src: `${pathPrefix}${logoSrc}`, className: "img-responsive navbar-logo" })
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
              { href: currentLang === 'ROOT' ? 'en/index.html' : 'index.html' },
              "Projects"
            )
          ),
          React.createElement(
            "li",
            { className: "nav-item ml-auto" + (active === "gallery" ? " active" : "") },
            React.createElement(
              "a",
              { href: getGalleryLink() },
              "Gallery"
            )
          ),
          React.createElement(
            "li",
            { className: "nav-item ml-auto" + (active === "about" ? " active" : "") },
            React.createElement(
              "a",
              { href: getAboutLink() },
              "CV"
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

onDocumentReady(function () {
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
  var logoSrc = "images/LOGO_NAME_CHROME.svg";
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
});


