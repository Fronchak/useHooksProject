import AlbumType from "../../types/AlbumType";
import './styles.css';

type Props = {
  album: AlbumType;
}

const AlbumCard = ({ album }: Props) => {

  return (
    <div className="alert alert-dark mb-0" role="alert">
      { album.title }
    </div>
  );
}

export default AlbumCard;
