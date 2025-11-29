
import { router } from "../../index"; 


export function getPagesList() {
  const pages = [];
  const rootRoute = router.routes.find((r) => r.path === "/");
  if (!rootRoute) return [];

  rootRoute.children.forEach((route) => {
    // تجاهل صفحة 404 والـ routes التي تحتوي على params
    if (route.path === "*" || route.path.includes(":")) return;

    const name =
      route.path === "/"
        ? "Home"
        : route.path.replace("/", "").replace(/([A-Z])/g, " $1").trim();

    pages.push({
      name,
      path: route.path.startsWith("/") ? route.path : "/" + route.path,
    });
  });

  return pages;
}
