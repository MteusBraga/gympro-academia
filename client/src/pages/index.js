import { useEffect, useState } from 'react';
import axios from 'axios';
import style from "@/styles/home.module.css";

export default function Home() {
    /*return (
    <body>
   
        <header className={style.cabecalho}>
            <a className={style.cabecalho-icon}> GYMPRO </a>

            <nav className={style.cabecalho-menu}>
                <a className={style.cabecalho-menu-item} href=""> MODALIDADES</a>
                <a className={style.cabecalho-menu-item} href="" > PLANOS</a>
                <a className={style.cabecalho-menu-item} href="" > SOBRE</a>
                <a className={style.cabecalho-menu-item} href="" > LOGIN </a>
            </nav>

        </header>
  
        <main class="conteudo">
            <section className={style.conteudo-principal}>
                <div className={style.conteudo-principal-escrito}>
                    <h1 className={style.-principal-escrito-titulo}>TRANSFORME SEU CORPO, ELEVE SUA MENTE</h1>
                    <h2 className={style.conteudo-principal-escrito-subtitulo}>Descubra o poder da transformação pessoal em nossa academia. Seu caminho para uma versão mais forte e saudável começa aqui.</h2>
                    <div className={style.conteudo-principal-botao}>
                        <button className={style.conteudo-principal-escrito-botao-cad}>CADASTRE-SE</button>
                        <button className={style.conteudo-principal-escrito-botao-log}>JÁ SOU MEMBRO</button>
                    </div>

                </div>
                <img class="conteudo-principal-imagem" src="../../images/imagem-principal.png" alt="Imagem Principal">

            </section>

            <section className={style.conteudo-secundario}>
                <div className={style.conteudo-secundario-icon}>
                    <img src="../../images/icon-tiktok.svg" alt="Icone do tiktok">
                    <img src="../../images/icon-insta.svg" alt="Icone do Instagram">
                    <img src="../../images/icon-wpp.svg" alt="Icone do Whatsapp">
                </div>
            </section>

            <section class="conteudo-terceiro">
                <div class="conteudo-terceiro-escrito">
                    <h1 class="conteudo-terceiro-escrito-titulo">NOSSOS PLANOS</h1>
                </div>

                <h1 class="primeiro-plano-titulo">BASIC</h1>
                <div class="primeiro-plano">
                    <div class="primeiro-plano-conteudo">
                            <h2 class="primeiro-plano-conteudo-titulo">MENSAL R$ 80,00</h2>
                            <p class="primeiro-plano-conteudo-par">
                                &#9989 Acesso à aulas de musculação </p>
                            <p class="primeiro-plano-conteudo-par">
                                &#9989 Acesso à planilha de treinos </p>
                            <p class="primeiro-plano-conteudo-par">
                                &#9989 Acesso à avaliação física </p>
                            <p class="primeiro-plano-conteudo-par">
                                &#10060 Acesso à consulta com nutricionista </p>
                            <p class="primeiro-plano-conteudo-par">
                                &#10060 Acesso à biopedancia </p>
                            <p class="primeiro-plano-conteudo-par">
                                &#10060 Acesso à endocrinologista </p>
                            <p class="primeiro-plano-conteudo-par">
                                &#10060 Acesso à Personal Trainer 
                            </p>
                        <button class="assinar-plano1"> ASSINAR</button>
                    </div>

                    <div class="primeiro-plano-conteudo">
                        <h2 class="primeiro-plano-conteudo-titulo"> TRIMESTRAL R$ 72,00/MÊS</h2>
                        <p class="primeiro-plano-conteudo-par">
                            &#9989 Acesso à aulas de musculação </p>
                        <p class="primeiro-plano-conteudo-par">
                            &#9989 Acesso à planilha de treinos </p>
                        <p class="primeiro-plano-conteudo-par">
                            &#9989 Acesso à avaliação física </p>
                        <p class="primeiro-plano-conteudo-par">
                            &#10060 Acesso à consulta com nutricionista </p>
                        <p class="primeiro-plano-conteudo-par">
                            &#10060 Acesso à biopedancia </p>
                        <p class="primeiro-plano-conteudo-par">
                            &#10060 Acesso à endocrinologista </p>
                        <p class="primeiro-plano-conteudo-par">
                            &#10060 Acesso à Personal Trainer 
                        </p>

                        <button class="assinar-plano1"> ASSINAR</button>
                    </div>

                    <div class="primeiro-plano-conteudo">
                        <h2 class="primeiro-plano-conteudo-titulo"> SEMESTRAL R$ 64,00/MÊS</h2>
                        <p class="primeiro-plano-conteudo-par">
                            &#9989 Acesso à aulas de musculação </p>
                        <p class="primeiro-plano-conteudo-par">
                            &#9989 Acesso à planilha de treinos </p>
                        <p class="primeiro-plano-conteudo-par">
                            &#9989 Acesso à avaliação física </p>
                        <p class="primeiro-plano-conteudo-par">
                            &#10060 Acesso à consulta com nutricionista </p>
                        <p class="primeiro-plano-conteudo-par">
                            &#10060 Acesso à biopedancia </p>
                        <p class="primeiro-plano-conteudo-par">
                            &#10060 Acesso à endocrinologista </p>
                        <p class="primeiro-plano-conteudo-par">
                            &#10060 Acesso à Personal Trainer 
                        </p>
                        <button class="assinar-plano1"> ASSINAR</button>
                    </div>
                </div>
                

                <h1 class="segundo-plano-titulo">MASTER</h1>
                <div class="segundo-plano">
                    <div class="segundo-plano-conteudo">
                            <h2 class="segundo-plano-conteudo-titulo">MENSAL R$ 80,00</h2>
                            <p class="segundo-plano-conteudo-par">
                                &#9989 Acesso à aulas de musculação </p>
                            <p class="segundo-plano-conteudo-par">
                                &#9989 Acesso à planilha de treinos </p>
                            <p class="segundo-plano-conteudo-par">
                                &#9989 Acesso à avaliação física </p>
                            <p class="segundo-plano-conteudo-par">
                                &#9989 Acesso à consulta com nutricionista </p>
                            <p class="segundo-plano-conteudo-par">
                                &#10060 Acesso à biopedancia </p>
                            <p class="segundo-plano-conteudo-par">
                                &#10060 Acesso à endocrinologista </p>
                            <p class="segundo-plano-conteudo-par">
                                &#10060 Acesso à Personal Trainer 
                            </p>
                        <button class="assinar-plano2"> ASSINAR</button>
                    </div>

                    <div class="segundo-plano-conteudo">
                        <h2 class="segundo-plano-conteudo-titulo"> TRIMESTRAL R$ 72,00/MÊS</h2>
                        <p class="segundo-plano-conteudo-par">
                            &#9989 Acesso à aulas de musculação </p>
                        <p class="segundo-plano-conteudo-par">
                            &#9989 Acesso à planilha de treinos </p>
                        <p class="segundo-plano-conteudo-par">
                            &#9989 Acesso à avaliação física </p>
                        <p class="segundo-plano-conteudo-par">
                            &#9989 Acesso à consulta com nutricionista </p>
                        <p class="segundo-plano-conteudo-par">
                            &#10060 Acesso à biopedancia </p>
                        <p class="segundo-plano-conteudo-par">
                            &#10060 Acesso à endocrinologista </p>
                        <p class="segundo-plano-conteudo-par">
                            &#10060 Acesso à Personal Trainer 
                        </p>

                        <button class="assinar-plano2"> ASSINAR</button>
                    </div>

                    <div class="segundo-plano-conteudo">
                        <h2 class="segundo-plano-conteudo-titulo"> SEMESTRAL R$ 64,00/MÊS</h2>
                        <p class="segundo-plano-conteudo-par">
                            &#9989 Acesso à aulas de musculação </p>
                        <p class="segundo-plano-conteudo-par">
                            &#9989 Acesso à planilha de treinos </p>
                        <p class="segundo-plano-conteudo-par">
                            &#9989 Acesso à avaliação física </p>
                        <p class="segundo-plano-conteudo-par">
                            &#9989 Acesso à consulta com nutricionista </p>
                        <p class="segundo-plano-conteudo-par">
                            &#10060 Acesso à biopedancia </p>
                        <p class="segundo-plano-conteudo-par">
                            &#10060 Acesso à endocrinologista </p>
                        <p class="segundo-plano-conteudo-par">
                            &#10060 Acesso à Personal Trainer 
                        </p>
                        <button class="assinar-plano2"> ASSINAR</button>
                    </div>
                </div>

                <h1 class="terceiro-plano-titulo">PREMIUM</h1>
                <div class="terceiro-plano">
                    <div class="terceiro-plano-conteudo">
                            <h2 class="terceiro-plano-conteudo-titulo">MENSAL R$ 80,00</h2>
                            <p class="terceiro-plano-conteudo-par">
                                &#9989 Acesso à aulas de musculação </p>
                            <p class="terceiro-plano-conteudo-par">
                                &#9989 Acesso à planilha de treinos </p>
                            <p class="terceiro-plano-conteudo-par">
                                &#9989 Acesso à avaliação física </p>
                            <p class="terceiro-plano-conteudo-par">
                                &#9989 Acesso à consulta com nutricionista </p>
                            <p class="terceiro-plano-conteudo-par">
                                &#9989 Acesso à biopedancia </p>
                            <p class="terceiro-plano-conteudo-par">
                                &#9989 Acesso à endocrinologista </p>
                            <p class="terceiro-plano-conteudo-par">
                                &#9989 Acesso à Personal Trainer 
                            </p>
                        <button class="assinar-plano3"> ASSINAR</button>
                    </div>

                    <div class="terceiro-plano-conteudo">
                        <h2 class="terceiro-plano-conteudo-titulo"> TRIMESTRAL R$ 72,00/MÊS</h2>
                        <p class="terceiro-plano-conteudo-par">
                            &#9989 Acesso à aulas de musculação </p>
                        <p class="terceiro-plano-conteudo-par">
                            &#9989 Acesso à planilha de treinos </p>
                        <p class="terceiro-plano-conteudo-par">
                            &#9989 Acesso à avaliação física </p>
                        <p class="terceiro-plano-conteudo-par">
                            &#9989 Acesso à consulta com nutricionista </p>
                        <p class="terceiro-plano-conteudo-par">
                            &#9989 Acesso à biopedancia </p>
                        <p class="terceiro-plano-conteudo-par">
                            &#9989 Acesso à endocrinologista </p>
                        <p class="terceiro-plano-conteudo-par">
                            &#9989 Acesso à Personal Trainer 
                        </p>

                        <button class="assinar-plano3"> ASSINAR</button>
                    </div>

                    <div class="terceiro-plano-conteudo">
                        <h2 class="terceiro-plano-conteudo-titulo"> SEMESTRAL R$ 64,00/MÊS</h2>
                        <p class="terceiro-plano-conteudo-par">
                            &#9989 Acesso à aulas de musculação </p>
                        <p class="terceiro-plano-conteudo-par">
                            &#9989 Acesso à planilha de treinos </p>
                        <p class="terceiro-plano-conteudo-par">
                            &#9989 Acesso à avaliação física </p>
                        <p class="terceiro-plano-conteudo-par">
                            &#9989 Acesso à consulta com nutricionista </p>
                        <p class="terceiro-plano-conteudo-par">
                            &#9989 Acesso à biopedancia </p>
                        <p class="terceiro-plano-conteudo-par">
                            &#9989 Acesso à endocrinologista </p>
                        <p class="terceiro-plano-conteudo-par">
                            &#9989 Acesso à Personal Trainer 
                        </p>
                        <button class="assinar-plano3"> ASSINAR</button>
                    </div>
                </div>

            </section>
                
            <section class="conteudo-quarto">
                <img class="conteudo-quarto-imagem"  src="../../images/imagem-quarta.png">
                <div class="conteudo-quarto-escrito">
                    <h1 class="conteudo-quarto-escrito-titulo">
                        QUEM SOMOS?
                    </h1>
                    <p class="conteudo-quarto-escrito-paragrafo">
                        Neste ambicioso projeto da disciplina de Padrões de Projetos, os talentosos estudantes Mateus Braga, Diego Cardoso, Gislany Dias e Wesley Wilson do curso de Engenharia de Computação do IFPB uniram forças. Sob a orientação do dedicado Professor Katyusko, eles criaram um Sistema de Gestão de Academia inovador. Combinando criatividade e técnica, o projeto busca otimizar a administração de academias utilizando princípios de padrões de projetos. A equipe, motivada pelo desejo de aplicar aprendizados teóricos na prática, construiu uma solução promissora que representa a interseção entre conhecimento acadêmico e desafios do mundo real.
                    </p>
                </div>
            </section>

            <section class="conteudo-quinto">
                <h1 class="conteudo-quinto-titulo"> DESENVOLVEDORES </h1>
                <div class="conteudo-quinto-subconteudo">
                    <div class="conteudo-quinto-box">
                        <div class="conteudo-quinto-perfil">
                            { <img src="https://avatars.githubusercontent.com/u/90847079?v=4" alt=""> }
                            <p>DIEGO CARDOSO</p>
                            <div class="conteudo-quinto-icons">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M6 9H2V21H6V9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                
                                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 19.7669V16.1729C15.1391 15.0473 14.7799 13.9178 14 13.0281C17 13.0281 20 11.2311 20 8.08637C20.08 6.96325 19.73 5.85809 19 4.94162C19.28 3.90835 19.28 2.83015 19 1.79688C19 1.79688 18 1.79688 16 3.14462C13.36 2.69537 10.64 2.69537 7.99998 3.14462C5.99998 1.79688 4.99998 1.79688 4.99998 1.79688C4.69998 2.83015 4.69998 3.90835 4.99998 4.94162C4.27185 5.8544 3.91845 6.96575 3.99998 8.08637C3.99998 11.2311 6.99998 13.0281 9.99998 13.0281C9.60998 13.4684 9.31998 13.9715 9.14998 14.5106C8.97998 15.0497 8.92998 15.6158 8.99998 16.1729V19.7669" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M9 16.173C4.49 17.97 4 14.376 2 14.376" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                            </div>
                        </div>

                        <div class="conteudo-quinto-perfil">
                            { <img src="https://avatars.githubusercontent.com/u/90069931?v=4" alt=""> }
                            <p>GISLANY DIAS</p>
                            <div class="conteudo-quinto-icons">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M6 9H2V21H6V9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                
                                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 19.7669V16.1729C15.1391 15.0473 14.7799 13.9178 14 13.0281C17 13.0281 20 11.2311 20 8.08637C20.08 6.96325 19.73 5.85809 19 4.94162C19.28 3.90835 19.28 2.83015 19 1.79688C19 1.79688 18 1.79688 16 3.14462C13.36 2.69537 10.64 2.69537 7.99998 3.14462C5.99998 1.79688 4.99998 1.79688 4.99998 1.79688C4.69998 2.83015 4.69998 3.90835 4.99998 4.94162C4.27185 5.8544 3.91845 6.96575 3.99998 8.08637C3.99998 11.2311 6.99998 13.0281 9.99998 13.0281C9.60998 13.4684 9.31998 13.9715 9.14998 14.5106C8.97998 15.0497 8.92998 15.6158 8.99998 16.1729V19.7669" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M9 16.173C4.49 17.97 4 14.376 2 14.376" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>


                        <div class="conteudo-quinto-perfil">
                            { <img src="https://avatars.githubusercontent.com/u/93921419?v=4" alt="">}
                            <p>MATEUS BRAGA</p>
                            <div class="conteudo-quinto-icons">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M6 9H2V21H6V9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                
                                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 19.7669V16.1729C15.1391 15.0473 14.7799 13.9178 14 13.0281C17 13.0281 20 11.2311 20 8.08637C20.08 6.96325 19.73 5.85809 19 4.94162C19.28 3.90835 19.28 2.83015 19 1.79688C19 1.79688 18 1.79688 16 3.14462C13.36 2.69537 10.64 2.69537 7.99998 3.14462C5.99998 1.79688 4.99998 1.79688 4.99998 1.79688C4.69998 2.83015 4.69998 3.90835 4.99998 4.94162C4.27185 5.8544 3.91845 6.96575 3.99998 8.08637C3.99998 11.2311 6.99998 13.0281 9.99998 13.0281C9.60998 13.4684 9.31998 13.9715 9.14998 14.5106C8.97998 15.0497 8.92998 15.6158 8.99998 16.1729V19.7669" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M9 16.173C4.49 17.97 4 14.376 2 14.376" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>

                        <div class="conteudo-quinto-perfil">
                            { <img src="https://avatars.githubusercontent.com/u/97174573?v=4" alt=""> }
                            <p>WESLEY WILSON</p>
                            <div class="conteudo-quinto-icons">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M6 9H2V21H6V9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                
                                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 19.7669V16.1729C15.1391 15.0473 14.7799 13.9178 14 13.0281C17 13.0281 20 11.2311 20 8.08637C20.08 6.96325 19.73 5.85809 19 4.94162C19.28 3.90835 19.28 2.83015 19 1.79688C19 1.79688 18 1.79688 16 3.14462C13.36 2.69537 10.64 2.69537 7.99998 3.14462C5.99998 1.79688 4.99998 1.79688 4.99998 1.79688C4.69998 2.83015 4.69998 3.90835 4.99998 4.94162C4.27185 5.8544 3.91845 6.96575 3.99998 8.08637C3.99998 11.2311 6.99998 13.0281 9.99998 13.0281C9.60998 13.4684 9.31998 13.9715 9.14998 14.5106C8.97998 15.0497 8.92998 15.6158 8.99998 16.1729V19.7669" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M9 16.173C4.49 17.97 4 14.376 2 14.376" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <button class="conteudo-quinto-botao">VER NO GITHUB</button>
                </div>
            </section>
        </main>

        <footer class="rodape">
            <p> GymPro© Todos direitos reservados</p>
        </footer>

    </body>

    )
    */
}
