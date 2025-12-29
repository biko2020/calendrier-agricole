import fr from '../assets/flags/fr.png'
import ma from '../assets/flags/ma.png'
import gb from '../assets/flags/gb.png'
import es from '../assets/flags/es.png'

export default function LanguageSwitcher({ lang, setLang }) {
  const languages = [
    { id: 'fr', label: 'Français', flag: fr },
    { id: 'ar', label: 'العربية', flag: ma },
    { id: 'en', label: 'English', flag: gb },
    { id: 'es', label: 'Español', flag: es }
  ]

  return (
    <div className="flex gap-2">
      {languages.map(l => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          className={`p-1 rounded-lg border transition ${
            lang === l.id ? 'ring-2 ring-green-500' : ''
          }`}
          title={l.label}
        >
          <img
            src={l.flag}
            alt={l.label}
            className="w-7 h-5 object-cover rounded-sm"
          />
        </button>
      ))}
    </div>
  )
}
