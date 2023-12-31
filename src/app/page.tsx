import directus from "@/lib/directus"
import { formatDate } from "@/lib/helper";
import { schema } from "@/types/cms";
import Image from "next/image";
import CursorBackground from "./cursorBackground";

async function getData() {
  return directus.query<schema>(`
  query {
    bio {
      name
      tagline
      bio
      introduction
      photo
      resume
    }
    social {
      name
      link
      icon
    }
    experience(sort: ["-date_start"]) {
      position
      company
      company_website
      present
      date_start
      date_end
      skills
      detail
    }
    projects {
      name
      cover
      detail
      project_link
      skills
      people
    }
  }`)
}


export default async function Home() {
  const { bio, social, experience, projects } = await getData();

  return (
    <div className="group/spotlight relative">
      <CursorBackground />
      <div className="z-2 mx-auto min-h-screen max-w-screen-xl px-6 py-12  md:px-12 md:py-20 lg:px-24 lg:py-0">
        <a
          href="#content"
          className="absolute left-0 top-0 block -translate-x-full rounded bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white focus-visible:translate-x-0"
        >
          Skip to Content
        </a>
        <div className="lg:flex lg:justify-between lg:gap-4">
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <Image
                alt=""
                loading="lazy"
                width={500}
                height={500}
                decoding="async"
                data-nimg={1}
                className="w-3/4 rounded-lg border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1 mb-12"
                style={{ color: "transparent" }}
                src={process.env.IMAGE_ENDPOINT + bio.photo + ".png"}
              />
              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                <a href="/">{bio.name}</a>
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                {bio.tagline}
              </h2>
              <p className="mt-4 max-w-xs leading-normal">
                {bio.introduction}
              </p>
              <a href={bio.resume} target="_blank" rel="noreferrer" className="my-8 bg-teal-400/10 hover:bg-teal-200/10 transition text-teal-300 fill-teal-300 font-bold px-8 py-2 rounded-md inline-flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" /></svg>
                Resume
              </a>
              <nav className="nav hidden lg:block" aria-label="In-page jump links">
                <ul className="mt-16 w-max">
                  <li>
                    <a
                      className="group flex items-center py-3 active"
                      href="#about"
                    >
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none" />
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                        About
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center py-3" href="#experience">
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none" />
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                        Experience
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center py-3" href="#projects">
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none" />
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                        Projects
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
              {social.length > 0 && social.map((item, index) => (
                <li className="mr-5 text-xs" key={index}>
                  <a
                    className="block text-white hover:text-slate-200"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    <div className="h-6 w-6 fill-white hover:fill-slate-200" dangerouslySetInnerHTML={{ __html: item.icon.replace('<svg', `<svg width="100%" height="100%"`) }} />
                  </a>
                </li>
              ))}
            </ul>
          </header>
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            <section
              id="about"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-24 lg:scroll-mt-24"
              aria-label="About me"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  About
                </h2>
              </div>
              <div>
                <div dangerouslySetInnerHTML={{ __html: bio.bio }} />
              </div>
            </section>
            <section
              id="experience"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="Work experience"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Experience
                </h2>
              </div>
              <div>
                <ol className="group/list">
                  {experience.length > 0 && experience.map((item, index) => (
                    <li className="mb-12" key={index}>
                      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                        <header
                          className="z-10 mb-2 mt-1 text-xs font-semibold text-slate-500 sm:col-span-2"
                        >
                          {formatDate(item.date_start, "MMM YYYY")} — {item.present ? 'Present' : formatDate(item.date_end, "MMM YYYY")}
                        </header>
                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-200">
                            <div>
                              <a
                                className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300  group/link text-base"
                                href={item.company_website || '#'}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={item.position + ' at ' + item.company}
                              >
                                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                                <span>
                                  {item.position} · {/* */}{" "}
                                  <span className="inline-block">
                                    {item.company}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                </span>
                              </a>
                            </div>
                          </h3>
                          <div className="mt-2 text-sm leading-normal" dangerouslySetInnerHTML={{ __html: item.detail }} />
                          <ul
                            className="mt-2 flex flex-wrap"
                            aria-label="Technologies used"
                          >
                            {item.skills.length > 0 && item.skills.map((skill, index) => (
                              <li className="mr-1.5 mt-2" key={index}>
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
                                  {skill}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
            <section
              id="projects"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="Selected projects"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Projects
                </h2>
              </div>
              <div>
                <ul className="group/list">
                  {projects.length > 0 && projects.map((item, index) => (
                    <li className="mb-12" key={index}>
                      <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                        <div className="z-10 sm:order-2 sm:col-span-6">
                          <h3>
                            <a
                              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300  group/link text-base"
                              href={item.project_link || '#'}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Build a Spotify Connected App"
                            >
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                              <span>
                                {item.name}{/* */}{" "}
                                <span className="inline-block">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              </span>
                            </a>
                          </h3>
                          <div className="mt-2 text-sm leading-normal" dangerouslySetInnerHTML={{ __html: item.detail }} />
                          <ul
                            className="mt-2 flex flex-wrap"
                            aria-label="Technologies used"
                          >
                            {item.skills.length > 0 && item.skills.map((skill, index) => (
                              <li className="mr-1.5 mt-2" key={index}>
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
                                  {skill}
                                </div>
                              </li>
                            ))}
                          </ul>
                          <ul
                            className="mt-2 flex flex-wrap"
                            aria-label="People i worked with"
                          >
                            {item.people.length > 0 && item.people.map((skill, index) => (
                              <li className="mr-1.5 mt-2" key={index}>
                                <div className="flex items-center rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium leading-5 text-blue-300 ">
                                  {skill}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Image
                          alt=""
                          loading="lazy"
                          width={200}
                          height={48}
                          decoding="async"
                          data-nimg={1}
                          className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                          style={{ color: "transparent" }}
                          src={process.env.IMAGE_ENDPOINT + item.cover + ".png"}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
              <p>
                Made in with {/* */}{" "}
                <span
                  className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                >
                  Love
                </span>
                {" "}and{" "}
                <span
                  className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                >
                  Passionate
                </span>
                {" "}in coding.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>

  )
}
