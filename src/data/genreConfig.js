export const genreFamilies = [
  { slug: "pop",       label: "Pop",       color: "#E85D3A" },
  { slug: "jazz",      label: "Jazz",      color: "#C47A2A" },
  { slug: "blues",     label: "Blues",      color: "#8B5CF6" },
  { slug: "cinematic", label: "Cinematic",  color: "#2AABB3" },
  { slug: "synthwave", label: "Synthwave",  color: "#D946A8" },
  { slug: "house",     label: "House",      color: "#22A869" },
  { slug: "soul-rnb",  label: "Soul/R&B",   color: "#E0782A" },
  { slug: "funk",      label: "Funk",       color: "#DC2E4E" },
  { slug: "classical", label: "Classical",  color: "#7A6B5A" },
  { slug: "utility",   label: "Utility",    color: "#5A5A5A" },
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
