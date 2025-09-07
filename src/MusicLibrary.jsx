import { useState } from "react";
import "./App.css";

const initialSongs = [
  { id: 1, title: "Let It Be", artist: "The Beatles", album: "Let It Be" },
  { id: 2, title: "Come Together", artist: "The Beatles", album: "Abbey Road" },
  {
    id: 3,
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
  },
  {
    id: 4,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
  },
  { id: 5, title: "Billie Jean", artist: "Michael Jackson", album: "Thriller" },
  { id: 6, title: "Thriller", artist: "Michael Jackson", album: "Thriller" },
  { id: 7, title: "Imagine", artist: "John Lennon", album: "Imagine" },
  { id: 8, title: "Smooth", artist: "Santana", album: "Supernatural" },
];

export default function MusicLibrary({ user, onLogout }) {
  if (!user) return <p>Please login.</p>;

  const isAdmin = user.role === "admin";
  console.log("Current user:", user);
console.log("isAdmin:", isAdmin);
  const [songs, setSongs] = useState(initialSongs);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [groupBy, setGroupBy] = useState("");

  const handleAddSong = () => {
    if (title && artist && album) {
      const newSong = { id: Date.now(), title, artist, album };
      setSongs([...songs, newSong]);
      setTitle("");
      setArtist("");
      setAlbum("");
    }
  };

  const handleDelete = (id) => setSongs(songs.filter((s) => s.id !== id));

  const filteredSongs = songs
    .filter((song) => {
      if (!search) return true;
      const term = search.toLowerCase();
      if (filterBy) return song[filterBy].toLowerCase().includes(term);
      return (
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term) ||
        song.album.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => (sortBy ? a[sortBy].localeCompare(b[sortBy]) : 0));

  const groupedSongs = groupBy
    ? filteredSongs.reduce((acc, song) => {
        const key = song[groupBy];
        if (!acc[key]) acc[key] = [];
        acc[key].push(song);
        return acc;
      }, {})
    : { All: filteredSongs };

  return (
    <div className="App">
    
    
      <h1>🎵 Music Library</h1>

      <div className="controls">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
       
       
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="">Group By</option>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
      </div>

      {isAdmin && (
        <div className="add-song">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <input
            placeholder="Album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
          <button onClick={handleAddSong}>Add Song</button>
        </div>
      )}

      <div className="library">
        {Object.keys(groupedSongs).map((group) => (
          <div key={group} className="song-group">
            {groupBy && <h2>{group}</h2>}
            {groupedSongs[group].map((song) => (
              <div key={song.id} className="song">
                <span>
                  {song.title} — {song.artist} [{song.album}]
                </span>
                {isAdmin && (
                  <button onClick={() => handleDelete(song.id)}>Delete</button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

 