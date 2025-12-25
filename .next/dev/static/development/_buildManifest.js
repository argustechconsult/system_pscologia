self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/admin": [
    "static/chunks/pages/admin.js"
  ],
  "/login": [
    "static/chunks/pages/login.js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/admin",
    "/admin/clients",
    "/admin/finance",
    "/admin/kanban",
    "/admin/reports",
    "/admin/retention",
    "/admin/schedule",
    "/api/generate-message",
    "/login"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()