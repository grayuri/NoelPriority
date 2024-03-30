import { Link, useLocation } from "react-router-dom"

import './Navbar.scss'

export default function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  const actualRoute = pathname.split("/")[1]

  return (
    <header className="navbar">
      <div className="logo">
        <img src="/images/noel-priority-logo.png" alt="Noel Priority Logo" />
      </div>
      <ul className="navlist">
        <li className={actualRoute === "remove-duplicates" ? "actual-route" : ""}>
          <Link to="/remove-duplicates">Remover Duplicatas</Link>
        </li>
        <li className={actualRoute === "check-priorities" ? "actual-route" : ""}>
          <Link to="/check-priorities">Verificar Prioridades</Link>
        </li>
      </ul>
    </header>
  )
}
