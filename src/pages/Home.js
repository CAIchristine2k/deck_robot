import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Bot,
  TrendingDown,
  Users,
  RefreshCw,
  ShieldAlert,
  Activity,
  CircleAlert,
  Network,
  Globe2,
  Utensils,
  Repeat,
  Wrench,
  Palette,
  SlidersHorizontal,
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
  <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-space-dark/80 text-star-white text-sm font-montserrat">
    {children}
  </span>
);

// Styled bullet list with neon dots
const BulletList = ({ items, className = '' }) => (
  <ul className={`space-y-3 ${className}`}>
    {items.map((it, i) => (
      <li key={i} className="flex items-start gap-3 text-gray-300 font-montserrat text-body">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neon-blue flex-shrink-0 shadow-[0_0_6px_#00D9FF]" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
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
  const { t } = useTranslation();
  const [showContent, setShowContent] = useState(false);
  const { hasLoadingCompleted } = useLoading();

  useEffect(() => {
    if (hasLoadingCompleted) {
      const timer = setTimeout(() => setShowContent(true), 400);
      return () => clearTimeout(timer);
    }
  }, [hasLoadingCompleted]);

  // Helper to fetch arrays/objects from translations
  const tt = (key) => t(key, { returnObjects: true });

  const problemIcons = [TrendingDown, Users, RefreshCw, ShieldAlert, Activity, CircleAlert];
  const customizationIcons = [Utensils, Palette, Network, SlidersHorizontal];

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
                {t('robotic.cover.brand')}
              </span>
            </div>

            <h1 className="text-heading-1 font-bold font-orbitron mb-6 uppercase">
              <span className="gradient-text">{t('robotic.cover.title')}</span>
            </h1>

            <p className="text-body-large text-gray-300 font-montserrat max-w-2xl mb-8">
              {t('robotic.cover.subtitle')}
            </p>

            <div className="flex flex-wrap gap-3">
              {tt('robotic.cover.sectors').map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ PAGE 2 — THE BIG PROBLEM ============ */}
      <Page eyebrow={t('robotic.problem.eyebrow')}>
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron text-star-white mb-4">
            {t('robotic.problem.title')}
          </h2>
          <p className="text-body-large text-gray-300 font-montserrat mb-12">
            {t('robotic.problem.intro')}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {tt('robotic.problem.cards').map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <IconCard icon={problemIcons[i]} title={item.title} desc={item.desc} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="card border-neon-blue/20">
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="w-5 h-5 text-neon-blue" />
              <h3 className="text-lg font-bold font-orbitron text-star-white">
                {t('robotic.problem.restaurant.title')}
              </h3>
            </div>
            <BulletList items={tt('robotic.problem.restaurant.items')} />
            <p className="text-body-large text-star-white font-montserrat mt-6">
              {t('robotic.problem.restaurant.conclusion')}
            </p>
          </div>
        </Reveal>
      </Page>

      {/* ============ PAGE 4 — THE SOLUTION ============ */}
      <Page eyebrow={t('robotic.solution.eyebrow')}>
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron mb-4">
            <span className="gradient-text">{t('robotic.solution.title')}</span>
          </h2>
          <p className="text-body-large text-gray-300 font-montserrat mb-12 max-w-3xl">
            {t('robotic.solution.subtitle')}
          </p>
        </Reveal>

        <Reveal>
          <h3 className="text-lg font-bold font-orbitron text-star-white mb-4">
            {t('robotic.solution.capabilitiesTitle')}
          </h3>
          <div className="flex flex-wrap gap-3 mb-14">
            {tt('robotic.solution.capabilities').map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="card border-neon-blue/20">
            <div className="flex items-center gap-2 mb-4">
              <Network className="w-5 h-5 text-neon-blue" />
              <h3 className="text-lg font-bold font-orbitron text-star-white">
                {t('robotic.solution.connected.title')}
              </h3>
            </div>
            <p className="text-gray-300 font-montserrat mb-4">
              {t('robotic.solution.connected.intro')}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {tt('robotic.solution.connected.items').map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
            <p className="text-body-large text-star-white font-montserrat">
              {t('robotic.solution.connected.conclusion')}
            </p>
          </div>
        </Reveal>
      </Page>

      {/* ============ PAGE 5 — MARKET OPPORTUNITY ============ */}
      <Page eyebrow={t('robotic.market.eyebrow')}>
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron text-star-white mb-4">
            {t('robotic.market.title')}
          </h2>
          <p className="text-body-large text-gray-300 font-montserrat mb-12 max-w-3xl">
            {t('robotic.market.intro')}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tt('robotic.market.regions').map((r, i, arr) => {
            const isLastOdd = i === arr.length - 1 && arr.length % 2 === 1;
            return (
            <Reveal
              key={r.name}
              delay={i * 0.1}
              className={isLastOdd ? 'lg:col-span-2 lg:max-w-[calc(50%-12px)] lg:mx-auto lg:w-full' : ''}
            >
              <div className="card card-hover h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center">
                    <Globe2 className="w-5 h-5 text-neon-blue" />
                  </div>
                  <h3 className="text-2xl font-bold font-orbitron gradient-text">{r.name}</h3>
                </div>

                <div className="text-3xl font-bold font-orbitron text-star-white mb-4">{r.restaurants}</div>

                <div className="space-y-1 mb-6">
                  <p className="text-body text-gray-400 font-montserrat">{r.hypothesis}</p>
                  <p className="text-body-large text-star-white font-montserrat font-semibold">{r.potential}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[r.hardware, r.leasing].map((blk, j) => (
                    <div key={j} className="rounded-lg border border-white/10 bg-space-dark/80 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        {j === 0 ? (
                          <Wrench className="w-4 h-4 text-neon-blue" />
                        ) : (
                          <Repeat className="w-4 h-4 text-neon-blue" />
                        )}
                        <p className="text-caption font-orbitron text-neon-blue tracking-[0.15em]">{blk.title}</p>
                      </div>
                      <div className="space-y-1.5">
                        {blk.lines.map((line, k) => (
                          <p
                            key={k}
                            className={
                              k === blk.lines.length - 1
                                ? 'text-lg font-bold font-orbitron gradient-text'
                                : 'text-body-small text-gray-400 font-montserrat'
                            }
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="neon-border rounded-xl p-8 bg-space-dark/80 mt-6">
            <div className="flex items-center gap-2 mb-2">
              <Globe2 className="w-5 h-5 text-neon-blue" />
              <p className="text-caption font-orbitron text-neon-blue">
                {t('robotic.market.vision.eyebrow')}
              </p>
            </div>
            <p className="text-heading-3 font-bold font-orbitron text-star-white">
              {t('robotic.market.vision.text')}
            </p>
          </div>
        </Reveal>
      </Page>

      {/* ============ PAGE 9 — FUNDRAISING ============ */}
      <Page eyebrow={t('robotic.fundraising.eyebrow')}>
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron mb-10">
            <span className="gradient-text">{t('robotic.fundraising.title')}</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="card overflow-hidden p-0 mb-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-neon-blue/15 border-b border-neon-blue/20 p-4 sm:p-5" />
                    {tt('robotic.fundraising.table.columns').map((col) => (
                      <th
                        key={col}
                        className="bg-neon-blue/15 border-b border-l border-neon-blue/20 p-4 sm:p-5 text-center text-caption sm:text-body font-orbitron tracking-[0.15em] text-neon-blue uppercase"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tt('robotic.fundraising.table.rows').map((row) => (
                    <tr key={row.label} className={row.highlight ? 'bg-neon-blue/5' : ''}>
                      <td className="border-t border-white/10 p-4 sm:p-5 text-left text-body sm:text-body-large font-orbitron font-bold gradient-text uppercase tracking-wide">
                        {row.label}
                      </td>
                      {row.values.map((v, j) => (
                        <td
                          key={j}
                          className="border-t border-l border-white/10 p-4 sm:p-5 text-center text-lg sm:text-2xl font-bold font-orbitron text-star-white"
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-center text-heading-3 font-bold font-orbitron gradient-text">
            {t('robotic.fundraising.table.total')}
          </p>
        </Reveal>
      </Page>

      {/* ============ PAGE 11 — ROADMAP ============ */}
      <Page eyebrow={t('robotic.roadmap.eyebrow')}>
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron text-star-white mb-12">
            {t('robotic.roadmap.title')}
          </h2>
        </Reveal>

        <div className="relative mb-14">
          {/* Timeline connecting line (desktop) */}
          <div className="hidden lg:block absolute top-5 left-[10%] right-[10%] h-px bg-gradient-to-r from-neon-blue/0 via-neon-blue/50 to-neon-blue/0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10">
            {tt('robotic.roadmap.milestones').map((r, i) => (
              <Reveal key={r.year} delay={i * 0.1}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Numbered node */}
                  <div className="hidden lg:flex w-10 h-10 mb-6 rounded-full bg-space-dark border-2 border-neon-blue items-center justify-center relative z-10 shadow-[0_0_14px_rgba(0,217,255,0.6)]">
                    <span className="text-neon-blue font-orbitron font-bold text-sm">{i + 1}</span>
                  </div>
                  <div className="card card-hover h-full w-full">
                    <div className="text-2xl font-bold font-orbitron gradient-text mb-3">{r.year}</div>
                    <p className="text-star-white font-montserrat font-semibold">{r.label}</p>
                    {r.desc && (
                      <p className="text-body-small text-gray-400 font-montserrat mt-2">{r.desc}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="neon-border rounded-xl p-8 bg-space-dark/80">
            <div className="flex items-center gap-2 mb-2">
              <Globe2 className="w-5 h-5 text-neon-blue" />
              <p className="text-caption font-orbitron text-neon-blue">
                {t('robotic.roadmap.vision.eyebrow')}
              </p>
            </div>
            <p className="text-heading-3 font-bold font-orbitron text-star-white">
              {t('robotic.roadmap.vision.text')}
            </p>
          </div>
        </Reveal>
      </Page>

      {/* ============ PAGE 12 — CLOSING ============ */}
      {/* ============ PAGE 7 — PERSONNALISATION ============ */}
      <Page eyebrow={t('robotic.customization.eyebrow')}>
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron mb-4">
            <span className="gradient-text">{t('robotic.customization.title')}</span>
          </h2>
          <p className="text-body-large text-gray-300 font-montserrat max-w-3xl mb-12">
            {t('robotic.customization.intro')}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tt('robotic.customization.cards').map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <IconCard icon={customizationIcons[i]} title={c.title} desc={c.desc} />
            </Reveal>
          ))}
        </div>
      </Page>

      {/* ============ PAGE 8 — ÉQUIPE FONDATRICE ============ */}
      <Page eyebrow={t('robotic.team.eyebrow')}>
        <Reveal>
          <h2 className="text-heading-2 font-bold font-orbitron mb-4">
            <span className="gradient-text">{t('robotic.team.title')}</span>
          </h2>
          <p className="text-body-large text-gray-300 font-montserrat max-w-3xl mb-12">
            {t('robotic.team.intro')}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tt('robotic.team.members').map((m, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="card card-hover h-full flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center mb-5 shadow-[0_0_18px_rgba(0,217,255,0.25)]">
                  <span className="text-2xl font-bold font-orbitron gradient-text">
                    {m.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-orbitron text-star-white mb-1">{m.name}</h3>
                <p className="text-caption font-orbitron text-neon-blue tracking-[0.15em] uppercase mb-3">
                  {m.role}
                </p>
                <p className="text-body-small text-gray-400 font-montserrat">{m.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Page>
    </div>
  );
};

export default Home;
