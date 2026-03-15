export const genreFamilies = [
  { slug: "pop",       label: "Pop",       color: "#4A90D9" },
  { slug: "jazz",      label: "Jazz",      color: "#D4A03E" },
  { slug: "blues",     label: "Blues",      color: "#7B68AE" },
  { slug: "cinematic", label: "Cinematic",  color: "#5EAAA8" },
  { slug: "synthwave", label: "Synthwave",  color: "#E84893" },
  { slug: "house",     label: "House",      color: "#44BBA4" },
  { slug: "soul-rnb",  label: "Soul/R&B",   color: "#E8A045" },
  { slug: "funk",      label: "Funk",       color: "#D94E4E" },
  { slug: "classical", label: "Classical",  color: "#8B7D6B" },
  { slug: "utility",   label: "Utility",    color: "#888888" },
];

export const genreToFamily = {
  "Pop": "pop",
  "Pop Min": "pop",
  "Pop/Synth": "pop",
  "Jazz": "jazz",
  "Jazz Min": "jazz",
  "Jazz/Bossa": "jazz",
  "Bossa Nova": "jazz",
  "Blues": "blues",
  "Cinematic": "cinematic",
  "Cinematic/Synthwave": "cinematic",
  "Cinematic/House": "cinematic",
  "New Age/Cinematic": "cinematic",
  "Synthwave": "synthwave",
  "Synthwave/House": "synthwave",
  "House": "house",
  "Jazz House": "house",
  "House/Techno": "house",
  "Trance": "house",
  "Techno": "house",
  "EDM": "house",
  "Neo Soul": "soul-rnb",
  "Neo-Soul": "soul-rnb",
  "Gospel/R&B": "soul-rnb",
  "Lofi R&B": "soul-rnb",
  "Funk": "funk",
  "Classical": "classical",
  "Modern": "classical",
  "Utility": "utility",
  "Trad Maj": "utility",
  "Trad Min": "utility",
  "Trad Min 2": "utility",
  "Oct Stack": "utility",
  "4th Stack": "utility",
  "5th Stack": "utility",
};

export const getGenreColor = (genre) => {
  const familySlug = genreToFamily[genre] || "utility";
  const family = genreFamilies.find(f => f.slug === familySlug);
  return family ? family.color : "#888888";
};
