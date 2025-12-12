'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

interface HeroContentProps {
    name: string;
    tagline: string;
    introduction: string;
    photoUrl: string;
    resumeUrl: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({
    name,
    tagline,
    introduction,
    photoUrl,
    resumeUrl
}) => {
    const titleVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.5,
                ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
            },
        }),
    };

    return (
        <div className={styles.content}>
            {/* Profile Picture */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number] }}
                className={styles.profileWrapper}
            >
                <img
                    src={photoUrl}
                    alt={name}
                    className={styles.profileImage}
                />
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                className={styles.titleWrapper}
            >
                <h1 className={styles.title}>
                    {name.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            custom={index}
                            variants={letterVariants}
                            initial="hidden"
                            animate="visible"
                            className={styles.letter}
                            style={{ '--letter-index': index } as React.CSSProperties}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </h1>
            </motion.div>

            <motion.div
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className={styles.subtitle}
            >
                <div className={styles.roleWrapper}>
                    <span className={styles.bracket}>{'['}</span>
                    <span className={styles.role}>{tagline.toUpperCase()}</span>
                    <span className={styles.bracket}>{']'}</span>
                </div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className={styles.description}
            >
                {introduction}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className={styles.cta}
            >
                <a href="#work" className={styles.ctaButton}>
                    VIEW MY WORK
                    <span className={styles.arrow}>→</span>
                </a>
                <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaButtonSecondary}
                >
                    DOWNLOAD RESUME
                    <span className={styles.arrow}>↓</span>
                </a>
            </motion.div>

            {/* Scroll indicator - Client side because it drives animation loops */}
            <motion.div
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <motion.div
                    className={styles.scrollLine}
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>
        </div>
    );
};
