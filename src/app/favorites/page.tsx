import PageHeading from '@/components/page-heading';
import NavigationBar from '../../components/navigation-bar'

export default function Favorites() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <main className="">
        <div className="container">
          <PageHeading>
            Favorites
          </PageHeading>
        </div>
      </main>
    </>
  );
}
