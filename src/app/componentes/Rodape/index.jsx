import estilos from './Rodape.module.css';
import { Instagram, Facebook, Zap } from "lucide-react";


export default function Rodape() {
    return (
        <footer className={estilos.rodape}>
            <div className={estilos.redesSociais}>
                <a href="https://www.instagram.com/seuusuario" target="_blank" rel="noopener noreferrer">
                    <Instagram size={24} />
                </a>
                <a href="https://www.facebook.com/seuusuario" target="_blank" rel="noopener noreferrer">
                    <Facebook size={24} />
                </a>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                    <Zap size={24} />
                </a>
            </div>
        </footer>
    )
}