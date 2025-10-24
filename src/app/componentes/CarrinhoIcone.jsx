"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import estilos from "./CarrinhoIcone.module.css";

export default function Carrinho() {
    return (
        <Link href="/carrinho" className={estilos.carrinhoFlutuante}>
            <ShoppingCart size={28} />
        </Link>
    );
}
