document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("hop", "0.75, 0, 0.2, 1");

  const introCards = document.querySelectorAll(".intro-cards .card");
  const introCardsCount = introCards.length;
  const radius = window.innerWidth < 1000 ? 150 : 225;

  introCards.forEach((card, i) => {
    const angle = (i / introCardsCount) * Math.PI * 2 - Math.PI / 2;

    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    gsap.set(card, {
      x: x,
      y: y,
      rotation: (angle * 180) / Math.PI + 90,
      tranformOrigin: "center center",
      scale: 0,
    });
  });

  const outroCards = document.querySelectorAll(".outro-cards .card");

  const firstIntroCardAngle = (0 / introCardsCount) * Math.PI * 2 - Math.PI / 2;
  const firstInroCardX = radius * Math.cos(firstIntroCardAngle);
  const firstInroCardY = radius * Math.sin(firstIntroCardAngle);

  outroCards.forEach((card, index) => {
    gsap.set(card, {
      x: firstInroCardX,
      y: firstInroCardY,
      rotation: (firstIntroCardAngle * 180) / Math.PI + 90,
      rotationY: index === 0 ? 0 : 180,
      tranformPerspective: 800,
      tranformOrigin: "center center",
      zIndex: 5 - index,
      opacity: 0,
    });
  });

  const tl = gsap.timeline({ delay: 0.5 });

  tl.to(introCards, {
    scale: 1,
    duration: 1,
    ease: "hop",
    stagger: 0.1,
    onComplete: () => {
      gsap.set(outroCards, { opacity: 1 });
      gsap.set(outroCards[0], { scale: 1, rotation: 0 });
      gsap.set(outroCards[1], { scale: 0.1, rotation: -90 });
      gsap.set(outroCards[2], { scale: 0.1, rotation: -45 });
      gsap.set(outroCards[3], { scale: 0.1, rotation: 90 });
      gsap.set(outroCards[4], { scale: 0.1, rotation: 45 });
    },
  });

  tl.to(introCards, {
    scale: 0,
    duration: 1,
    stagger: 0.1,
    ease: "hop",
  })
    .to(
      outroCards,
      {
        y: window.innerWidth < 1000 ? 0 : -125,
        duration: 1.5,
        ease: "hop",
      },
      "-=0.25"
    )
    .to(
      outroCards[0],
      {
        rotationY: 180,
        duration: 1.5,
        ease: "hop",
      },
      "<"
    )
    .to(
      outroCards,
      {
        x: (index) => {
          const viewportWidth = window.innerWidth;
          const cardRect = outroCards[0].getBoundingClientRect();
          const cardWidth = cardRect.width;
          const padding = viewportWidth < 1000 ? 16 : 32;
          const maxLeftPos = -(viewportWidth / 2) + padding + cardWidth / 2;
          const maxRightPos = viewportWidth / 2 - padding - cardWidth / 2;

          const positions = [
            0,
            maxLeftPos,
            maxLeftPos / 2,
            maxRightPos / 2,
            maxRightPos,
          ];
          return positions[index];
        },
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "hop",
      },
      "<"
    )
    .to(
      "nav",
      {
        y: 0,
        duration: 1,
        ease: "hop",
      },
      "-=1"
    );

  const heroFooterTl = gsap.timeline({ delay: 0.5 });

  heroFooterTl
    .to(".hero-footer .logo img", {
      y: "0%",
      duration: 1,
      ease: "hop",
    })
    .to(
      ".hero-footer .logo",
      {
        scale: 1,
        duration: 1.25,
        ease: "hop",
      },
      "+=2.25"
    );

  const cardUpdatePosition = () => {
    const viewportWidth = window.innerWidth;
    const cardRect = outroCards[0].getBoundingClientRect();
    const cardWidth = cardRect.width;
    const padding = viewportWidth < 1000 ? 16 : 32;
    const maxLeftPos = -(viewportWidth / 2) + padding + cardWidth / 2;
    const maxRightPos = viewportWidth / 2 - padding - cardWidth / 2;

    const positions = [
      0,
      maxLeftPos,
      maxLeftPos / 2,
      maxRightPos / 2,
      maxRightPos,
    ];
    outroCards.forEach((card, index) => {
      gsap.set(card, { x: positions[index] });
    });
  };

  window.addEventListener("resize", cardUpdatePosition);
});
