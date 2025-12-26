function truthy(raw: unknown) {
  if (!raw) return false;
  const v = String(raw).toLowerCase().trim();
  return v === '1' || v === 'true' || v === 'yes' || v === 'on';
}

/**
 * Global stub mode (legacy): used to let the HOME page render on Vercel
 * even when node/API is unavailable.
 */
export function isGlobalStubMode() {
  return truthy(process.env.STUB_MODE ?? process.env.NEXT_PUBLIC_STUB_MODE);
}

/**
 * Entity stub mode: used for entity pages we redesign while node/API is unavailable:
 * /blocks, /blocks/:id, /users/:id, /contracts/:id, /tx/:hash, /pools/:id, /epochs/:id
 */
export function isEntityStubMode() {
  return truthy(process.env.ENTITY_STUB_MODE ?? process.env.NEXT_PUBLIC_ENTITY_STUB_MODE);
}


