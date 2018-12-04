export function mapGenres(
  genreIds: number[],
  genres: Array<{ id: number; name: string }>,
) {
  const genresMap = genres.reduce<{ [key: string]: string }>(
    (result, current) => {
      result[current.id] = current.name;
      return result;
    },
    {},
  );

  return genreIds.map((id) => genresMap[id]).join(", ");
}
