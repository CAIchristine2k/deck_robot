import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  TrendingDown,
  Users,
  RefreshCw,
  ShieldAlert,
  Activity,
  Sparkles,
  Cpu,
  CircuitBoard,
  Network,
  Globe2,
  Utensils,
  Repeat,
  Wallet,
  Database,
  Wrench,
  Megaphone,
  Target,
  ArrowRight,
} from 'lucide-react';
import { useLoading } from '../contexts/LoadingContext';

// Scroll-reveal wrapper
const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

// Page section wrapper
const Page = ({ id, eyebrow, children, className = '' }) => (
  <section
    id={id}
    className={`relative w-full px-6 sm:px-10 lg:px-[10%] py-24 lg:py-32 ${className}`}
  >
    <div className="max-w-6xl mx-auto">
      {eyebrow && (
        <Reveal>
          <div className="text-caption font-orbitron text-neon-blue/80 tracking-[0.3em] mb-6">
            {eyebrow}
          </div>
        </Reveal>
      )}
      {children}
    </div>
  </section>
);

// Small chip / tag
const Chip = ({ children }) => (
  <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-star-white text-sm font-montserrat">
    {children}
  </span>
);

// Feature card with icon
const IconCard = ({ icon: Icon, title, desc }) => (
  <div className="card card-hover h-full">
    {Icon && (
      <div className="w-11 h-11 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-neon-blue" />
      </div>
    )}
    <h3 className="text-lg font-bold font-orbitron text-star-white mb-2">{title}</h3>
    {desc && <p className="text-body text-gray-400 font-montserrat">{desc}</p>}
  </div>
);

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const { hasLoadingCompleted } = useLoading();

  useEffect(() => {
    if (hasLoadingCompleted) {
      const timer = setTimeout(() => setShowContent(true), 400);
      return () => clearTimeout(timer);
    }
  }, [hasLoadingCompleted]);

  return (
    <div
      className="min-h-screen force-ltr"
      style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.6s ease-in-out' }}
    >
      {/* ============ PAGE 1 — COVER ============ */}
      <section className="relative min-h-screen flex items-center px-6 sm:px-10 lg:px-[10%] pt-32 pb-20 overflow-hidden">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center">
                <Bot className="w-6 h-6 text-neon-blue" />
              </div>
              <span className="text-caption font-orbitron text-neon-blue tracking-[0.4em]">
                ROBOTIC
              </span>
            </div>

            <h1 className="text-heading-1 font-bold font-orbitron mb-6">
              <span className="gradient-text">The Autonomous Workforce</span>
            </h1>

            <p className="text-body-large text-gray-300 font-montserrat max-w-2xl mb-8">
              L'intelligence artificielle physique au service des entreprises.
            </p>

            <div className="flex flex-wrap gap-3">
              <Chip>Hospitality</Chip>
              <Chip>Retail</Chip>
              <Chip>Healthcare</Chip>
              <Chip>Logistics</Chip>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ PAGE 2 — THE BIG PROBLEM ============ */}
      <Page eyebrow="PAGE 2 — THE BIG PROBLEM">
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron text-star-white mb-4">
            The Global Labor Crisis
          </h2>
          <p className="text-body-large text-gray-300 font-montserrat mb-12">
            Le monde manque de travailleurs. Les entreprises font face à :
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {[
            { icon: TrendingDown, title: 'Hausse des coûts salariaux', desc: 'Une masse salariale en croissance continue.' },
            { icon: Users, title: "Pénurie de main-d'œuvre", desc: 'Recruter devient de plus en plus difficile.' },
            { icon: RefreshCw, title: 'Turnover massif', desc: 'Difficulté à fidéliser les équipes.' },
            { icon: ShieldAlert, title: 'Contraintes réglementaires', desc: 'Une pression réglementaire croissante.' },
            { icon: Activity, title: 'Baisse de productivité', desc: 'Un service parfois dégradé.' },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <IconCard {...item} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="card border-neon-blue/20">
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="w-5 h-5 text-neon-blue" />
              <h3 className="text-lg font-bold font-orbitron text-star-white">
                Dans la restauration
              </h3>
            </div>
            <ul className="space-y-2 text-gray-300 font-montserrat text-body">
              <li>• Plus de 30 à 40% du chiffre d'affaires part dans la masse salariale</li>
              <li>• Difficulté à recruter</li>
              <li>• Difficulté à fidéliser</li>
              <li>• Service parfois dégradé</li>
            </ul>
            <p className="text-body-large text-star-white font-montserrat mt-6">
              Le modèle économique actuel devient de moins en moins viable.
            </p>
          </div>
        </Reveal>
      </Page>

      {/* ============ PAGE 3 — WHY NOW ============ */}
      <Page eyebrow="PAGE 3 — WHY NOW">
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron text-star-white mb-4">
            The Perfect Storm
          </h2>
          <p className="text-body-large text-gray-300 font-montserrat mb-3">
            Pendant 20 ans, les robots n'étaient pas prêts.
          </p>
          <p className="text-body-large text-gray-300 font-montserrat mb-12">
            Aujourd'hui, trois révolutions convergent :
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Sparkles, title: 'IA Générative', desc: 'GPT, LLM, agents autonomes.' },
            { icon: Cpu, title: 'Robotique avancée', desc: 'Capteurs, moteurs, navigation.' },
            { icon: CircuitBoard, title: 'Réduction des coûts hardware', desc: 'Les composants deviennent accessibles.' },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <IconCard {...item} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="neon-border rounded-xl p-8 bg-white/5">
            <p className="text-caption font-orbitron text-neon-blue mb-2">
              Pour la première fois dans l'histoire
            </p>
            <p className="text-heading-3 font-bold font-orbitron text-star-white">
              Un employé robotique autonome devient économiquement rentable.
            </p>
          </div>
        </Reveal>
      </Page>

      {/* ============ PAGE 4 — THE SOLUTION ============ */}
      <Page eyebrow="PAGE 4 — THE SOLUTION">
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron mb-4">
            <span className="gradient-text">ROBOTIC AI WORKER</span>
          </h2>
          <p className="text-body-large text-gray-300 font-montserrat mb-12 max-w-3xl">
            Le premier employé robotique connecté à l'ensemble du système de l'entreprise.
          </p>
        </Reveal>

        <Reveal>
          <h3 className="text-lg font-bold font-orbitron text-star-white mb-4">Capabilités</h3>
          <div className="flex flex-wrap gap-3 mb-14">
            {['Accueil client', 'Service', 'Livraison', 'Nettoyage', 'CRM', 'Fidélisation', 'Vision IA', 'Supervision temps réel'].map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="card border-neon-blue/20">
            <div className="flex items-center gap-2 mb-4">
              <Network className="w-5 h-5 text-neon-blue" />
              <h3 className="text-lg font-bold font-orbitron text-star-white">Connected Workforce</h3>
            </div>
            <p className="text-gray-300 font-montserrat mb-4">
              Le robot ne travaille pas seul. Il est connecté à :
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {['Réservations', 'Paiements', 'CRM', 'Programme fidélité', 'Logiciel restaurant', 'Application mobile'].map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
            <p className="text-body-large text-star-white font-montserrat">
              Un robot devient un collaborateur numérique complet.
            </p>
          </div>
        </Reveal>
      </Page>

      {/* ============ PAGE 5 — MARKET OPPORTUNITY ============ */}
      <Page eyebrow="PAGE 5 — MARKET OPPORTUNITY">
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron text-star-white mb-4">
            A Trillion Dollar Shift
          </h2>
          <p className="text-body-large text-gray-300 font-montserrat mb-12 max-w-3xl">
            La robotisation des services est l'une des plus grandes transformations économiques du XXIe siècle.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            { tag: 'TAM', label: 'Robotique + IA + Services', value: '500 Md€+' },
            { tag: 'SAM', label: 'Hospitality Europe', value: '80 Md€+' },
            { tag: 'SOM', label: 'France', value: '175 000+ restaurants' },
          ].map((m, i) => (
            <Reveal key={m.tag} delay={i * 0.1}>
              <div className="card card-hover h-full">
                <div className="text-caption font-orbitron text-neon-blue tracking-[0.3em] mb-3">{m.tag}</div>
                <div className="text-2xl font-bold font-orbitron gradient-text mb-2">{m.value}</div>
                <p className="text-body text-gray-400 font-montserrat">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="text-lg font-bold font-orbitron text-star-white mb-4">Notre vision</h3>
          <p className="text-gray-300 font-montserrat mb-5">Commencer par la restauration. Puis :</p>
          <div className="flex flex-wrap gap-3">
            {['Hôtels', 'Retail', 'Santé', 'Aéroports', 'Centres commerciaux'].map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        </Reveal>
      </Page>

      {/* ============ PAGE 6 — BUSINESS MODEL ============ */}
      <Page eyebrow="PAGE 6 — BUSINESS MODEL">
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron text-star-white mb-6">
            Robot-as-a-Service
          </h2>
          <div className="space-y-1 text-body-large text-gray-300 font-montserrat mb-12">
            <p>Comme Salesforce a transformé le logiciel.</p>
            <p>Comme Tesla a transformé l'automobile.</p>
            <p className="text-star-white font-semibold">Nous transformons la main-d'œuvre.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <Reveal>
            <div className="card card-hover h-full">
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="w-5 h-5 text-neon-blue" />
                <h3 className="text-lg font-bold font-orbitron text-star-white">Leasing</h3>
              </div>
              <div className="text-2xl font-bold font-orbitron gradient-text mb-4">500 à 1 500 €/mois</div>
              <p className="text-gray-400 font-montserrat mb-3">Incluant :</p>
              <div className="flex flex-wrap gap-2">
                {['Robot', 'Maintenance', 'IA', 'Hébergement', 'Mises à jour'].map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card card-hover h-full">
              <div className="flex items-center gap-2 mb-3">
                <Repeat className="w-5 h-5 text-neon-blue" />
                <h3 className="text-lg font-bold font-orbitron text-star-white">Revenus SaaS</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['IA avancée', 'CRM', 'Analytics', 'Vision IA', 'Automatisation'].map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="neon-border rounded-xl p-8 bg-white/5">
            <p className="text-caption font-orbitron text-neon-blue mb-2">Vision long terme</p>
            <p className="text-heading-3 font-bold font-orbitron text-star-white">
              Créer le plus grand réseau mondial d'employés autonomes.
            </p>
          </div>
        </Reveal>
      </Page>

      {/* ============ PAGE 7 — TRACTION & MOAT ============ */}
      <Page eyebrow="PAGE 7 — TRACTION & MOAT">
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron text-star-white mb-12">
            Pourquoi nous allons gagner
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            { icon: Target, title: 'Accès marché', items: ['Réseau existant de restaurateurs', 'Clients déjà présents dans l\'écosystème ODY'] },
            { icon: Cpu, title: 'Technologie', items: ['IA', 'Logiciel', 'Data', 'Intégrations'] },
            { icon: Network, title: 'Distribution', items: ['Partenaires', 'Franchises', 'Groupes de restauration'] },
          ].map((col, i) => (
            <Reveal key={col.title} delay={i * 0.1}>
              <div className="card card-hover h-full">
                <div className="w-11 h-11 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center mb-4">
                  <col.icon className="w-5 h-5 text-neon-blue" />
                </div>
                <h3 className="text-lg font-bold font-orbitron text-star-white mb-3">{col.title}</h3>
                <ul className="space-y-2 text-gray-400 font-montserrat text-body">
                  {col.items.map((it) => (
                    <li key={it}>• {it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="neon-border rounded-xl p-8 bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-neon-blue" />
              <p className="text-caption font-orbitron text-neon-blue">Data Network Effect</p>
            </div>
            <p className="text-heading-3 font-bold font-orbitron text-star-white">
              Plus il y a de robots, plus l'IA devient performante.
            </p>
          </div>
        </Reveal>
      </Page>

      {/* ============ PAGE 8 — GO TO MARKET ============ */}
      <Page eyebrow="PAGE 8 — GO TO MARKET">
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron text-star-white mb-12">
            Start With Restaurants
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { phase: 'Phase 1', label: 'Restaurants indépendants' },
            { phase: 'Phase 2', label: 'Chaînes de restauration' },
            { phase: 'Phase 3', label: 'Groupes internationaux' },
            { phase: 'Phase 4', label: 'Autres secteurs' },
          ].map((p, i) => (
            <Reveal key={p.phase} delay={i * 0.08}>
              <div className="card card-hover h-full">
                <div className="text-caption font-orbitron text-neon-blue tracking-[0.3em] mb-3">{p.phase}</div>
                <p className="text-star-white font-montserrat font-semibold">{p.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="flex flex-wrap gap-3">
            {['Retail', 'Hôtellerie', 'Santé', 'Logistique'].map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        </Reveal>
      </Page>

      {/* ============ PAGE 9 — FUNDRAISING ============ */}
      <Page eyebrow="PAGE 9 — FUNDRAISING">
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron mb-4">
            <span className="gradient-text">Raising €3M</span>
          </h2>
          <h3 className="text-lg font-bold font-orbitron text-star-white mb-10">Utilisation des fonds</h3>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {[
            { icon: Wrench, pct: '40%', title: 'Hardware & Production', items: ['Achat robots', 'Achat composants', 'Industrialisation', 'Certifications', 'Production'] },
            { icon: Cpu, pct: '30%', title: 'Software & AI', items: ['IA conversationnelle', 'Vision IA', 'Navigation', 'Dashboard'] },
            { icon: Megaphone, pct: '20%', title: 'Go To Market', items: ['Déploiement commercial', 'Acquisition clients', 'Démonstrateurs'] },
            { icon: Users, pct: '10%', title: 'Team', items: ['Recrutements clés', 'Opérations'] },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div className="card card-hover h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center">
                      <b.icon className="w-5 h-5 text-neon-blue" />
                    </div>
                    <h4 className="text-lg font-bold font-orbitron text-star-white">{b.title}</h4>
                  </div>
                  <span className="text-2xl font-bold font-orbitron gradient-text">{b.pct}</span>
                </div>
                <ul className="space-y-1 text-gray-400 font-montserrat text-body">
                  {b.items.map((it) => (
                    <li key={it}>• {it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="neon-border rounded-xl p-8 bg-white/5">
            <p className="text-caption font-orbitron text-neon-blue mb-2">Objectif</p>
            <p className="text-heading-3 font-bold font-orbitron text-star-white">
              Premiers robots commercialisés sous 6 à 8 mois.
            </p>
          </div>
        </Reveal>
      </Page>

      {/* ============ PAGE 10 — TEAM ============ */}
      <Page eyebrow="PAGE 10 — TEAM">
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron text-star-white mb-6">
            Built By Operators
          </h2>
          <p className="text-body-large text-gray-300 font-montserrat mb-6">Équipe combinant :</p>
          <div className="flex flex-wrap gap-3 mb-14">
            {['SaaS', 'IA', 'Hospitality', 'Product', 'Growth'].map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="neon-border rounded-xl p-8 bg-white/5">
            <p className="text-caption font-orbitron text-neon-blue mb-3">Ce qui nous différencie</p>
            <p className="text-heading-3 font-bold font-orbitron text-star-white mb-2">
              Nous ne construisons pas un robot.
            </p>
            <p className="text-heading-3 font-bold font-orbitron">
              <span className="gradient-text">
                Nous construisons l'Operating System de la main-d'œuvre autonome.
              </span>
            </p>
          </div>
        </Reveal>
      </Page>

      {/* ============ PAGE 11 — ROADMAP ============ */}
      <Page eyebrow="PAGE 11 — ROADMAP">
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron text-star-white mb-12">
            Building The Future Workforce
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {[
            { year: '2026', label: 'Prototype V1' },
            { year: '2027', label: 'Commercialisation France' },
            { year: '2028', label: 'Expansion Europe' },
            { year: '2030', label: '10 000+ robots déployés' },
          ].map((r, i) => (
            <Reveal key={r.year} delay={i * 0.08}>
              <div className="card card-hover h-full">
                <div className="text-2xl font-bold font-orbitron gradient-text mb-3">{r.year}</div>
                <p className="text-star-white font-montserrat font-semibold">{r.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="neon-border rounded-xl p-8 bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Globe2 className="w-5 h-5 text-neon-blue" />
              <p className="text-caption font-orbitron text-neon-blue">Vision</p>
            </div>
            <p className="text-heading-3 font-bold font-orbitron text-star-white">
              1 million d'employés autonomes dans le monde.
            </p>
          </div>
        </Reveal>
      </Page>

      {/* ============ PAGE 12 — CLOSING ============ */}
      <section className="relative min-h-screen flex items-center px-6 sm:px-10 lg:px-[10%] py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center">
                <Bot className="w-6 h-6 text-neon-blue" />
              </div>
              <span className="text-caption font-orbitron text-neon-blue tracking-[0.4em]">ROBOTIC</span>
            </div>
            <h2 className="text-heading-2 font-bold font-orbitron mb-8">
              <span className="gradient-text">The Operating System For Autonomous Work</span>
            </h2>
            <div className="space-y-2 text-body-large text-gray-300 font-montserrat mb-10">
              <p>L'intelligence artificielle a révolutionné le travail numérique.</p>
              <p className="text-star-white font-semibold">
                ROBOTIC révolutionnera le travail physique.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-heading-3 font-bold font-orbitron text-star-white">
              Join us in building the future workforce
              <ArrowRight className="w-6 h-6 text-neon-blue" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
