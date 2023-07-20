import React from "react";
import Icon from "./Icon";
import { ObjectId } from "mongodb";

interface BookmarkProps {
  id: ObjectId;
  siteName: string;
  siteURL: string;
  cardColor?: string;
  onDelete: () => void;
}

function urlBuilder(url: string): string {
  let newURL = "";
  if (!url.startsWith("https://")) newURL += "https://";
  newURL += url;
  if (newURL.endsWith("/")) newURL = newURL.substring(0, newURL.length);
  return newURL;
}

export default function Bookmark({
  id,
  siteName,
  siteURL,
  cardColor,
  onDelete,
}: BookmarkProps) {
  const url = urlBuilder(siteURL);

  return (
    <div className="col">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title" style={{ marginBottom: "25px" }}>
            <img src={`${url}/favicon.ico`} style={{ float: "left" }} />
            <span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              {siteName}
            </span>
            <button
              className="btn btn-outline-danger"
              style={{ float: "right" }}
              onClick={async function deleteBookmark() {
                try {
                  await fetch(`http://localhost:5050/record/bookmarks/${id}`, {
                    method: "DELETE",
                  });
                  onDelete();
                } catch (err) {
                  window.alert(`Failed to delete bookmark: ${err}`);
                }
              }}
            >
              <Icon name="trash3" />
            </button>
          </h5>
          <a
            className="btn"
            style={{
              backgroundColor: cardColor,
              width: "100%",
            }}
            href={url}
            target="_blank"
          >
            Go <Icon name="chevron-double-right" />
          </a>
        </div>
      </div>
    </div>
  );
}
