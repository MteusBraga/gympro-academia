import { useEffect, useState } from 'react';
import axios from 'axios';
import style from "@/styles/home.module.css";
import Image from 'next/image'

export default function Home() {
    return (
        <div className={style.body + ' mt-[-22px]'}>
            <header className={style.cabecalho + ' mb-[70px]'}>
                <a className={style.cabecalhoIcon + ' cursor-pointer'}> GYMPRO </a>

                <nav className={style.cabecalhoMenu}>
                    <a className={style.cabecalhoMenuItem} href=""> MODALIDADES</a>
                    <a className={style.cabecalhoMenuItem} href="" > PLANOS</a>
                    <a className={style.cabecalhoMenuItem} href="" > SOBRE</a>
                    <a className={style.cabecalhoMenuItem} href="" > LOGIN </a>
                </nav>

            </header>

            <main className={style.conteudo}>
                <section className={style.conteudoPrincipal + ' w-3/5'}>
                    <div className={style.conteudoPrincipalEscrito}>
                        <h1 className={style.conteudoPrincipalEscritoTitulo}>TRANSFORME SEU CORPO, ELEVE SUA MENTE</h1>
                        <h2 className={style.conteudoPrincipalEscritoSubtitulo}>Descubra o poder da transformação pessoal em nossa academia. Seu caminho para uma versão mais forte e saudável começa aqui.</h2>
                        <div className={style.conteudoPrincipalBotao}>
                            <button className={style.conteudoPrincipalEscritoBotaoCad + ' hover:bg-transparent duration-300 hover:text-white hover:scale-110 hover:border-white hover:border-solid hover:border-2'}>CADASTRE-SE</button>
                            <button className={style.conteudoPrincipalEscritoBotaoLog + ' hover:bg-[#CEF2F2] duration-300 hover:text-[#400500] hover:scale-110 '}>JÁ SOU MEMBRO</button>
                        </div>

                    </div>
                    <Image className={style.conteudoPrincipalImagem} src="/imagem-principal.png" width={1050} height={500} alt="Imagem Principal" />

                </section>

                <section className={style.conteudoSecundario}>
                    <div className={style.conteudoSecundarioIcon}>
                        <img className='hover:scale-125 cursor-pointer duration-300' src="/icon-tiktok.svg" alt="Icone do tiktok" />
                        <img className='hover:scale-125 cursor-pointer duration-300' src="/icon-insta.svg" alt="Icone do Instagram" />
                        <img className='hover:scale-125 cursor-pointer duration-300' src="/icon-wpp.svg" alt="Icone do Whatsapp" />
                    </div>
                </section>

                <section className={style.conteudoTerceiro}>
                    <div className={style.conteudoTerceiroEscrito}>
                        <h1 className={style.conteudoTerceiroEscritoTitulo}>NOSSOS PLANOS</h1>
                    </div>

                    <h1 className={style.primeiroPlanoTitulo}>BASIC</h1>
                    <div className={style.primeiroPlano}>
                        <div className={style.primeiroPlanoConteudo}>
                            <h2 className={style.primeiroPlanoConteudoTitulo}>MENSAL R$ 80,00</h2>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'}>
                                 <svg xmlns="http://www.w3.org/2000/svg"color='green'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à aulas de musculação
                            </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à planilha de treinos
                            </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à avaliação física
                            </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg" color='red' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à consulta com nutricionista
                            </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg" color='red' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à biopedancia
                            </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg" color='red' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à endocrinologista
                            </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg" color='red' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à Personal Trainer
                            </p>
                            <button className={style.assinarPlano1 + ''}> ASSINAR</button>
                        </div>

                        <div className={style.primeiroPlanoConteudo}>
                            <h2 className={style.primeiroPlanoConteudoTitulo}> TRIMESTRAL R$ 72,00/MÊS</h2>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à aulas de musculação </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à planilha de treinos </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à avaliação física </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg" color='red' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à consulta com nutricionista </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg" color='red' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à biopedancia </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg" color='red' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à endocrinologista </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg" color='red' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à Personal Trainer
                            </p>

                            <button className={style.assinarPlano1 + ''}> ASSINAR</button>
                        </div>

                        <div className={style.primeiroPlanoConteudo}>
                            <h2 className={style.primeiroPlanoConteudoTitulo}> SEMESTRAL R$ 64,00/MÊS</h2>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à aulas de musculação </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à planilha de treinos </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à avaliação física </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg" color='red' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à consulta com nutricionista </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg" color='red' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à biopedancia </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg" color='red' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à endocrinologista </p>
                            <p className={style.primeiroPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg" color='red' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à Personal Trainer
                            </p>
                            <button className={style.assinarPlano1 + ''}> ASSINAR</button>
                        </div>
                    </div>


                    <h1 className={style.segundoPlanoTitulo}>MASTER</h1>
                    <div className={style.segundoPlano}>
                        <div className={style.segundoPlanoConteudo}>
                            <h2 className={style.segundoPlanoConteudoTitulo}>MENSAL R$ 80,00</h2>
                            <p className={style.segundoPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg"color='green'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à aulas de musculação </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg"color='green'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à planilha de treinos </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg"color='green'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à avaliação física </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg"color='green'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à consulta com nutricionista </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg"color='red'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à biopedancia </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg"color='red'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à endocrinologista </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg"color='red'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à Personal Trainer
                            </p>
                            <button className={style.assinarPlano2 + ''}> ASSINAR</button>
                        </div>

                        <div className={style.segundoPlanoConteudo}>
                            <h2 className={style.segundoPlanoConteudoTitulo}> TRIMESTRAL R$ 72,00/MÊS</h2>
                            <p className={style.segundoPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg"color='green'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à aulas de musculação </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg"color='green'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à planilha de treinos </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg"color='green'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à avaliação física </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg"color='green'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à consulta com nutricionista </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg"color='red'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à biopedancia </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg"color='red'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à endocrinologista </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg"color='red'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à Personal Trainer
                            </p>

                            <button className={style.assinarPlano2 + ''}> ASSINAR</button>
                        </div>

                        <div className={style.segundoPlanoConteudo}>
                            <h2 className={style.segundoPlanoConteudoTitulo}> SEMESTRAL R$ 64,00/MÊS</h2>
                            <p className={style.segundoPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg"color='green'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à aulas de musculação </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg"color='green'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à planilha de treinos </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg"color='green'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à avaliação física </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg"color='green'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à consulta com nutricionista </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg"color='red'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à biopedancia </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg"color='red'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à endocrinologista </p>
                            <p className={style.segundoPlanoConteudoPar + ' flex'} >
                                <svg xmlns="http://www.w3.org/2000/svg"color='red'  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Acesso à Personal Trainer
                            </p>
                            <button className={style.assinarPlano2 + ''}> ASSINAR</button>
                        </div>
                    </div>

                    <h1 className={style.terceiroPlanoTitulo}>PREMIUM</h1>
                    <div className={style.terceiroPlano}>
                        <div className={style.terceiroPlanoConteudo}>
                            <h2 className={style.terceiroPlanoConteudoTitulo}>MENSAL R$ 80,00</h2>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à aulas de musculação </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à planilha de treinos </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à avaliação física </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à consulta com nutricionista </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à biopedancia </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à endocrinologista </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à Personal Trainer
                            </p>
                            <button className={style.assinarPlano3 + ''}> ASSINAR</button>
                        </div>

                        <div className={style.terceiroPlanoConteudo}>
                            <h2 className={style.terceiroPlanoConteudoTitulo}> TRIMESTRAL R$ 72,00/MÊS</h2>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à aulas de musculação </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à planilha de treinos </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à avaliação física </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à consulta com nutricionista </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à biopedancia </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à endocrinologista </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à Personal Trainer
                            </p>

                            <button className={style.assinarPlano3 + ''}> ASSINAR</button>
                        </div>

                        <div className={style.terceiroPlanoConteudo}>
                            <h2 className={style.terceiroPlanoConteudoTitulo}> SEMESTRAL R$ 64,00/MÊS</h2>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à aulas de musculação </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à planilha de treinos </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à avaliação física </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à consulta com nutricionista </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à biopedancia </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à endocrinologista </p>
                            <p className={style.terceiroPlanoConteudoPar + ' flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" color='green' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Acesso à Personal Trainer
                            </p>
                            <button className={style.assinarPlano3 + ''}> ASSINAR</button>
                        </div>
                    </div>

                </section>

                <section className={style.conteudoQuarto}>
                    <img className={style.conteudoQuartoImagem} src="/imagem-quarta.png" />
                    <div className={style.conteudoQuartoEscrito}>
                        <h1 className={style.conteudoQuartoEscritoTitulo}>
                            QUEM SOMOS?
                        </h1>
                        <p className={style.conteudoQuartoEscritoParagrafo}>
                            Neste ambicioso projeto da disciplina de Padrões de Projetos, os talentosos estudantes Mateus Braga, Diego Cardoso, Gislany Dias e Wesley Wilson do curso de Engenharia de Computação do IFPB uniram forças. Sob a orientação do dedicado Professor Katyusko, eles criaram um Sistema de Gestão de Academia inovador. Combinando criatividade e técnica, o projeto busca otimizar a administração de academias utilizando princípios de padrões de projetos. A equipe, motivada pelo desejo de aplicar aprendizados teóricos na prática, construiu uma solução promissora que representa a interseção entre conhecimento acadêmico e desafios do mundo real.
                        </p>
                    </div>
                </section>

                <section className={style.conteudoQuinto}>
                    <h1 className={style.conteudoQuintoTitulo}> DESENVOLVEDORES </h1>
                    <div className={style.conteudoQuintoSubconteudo}>
                        <div className={style.conteudoQuintoBox}>
                            <div className={style.conteudoQuintoPerfil}>
                                <img src="https://avatars.githubusercontent.com/u/90847079?v=4" alt="" />
                                <p>DIEGO CARDOSO</p>
                                <div className={style.conteudoQuintoIcons+ ' flex gap-[10px] cursor-pointer'}>
                                
                                        <svg  className='hover:scale-125 duration-300' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M6 9H2V21H6V9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    

                                    <a href="https://github.com/diegoCBorba">
                                        <svg  className='hover:scale-125 duration-300' width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 19.7669V16.1729C15.1391 15.0473 14.7799 13.9178 14 13.0281C17 13.0281 20 11.2311 20 8.08637C20.08 6.96325 19.73 5.85809 19 4.94162C19.28 3.90835 19.28 2.83015 19 1.79688C19 1.79688 18 1.79688 16 3.14462C13.36 2.69537 10.64 2.69537 7.99998 3.14462C5.99998 1.79688 4.99998 1.79688 4.99998 1.79688C4.69998 2.83015 4.69998 3.90835 4.99998 4.94162C4.27185 5.8544 3.91845 6.96575 3.99998 8.08637C3.99998 11.2311 6.99998 13.0281 9.99998 13.0281C9.60998 13.4684 9.31998 13.9715 9.14998 14.5106C8.97998 15.0497 8.92998 15.6158 8.99998 16.1729V19.7669" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9 16.173C4.49 17.97 4 14.376 2 14.376" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </a>

                                </div>
                            </div>

                            <div className={style.conteudoQuintoPerfil}>
                                <img src="https://avatars.githubusercontent.com/u/90069931?v=4" alt="" />
                                <p>GISLANY DIAS</p>
                                <div className={style.conteudoQuintoIcons+ ' flex gap-[10px] cursor-pointer'}>
                                        <svg  className='hover:scale-125 duration-300' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M6 9H2V21H6V9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    <a href="https://github.com/GislanyDias">
                                        <svg  className='hover:scale-125 duration-300' width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 19.7669V16.1729C15.1391 15.0473 14.7799 13.9178 14 13.0281C17 13.0281 20 11.2311 20 8.08637C20.08 6.96325 19.73 5.85809 19 4.94162C19.28 3.90835 19.28 2.83015 19 1.79688C19 1.79688 18 1.79688 16 3.14462C13.36 2.69537 10.64 2.69537 7.99998 3.14462C5.99998 1.79688 4.99998 1.79688 4.99998 1.79688C4.69998 2.83015 4.69998 3.90835 4.99998 4.94162C4.27185 5.8544 3.91845 6.96575 3.99998 8.08637C3.99998 11.2311 6.99998 13.0281 9.99998 13.0281C9.60998 13.4684 9.31998 13.9715 9.14998 14.5106C8.97998 15.0497 8.92998 15.6158 8.99998 16.1729V19.7669" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9 16.173C4.49 17.97 4 14.376 2 14.376" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>


                            <div className={style.conteudoQuintoPerfil}>
                                <img src="https://avatars.githubusercontent.com/u/93921419?v=4" alt="" />
                                <p>MATEUS BRAGA</p>
                                    <div className={style.conteudoQuintoIcons+ ' flex gap-[10px] cursor-pointer'}>
                                        <a href="https://github.com/mateusbrga">
                                            <svg  className='hover:scale-125 duration-300' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M6 9H2V21H6V9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </a>

                                    <svg  className='hover:scale-125 duration-300' width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 19.7669V16.1729C15.1391 15.0473 14.7799 13.9178 14 13.0281C17 13.0281 20 11.2311 20 8.08637C20.08 6.96325 19.73 5.85809 19 4.94162C19.28 3.90835 19.28 2.83015 19 1.79688C19 1.79688 18 1.79688 16 3.14462C13.36 2.69537 10.64 2.69537 7.99998 3.14462C5.99998 1.79688 4.99998 1.79688 4.99998 1.79688C4.69998 2.83015 4.69998 3.90835 4.99998 4.94162C4.27185 5.8544 3.91845 6.96575 3.99998 8.08637C3.99998 11.2311 6.99998 13.0281 9.99998 13.0281C9.60998 13.4684 9.31998 13.9715 9.14998 14.5106C8.97998 15.0497 8.92998 15.6158 8.99998 16.1729V19.7669" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9 16.173C4.49 17.97 4 14.376 2 14.376" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className={style.conteudoQuintoPerfil}>
                                <img src="https://avatars.githubusercontent.com/u/97174573?v=4" alt="" />
                                <p>WESLEY WILSON</p>
                                <div className={style.conteudoQuintoIcons + ' flex gap-[10px] cursor-pointer'}>
                                        <svg  className='hover:scale-125 duration-300' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M6 9H2V21H6V9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    <a href="https://github.com/wesley1wilson">
                                        <svg  className='hover:scale-125 duration-300' width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 19.7669V16.1729C15.1391 15.0473 14.7799 13.9178 14 13.0281C17 13.0281 20 11.2311 20 8.08637C20.08 6.96325 19.73 5.85809 19 4.94162C19.28 3.90835 19.28 2.83015 19 1.79688C19 1.79688 18 1.79688 16 3.14462C13.36 2.69537 10.64 2.69537 7.99998 3.14462C5.99998 1.79688 4.99998 1.79688 4.99998 1.79688C4.69998 2.83015 4.69998 3.90835 4.99998 4.94162C4.27185 5.8544 3.91845 6.96575 3.99998 8.08637C3.99998 11.2311 6.99998 13.0281 9.99998 13.0281C9.60998 13.4684 9.31998 13.9715 9.14998 14.5106C8.97998 15.0497 8.92998 15.6158 8.99998 16.1729V19.7669" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9 16.173C4.49 17.97 4 14.376 2 14.376" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <a href="https://github.com/mateusbrga/gympro-academia">
                            <button className={style.conteudoQuintoBotao + ' hover:bg-transparent duration-300 hover:text-white hover:scale-110 hover:border-white hover:border-solid hover:border-2'} >
                                VER NO GITHUB
                            </button>
                        </a>
                    </div>
                </section>
            </main>

            <footer className={style.rodape}>
                <p> GymPro© Todos direitos reservados</p>
            </footer>

        </div >

    )

}
