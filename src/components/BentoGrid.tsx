import React from 'react';
import styles from './BentoGrid.module.css';

interface BentoItemProps {
    children: React.ReactNode;
    className?: string;
    span?: 'full' | 'half' | 'third' | 'two-thirds';
    height?: 'small' | 'medium' | 'large' | 'auto';
}

export const BentoItem: React.FC<BentoItemProps> = ({
    children,
    className = '',
    span = 'half',
    height = 'medium'
}) => {
    return (
        <div className={`${styles.bentoItem} ${styles[span]} ${styles[height]} ${className}`}>
            {children}
        </div>
    );
};

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
    return (
        <div className={`${styles.bentoGrid} ${className}`}>
            {children}
        </div>
    );
};
