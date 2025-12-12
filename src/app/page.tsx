import { Hero } from '@/components/Hero';
import { BentoGrid, BentoItem } from '@/components/BentoGrid';
import { FadeIn } from '@/components/FadeIn';
import { FloatingNav } from '@/components/FloatingNav';
import styles from './page.module.css';
import bentoStyles from '@/components/BentoGrid.module.css';
import { ConnectingLines } from '@/components/ConnectingLines';
import { getData } from '@/lib/directus';

export const revalidate = 60;

export default async function Home() {
  const data = await getData();

  const { bio, experience, projects } = data;

  const experiences = experience.map((exp) => ({
    title: exp.position,
    company: exp.company,
    period: `${exp.date_start ? exp.date_start.substring(0, 4) : ''} - ${exp.present ? 'Present' : (exp.date_end ? exp.date_end.substring(0, 4) : '')}`,
    description: exp.detail,
    tags: exp.skills || []
  }));

  const mappedProjects = projects.map((project) => ({
    title: project.name,
    description: project.detail,
    link: project.project_link,
    image: project.cover && project.cover.id ? `${process.env.IMAGE_ENDPOINT + project.cover.id + '.webp'}` : '',
    tags: project.skills || []
  }));

  const photoUrl = bio.photo && bio.photo.id ? `${process.env.IMAGE_ENDPOINT + bio.photo.id + '.webp'}` : undefined;

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <Hero
        name={bio.name}
        tagline={bio.tagline}
        introduction={bio.introduction}
        photoUrl={photoUrl}
        resumeUrl={bio.resume} // assuming bio.resume is the URL or link
      />

      {/* About Section */}
      <section className={styles.section} id="about">
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>01.</span>
              <h2 className={styles.sectionTitle}>ABOUT</h2>
            </div>
          </FadeIn>

          <BentoGrid className="intro">
            <FadeIn delay={0.2}>
              <BentoItem span="half" height="auto">
                <div className={styles.aboutContent}>
                  <h3 className={styles.aboutTitle}>{bio.tagline} | Architect</h3>
                  <div className={styles.aboutText} dangerouslySetInnerHTML={{ __html: bio.bio }} />
                </div>
              </BentoItem>
            </FadeIn>
            <div className={`${bentoStyles.verticalBento}`}>
              <FadeIn delay={0.3}>
                <BentoItem span="full" height="auto">
                  <div className={styles.infoCard}>
                    <h4 className={styles.infoLabel}>CURRENT ROLE</h4>
                    <p className={styles.infoValue}>{experience[0]?.position || 'Senior Full Stack Engineer'}</p>
                    <p className={styles.infoCompany}>{experience[0]?.company || 'Moladin'}</p>
                  </div>
                </BentoItem>
              </FadeIn>

              <FadeIn delay={0.35}>
                <BentoItem span="full" height="auto">
                  <div className={styles.infoCard}>
                    <h4 className={styles.infoLabel}>SPECIALIZATION</h4>
                    <p className={styles.infoValue}>Fintech, Compliance & Blockchain</p>
                    <p className={styles.infoCompany}>Microservices Architecture</p>
                  </div>
                </BentoItem>
              </FadeIn>

              <FadeIn delay={0.4}>
                <BentoItem span="full" height="auto">
                  <div className={styles.infoCard}>
                    <h4 className={styles.infoLabel}>EDUCATION</h4>
                    <p className={styles.infoValue}>Computer Science</p>
                    <p className={styles.infoCompany}>Soegijapranata Catholic University</p>
                  </div>
                </BentoItem>
              </FadeIn></div>
          </BentoGrid>
        </div>
      </section>

      {/* Experience Section */}
      <section className={styles.section} id="work">
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>02.</span>
              <h2 className={styles.sectionTitle}>EXPERIENCE</h2>
            </div>
          </FadeIn>

          <BentoGrid className={bentoStyles.masonryGrid}>
            <ConnectingLines count={experiences.length} itemPrefix="experience-card" />
            {experiences.map((exp, index) => (
              <FadeIn key={index} delay={0.1 * (index + 1)}>
                <BentoItem span={`${index == 0 ? 'full' : 'half'}`} height="auto">
                  <div className={styles.experienceCard} id={`experience-card-${index}`}>
                    <div className={styles.experienceHeader}>
                      <div>
                        <h3 className={styles.experienceTitle}>{exp.title}</h3>
                        <p className={styles.experienceCompany}>{exp.company}</p>
                      </div>
                      <span className={styles.experiencePeriod}>{exp.period}</span>
                    </div>
                    <div className={styles.experienceDescription} dangerouslySetInnerHTML={{ __html: exp.description }} />
                    <div className={styles.tags}>
                      {exp.tags.map((tag, i) => (
                        <span key={i} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </BentoItem>
              </FadeIn>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Projects Section */}
      <section className={styles.section} id="projects">
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>03.</span>
              <h2 className={styles.sectionTitle}>PROJECTS</h2>
            </div>
          </FadeIn>

          <BentoGrid className={bentoStyles.masonryGrid}>
            {mappedProjects.map((project, index) => (
              <FadeIn key={index} delay={0.1 * (index + 1)}>
                <BentoItem span="third" height="auto">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectCard}
                  >
                    <div className={styles.projectImageWrapper}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className={styles.projectImage}
                      />
                    </div>
                    <div className={styles.projectContent}>
                      <div className={styles.projectHeader}>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <span className={styles.projectArrow}>↗</span>
                      </div>
                      <div className={styles.projectDescription} dangerouslySetInnerHTML={{ __html: project.description }} />
                      <div className={styles.tags}>
                        {project.tags.map((tag, i) => (
                          <span key={i} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </a>
                </BentoItem>
              </FadeIn>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.section} id="contact">
        <div className={styles.container}>
          <FadeIn>
            <div className={styles.contactSection}>
              <h2 className={styles.contactTitle}>LET&apos;S WORK TOGETHER</h2>
              <p className={styles.contactSubtitle}>
                I&apos;m always open to discussing new opportunities, collaborations, or exchanging ideas about architecture and technology.
              </p>
              <div className={styles.contactLinks}>
                <a
                  href="https://github.com/jonathantyar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  GitHub →
                </a>
                <a
                  href="https://gitlab.com/jonathantyar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  Gitlab →
                </a>
                <a
                  href="https://www.linkedin.com/in/jonathantyar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  LinkedIn →
                </a>
                <a
                  href="https://wa.me/6281229480866"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  WhatsApp →
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.footerText}>
            © {new Date().getFullYear()} {bio.name}. Built with Next.js and passion for clean code.
          </p>
        </div>
      </footer>

      {/* Floating Navigation */}
      <FloatingNav />
    </main>
  );
}
