import { GoPencil, GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { deleteUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";
import { editUser } from "../store/thunks/editUser";
import { useCallback, useState } from "react";

function UserListItem({ user }) {
  const [doDeleteUser, isDeletingUser, errorDeletingUser] = useThunk(
    deleteUser
  );
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);

  const [doEditUser, isEditingUser, errorEditingUser] = useThunk(editUser);

  const handleDelete = () => {
    doDeleteUser(user);
  };

  const handleEdit = useCallback(
    (event) => {
      event.preventDefault();
      doEditUser({ id: user.id, name: newName });
      setIsEditing((current) => !current);
    },
    [user, newName, doEditUser]
  );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const editingForm = (
    <form onSubmit={handleEdit}>
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
      <Button className="mr-3" loading={isDeletingUser} onClick={handleDelete}>
        <GoTrashcan />
      </Button>
      <Button
        className="mr-3"
        loading={isEditingUser}
        onClick={() => setIsEditing((current) => !current)}
      >
        <GoPencil />
      </Button>
      {errorDeletingUser && <div>Error deleting user!</div>}
      {errorEditingUser && <div>Error editing user!</div>}
      {isEditing ? editingForm : user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UserListItem;
