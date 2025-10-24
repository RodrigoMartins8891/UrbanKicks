import Topo from "./componentes/Topo";
import estilos from "./page.module.css"
import Rodape from "./componentes/Rodape";
import CarrinhoIcone from "./componentes/CarrinhoIcone";
import BannerRotativo from "./componentes/BannerRotativo";


export default function Home() {
  return (
    <main>
      <Topo />
      <BannerRotativo />
      <Rodape />
      <CarrinhoIcone />
    </main>
  )
}