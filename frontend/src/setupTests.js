import "@testing-library/jest-dom";
import { vi } from "vitest";
import * as movieServiceMock from "./__mocks__/movieService";

vi.mock("./services/movieService", () => ({
  getMovieById: movieServiceMock.getMovieById,
}));
