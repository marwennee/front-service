(function(window) {
    window.env = window.env || {};
  
    // Environment variables
    window["env"]["apiUrl"] = "${API_URL}";
    window["env"]["apiUrl_"] = "${API_URL_1}";
    window["env"]["debug"] = "${DEBUG}";
  })(this);