"use client";

import Topo from "../componentes/Topo";
import Rodape from "../componentes/Rodape";
import { useEffect, useState } from "react";
import estilos from "./Checkout.module.css";
import Image from "next/image";
import { supabase } from "../lib/supabaseClient";

export default function Checkout() {
    const [itens, setItens] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cartaoNumero, setCartaoNumero] = useState("");
    const [cartaoValidade, setCartaoValidade] = useState("");
    const [cartaoCVV, setCartaoCVV] = useState("");
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        const carrinhoSalvo = localStorage.getItem("carrinho");
        if (carrinhoSalvo) setItens(JSON.parse(carrinhoSalvo));
    }, []);

    const total = itens.reduce((t, i) => t + i.preco, 0).toFixed(2);

    const handleFinalizar = async (e) => {
        e.preventDefault();

        if (!nome || !email || !endereco || !cartaoNumero || !cartaoValidade || !cartaoCVV) {
            alert("Por favor, preencha todos os campos do formulário!");
            return;
        }

        setCarregando(true);

        try {
            // 💾 Envia dados para o Supabase
            const { error } = await supabase.from("compras").insert([
                {
                    nome,
                    email,
                    endereco,
                    itens,
                    total,
                },
            ]);

            if (error) throw error;

            alert(`💳 Compra finalizada com sucesso!\nObrigado, ${nome}!`);

            // Limpa tudo
            localStorage.removeItem("carrinho");
            setItens([]);
            setNome("");
            setEmail("");
            setEndereco("");
            setCartaoNumero("");
            setCartaoValidade("");
            setCartaoCVV("");
        } catch (err) {
            console.error("Erro ao salvar no Supabase:", err);
            alert("❌ Ocorreu um erro ao salvar a compra. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <>
            <Topo />
            <main className={estilos.container}>
                <h1 className={estilos.titulo}>💳 Finalizar Compra</h1>

                {itens.length === 0 ? (
                    <p className={estilos.vazio}>Seu carrinho está vazio 😢</p>
                ) : (
                    <>
                        <ul className={estilos.lista}>
                            {itens.map((item, index) => (
                                <li key={index} className={estilos.item}>
                                    <Image
                                        src={item.imagem}
                                        alt={item.nome}
                                        width={80}
                                        height={80}
                                        className={estilos.imagem}
                                    />
                                    <div>
                                        <h3>{item.nome}</h3>
                                        <p>Tamanho: {item.tamanho}</p>
                                        <p>R$ {item.preco.toFixed(2)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className={estilos.total}>
                            <strong>Total: R$ {total}</strong>
                        </div>

                        <form className={estilos.form} onSubmit={handleFinalizar}>
                            <label>
                                Nome:
                                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                            </label>

                            <label>
                                E-mail:
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </label>

                            <label>
                                Endereço:
                                <textarea value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                            </label>

                            <hr className={estilos.divisor} />

                            <h2 className={estilos.subtitulo}>Informações do Cartão</h2>

                            <label>
                                Número do Cartão:
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={19}
                                    value={cartaoNumero}
                                    onChange={(e) => setCartaoNumero(e.target.value)}
                                    required
                                />
                            </label>

                            <div className={estilos.cartaoLinha}>
                                <label>
                                    Validade:
                                    <input
                                        type="text"
                                        placeholder="MM/AA"
                                        maxLength={5}
                                        value={cartaoValidade}
                                        onChange={(e) => setCartaoValidade(e.target.value)}
                                        required
                                    />
                                </label>

                                <label>
                                    CVV:
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={3}
                                        placeholder="123"
                                        value={cartaoCVV}
                                        onChange={(e) => setCartaoCVV(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>

                            <button type="submit" className={estilos.finalizar} disabled={carregando}>
                                {carregando ? "Enviando..." : "Finalizar Compra"}
                            </button>
                        </form>
                    </>
                )}
            </main>
            <Rodape />
        </>
    );
}
