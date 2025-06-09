export function cleanQuery(query: Record<string, any>) {
  const cleaned: Record<string, any> = {};

  for (const key in query) {
    let value = query[key];
    if (typeof value === "string") {
      value = value.trim().replace(/^["'](.*)["']$/, "$1");
      if (value === "null" || value === "") continue;
    }
    cleaned[key] = value;
  }

  return cleaned;
}
