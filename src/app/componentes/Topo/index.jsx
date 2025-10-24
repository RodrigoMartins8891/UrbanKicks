import Link from "next/link";
import estilos from "./Topo.module.css";

export default function Topo() {
  return (
    <header className={estilos.topo}>
      <Link href="/" className={estilos.logo}>
        <img src="/urbankicks-logo.png" alt="URBANKICKS" />
      </Link>

      <details className={estilos.details}>
        <summary></summary>
        <nav className={estilos.nav}>
          <Link className={estilos.link} href="/">Home</Link>
          <Link className={estilos.link} href="/produtos">Produtos</Link>
          <Link className={estilos.link} href="/carrinho">Carrinho</Link>
          <Link className={estilos.link} href="/checkout">Checkout</Link>
        </nav>
      </details>
    </header>
  );
}
