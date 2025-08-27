/// <reference types="vitest" />

import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import MoviesList from "./MoviesList";
import * as moviesSlice from "../../redux/slices/moviesSlice";

const mockStore = configureStore([]);

describe("MoviesList", () => {
  let store;

  const mockMovies = [
    {
      id: 1,
      title: "Matrix",
      release_year: "1999-03-31",
      genre: "Sci-Fi",
      synopsis: "Um hacker descobre a realidade.",
      poster_url: "",
      created_at: "1999-03-31T12:00:00Z",
    },
    {
      id: 2,
      title: "Inception",
      release_year: "2010-07-16",
      genre: "Sci-Fi",
      synopsis: "Sonhos dentro de sonhos",
      poster_url: "",
      created_at: "2010-07-16T12:00:00Z",
    },
  ];

  beforeEach(() => {
    store = mockStore({
      movies: { list: mockMovies, loading: false },
    });

    store.dispatch = vi.fn(() => ({
      unwrap: () => Promise.resolve(),
    }));

    vi.spyOn(moviesSlice, "fetchMovies").mockImplementation(() => ({ type: "FETCH_MOVIES" }));
  });

  it("renderiza a lista de filmes corretamente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MoviesList />
        </MemoryRouter>
      </Provider>
    );

    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
      expect(screen.getByText(movie.synopsis)).toBeInTheDocument();
    });
  });

  it("renderiza mensagem de nenhum filme encontrado quando lista está vazia", () => {
    const emptyStore = mockStore({ movies: { list: [], loading: false } });
    emptyStore.dispatch = vi.fn();

    render(
      <Provider store={emptyStore}>
        <MemoryRouter>
          <MoviesList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Nenhum filme encontrado/i)).toBeInTheDocument();
  });

  it("exibe Loading enquanto carrega", () => {
    const loadingStore = mockStore({ movies: { list: [], loading: true } });

    render(
      <Provider store={loadingStore}>
        <MemoryRouter>
          <MoviesList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("abre e fecha modal de exclusão corretamente", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MoviesList />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getAllByText(/Excluir/i)[0]);

    const modal = await screen.findByText(/Tem certeza que deseja excluir o filme/i);
    expect(within(modal.closest(".modal-content")).getByText(/Matrix/i)).toBeInTheDocument();

    fireEvent.click(within(modal.closest(".modal-content")).getByText(/Cancelar/i));

    await waitFor(() => {
      expect(screen.queryByText(/Tem certeza que deseja excluir o filme/i)).not.toBeInTheDocument();
    });
  });

  it("chama removeMovie ao confirmar exclusão", async () => {
    const removeMovieMock = vi.spyOn(moviesSlice, "removeMovie");

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MoviesList />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getAllByText(/Excluir/i)[0]);
    fireEvent.click(await screen.findByText(/Confirmar/i));

    await waitFor(() => {
      expect(removeMovieMock).toHaveBeenCalledWith(mockMovies[0].id);
    });
  });

  it("chama fetchMovies ao montar o componente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MoviesList />
        </MemoryRouter>
      </Provider>
    );

    expect(moviesSlice.fetchMovies).toHaveBeenCalled();
  });
});
