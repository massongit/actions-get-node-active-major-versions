import fetch from "node-fetch";

export async function script(): Promise<number[]> {
  const res = await fetch(
    "https://raw.githubusercontent.com/nodejs/release/main/schedule.json",
  );

  if (!res.ok) {
    throw new Error(
      `HTTP Error Response: ${res.status} ${res.statusText} ${await res.text()}`,
    );
  }

  const json = (await res.json()) as {
    [version: string]: { lts?: string; end: string };
  };
  const now = new Date();
  const supportedVersions: number[] = [];

  for (const version in json) {
    const { lts, end } = json[version];
    if (
      lts !== undefined &&
      new Date(lts + "T00:00:00Z") <= now &&
      now < new Date(end + "T00:00:00Z")
    ) {
      supportedVersions.push(Number(version.replace(/^v/, "")));
    }
  }

  return supportedVersions;
}
