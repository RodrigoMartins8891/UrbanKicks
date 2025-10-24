"use client";

import Topo from "../componentes/Topo";
import Rodape from "../componentes/Rodape";
import { useEffect, useState } from "react";
import estilos from "./Carrinho.module.css";
import { useRouter } from "next/navigation";

export default function Carrinho() {
    const [itens, setItens] = useState([]);
    const router = useRouter()

    useEffect(() => {
        // 🔹 Busca os itens salvos no localStorage (se houver)
        const carrinhoSalvo = localStorage.getItem("carrinho");
        if (carrinhoSalvo) {
            setItens(JSON.parse(carrinhoSalvo));
        }
    }, []);

    const handleRemover = (index) => {
        const novoCarrinho = itens.filter((_, i) => i !== index);
        setItens(novoCarrinho);
        localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    };

    return (
        <>
            <Topo />
            <main className={estilos.container}>
                <button className={estilos.voltarbotao} onClick={() => window.history.back()}>
                    &larr; Voltar
                </button>
                <h1 className={estilos.titulo}>🛍️ Seu Carrinho</h1>

                {itens.length === 0 ? (
                    <p className={estilos.vazio}>Seu carrinho está vazio 😢</p>
                ) : (
                    <ul className={estilos.lista}>
                        {itens.map((item, index) => (
                            <li key={index} className={estilos.item}>
                                <img src={item.imagem} alt={item.nome} className={estilos.imagem} />
                                <div>
                                    <h3>{item.nome}</h3>
                                    <p>Tamanho: {item.tamanho}</p>
                                    <p>R$ {item.preco.toFixed(2)}</p>
                                    <button onClick={() => handleRemover(index)}>Remover</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {itens.length > 0 && (
                    <div className={estilos.total}>
                        <strong>
                            Total: R$ {itens.reduce((t, i) => t + i.preco, 0).toFixed(2)}
                        </strong>
                    </div>
                )}

                {itens.length > 0 && (
                    <button
                        className={estilos.finalizar}
                        onClick={() => router.push("/checkout")}
                    >
                        Finalizar Compra
                    </button>

                )}

            </main>
            <Rodape />
        </>
    );
}
