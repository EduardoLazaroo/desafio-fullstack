import { vi } from "vitest";

export const getMovieById = vi.fn().mockResolvedValue({
  id: 1,
  title: "Mocked Movie",
  release_year: 2020,
  genre: "Action",
  synopsis: "Sinopse mockada",
  opinion: "",
  watched: false,
  poster_url: "",
});
