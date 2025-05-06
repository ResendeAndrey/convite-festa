import { useAuth } from "@/contexts/authContext";
import { Users, UsersRound } from "lucide-react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface SidebarLayoutProps {
  children: ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const { logout } = useAuth();
  const navItems = [
    { to: "/guests", label: "Convidados", icon: <Users size={20} /> },
    { to: "/families", label: "Famílias", icon: <UsersRound size={20} /> },
  ];

  return (


    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Sidebar - desktop */}
      <aside className="hidden sm:flex sm:flex-col w-64 bg-amber-500 text-white shadow-lg justify-between">
        <div>
          <div className="p-6 text-2xl font-bold border-b border-amber-400">Painel</div>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-amber-600 transition ${isActive ? "bg-amber-600" : ""
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Botão de logout */}
        <div className="p-4 border-t border-amber-400">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-md hover:bg-amber-600 transition"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 sm:p-8 bg-gray-100">{children}</main>

      {/* Footer navigation - mobile */}
      <nav className="fixed bottom-0 left-0 right-0 sm:hidden bg-amber-500 text-white flex justify-around py-2 shadow-t">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${isActive ? "text-white font-semibold" : "text-white/80"
              }`
            }
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>

  );
}
