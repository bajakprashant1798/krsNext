import Link from 'next/link';
import React from 'react';

interface PrimaryButtonProps {
    label: string;
    href: string;
    className?: string; // Add className prop for flexibility
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, href, className = "" }) => {
    return (
        <Link href={href} className={`inline-flex items-center justify-center px-8 py-3 bg-[var(--primary-color)] text-white font-bold uppercase tracking-wider hover:bg-black hover:text-[var(--primary-color)] border border-[var(--primary-color)] transition-all duration-300 rounded-full ${className}`}>
            {label}
        </Link>
    );
};

export default PrimaryButton;
