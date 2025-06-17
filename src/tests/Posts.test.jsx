import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./../App";
import sampleData from "./../sampleData";
import Post from "./../components/Post";

/* mocks */
const mockClap = vi.fn();

vi.mock("./../components/PostList", () => ({
  default: ({ items, clapAction }) => {
    mockClap(clapAction);
    return (
      <div data-testid="post-list">
        <span data-testid="items-count">{items?.length}</span>
        <button
          data-testid="clap-test"
          onClick={() => (clapAction ? clapAction(1) : null)}
        >
          Test Clap
        </button>
      </div>
    );
  },
}));

// PostComment'i mock'la
vi.mock("./../components/PostComment", () => ({
  default: (props) => {
    const comment = Object.values(props)[0];
    return (
      <div data-testid={`comment-${comment.id}`}>
        {comment.username}: {comment.text}
      </div>
    );
  },
}));

const mockItem = {
  id: 1,
  imageUrl: "https://example.com/image.jpg",
  username: "testuser",
  timestamp: "2024-01-01",
  claps: 15,
  comments: [
    { id: 1, username: "commenter1", text: "Nice post!" },
    { id: 2, username: "commenter2", text: "Great photo!" },
  ],
};

const mockOnClap = vi.fn();

/*  */

test("PostList componentı import edilip kullanılmış mı?", () => {
  render(<App />);
  const postList = screen.getByTestId("post-list");
  expect(postList).toBeInTheDocument();
});

test("PostList componentına doğru data propsu iletilmiş mi?", () => {
  render(<App />);
  const itemsCount = screen.getByTestId("items-count");
  expect(itemsCount).toHaveTextContent(sampleData.length.toString());
});

test("App, PostList'e clapAction props'unu aktarıyor mu?", () => {
  render(<App />);
  expect(mockClap).toHaveBeenCalled();
  expect(typeof mockClap.mock.calls[0][0]).toBe("function");
});

test("receives and uses props correctly from PostList", () => {
  render(<Post item={mockItem} onClap={mockOnClap} />);

  // Props'tan gelen veriler doğru kullanılıyor mu?
  expect(screen.getByRole("img")).toHaveAttribute("src", mockItem.imageUrl);
  expect(screen.getByText(mockItem.username)).toBeInTheDocument();
  expect(screen.getByText(mockItem.timestamp)).toBeInTheDocument();
  expect(screen.getByText(mockItem.claps.toString())).toBeInTheDocument();
});

test("displays all post data correctly", () => {
  render(<Post item={mockItem} onClap={mockOnClap} />);

  // Tüm post verileri gösteriliyor mu?
  expect(screen.getByText("testuser")).toBeInTheDocument();
  expect(screen.getByText("2024-01-01")).toBeInTheDocument();
  expect(screen.getByText("15")).toBeInTheDocument();

  // Clap butonu var mı?
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("calls onClap with correct post id when clap button is clicked", () => {
  render(<Post item={mockItem} onClap={mockOnClap} />);

  const clapButton = screen.getByRole("button");
  fireEvent.click(clapButton);

  // onClap doğru id ile çağrıldı mı?
  expect(mockOnClap).toHaveBeenCalledWith(mockItem.id);
  expect(mockOnClap).toHaveBeenCalledTimes(1);
});

test("renders comments using map with correct keys and props", () => {
  render(<Post item={mockItem} onClap={mockOnClap} />);

  // Tüm yorumlar render edilmiş mi?
  expect(screen.getByTestId("comment-1")).toBeInTheDocument();
  expect(screen.getByTestId("comment-2")).toBeInTheDocument();

  // Yorum içerikleri doğru mu?
  expect(screen.getByText("commenter1: Nice post!")).toBeInTheDocument();
  expect(screen.getByText("commenter2: Great photo!")).toBeInTheDocument();
});
