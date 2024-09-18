import { useFetchAlbumsQuery, useCreateAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [createAlbum, results] = useCreateAlbumMutation();

  const handleCreateAlbum = () => {
    createAlbum(user);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" repetitions={3} />;
  } else if (error) {
    content = <div>"Error Message"</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-cetner justify-between">
        <h3 className="text-lg font-bold">List of albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleCreateAlbum}>
          + Create Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
