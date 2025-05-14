/// <reference types="@testing-library/jest-dom" />

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ErrorElement } from "./ErrorElement";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router";
import { Provider } from "./ui/provider";

// Helper component to trigger loader
const TriggerLoader = () => <Outlet />;

describe("ErrorElement", () => {
  it("should render status text and home button when loader throws a Response", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/error",
          element: <TriggerLoader />,
          errorElement: (
            <Provider>
              <ErrorElement />
            </Provider>
          ),
          loader: () => {
            throw new Response("Resource Not Found", {
              status: 404,
              statusText: "Not Found",
            });
          },
        },
        {
          path: "/",
          element: <div>Home Page</div>,
        },
      ],
      { initialEntries: ["/error"] }
    );

    render(<RouterProvider router={router} />);

    // Wait for error element to render due to async loader throwing
    expect(
      await screen.findByText("Oops! Something went wrong")
    ).toBeInTheDocument();
    expect(await screen.findByText("Not Found")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go back to home/i })
    ).toBeInTheDocument();
  });

  it("should render error message and home button when loader throws a standard Error", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/error",
          element: <TriggerLoader />,
          errorElement: (
            <Provider>
              <ErrorElement />
            </Provider>
          ),
          loader: () => {
            throw new Error("Custom error message from loader");
          },
        },
        {
          path: "/",
          element: <div>Home Page</div>,
        },
      ],
      { initialEntries: ["/error"] }
    );

    render(<RouterProvider router={router} />);

    // Wait for error element to render
    expect(
      await screen.findByText("Oops! Something went wrong")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Custom error message from loader")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go back to home/i })
    ).toBeInTheDocument();
  });
});
