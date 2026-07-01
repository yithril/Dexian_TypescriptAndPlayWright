/**
 * Expected UI strings per culture — the test's source of truth for assertions.
 *
 * Keep this in sync with app.js translations. When copy changes, update here
 * (not if-statements in the spec).
 */

/** Site region codes — matches the student's US / CA / MX / FR / ES cultures. */
export type CultureId = 'US' | 'CA' | 'MX' | 'FR' | 'ES';

/** URL query param and dropdown value for each culture (index.html?culture=mx). */
export type CultureParam = 'us' | 'ca' | 'mx' | 'fr' | 'es';

/**
 * One row of test data for a culture: codes plus every user-visible string
 * we locate or assert on (title, nav labels, region dropdown label, etc.).
 */
export type CultureExpectations = {
  cultureId: CultureId;
  cultureParam: CultureParam;
  htmlLang: string;
  cultureLabel: string;
  title: string;
  tagline: string;
  navHome: string;
  navContact: string;
  loginLabel: string;
};

export const allCultureExpectations: CultureExpectations[] = [
  {
    cultureId: 'US',
    cultureParam: 'us',
    htmlLang: 'en-US',
    cultureLabel: 'Region',
    title: 'Welcome to GlobeMart',
    tagline: 'Shop local, ship worldwide.',
    navHome: 'Home',
    navContact: 'Contact',
    loginLabel: 'Log in'
  },
  {
    cultureId: 'CA',
    cultureParam: 'ca',
    htmlLang: 'en-CA',
    cultureLabel: 'Region',
    title: 'Welcome to GlobeMart',
    tagline: 'Shop local, ship across Canada.',
    navHome: 'Home',
    navContact: 'Contact',
    loginLabel: 'Log in'
  },
  {
    cultureId: 'MX',
    cultureParam: 'mx',
    htmlLang: 'es-MX',
    cultureLabel: 'Región',
    title: 'Bienvenido a GlobeMart',
    tagline: 'Compra local, envíos en México.',
    navHome: 'Inicio',
    navContact: 'Contacto',
    loginLabel: 'Iniciar sesión'
  },
  {
    cultureId: 'FR',
    cultureParam: 'fr',
    htmlLang: 'fr-FR',
    cultureLabel: 'Région',
    title: 'Bienvenue chez GlobeMart',
    tagline: 'Achetez local, livraison dans le monde.',
    navHome: 'Accueil',
    navContact: 'Contact',
    loginLabel: 'Se connecter'
  },
  {
    cultureId: 'ES',
    cultureParam: 'es',
    htmlLang: 'es-ES',
    cultureLabel: 'Región',
    title: 'Bienvenido a GlobeMart',
    tagline: 'Compra local, envíos a toda España.',
    navHome: 'Inicio',
    navContact: 'Contacto',
    loginLabel: 'Iniciar sesión'
  }
];

/** Mirrors a TestComplete execution-controller sheet: run one culture or all. */
export function culturesToRun(): CultureExpectations[] {
  const filter = process.env.CULTURE?.trim() as CultureId | undefined;
  if (!filter) {
    return allCultureExpectations;
  }

  return allCultureExpectations.filter((culture) => culture.cultureId === filter);
}

/** Look up one culture row by id — handy for single-culture tests (e.g. switcher). */
export function cultureById(cultureId: CultureId): CultureExpectations {
  const culture = allCultureExpectations.find((row) => row.cultureId === cultureId);
  if (!culture) {
    throw new Error(`No expectations defined for culture ${cultureId}`);
  }
  return culture;
}
