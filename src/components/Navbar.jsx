import { useContext } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

export default function Navbar() {
  const { lang, setLang, t } = useContext(AppContext);

  return (
    <header className="bg-brand-600 text-white p-4 shadow-md flex justify-between items-center z-10 sticky top-0">
      <Link to="/" className="text-xl font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-white rounded px-1">
        {t.appName}
      </Link>
      <button 
        onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
        className="flex items-center gap-1 bg-brand-700 hover:bg-brand-800 px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Toggle language"
      >
        <Globe size={16} />
        {lang === 'en' ? 'हिंदी' : 'EN'}
      </button>
    </header>
  );
}