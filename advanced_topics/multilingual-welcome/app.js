const CULTURES = ['us', 'ca', 'mx', 'fr', 'es'];

const translations = {
  us: {
    htmlLang: 'en-US',
    cultureLabel: 'Region',
    title: 'Welcome to GlobeMart',
    tagline: 'Shop local, ship worldwide.',
    navHome: 'Home',
    navContact: 'Contact',
    loginLabel: 'Log in'
  },
  ca: {
    htmlLang: 'en-CA',
    cultureLabel: 'Region',
    title: 'Welcome to GlobeMart',
    tagline: 'Shop local, ship across Canada.',
    navHome: 'Home',
    navContact: 'Contact',
    loginLabel: 'Log in'
  },
  mx: {
    htmlLang: 'es-MX',
    cultureLabel: 'Región',
    title: 'Bienvenido a GlobeMart',
    tagline: 'Compra local, envíos en México.',
    navHome: 'Inicio',
    navContact: 'Contacto',
    loginLabel: 'Iniciar sesión'
  },
  fr: {
    htmlLang: 'fr-FR',
    cultureLabel: 'Région',
    title: 'Bienvenue chez GlobeMart',
    tagline: 'Achetez local, livraison dans le monde.',
    navHome: 'Accueil',
    navContact: 'Contact',
    loginLabel: 'Se connecter'
  },
  es: {
    htmlLang: 'es-ES',
    cultureLabel: 'Región',
    title: 'Bienvenido a GlobeMart',
    tagline: 'Compra local, envíos a toda España.',
    navHome: 'Inicio',
    navContact: 'Contacto',
    loginLabel: 'Iniciar sesión'
  }
};

const cultureSelect = document.getElementById('culture');

function normalizeCulture(value) {
  const key = String(value ?? '').trim().toLowerCase();
  return CULTURES.includes(key) ? key : 'us';
}

function applyCulture(cultureKey) {
  const culture = normalizeCulture(cultureKey);
  const strings = translations[culture];

  document.documentElement.lang = strings.htmlLang;
  document.documentElement.dir = 'ltr';

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (key && strings[key]) {
      node.textContent = strings[key];
    }
  });

  cultureSelect.value = culture;
  cultureSelect.setAttribute('aria-label', strings.cultureLabel);
  localStorage.setItem('culture', culture);
}

function readInitialCulture() {
  const fromUrl = new URLSearchParams(location.search).get('culture');
  if (fromUrl) {
    return normalizeCulture(fromUrl);
  }

  const stored = localStorage.getItem('culture');
  if (stored) {
    return normalizeCulture(stored);
  }

  return 'us';
}

cultureSelect.addEventListener('change', () => {
  applyCulture(cultureSelect.value);
});

applyCulture(readInitialCulture());
