"use client";

import { useState } from "react";
import Image from "next/image";
import Topo from "../componentes/Topo";
import Rodape from "../componentes/Rodape";
import CarrinhoIcone from "../componentes/CarrinhoIcone";
import { produtos } from "../dados/data_produtos";
import estilos from "./Produtos.module.css";
import Link from "next/link";

export default function Produtos() {
    const [categoria, setCategoria] = useState("Masculino");

    const produtosFiltrados = produtos.filter(
        (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
    );

    const adicionarAoCarrinho = (produto) => {
        alert(`Produto "${produto.nome}" adicionado ao carrinho!`);
    };

    return (
        <>
            <Topo />
            <main className={estilos.container}>

                <div className={estilos.categorias}>
                    {["Masculino", "Feminino", "Infantil"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoria(cat)}
                            className={`${estilos.botao} ${categoria === cat ? estilos.ativo : ""
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className={estilos.grid}>
                    {produtosFiltrados.map((produto) => (
                        <Link key={produto.id} href={`/produtos/${produto.id}`} className={estilos.card}>
                            <div className={estilos.imagemWrapper}>
                                <Image
                                    src={produto.imagem}
                                    alt={produto.nome}
                                    fill
                                    style={{ objectFit: "cover", borderRadius: "10px" }}
                                    className={estilos.imagem}
                                />
                            </div>
                            <h3>{produto.nome}</h3>
                            <p>R$ {produto.preco.toFixed(2)}</p>
                        </Link>
                    ))}
                </div>
            </main>
            <Rodape />
            <CarrinhoIcone />
        </>
    );
}
