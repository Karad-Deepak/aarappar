/**
 * Convert a string to Title Case while preserving delimiters like spaces,
 * hyphens, en dashes, and slashes. Common short words remain lowercase
 * unless they are the first or last token (e.g., "and", "of", "the").
 *
 * This is intended for display-only formatting of category names.
 *
 * Examples:
 * - "APPETIZERS – NON-VEGETARIAN" => "Appetizers – Non-Vegetarian"
 * - "RICE & BIRYANI" => "Rice & Biryani"
 * - "INDIAN BREADS" => "Indian Breads"
 */
export function toTitleCase(input) {
  if (input == null) return "";
  const str = String(input).trim();
  if (str === "") return "";

  const lowercaseWords = new Set([
    "and",
    "or",
    "of",
    "the",
    "a",
    "an",
    "in",
    "on",
    "at",
    "to",
    "for",
    "by",
    "with",
  ]);

  const tokens = str
    .toLowerCase()
    // split but keep delimiters (spaces, hyphen, en-dash, slash)
    .split(/([\s\-–\/]+)/);

  const firstWordIndex = tokens.findIndex((t) => !/^[\s\-–\/]+$/.test(t));
  const lastWordIndex = (() => {
    for (let i = tokens.length - 1; i >= 0; i -= 1) {
      if (!/^[\s\-–\/]+$/.test(tokens[i])) return i;
    }
    return firstWordIndex;
  })();

  const capitalize = (word) => {
    if (word.length === 0) return word;
    // Handle apostrophes: e.g., children's => Children's
    const [head, ...rest] = word.split("'");
    const capHead = head.charAt(0).toUpperCase() + head.slice(1);
    if (rest.length === 0) return capHead;
    return [
      capHead,
      ...rest.map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w)),
    ].join("'");
  };

  const out = tokens.map((token, idx) => {
    // keep delimiters as-is
    if (/^[\s\-–\/]+$/.test(token)) return token;

    // keep single-character symbols like & as-is
    if (token.length === 1 && /[^a-z0-9]/i.test(token)) return token;

    // words that contain hyphens/en-dashes internally should capitalize all parts
    if (token.includes("-") || token.includes("–")) {
      return token
        .split(/([\-–]+)/)
        .map((part) => (/^[\-–]+$/.test(part) ? part : capitalize(part)))
        .join("");
    }

    // small words lowercased unless at boundaries
    if (
      idx !== firstWordIndex &&
      idx !== lastWordIndex &&
      lowercaseWords.has(token)
    ) {
      return token;
    }

    return capitalize(token);
  });

  return out.join("");
}
