export const isValidUUID = (id: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export const generateRandomDuration = (): string => {
  return `${Math.floor(Math.random() * 20 + 5)}:${String(
    Math.floor(Math.random() * 60)
  ).padStart(2, "0")}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapResources = (resources: any[]) =>
  resources.map((r) => ({ id: r.id, name: r.name, url: r.url }));
