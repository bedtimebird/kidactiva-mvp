import SearchBar from '../components/SearchBar'; // Import the component

export default function Home() {
  return (
    <main className="main">
      <h1 className="title">
        Find Your Child's Next Adventure in Vancouver
      </h1>

      {/* This is where you render the component */}
      <SearchBar />
    </main>
  );
}