import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Newsletter from "../Newsletter";

// Mock the API
vi.mock("../../../../core/api/subscribe", () => ({
  subscribeEmail: vi.fn(),
}));

import { subscribeEmail } from "../../../../core/api/subscribe";

const mockSubscribe = vi.mocked(subscribeEmail);

describe("Newsletter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock body classList
    document.body.classList.add = vi.fn();
    document.body.classList.remove = vi.fn();
  });

  it("renders the newsletter form", () => {
    render(<Newsletter />);
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /SUBSCRIBE/i })).toBeInTheDocument();
    expect(screen.getByText(/Never miss a release/i)).toBeInTheDocument();
  });

  it("disables input and button while loading", async () => {
    const user = userEvent.setup();
    mockSubscribe.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ success: true }), 100)),
    );

    render(<Newsletter />);
    const input = screen.getByPlaceholderText("Email address");
    const button = screen.getByRole("button", { name: /SUBSCRIBE/i });

    await user.type(input, "test@example.com");
    await user.click(button);

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Sending…");
  });

  it("shows success state after successful subscription", async () => {
    const user = userEvent.setup();
    mockSubscribe.mockResolvedValue({ success: true });

    render(<Newsletter />);
    const input = screen.getByPlaceholderText("Email address");
    const button = screen.getByRole("button", { name: /SUBSCRIBE/i });

    await user.type(input, "test@example.com");
    await user.click(button);

    expect(input).toHaveAttribute("placeholder", "You're subscribed");
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
    expect(screen.getByText(/You're on the list/)).toBeInTheDocument();
  });

  it("shows error state after failed subscription", async () => {
    const user = userEvent.setup();
    mockSubscribe.mockResolvedValue({ success: false, error: "Failed" });

    render(<Newsletter />);
    const input = screen.getByPlaceholderText("Email address");
    const button = screen.getByRole("button", { name: /SUBSCRIBE/i });

    await user.type(input, "test@example.com");
    await user.click(button);

    expect(button).toHaveTextContent("Subscribe");
    expect(input).toBeEnabled();
  });
});
