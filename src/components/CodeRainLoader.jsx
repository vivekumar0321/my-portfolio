import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function DeveloperConfetti({
    autoStart = true,
    duration = 10000, // 10 seconds
    particleCount = 2,
    colors = [
        "#61DAFB", // React Blue
        "#149ECA",
        "#38BDF8",
        "#0EA5E9",
        "#FFFFFF",
    ],
}) {
    useEffect(() => {
        if (!autoStart) return;

        let animationFrame;

        const end = Date.now() + duration;

        const randomInRange = (min, max) => {
            return Math.random() * (max - min) + min;
        };

        const frame = () => {
            if (Date.now() > end) return;

            // Left Side
            confetti({
                particleCount,
                angle: 60,
                spread: 60,
                startVelocity: 25,
                gravity: 0.7,
                drift: randomInRange(-0.2, 0.2),
                scalar: randomInRange(0.6, 1),
                ticks: 250,
                origin: {
                    x: 0,
                    y: randomInRange(0, 0.3),
                },
                colors,
            });

            // Right Side
            confetti({
                particleCount,
                angle: 120,
                spread: 60,
                startVelocity: 25,
                gravity: 0.7,
                drift: randomInRange(-0.2, 0.2),
                scalar: randomInRange(0.6, 1),
                ticks: 250,
                origin: {
                    x: 1,
                    y: randomInRange(0, 0.3),
                },
                colors,
            });

            // Top Rain
            confetti({
                particleCount: 1,
                startVelocity: 0,
                gravity: randomInRange(0.35, 0.6),
                drift: randomInRange(-0.4, 0.4),
                scalar: randomInRange(0.4, 1),
                ticks: 350,
                origin: {
                    x: Math.random(),
                    y: -0.1,
                },
                colors,
            });

            animationFrame = requestAnimationFrame(frame);
        };

        frame();

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [autoStart, duration, particleCount, colors]);

    return null;
}