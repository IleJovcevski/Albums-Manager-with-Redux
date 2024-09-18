import { GoTrashcan, GoPencil } from "react-icons/go";
import { useDeleteAlbumMutation, useRenameAlbumMutation } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import PhotosList from "./PhotosList";
import { useCallback, useState } from "react";

function AlbumsListItem({ album }) {
  const [deleteAlbum, results] = useDeleteAlbumMutation();
  const [renameAlbum, result] = useRenameAlbumMutation();
  const [newName, setNewName] = useState(album.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteAlbum = useCallback(() => {
    deleteAlbum(album);
  }, [album, deleteAlbum]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      renameAlbum({ id: album.id, userId: album.userId, title: newName });
      setIsEditing((current) => !current);
    },
    [album, newName, renameAlbum]
  );

  const renameForm = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newName}
        onChange={handleNameChange}
        className="border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1.4 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </form>
  );

  const header = (
    <>
      <Button
        className="mr-2"
        loading={results.isLoading}
        onClick={handleDeleteAlbum}
      >
        <GoTrashcan />
      </Button>
      <Button
        className="mr-2"
        loading={result.isLoading}
        onClick={() => setIsEditing((current) => !current)}
      >
        <GoPencil />
      </Button>
      {isEditing ? renameForm : album.title}
    </>
  );

  return (
    <ExpandablePanel header={header} key={album.id}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
