"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Topo from "../../componentes/Topo";
import Rodape from "@/app/componentes/Rodape";
import { produtos } from "../../dados/data_produtos";
import Image from "next/image";
import estilos from "../Produtos.module.css";

export default function ProdutoDetalhes() {
    const params = useParams();
    const router = useRouter();
    const produtoId = parseInt(params.id);
    const produto = produtos.find((p) => p.id === produtoId);

    const [imagemSelecionada, setImagemSelecionada] = useState(produto?.imagens?.[0] || produto?.imagem);
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");

    if (!produto) return <p>Produto não encontrado</p>;

    // 🔹 Tamanhos por categoria automática
    const tamanhosPorCategoria = {
        masculino: ["37", "38", "39", "40", "41", "42", "43"],
        feminino: ["33", "34", "35", "36", "37", "38", "39", "40"],
        infantil: ["18", "19", "20", "21", "22", "23", "24"],
    };

    // Usa a categoria do produto (padrão masculino se não tiver)
    const tamanhosDisponiveis = tamanhosPorCategoria[produto.categoria?.toLowerCase()] || tamanhosPorCategoria.masculino;

    const handleAddCarrinho = () => {
        if (!tamanhoSelecionado) {
            alert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
            return;
        }

        const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
        carrinhoAtual.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: (produto.imagem?.src || produto.imagens?.[0]?.src || ""),
            tamanho: tamanhoSelecionado,
            categoria: produto.categoria,
        });
        localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));

        alert(`Produto "${produto.nome}" (tamanho ${tamanhoSelecionado}) adicionado ao carrinho!`);
        router.push("/carrinho");
    };

    return (
        <>
            <Topo />
            <main className={estilos.container}>
                <button className={estilos.voltarbotao} onClick={() => window.history.back()}>
                    &larr; Voltar
                </button>

                <h1 className={estilos.titulo}>{produto.nome}</h1>

                <div className={estilos.detalhesContainer}>
                    {/* Imagem principal */}
                    <div className={estilos.imagemWrapperDetalhes}>
                        <Image
                            className={estilos.imagem}
                            src={imagemSelecionada}
                            alt={produto.nome}
                            fill
                            style={{ objectFit: "cover", borderRadius: "12px" }}
                        />
                    </div>

                    <div className={estilos.info}>
                        <p><strong>Categoria:</strong> {produto.categoria}</p>
                        <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>

                        {/* Seletor de tamanhos automático conforme categoria */}
                        <label htmlFor="tamanho" className={estilos.label}>
                            <strong>Selecione o tamanho:</strong>
                        </label>
                        <select
                            id="tamanho"
                            className={estilos.selectTamanho}
                            value={tamanhoSelecionado}
                            onChange={(e) => setTamanhoSelecionado(e.target.value)}
                        >
                            <option value="">Escolha um tamanho</option>
                            {tamanhosDisponiveis.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>

                        <button className={estilos.carrinhoBotao} onClick={handleAddCarrinho}>
                            Adicionar ao carrinho
                        </button>

                        <p style={{ marginTop: "20px" }}>
                            Descrição: Produto de alta qualidade, confortável e estiloso. Ideal para qualquer ocasião.
                        </p>
                    </div>
                </div>

                {/* Miniaturas */}
                {produto.imagens && produto.imagens.length > 1 && (
                    <div className={estilos.miniaturas}>
                        {produto.imagens.map((img, index) => (
                            <button
                                key={index}
                                className={`${estilos.botaoMiniatura} ${img === imagemSelecionada ? estilos.ativo : ""}`}
                                onClick={() => setImagemSelecionada(img)}
                            >
                                <Image
                                    src={img}
                                    alt={`Miniatura ${index + 1}`}
                                    width={60}
                                    height={60}
                                    className={estilos.imagemMiniatura}
                                />
                            </button>
                        ))}
                    </div>
                )}
            </main>

            <Rodape />
        </>
    );
}
