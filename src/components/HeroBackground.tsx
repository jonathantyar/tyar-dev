'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export const HeroBackground: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {/* Animated cursor follower */}
            <motion.div
                className={styles.cursorFollower}
                animate={{
                    x: mousePosition.x - 12,
                    y: mousePosition.y - 12,
                }}
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 200,
                }}
            />

            {/* Decorative grid */}
            <div className={styles.grid}>
                {Array.from({ length: 100 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={styles.gridCell}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.05 }}
                        transition={{
                            delay: (i % 10) * 0.05,
                            duration: 0.5,
                        }}
                    />
                ))}
            </div>
        </>
    );
};
