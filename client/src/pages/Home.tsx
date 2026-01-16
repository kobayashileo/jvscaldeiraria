import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowRight, Zap, Shield, Leaf, Cog, X } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Landing Page - JVS Caldeiraria
 * Design: Contemporary Tech / Futurismo Acessível
 * Tipografia: Clash Display (títulos) + Poppins (subtítulos) + Inter (corpo)
 * Cores: Gradiente azul petróleo → navy, acentos turquesa
 */

// Número de WhatsApp para contato
const WHATSAPP_NUMBER = "5511980493204";
const WHATSAPP_MENSAGEM_ORCAMENTO = "Olá! Gostaria de solicitar um orçamento para os produtos JVS Caldeiraria.";
const WHATSAPP_MENSAGEM_CONTATO = "Olá! Gostaria de entrar em contato com a JVS Caldeiraria.";

// Função para abrir WhatsApp
const abrirWhatsApp = (mensagem: string) => {
  const mensagemCodificada = encodeURIComponent(mensagem);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemCodificada}`, "_blank");
};

// Dados dos produtos com especificações
const produtos = [
  {
    id: "canva",
    nome: "JVS Canva",
    descricao: "Tecido industrial de alta resistência com dupla face laranja/preto",
    imagem: "/images/product-canva.png",
    especificacoes: [
      { label: "Gramatura", valor: "450gr/m²" },
      { label: "Espessura", valor: "0,35mm" },
      { label: "Tipo do Tecido", valor: "550 3x3" },
      { label: "Resistência ao Rasgo", valor: "25 kgf" },
      { label: "Resistência à Tração", valor: "95 kgf" },
      { label: "Adesão entre Camadas", valor: "3 kgf/cm" },
      { label: "Resistência Térmica", valor: "70°C" },
      { label: "Opacidade", valor: "Opaco" },
      { label: "Cor Dupla Face", valor: "Laranja/Preto" },
      { label: "Autoextinguível", valor: "Sim" },
      { label: "Anti-Chama", valor: "Sim" },
    ],
    destaques: [
      { icon: Shield, texto: "Resistência ao rasgo: 25 kgf" },
      { icon: Zap, texto: "Anti-chama e autoextinguível" },
      { icon: Cog, texto: "Gramatura: 450gr/m²" },
    ],
  },
  {
    id: "fiber",
    nome: "JVS Fiber",
    descricao: "Placa cimentícia com fibra de vidro para construção seca",
    imagem: "/images/product-fiber.png",
    especificacoes: [
      { label: "Temperatura Máxima", valor: "800°C" },
      { label: "Espessura", valor: "5 a 35mm" },
      { label: "Densidade", valor: "1,8 g/cm³" },
      { label: "Resistência a Compressão", valor: "22 MPa" },
      { label: "Resistência a Flexão", valor: "1,2 MPa" },
      { label: "Condutividade Térmica", valor: "0,249 W/m*K" },
    ],
    destaques: [
      { icon: Shield, texto: "Temperatura máxima: 800°C" },
      { icon: Leaf, texto: "Isolamento térmico e acústico" },
      { icon: Cog, texto: "Espessura: 5 a 35mm" },
    ],
  },
  {
    id: "resin",
    nome: "JVS Resin",
    descricao: "Composite de resina de alta performance e durabilidade",
    imagem: "/images/product-resin.png",
    especificacoes: [
      { label: "Peso Específico", valor: "1,7 - 2,0 g/cm³" },
      { label: "Absorção de Água", valor: "<0,2%" },
      { label: "Resistência à Flexão 23°C", valor: "400 N/mm²" },
      { label: "Resistência à Flexão 150°C", valor: "175 N/mm²" },
      { label: "Resistência à Tração", valor: "300 N/mm²" },
      { label: "Resistência à Compressão Perpendicular", valor: "500 N/mm²" },
      { label: "Temperatura Limite", valor: "280°C" },
      { label: "Classe Térmica", valor: "Classe H" },
    ],
    destaques: [
      { icon: Shield, texto: "Resistência à flexão: 400 N/mm²" },
      { icon: Zap, texto: "Temperatura limite: 280°C" },
      { icon: Cog, texto: "Absorção de água: <0,2%" },
    ],
  },
  {
    id: "power",
    nome: "JVS Power",
    descricao: "Placa celeron para aplicações mecânicas e elétricas",
    imagem: "/images/product-power.png",
    especificacoes: [
      { label: "Peso Específico", valor: "1,3 g/cm³" },
      { label: "Coeficiente de Atrito Normal", valor: "0,22" },
      { label: "Coeficiente de Atrito Grafitado", valor: "0,07" },
      { label: "Resistência à Temperatura Contínua", valor: "130°C" },
      { label: "Resistência à Temperatura Máxima", valor: "150°C" },
      { label: "Resistência à Compressão", valor: "255 MPa" },
      { label: "Resistência à Flexão", valor: "110 MPa" },
      { label: "Absorção de Água", valor: "1,60%" },
      { label: "Altura e Largura", valor: "1000x1000 mm" },
      { label: "Espessura", valor: "0,8 a 60 mm" },
    ],
    destaques: [
      { icon: Zap, texto: "Isolante de baixa tensão" },
      { icon: Shield, texto: "Resistência à compressão: 255 MPa" },
      { icon: Cog, texto: "Alta usinabilidade" },
    ],
  },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openModal, setOpenModal] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const produtoSelecionado = produtos.find((p) => p.id === openModal);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <img src="/images/logo-jvs.png" alt="JVS Logo" className="h-12 w-auto" />
            <span className="hidden sm:inline font-semibold text-lg">
              Caldeiraria
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#produtos"
              className="text-sm hover:text-accent transition-colors"
            >
              Produtos
            </a>
            <a
              href="#empresa"
              className="text-sm hover:text-accent transition-colors"
            >
              Empresa
            </a>
            <a
              href="#contato"
              className="text-sm hover:text-accent transition-colors"
            >
              Contato
            </a>
            <Button
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              size="sm"
              onClick={() => abrirWhatsApp(WHATSAPP_MENSAGEM_ORCAMENTO)}
            >
              Solicitar Orçamento
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-accent"
          >
            Menu
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-20 overflow-hidden">
        <div className="absolute inset-0 gradient-animated opacity-40" />

        {/* Background Image */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/images/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center py-32 md:py-48">
          <div className="fade-in-up max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Materiais e Máquinas que
              <span className="block bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                Sustentam seus Projetos
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Soluções completas em materiais industriais de alta performance.
              Qualidade, inovação e sustentabilidade em cada produto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 group"
                onClick={() => {
                  const produtosSection = document.getElementById("produtos");
                  produtosSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Saiba Mais
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
              <div className="w-1 h-2 bg-accent rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Produtos Section */}
      <section id="produtos" className="py-20 md:py-32 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nossos Produtos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Linha completa de materiais industriais desenvolvidos para
              performance e durabilidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="group bg-background rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-64 md:h-80 overflow-hidden bg-gradient-to-br from-teal-900 to-navy">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-2">{produto.nome}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {produto.descricao}
                  </p>
                  <ul className="space-y-2 text-sm mb-6">
                    {produto.destaques.map((destaque, idx) => {
                      const IconComponent = destaque.icon;
                      return (
                        <li key={idx} className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4" style={{ color: "oklch(0.85 0.005 65)" }} />
                          <span>{destaque.texto}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <Button
                    variant="ghost"
                    className="w-full gap-2 group/btn hover:bg-accent/10"
                    style={{ color: "oklch(0.705 0.015 286.067)" }}
                    onClick={() => setOpenModal(produto.id)}
                  >
                    Ver Especificações
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Especificações */}
      <Dialog open={!!openModal} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {produtoSelecionado && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{produtoSelecionado.nome}</DialogTitle>
                <DialogDescription>{produtoSelecionado.descricao}</DialogDescription>
              </DialogHeader>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Especificações Técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {produtoSelecionado.especificacoes.map((spec, idx) => (
                    <div key={idx} className="border border-border rounded-lg p-4">
                      <p className="text-sm" style={{ color: "oklch(0.705 0.015 286.067)" }}>{spec.label}</p>
                      <p className="text-lg font-semibold" style={{ color: "oklch(0.705 0.015 286.067)" }}>{spec.valor}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                  onClick={() => abrirWhatsApp(WHATSAPP_MENSAGEM_ORCAMENTO)}
                >
                  Solicitar Orçamento
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setOpenModal(null)}
                >
                  Fechar
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Empresa Section */}
      <section id="empresa" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Sobre a JVS Caldeiraria
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "oklch(0.705 0.015 286.067)" }}>
                    Missão
                  </h3>
                  <p className="text-muted-foreground">
                    Oferecer soluções completas em materiais e máquinas que
                    garantam segurança, qualidade e inspiração para cada
                    projeto.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "oklch(0.705 0.015 286.067)" }}>
                    Visão
                  </h3>
                  <p className="text-muted-foreground">
                    Ser referência nacional em materiais e máquinas para
                    empresas, reconhecida pela confiança, inovação e pela
                    capacidade de sustentar projetos que transformam vidas e
                    uma nação.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "oklch(0.705 0.015 286.067)" }}>
                    Valores
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "oklch(0.705 0.015 286.067)" }} />
                      <span>
                        Compromisso com qualidade e desempenho superior
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Leaf className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "oklch(0.705 0.015 286.067)" }} />
                      <span>
                        Sustentabilidade e responsabilidade ambiental
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Zap className="w-5 h-5flex-shrink-0 mt-0.5" style={{ color: "oklch(0.705 0.015 286.067)" }}/>
                      <span>Inovação contínua e excelência operacional</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-900/20 to-navy/20 rounded-xl p-8 border border-accent/20">
              <h3 className="text-2xl font-bold mb-6">Por que escolher JVS?</h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 " style={{ color: "oklch(0.85 0.005 65)" }} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Qualidade Garantida</h4>
                    <p className="text-sm text-muted-foreground">
                      Materiais de alto desempenho com durabilidade comprovada
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6" style={{ color: "oklch(0.85 0.005 65)" }} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Inovação Contínua</h4>
                    <p className="text-sm text-muted-foreground">
                      Investimento em novas tecnologias e processos
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6" style={{ color: "oklch(0.85 0.005 65)" }} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Sustentabilidade</h4>
                    <p className="text-sm text-muted-foreground">
                      Práticas responsáveis e uso consciente de recursos
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Cog className="w-6 h-6" style={{ color: "oklch(0.85 0.005 65)" }} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Suporte Técnico</h4>
                    <p className="text-sm text-muted-foreground">
                      Parceria estratégica com soluções personalizadas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contato" className="py-20 md:py-32 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para transformar seu projeto?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entre em contato conosco para conhecer nossas soluções e receber um
            orçamento personalizado
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 group"
              onClick={() => abrirWhatsApp(WHATSAPP_MENSAGEM_ORCAMENTO)}
            >
              Solicitar Orçamento
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/images/logo-jvs.png" alt="JVS Logo" className="h-10 w-auto" />
                <span className="font-semibold">Caldeiraria</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Materiais e máquinas que sustentam seus projetos
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    JVS Canva
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    JVS Fiber
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    JVS Resin
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    JVS Power
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Missão e Visão
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: comercial.jvs@outlook.com.br</li>
                <li>Telefone: (12) 99715-4168 ou  (11) 97108-7450</li>
                <li>Endereço: Rua Elias João Andraus Neto, n° 980- Una - Taubaté - SP</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2026 JVS Caldeiraria. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
