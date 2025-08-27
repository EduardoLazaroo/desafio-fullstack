/// <reference types="vitest" />

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import HomePage from "./HomePage";

const mockStore = configureStore([]);

describe("HomePage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      movies: {
        list: [
          { id: 1, title: "Matrix", genre: "Sci-Fi", watched: false, poster_url: "", synopsis: "Filme de hacker" },
          { id: 2, title: "Inception", genre: "Sci-Fi", watched: true, poster_url: "", synopsis: "Sonhos dentro de sonhos" },
        ],
        loading: false,
      },
    });
    store.dispatch = vi.fn();
  });

  it("renderiza títulos e seções corretamente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Bem-vindo ao/i)).toBeInTheDocument();
    expect(screen.getByText(/Filmes para assistir/i)).toBeInTheDocument();
    expect(screen.getByText(/Histórico assistido/i)).toBeInTheDocument();
    expect(screen.getByText("Matrix")).toBeInTheDocument();
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });
});
