import React, { useState, useEffect } from "react";
import Viewpane from "../components/Viewpane";
import Bookmark from "../components/Bookmark";
import Icon from "../components/Icon";
import { CreateBookmarkModal } from "../components/Modals";
import { ObjectId } from "mongodb";

interface BookmarkStr {
  _id: ObjectId;
  name: string;
  url: string;
  color: string;
}

export default function Bookmarks() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<BookmarkStr[]>([]);

  async function fetchBookmarks() {
    const response = await fetch("http://localhost:5050/record/bookmarks");

    if (!response.ok) {
      window.alert(
        `An error occured getting bookmarks: ${response.statusText}`
      );
      return;
    }

    const bookmarks = await response.json();
    return bookmarks;
  }

  useEffect(() => {
    async function initialFetchBookmarks() {
      const data = await fetchBookmarks();
      setBookmarks(data);
    }
    initialFetchBookmarks();
  }, []);

  async function handleUpdate() {
    const data = await fetchBookmarks();
    setBookmarks(data);
  }

  function bookmarkList() {
    if (bookmarks.length > 0) {
      return bookmarks.map((bookmark) => {
        return (
          <Bookmark
            key={bookmark._id.toString()}
            id={bookmark._id}
            siteName={bookmark.name}
            siteURL={bookmark.url}
            cardColor={bookmark.color}
            onDelete={handleUpdate}
          />
        );
      });
    }
  }

  return (
    <Viewpane>
      <h1 style={{ marginBottom: "25px" }}>
        Bookmarks
        <button
          type="button"
          className="btn btn-outline-secondary"
          style={{ float: "right" }}
          onClick={() => setModalOpen(!modalOpen)}
        >
          <Icon name="bookmark-plus" />
        </button>
      </h1>
      {modalOpen && (
        <CreateBookmarkModal open={setModalOpen} onAdd={handleUpdate} />
      )}
      <div className="row row-cols-1 row-cols-md-4 g-4">{bookmarkList()}</div>
    </Viewpane>
  );
}
