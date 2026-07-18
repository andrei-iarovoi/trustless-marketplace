import { NavLink } from "react-router";

const links = [
  {
    title: "Marketplace",
    href: "/marketplace",
  },
  {
    title: "My Orders",
    href: "/my-orders",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

export function Navigation() {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {links.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          className={({ isActive }) =>
            `relative text-sm font-medium transition-colors ${
              isActive
                ? "text-cyan-400"
                : "text-slate-400 hover:text-white"
            }`
          }
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
}