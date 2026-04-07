import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Play, Table as TableIcon, CheckCircle2, AlertCircle, Info, Columns, Moon, Sun } from 'lucide-react';
import { Level, GeneratedData, Preset } from './types';
import { generateData } from './lib/dataGenerator';
import { convertToCSV, downloadCSV } from './lib/csvUtils';

type Language = 'ua' | 'en' | 'ru';

const TRANSLATIONS = {
  ua: {
    title: 'GO Data Analyst',
    subtitle: 'твій персональний тренажер аналітика',
    heroTitle: 'Генеруйте реалістичні дані',
    heroSubtitle: 'Миттєво',
    heroDesc: 'Професійна платформа для створення синтетичних даних. Підвищуйте свої навички аналізу на реалістичних сценаріях.',
    version: 'v2.7.1',
    generateBtn: 'Згенерувати таблицю',
    generatingBtn: 'Генерація даних...',
    downloadBtn: 'Завантажити CSV',
    generateAgainBtn: 'Згенерувати нову таблицю',
    previewTitle: 'Попередній перегляд',
    previewDesc: 'Відображено перші 10 рядків згенерованих даних',
    readyToAnalyze: 'Дані готові до аналізу',
    needsCleaning: 'Дані потребують очищення',
    footerText: 'Створено для аналітиків.',
    madeBy: 'made by',
    presets: {
      easy: {
        title: 'Проста Таблиця',
        desc: 'Вступний модуль: транзакційні дані за Q1 2026 (січень-березень). Навчіться працювати з ідентифікаторами, розраховувати конверсію та сегментувати активних користувачів за 30-денним вікном.'
      },
      medium: {
        title: 'Середня Складність',
        desc: 'Поглиблений рівень: 6 місяців статистики з демографічними даними (вік, стать) та каналами залучення. Дослідіть кореляцію між рейтингом продукту та лояльністю клієнтів у реалістичному середовищі.'
      },
      hard: {
        title: 'Вища Складність',
        desc: 'Професійний рівень: міжнародний ринок, 4 типи продуктів та складні моделі монетизації (SaaS, Freemium). Аналізуйте життєвий цикл клієнта, ефективність тріал-періодів та поведінку на різних пристроях.'
      }
    }
  },
  en: {
    title: 'GO Data Analyst',
    subtitle: 'your personal analyst trainer',
    heroTitle: 'Generate realistic data',
    heroSubtitle: 'Instantly',
    heroDesc: 'Professional platform for creating synthetic data. Level up your analysis skills with realistic scenarios.',
    version: 'v2.7.1',
    generateBtn: 'Generate Table',
    generatingBtn: 'Generating data...',
    downloadBtn: 'Download CSV',
    generateAgainBtn: 'Generate New Table',
    previewTitle: 'Preview',
    previewDesc: 'Showing first 10 rows of generated data',
    readyToAnalyze: 'Data ready for analysis',
    needsCleaning: 'Data needs cleaning',
    footerText: 'Created for analysts.',
    madeBy: 'made by',
    presets: {
      easy: {
        title: 'Simple Table',
        desc: 'Introductory module: transactional data for Q1 2026. Learn to work with IDs, calculate conversion, and segment active users by a 30-day window.'
      },
      medium: {
        title: 'Medium Complexity',
        desc: 'Advanced level: 6 months of statistics with demographics (age, gender) and acquisition channels. Explore correlations between product rating and loyalty.'
      },
      hard: {
        title: 'Higher Complexity',
        desc: 'Professional level: international market, 4 product types, and complex monetization models. Analyze CLV, trial efficiency, and cross-device behavior.'
      }
    }
  },
  ru: {
    title: 'GO Data Analyst',
    subtitle: 'твой персональный тренажер аналитика',
    heroTitle: 'Генерируйте реалистичные данные',
    heroSubtitle: 'Мгновенно',
    heroDesc: 'Профессиональная платформа для создания синтетических данных. Повышайте свои навыки анализа на реалистичных сценариях.',
    version: 'v2.7.1',
    generateBtn: 'Сгенерировать таблицу',
    generatingBtn: 'Генерация данных...',
    downloadBtn: 'Скачать CSV',
    generateAgainBtn: 'Сгенерировать новую таблицу',
    previewTitle: 'Предпросмотр',
    previewDesc: 'Отображены первые 10 строк сгенерированных данных',
    readyToAnalyze: 'Данные готовы к анализу',
    needsCleaning: 'Данные требуют очистки',
    footerText: 'Создано для аналитиков.',
    madeBy: 'made by',
    presets: {
      easy: {
        title: 'Простая Таблица',
        desc: 'Вводный модуль: транзакционные данные за Q1 2026. Научитесь работать с идентификаторами, рассчитывать конверсию и сегментировать активных пользователей.'
      },
      medium: {
        title: 'Средняя Сложность',
        desc: 'Углубленный уровень: 6 месяцев статистики с демографией и каналами привлечения. Исследуйте корреляцию между рейтингом продукта и лояльностью.'
      },
      hard: {
        title: 'Высшая Сложность',
        desc: 'Профессиональный уровень: международный рынок, 4 типа продуктов и сложные модели монетизации. Анализируйте жизненный цикл клиента и поведение.'
      }
    }
  }
};

const Logo = ({ variant = 'default', onClick }: { variant?: 'default' | 'header', onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 sm:gap-4 group cursor-pointer ${variant === 'header' ? 'scale-90 sm:scale-110 origin-left' : ''}`}
  >
    <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
      {/* Pixel/Table Breaking Animation */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 1, opacity: 0.5 }}
            whileHover={{ 
              scale: [1, 1.5, 0], 
              opacity: [0.5, 1, 0],
              rotate: [0, 90, 180] 
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-blue-500 rounded-sm"
          />
        ))}
      </div>
      
      {/* Main Icon */}
      <div className="relative z-10 w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
        <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      </div>
    </div>
    <div className={`flex flex-col leading-none ${variant === 'header' ? 'lg:flex-row lg:items-center lg:gap-4' : ''}`}>
      <span className={`font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-600 to-cyan-500 ${variant === 'header' ? 'text-lg sm:text-xl lg:text-3xl' : 'text-2xl sm:text-4xl'}`}>
        GO DATA
      </span>
      <span className={`font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] ${variant === 'header' ? 'text-[8px] sm:text-[10px] lg:text-lg text-gray-800 dark:text-gray-200 lg:mt-0' : 'text-[10px] text-gray-400 dark:text-gray-500 mt-1'}`}>
        Analyst Pro
      </span>
    </div>
  </div>
);

export default function App() {
  const [lang, setLang] = useState<Language>('ua');
  const [selectedLevel, setSelectedLevel] = useState<Level>('easy');
  const [data, setData] = useState<GeneratedData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  useEffect(() => {
    if (data && window.innerWidth < 1024) {
      const actionButtons = document.getElementById('action-buttons');
      if (actionButtons) {
        setTimeout(() => {
          actionButtons.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [data]);

  const scrollToPresets = () => {
    const presetsSection = document.getElementById('presets-section');
    if (presetsSection) {
      presetsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetApp = () => {
    setSelectedLevel('easy');
    setData(null);
    setIsGenerating(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = TRANSLATIONS[lang];

  const presets: Preset[] = [
    { id: 'easy', title: t.presets.easy.title, description: t.presets.easy.desc, rows: 1000, months: 3, columns: 10 },
    { id: 'medium', title: t.presets.medium.title, description: t.presets.medium.desc, rows: 6000, months: 6, columns: 15 },
    { id: 'hard', title: t.presets.hard.title, description: t.presets.hard.desc, rows: 20000, months: 12, columns: 20 }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setData(null);
    setTimeout(() => {
      const newData = generateData(selectedLevel);
      setData(newData);
      setIsGenerating(false);
    }, 800);
  };

  const handleDownload = () => {
    if (!data) return;
    const csv = convertToCSV(data);
    downloadCSV(csv, `go_data_${selectedLevel}_${new Date().getTime()}.csv`);
  };

  const previewRows = useMemo(() => {
    if (!data) return [];
    return data.rows.slice(0, 10);
  }, [data]);

  const buttonClasses = "w-full max-w-md h-16 sm:h-20 flex items-center justify-center gap-3 sm:gap-4 rounded-full font-bold text-lg sm:text-xl shadow-xl transition-all active:scale-95 hover:scale-[1.02] cursor-pointer";

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0B] text-[#1D1D1F] dark:text-[#F5F5F7] font-sans selection:bg-blue-100 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between gap-2">
          <Logo variant="header" onClick={resetApp} />
          
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="relative group">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 sm:p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700 cursor-pointer"
                aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              <div className="absolute top-full right-0 mt-2 px-3 py-1.5 bg-black text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 hidden sm:block">
                {darkMode ? (lang === 'ua' ? 'Світла тема' : lang === 'ru' ? 'Светлая тема' : 'Light Mode') : (lang === 'ua' ? 'Темна тема' : lang === 'ru' ? 'Темная тема' : 'Dark Mode')}
              </div>
            </div>

            <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-0.5 sm:p-1 rounded-xl">
              {(['ua', 'en', 'ru'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase transition-all cursor-pointer ${
                    lang === l ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="hidden sm:block text-sm text-gray-400 font-mono">
              {t.version}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-4 py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6">
            {t.subtitle}
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[1.1]"
          >
            {t.heroTitle}<br />
            <span className="text-slate-300">{t.heroSubtitle}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto font-medium px-4"
          >
            {t.heroDesc}
          </motion.p>
        </div>

        {/* Preset Selection */}
        <div id="presets-section" className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {presets.map((preset, index) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => {
                setSelectedLevel(preset.id as Level);
                setData(null);
              }}
              className={`relative p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] text-left transition-all duration-500 border-2 cursor-pointer flex flex-col ${
                selectedLevel === preset.id 
                ? 'bg-white dark:bg-gray-900 border-black dark:border-white shadow-2xl scale-[1.01] lg:scale-[1.02]' 
                : 'bg-white/50 dark:bg-white/5 border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-white/10 hover:shadow-xl'
              }`}
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <div className="flex flex-col gap-2 sm:gap-3">
                  <span className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest ${
                    preset.id === 'easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                    preset.id === 'medium' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    {preset.id}
                  </span>
                  {/* Difficulty Indicator */}
                  <div className="flex gap-1 h-1.5 sm:h-2 w-20 sm:w-24 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full ${preset.id === 'easy' ? 'w-1/3 bg-green-500' : preset.id === 'medium' ? 'w-2/3 bg-orange-500' : 'w-full bg-red-500'}`} />
                  </div>
                </div>
                {selectedLevel === preset.id && (
                  <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-black dark:text-white" />
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black mb-2 sm:mb-3 tracking-tight dark:text-white">{preset.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 font-medium">
                {preset.description}
              </p>
              
              <div className="mt-auto">
                <div className="flex gap-4 sm:gap-6 text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <TableIcon className="w-3 h-3" />
                    {preset.rows.toLocaleString()}+
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Columns className="w-3 h-3" />
                    {preset.columns}C
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Info className="w-3 h-3" />
                    {preset.months}M
                  </div>
                </div>

                {/* Mobile/Tablet Generate Button */}
                {!data && (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLevel(preset.id as Level);
                      handleGenerate();
                    }}
                    disabled={isGenerating}
                    className={`w-full h-14 sm:h-16 flex items-center justify-center gap-3 rounded-2xl font-bold text-base sm:text-lg transition-all cursor-pointer ${
                      selectedLevel === preset.id
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    } disabled:opacity-50 lg:hidden`}
                  >
                    {isGenerating && selectedLevel === preset.id ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Play className="w-5 h-5 fill-current" />
                    )}
                    {isGenerating && selectedLevel === preset.id ? t.generatingBtn : t.generateBtn}
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button (Desktop Generate or Global Download) */}
        <div id="action-buttons" className="flex flex-col items-center gap-6 mb-20">
          <AnimatePresence mode="wait">
            {!data ? (
              <motion.button
                key="generate"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`${buttonClasses} bg-black hover:bg-gray-800 text-white disabled:opacity-50 hidden lg:flex`}
              >
                {isGenerating ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Play className="w-6 h-6 fill-current" />
                )}
                {isGenerating ? t.generatingBtn : t.generateBtn}
              </motion.button>
            ) : (
              <div className="flex flex-col items-center gap-6 w-full max-w-md">
                <motion.button
                  key="download"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={handleDownload}
                  className={`${buttonClasses} bg-blue-600 hover:bg-blue-500 text-white`}
                >
                  <Download className="w-7 h-7" />
                  {t.downloadBtn}
                </motion.button>
                
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => {
                    setData(null);
                    scrollToPresets();
                  }}
                  className={`${buttonClasses} bg-white dark:bg-gray-900 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black`}
                >
                  <Play className="w-5 h-5" />
                  {t.generateAgainBtn}
                </motion.button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Table Preview */}
        <AnimatePresence>
          {data && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-[2rem] sm:rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="p-6 sm:p-10 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50/30 dark:bg-gray-800/30">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight dark:text-white">{t.previewTitle}</h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">{t.previewDesc}</p>
                </div>
                <div className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest ${
                  selectedLevel === 'easy' ? 'text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400' : 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 h-4" />
                  {selectedLevel === 'easy' ? t.readyToAnalyze : t.needsCleaning}
                </div>
              </div>
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
                <table className="w-full text-left border-collapse min-w-[800px] sm:min-w-full">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                      {data.headers.map(header => (
                        <th key={header} className="px-6 sm:px-8 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] whitespace-nowrap">
                          {header.replace(/_/g, ' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {previewRows.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors">
                        {data.headers.map(header => (
                          <td key={header} className="px-6 sm:px-8 py-4 sm:py-5 text-xs sm:text-sm whitespace-nowrap text-gray-600 dark:text-gray-300 font-medium">
                            {row[header] === '-' ? <span className="text-gray-300 dark:text-gray-700">-</span> : row[header] || <span className="text-gray-300 dark:text-gray-700 italic">null</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-200 dark:border-gray-800 mt-20 text-center">
        <div className="flex flex-col items-center gap-6">
          <Logo onClick={resetApp} />
          <p className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest">© 2026 {t.title}. {t.footerText}</p>
          <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7] font-black uppercase text-[10px] tracking-widest">
            <span className="text-gray-300 dark:text-gray-700">{t.madeBy}</span>
            <a 
              href="https://www.linkedin.com/in/sergiy-khlobystov-310009390/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 cursor-pointer"
            >
              Sergiy Khlobystov
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
