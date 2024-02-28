import PageHeading from '@/components/page-heading';
import NavigationBar from '../../components/navigation-bar'

export default function About() {
  return (
    <main className="">
      <NavigationBar></NavigationBar>
      <div className="container  max-w-screen-xl">
        <PageHeading>
          About
        </PageHeading>
      </div>
    </main>
  );
}
