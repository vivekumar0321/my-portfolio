export const handleMouseMove = (e) => {
    const card = e.currentTarget;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = (x - centerX) / 10;
    const rotateX = (centerY - y) / 10;

    card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
        scale(1.03)
    `;
};

export const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0)
        scale(1)
    `;
};