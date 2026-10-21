const baseUrl = new URL(process.env.IT_WORLDS_URL ?? "http://127.0.0.1:4321");
const checks: ReadonlyArray<readonly [path: string, marker: string]> = [
  ["/", "data-topic-card"],
  ["/quiz/", "data-quiz-form"],
  ["/quellen/", "PostgreSQL"],
];

for (const [path, marker] of checks) {
  const response = await fetch(new URL(path, baseUrl), {
    signal: AbortSignal.timeout(10_000),
  });
  const html = await response.text();
  if (!response.ok || !html.includes(marker)) {
    throw new Error(`Readiness failed: ${path} (HTTP ${response.status})`);
  }
  console.log(`PASS: application readiness ${path}`);
}

export {};
