/// <reference types="vitest" />

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import LoginPage from "./LoginPage";
import * as authService from "../services/authService";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("LoginPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("renderiza os campos e botão corretamente", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
  });

  it("chama loginUser e navega após sucesso", async () => {
    const navigateMock = vi.fn();
    vi.spyOn(authService, "loginUser").mockResolvedValue({ token: "abc123" });
    vi.spyOn(reactRouterDom, "useNavigate").mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: "teste@teste.com" } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));

    await waitFor(() => {
      expect(authService.loginUser).toHaveBeenCalledWith("teste@teste.com", "123456");
      expect(localStorage.getItem("token")).toBe("abc123");
      expect(navigateMock).toHaveBeenCalledWith("/home");
    });
  });

  it("mostra loading durante login", async () => {
    let resolvePromise;
    vi.spyOn(authService, "loginUser").mockImplementation(
      () => new Promise((res) => { resolvePromise = res; })
    );

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: "teste@teste.com" } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => resolvePromise({ token: "abc123" }));
  });
});
