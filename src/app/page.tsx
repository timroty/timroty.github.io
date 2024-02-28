import NavigationBar from '../components/navigation-bar'

export default function Home() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <main className="container max-w-screen-xl">
        <h1 className="text-5xl font-bold mt-32">
          Tim Roty
        </h1>
        <p className="text-md mt-4">
          Software Developer
        </p>
      </main>
    </>
  );
}
