export function sanitizePlace(value) {
  if (typeof value !== "string") {
    return null;
  }

  const place = value
    .trim()
    .replace(/\s+/g, " ");

  if (!place) {
    return null;
  }

  if (place.length > 150) {
    return null;
  }

  return place;
}

export function sanitizeDate(value) {
  if (typeof value !== "string") {
    return null;
  }

  const date = value.trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return null;
  }

  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return date;
}

export function sanitizeTime(value) {
  if (typeof value !== "string") {
    return null;
  }

  const time = value.trim();

  if (!/^\d{2}:\d{2}$/.test(time)) {
    return null;
  }

  const [hours, minutes] = time
    .split(":")
    .map(Number);

  if (
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  return time;
}