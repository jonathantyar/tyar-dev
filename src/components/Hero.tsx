import React from 'react';
import styles from './Hero.module.css';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';

interface HeroProps {
    name?: string;
    tagline?: string;
    introduction?: string;
    photoUrl?: string;
    resumeUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
    name = "JONATHAN TYAR",
    tagline = "SENIOR FULL STACK ENGINEER",
    introduction = "Specialized in financial technology and web development. Building scalable solutions at the intersection of finance and technology.",
    photoUrl = "https://jonathan.tyar.dev/_next/image?url=https%3A%2F%2Funpjlymmrtyvhfarxtng.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fcms%2F6baa8b6b-9afc-477b-ade8-a3b80a215dbf.jpg&w=1080&q=75",
    resumeUrl = "https://drive.google.com/file/d/1h4CR-hJ74TTBBjGYdYydVdbTkInLXxqK/view?usp=sharing"
}) => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <HeroBackground />
                <HeroContent
                    name={name}
                    tagline={tagline}
                    introduction={introduction}
                    photoUrl={photoUrl}
                    resumeUrl={resumeUrl}
                />
            </div>
        </section>
    );
};
