"use client";
import { useEffect, useState } from "react";
import estilos from "./Banner.module.css"; 

export default function BannerRotativo() {
    // Lista de imagens
    const imagens = [
        "/banner.jpg",
        "/banner1.jpg",
        "/banner2.jpeg"
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % imagens.length);
        }, 4000);

        return () => clearInterval(intervalo);
    }, [imagens.length]);

    return (
        <div className={estilos.banner}>
            <img
                key={imagens[index]}
                src={imagens[index]}
                alt={`Banner ${index + 1}`}
                className={estilos.imagem}
            />
        </div>
    );
}
