export function resolveRef(content, section, slotKey) {
  if (!section || !content) return undefined;
  const own = section[slotKey];
  if (own !== undefined && own !== null) return own;
  const ref = section.childrenRef;
  if (!ref) return undefined;
  return content[ref];
}

export function resolveRefArray(content, section, slotKey) {
  const value = resolveRef(content, section, slotKey);
  return Array.isArray(value) ? value : [];
}
