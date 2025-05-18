import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostCard from "./PostCard";

describe("PostCard Component", () => {
  const mockPost = {
    id: "1",
    content: "This is a test post",
    imageUrl: "https://via.placeholder.com/150",
    createdAt: new Date().toISOString(),
    user: { uid: "123", displayName: "Test User" },
  };

  const mockProps = {
    post: mockPost,
    currentUserUid: "123",
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    onSave: jest.fn(),
    onCancel: jest.fn(),
    isEditing: false,
    editedContent: "",
    setEditedContent: jest.fn(),
  };

  test("renders post content", () => {
    render(<PostCard {...mockProps} />);

    // Check if the post content is rendered
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();

    // Check if the author's name is rendered
    expect(screen.getByText(mockPost.user.displayName)).toBeInTheDocument();

    // Check if the image is rendered
    expect(screen.getByAltText("Post")).toBeInTheDocument();
  });

  test("calls onEdit when edit button is clicked", () => {
    render(<PostCard {...mockProps} />);

    const editButton = screen.getByText("⋯");
    fireEvent.click(editButton);

    expect(mockProps.onEdit).toHaveBeenCalledWith(mockPost);
  });
});