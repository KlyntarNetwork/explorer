export function isMockMode() {
  // Explicit opt-in to mocks (no implicit dev fallbacks).
  // Accept common truthy values to make local env configuration easier.
  const raw = process.env.MOCK_MODE ?? process.env.NEXT_PUBLIC_MOCK_MODE;

  if (!raw) return false;
  const v = String(raw).toLowerCase().trim();
  return v === '1' || v === 'true' || v === 'yes' || v === 'on';
}


