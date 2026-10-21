import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import ArchiveContainer from "../ArchiveContainer";
import { CartProvider } from "../../../cart/context/CartContext";

vi.mock("../../data/sneakerRegistry", () => ({
  SNEAKER_REGISTRY: [
    {
      id: 1,
      sku: "NK-001",
      name: "Nike Air Force 1",
      brand: "NIKE",
      color: ["WHITE"],
      price: 30000,
      priceFormatted: "₦30,000",
      status: "AVAILABLE",
      image: "/test1.webp",
    },
    {
      id: 2,
      sku: "JD-001",
      name: "Jordan 4 Military Black",
      brand: "JORDAN",
      color: ["BLACK", "WHITE"],
      price: 60000,
      priceFormatted: "₦60,000",
      status: "PREMIUM",
      image: "/test2.webp",
    },
    {
      id: 3,
      sku: "AD-001",
      name: "Adidas Samba OG",
      brand: "ADIDAS",
      color: ["WHITE", "BLACK"],
      price: 35000,
      priceFormatted: "₦35,000",
      status: "AVAILABLE",
      image: "/test3.webp",
    },
  ],
}));

function renderWithCart(ui: ReactNode) {
  return render(
    <MemoryRouter>
      <CartProvider>{ui}</CartProvider>
    </MemoryRouter>,
  );
}

describe("ArchiveContainer", () => {
  it("renders all sneakers initially", () => {
    renderWithCart(<ArchiveContainer />);
    expect(screen.getByText("Nike Air Force 1")).toBeInTheDocument();
    expect(screen.getByText("Jordan 4 Military Black")).toBeInTheDocument();
    expect(screen.getByText("Adidas Samba OG")).toBeInTheDocument();
  });

  it("filters by search term", () => {
    vi.useFakeTimers();
    renderWithCart(<ArchiveContainer />);

    const searchInput = screen.getByPlaceholderText("Search Samba, Jordan 4, 9060…");
    fireEvent.change(searchInput, { target: { value: "Nike" } });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText("Nike Air Force 1")).toBeInTheDocument();
    expect(screen.queryByText("Jordan 4 Military Black")).not.toBeInTheDocument();
    expect(screen.queryByText("Adidas Samba OG")).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it("filters by brand chip", () => {
    renderWithCart(<ArchiveContainer />);

    const brandChip = screen.getByRole("button", { name: "Jordan" });
    fireEvent.click(brandChip);

    expect(screen.queryByText("Nike Air Force 1")).not.toBeInTheDocument();
    expect(screen.getByText("Jordan 4 Military Black")).toBeInTheDocument();
    expect(screen.queryByText("Adidas Samba OG")).not.toBeInTheDocument();
  });

  it("shows page title and live count", () => {
    renderWithCart(<ArchiveContainer />);
    expect(screen.getByText("The archive")).toBeInTheDocument();
    expect(screen.getByText("3 pairs")).toBeInTheDocument();
  });

  it("renders filter controls", () => {
    renderWithCart(<ArchiveContainer />);
    expect(
      screen.getByPlaceholderText("Search Samba, Jordan 4, 9060…"),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Sort: Featured")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
  });
});
