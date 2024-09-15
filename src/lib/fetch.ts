export async function fetchData<T>(
  url: string,
  tag?: string
): Promise<T | undefined> {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(`Error fetching with tag ${tag}`);
    }
    const data = (await res.json()) as T;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteMovie(movieId: string, url: string): Promise<void> {
  try {
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([movieId]),
    });
  } catch (error) {
    console.error(error);
  }
}
