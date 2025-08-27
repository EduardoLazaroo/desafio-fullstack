/// <reference types="vitest" />

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import configureStore from "redux-mock-store";
import MovieDetails from "./MovieDetails";
import { vi } from "vitest";

const mockStore = configureStore([]);

describe("MovieDetails", () => {
  let store;

  beforeAll(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  beforeEach(() => {
    store = mockStore({
      movies: { list: [], loading: false },
    });

    store.dispatch = vi.fn(() => Promise.resolve());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renderiza detalhes do filme retornado pelo serviço", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/movies/1"]}>
          <Routes>
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const title = await screen.findByText("Mocked Movie");
    expect(title).toBeInTheDocument();

    const year = screen.getByText("Ano:", { selector: "strong" }).parentElement;
    expect(year).toHaveTextContent("Ano: 2020");

    const genre = screen.getByText("Gênero:", {
      selector: "strong",
    }).parentElement;
    expect(genre).toHaveTextContent("Gênero: Action");

    const synopsis = screen.getByText("Sinopse:", {
      selector: "strong",
    }).parentElement;
    expect(synopsis).toHaveTextContent("Sinopse: Sinopse mockada");
  });

  it("exibe Loading enquanto carrega", async () => {
    const loadingStore = mockStore({
      movies: { list: [], loading: true },
    });
    loadingStore.dispatch = vi.fn(() => Promise.resolve());

    render(
      <Provider store={loadingStore}>
        <MemoryRouter initialEntries={["/movies/1"]}>
          <Routes>
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const loadingElement = await screen.findByTestId("loading");
    expect(loadingElement).toBeInTheDocument();
  });
});
