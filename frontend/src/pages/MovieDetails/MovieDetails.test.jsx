/// <reference types="vitest" />

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import configureStore from "redux-mock-store";
import MovieDetails from "./MovieDetails";
import * as movieService from "../../services/movieService";

const mockStore = configureStore([]);

describe("MovieDetails", () => {
  let store;

  beforeAll(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    store = mockStore({
      movies: {
        list: [
          {
            id: 1,
            title: "Matrix",
            release_year: 1999,
            genre: "Sci-Fi",
            synopsis: "Um hacker descobre a realidade.",
            opinion: "Ótimo filme",
            watched: true,
            poster_url: "",
          },
          {
            id: 2,
            title: "Inception",
            release_year: 2010,
            genre: "Sci-Fi",
            synopsis: "Sonhos dentro de sonhos",
            opinion: "",
            watched: false,
            poster_url: "",
          },
        ],
        loading: false,
      },
    });

    store.dispatch = vi.fn();
  });

  it("renderiza detalhes do filme presente no estado", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/movies/1"]}>
          <Routes>
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Matrix")).toBeInTheDocument();

    expect(
      screen.getByText("Ano:", { selector: "strong" }).parentElement
    ).toHaveTextContent("Ano: 1999");

    expect(
      screen.getByText("Gênero:", { selector: "strong" }).parentElement
    ).toHaveTextContent("Gênero: Sci-Fi");

    expect(
      screen.getByText("Sinopse:", { selector: "strong" }).parentElement
    ).toHaveTextContent("Sinopse: Um hacker descobre a realidade.");

    expect(
      screen.getByText("Opinião:", { selector: "strong" }).parentElement
    ).toHaveTextContent("Opinião: Ótimo filme");
  });

  it("exibe mensagem de erro se o filme não for encontrado nem no estado nem na API", async () => {
    vi.spyOn(movieService, "getMovieById").mockRejectedValueOnce(
      new Error("Erro na API")
    );

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/movies/999"]}>
          <Routes>
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const errorMessage = await screen.findByText(
      /Não foi possível carregar os detalhes do filme/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("exibe Loading enquanto carrega", () => {
    const loadingStore = mockStore({
      movies: { list: [], loading: true },
    });

    render(
      <Provider store={loadingStore}>
        <MemoryRouter initialEntries={["/movies/1"]}>
          <Routes>
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
