import PageHeading from "@/components/page-heading";
import NavigationBar from "../../components/navigation-bar";
import Image from "next/image";

export default function About() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <main>
        <div className="container max-w-screen-xl">
          <PageHeading>About</PageHeading>
          <div className="flex flex-wrap w-full justify-center items-center mt-8">
            <Image
              src="/headshot.JPG"
              width={500}
              height={500}
              alt="Picture of the author"
              className="rounded-lg max-w-64"
            />
          </div>
          <div className="flex flex-wrap w-full justify-center items-center my-8">
            <div className="max-w-screen-lg px-1">
              <p className="my-3">
                I&#39;m a software engineer currently living in Chicago and
                working at Hudl on their video platform team. In addition to my
                professional work, I enjoy creating personal projects and
                learning more about software development. If you are interested
                in seeing more of my work, check out my{" "}
                <a target="_blank" href="https://github.com/timroty">
                  GitHub
                </a>
                !
              </p>
              <p className="my-3">
                I graduated from the University of Nebraska-Lincoln&#39;s Raikes
                School with a Bachelor&#39;s in Software Engineering and minors
                in Business and Mathematics. Beyond software, I stay active and
                competitive through running, weight lifting, and playing sports
                like disc golf.
              </p>
              <p className="my-3">
                My goal for this site is to provide a creative outlet that
                serves as a fun challenge in thoughtful expression, as well as
                to practice and learn full-stack development skills. It&#39;s an
                ongoing project that I plan to continue to build on. While you
                are visiting, take a moment to check out my favorites and enjoy
                reading through my posts!
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
