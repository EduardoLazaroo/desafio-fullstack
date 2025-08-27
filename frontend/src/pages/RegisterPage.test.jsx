/// <reference types="vitest" />

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import RegisterPage from "./RegisterPage";
import * as authService from "../services/authService";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("RegisterPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("renderiza os campos e botão corretamente", () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^E-mail$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Senha$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar Senha/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Criar Conta/i })
    ).toBeInTheDocument();
  });

  it("exibe alerta se senhas não coincidem", async () => {
    const alertMock = vi.fn();
    vi.stubGlobal("alert", alertMock);

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/^Senha$/i), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar Senha/i), {
      target: { value: "321" },
    });

    // dispara o submit no formulário em vez de só clicar no botão
    fireEvent.submit(
      screen.getByRole("button", { name: /Criar Conta/i }).closest("form")
    );

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("As senhas não coincidem.");
    });
  });

  it("chama registerUser e navega após sucesso", async () => {
    const navigateMock = vi.fn();
    vi.spyOn(authService, "registerUser").mockResolvedValue({
      token: "abc123",
    });
    vi.spyOn(reactRouterDom, "useNavigate").mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "Eduardo" },
    });
    fireEvent.change(screen.getByLabelText(/^E-mail$/i), {
      target: { value: "edu@teste.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Senha$/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar Senha/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Criar Conta/i }));

    await waitFor(() => {
      expect(authService.registerUser).toHaveBeenCalledWith(
        "Eduardo",
        "edu@teste.com",
        "123456",
        "123456"
      );
      expect(localStorage.getItem("token")).toBe("abc123");
      expect(navigateMock).toHaveBeenCalledWith("/home");
    });
  });

  it("mostra loading durante registro", async () => {
    let resolvePromise;
    vi.spyOn(authService, "registerUser").mockImplementation(
      () =>
        new Promise((res) => {
          resolvePromise = res;
        })
    );

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: "Eduardo" },
    });
    fireEvent.change(screen.getByLabelText(/^E-mail$/i), {
      target: { value: "edu@teste.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Senha$/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar Senha/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Criar Conta/i }));

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => resolvePromise({ token: "abc123" }));
  });
});
