'use client';

import React, { useEffect, useState, useRef } from 'react';

interface ConnectingLinesProps {
    itemPrefix: string;
    count: number;
}

interface Point {
    x: number;
    y: number;
}

export const ConnectingLines: React.FC<ConnectingLinesProps> = ({ itemPrefix, count }) => {
    const [paths, setPaths] = useState<string[]>([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const svgRef = useRef<SVGSVGElement>(null);

    const calculatePaths = () => {
        if (typeof window === 'undefined') return;

        const newPaths: string[] = [];
        const container = svgRef.current?.parentElement;

        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        // Update dimensions to match container exactly, though 100% width/height in CSS usually handles this.
        // We set state to force re-render if needed, but mainly we need the rect for calc.
        setDimensions({ width: containerRect.width, height: containerRect.height });

        for (let i = 0; i < count - 1; i++) {
            const startEl = document.getElementById(`${itemPrefix}-${i}`);
            const endEl = document.getElementById(`${itemPrefix}-${i + 1}`);

            if (startEl && endEl) {
                const startRect = startEl.getBoundingClientRect();
                const endRect = endEl.getBoundingClientRect();

                // Calculate positions relative to the container
                // Start: Bottom Center of Start Element
                const startPoint: Point = {
                    x: startRect.left + startRect.width / 2 - containerRect.left,
                    y: startRect.bottom - containerRect.top
                };

                // End: Top Center of End Element
                const endPoint: Point = {
                    x: endRect.left + endRect.width / 2 - containerRect.left,
                    y: endRect.top - containerRect.top
                };

                // Bezier curve control points
                // We want a curve that goes down from start, and curves to meet end from top
                // Control Point 1: vertical down from start
                const controlPoint1 = {
                    x: startPoint.x,
                    y: startPoint.y + (endPoint.y - startPoint.y) * 0.5
                };

                // Control Point 2: vertical up from end (or matching appropriate curvature)
                const controlPoint2 = {
                    x: endPoint.x,
                    y: endPoint.y - (endPoint.y - startPoint.y) * 0.5
                };

                // If elements are side-by-side or close, we might need to adjust logic, but standard cubic bezier works well for "flow" charts.
                const path = `M ${startPoint.x} ${startPoint.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${endPoint.x} ${endPoint.y}`;
                newPaths.push(path);
            }
        }
        setPaths(newPaths);
    };

    useEffect(() => {
        // Initial calculation
        // Slight delay to ensure layout is settled (especially masonry)
        const timer = setTimeout(calculatePaths, 500);

        const handleResize = () => {
            calculatePaths();
        };

        window.addEventListener('resize', handleResize);

        // Create a resize observer for the container to handle dynamic content changes
        let resizeObserver: ResizeObserver | null = null;
        if (svgRef.current?.parentElement) {
            resizeObserver = new ResizeObserver(() => {
                calculatePaths();
            });
            resizeObserver.observe(svgRef.current.parentElement);
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
            if (resizeObserver) resizeObserver.disconnect();
        };
    }, [count, itemPrefix]);

    return (
        <svg
            ref={svgRef}
            className="connecting-lines"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'visible'
            }}
        >
            {paths.map((path, index) => (
                <path
                    key={index}
                    d={path}
                    fill="none"
                    stroke="#555"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    opacity="0.2"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="24"
                        to="0"
                        dur="1s"
                        repeatCount="indefinite"
                        calcMode="linear"
                    />
                </path>
            ))}
        </svg>
    );
};
