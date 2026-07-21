// Shared UI language state for the self-introduction (自己紹介) toggle.
// Only the intro section reacts to this; the rest of the site stays English.
// The page always loads in English by default; toggling applies for the session.
export const lang = $state({ current: 'en' });

export function setLang(value) {
	lang.current = value;
}
