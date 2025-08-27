/// <reference types="vitest" />

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import MovieForm from "./MovieForm";

const mockStore = configureStore([]);

describe("MovieForm", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = vi.fn();
  });

  it("renderiza o formulário com os campos", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de Lançamento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gênero/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sinopse/i)).toBeInTheDocument();
    expect(screen.getByText(/Salvar/i)).toBeInTheDocument();
  });

  it("exibe erro ao submeter formulário vazio", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MovieForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getAllByText(/Salvar/i)[0]);

    expect(screen.getByText(/Preencha corretamente o título/i)).toBeInTheDocument();
    expect(screen.getByText(/Preencha corretamente a data/i)).toBeInTheDocument();
    expect(screen.getByText(/Preencha corretamente o gênero/i)).toBeInTheDocument();
    expect(screen.getByText(/Preencha corretamente a sinopse/i)).toBeInTheDocument();
  });
});
