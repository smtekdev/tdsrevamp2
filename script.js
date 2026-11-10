const $ = (s, c = document) => c.querySelector(s),
  $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* Mobile Menu */
const menu = $("#menu"),
  burger = $("#burger");
burger.onclick = () => {
  menu.classList.toggle("open");
  burger.classList.toggle("x");
};
$$("#menu a").forEach(
  (a) =>
    (a.onclick = () => {
      menu.classList.remove("open");
      burger.classList.remove("x");
    }),
);

/* Hero */
const slides = $$(".slide-img");
const progressBar = $("#slide-progress");
const idxText = $("#slide-idx");
let currentSlide = 0;
const totalSlides = slides.length;
const slideDuration = 3000;

function nextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");

  const num = String(currentSlide + 1).padStart(2, "0");
  const totalFormatted = String(totalSlides).padStart(2, "0");
  idxText.textContent = `${num} / ${totalFormatted}`;

  progressBar.style.transition = "none";
  progressBar.style.width = "0%";
  setTimeout(() => {
    progressBar.style.transition = `width ${slideDuration}ms linear`;
    progressBar.style.width = "100%";
  }, 50);
}

if (slides.length > 0) {
  progressBar.style.transition = `width ${slideDuration}ms linear`;
  progressBar.style.width = "100%";
  setInterval(nextSlide, slideDuration);
}

/* Marquee */
const SP = '<svg class="sp"><use href="#sp"/></svg>';
const bigWords = [
  "Web Design",
  "Branding",
  "SEO",
  "App Development",
  "Video Editing",
  "3D Animation",
];
const pills = [
  "UI/UX Design",
  "WordPress",
  "Shopify",
  "Digital Marketing",
  "Social Media",
  "Content Creation",
  "E-commerce",
  "Illustration",
  "Creative Studio",
];
const mqIn = $$(".mq-in");
if (mqIn.length === 2) {
  mqIn[0].innerHTML = bigWords
    .map((t, i) => `<b class="${i % 2 ? "o" : ""}">${t}</b>${SP}`)
    .join("");
  mqIn[1].innerHTML = pills.map((t) => `<span>${t}</span>`).join("");
}

if (window.gsap && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  tl.from(".hero-copy-new h1 .line", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  })
    .from(".hero-copy-new p", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
    .from(
      ".hero-cta-group .btn",
      { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 },
      "-=0.4",
    )
    .from(
      ".hero-side-card",
      { x: 100, opacity: 0, duration: 1, ease: "power3.out" },
      "-=1",
    )
    .from(
      ".hero-bottom-bar > *",
      { y: 40, opacity: 0, duration: 0.8, stagger: 0.15 },
      "-=0.5",
    );

  gsap.to(".hero-bg-img", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-new",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.from(".about-header > *", {
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: { trigger: ".about-section-new", start: "top 80%" },
  });

  gsap.from(".an-img-side", {
    scale: 0.95,
    opacity: 0,
    duration: 1,
    scrollTrigger: { trigger: ".about-new-grid", start: "top 75%" },
  });

  gsap.from(".stat-card", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    clearProps: "transform,opacity",
    scrollTrigger: { trigger: ".an-stats", start: "top 85%" },
  });

  gsap.from(".an-bottom-text p", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: { trigger: ".an-bottom-text", start: "top 90%" },
  });

  $$(".count").forEach((el) => {
    const o = { v: 0 };
    gsap.to(o, {
      v: +el.dataset.to,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => (el.textContent = Math.round(o.v)),
    });
  });

  gsap.from(".ss-line", {
    strokeDashoffset: 1,
    duration: 1.8,
    ease: "power2.out",
    scrollTrigger: { trigger: ".small-stat", start: "top 85%" },
  });
  gsap.from(".ss-area, .ss-dot", {
    opacity: 0,
    duration: 1,
    delay: 0.9,
    scrollTrigger: { trigger: ".small-stat", start: "top 85%" },
  });
}

const reduceMotion = matchMedia("(prefers-reduced-motion:reduce)").matches;

$$("#pfFilters button").forEach((b) => {
  b.onclick = () => {
    $$("#pfFilters button").forEach((x) => x.classList.toggle("on", x === b));
    const f = b.dataset.f;
    $$(".pf-item").forEach((it) => {
      const show = f === "all" || it.dataset.c === f;
      it.style.display = show ? "" : "none";
      if (show && window.gsap && !reduceMotion)
        gsap.fromTo(
          it,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            clearProps: "transform",
          },
        );
    });
  };
});

/* Packages */
const fmt = (n) => n.toLocaleString("en-US");
function countPrices(scope) {
  $$(".pc", scope).forEach((el) => {
    const to = +el.dataset.to;
    if (!window.gsap || reduceMotion) {
      el.textContent = fmt(to);
      return;
    }
    const o = { v: 0 };
    gsap.to(o, {
      v: to,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => (el.textContent = fmt(Math.round(o.v))),
    });
  });
}
$$(".pk-tab").forEach((b) => {
  b.onclick = () => {
    $$(".pk-tab").forEach((x) => x.classList.toggle("on", x === b));
    $$(".pk-set").forEach((s) => (s.hidden = s.dataset.g !== b.dataset.g));
    const set = $('.pk-set[data-g="' + b.dataset.g + '"]');
    if (window.gsap && !reduceMotion)
      gsap.from(set.children, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    countPrices(set);
  };
});

if (window.gsap && !reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".progress", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
  });

  if (matchMedia("(pointer:fine)").matches) {
    const cx = gsap.quickTo(".cur", "x", { duration: 0.25, ease: "power3" });
    const cy = gsap.quickTo(".cur", "y", { duration: 0.25, ease: "power3" });
    addEventListener("pointermove", (e) => {
      cx(e.clientX);
      cy(e.clientY);
    });
    $$("a,button,.pf-item").forEach((el) => {
      el.addEventListener("pointerenter", () => $(".cur").classList.add("big"));
      el.addEventListener("pointerleave", () =>
        $(".cur").classList.remove("big"),
      );
    });
  }

  ["home", "about", "portfolio", "services", "packages"].forEach((id) => {
    ScrollTrigger.create({
      trigger: "#" + id,
      start: "top 45%",
      end: "bottom 45%",
      onToggle: (s) =>
        s.isActive &&
        $$(".nav nav a").forEach((a) =>
          a.classList.toggle("on", a.getAttribute("href") === "#" + id),
        ),
    });
  });

  const tweens = $$(".mq-in").map((el, i) => {
    el.innerHTML += el.innerHTML;
    return gsap.fromTo(
      el,
      { xPercent: i ? -50 : 0 },
      {
        xPercent: i ? 0 : -50,
        duration: i ? 38 : 46,
        ease: "none",
        repeat: -1,
      },
    );
  });
  ScrollTrigger.create({
    trigger: ".marquee-wrap",
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      const v = Math.min(Math.abs(self.getVelocity()) / 250, 7);
      tweens.forEach((t) => {
        gsap.killTweensOf(t);
        t.timeScale(1 + v);
        gsap.to(t, { timeScale: 1, duration: 0.9, ease: "power2.out" });
      });
    },
  });
  gsap.from(".mq-row", {
    xPercent: (i) => (i ? 10 : -10),
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: { trigger: ".marquee-wrap", start: "top 90%" },
  });

  $$(".sec-head, .svc-head").forEach((h) =>
    gsap.from(h.children, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: h, start: "top 82%" },
    }),
  );
  gsap.from("#pfFilters button", {
    y: 20,
    opacity: 0,
    stagger: 0.07,
    duration: 0.6,
    scrollTrigger: { trigger: "#pfFilters", start: "top 90%" },
  });

  $$(".pf-item").forEach((it) => {
    gsap.from(it, {
      clipPath: "inset(12% 12% 12% 12% round 26px)",
      opacity: 0,
      duration: 1.1,
      ease: "power4.out",
      scrollTrigger: { trigger: it, start: "top 92%" },
    });
    const art = $("img,.pf-art", it);
    it.addEventListener("pointermove", (e) => {
      const r = it.getBoundingClientRect();
      gsap.to(art, {
        x: (e.clientX - r.left - r.width / 2) * -0.03,
        y: (e.clientY - r.top - r.height / 2) * -0.03,
        duration: 0.6,
      });
    });
    it.addEventListener("pointerleave", () =>
      gsap.to(art, { x: 0, y: 0, duration: 0.8 }),
    );
  });

  /* Packages */
  gsap.from(".pk-set[data-g=a] article", {
    y: 70,
    opacity: 0,
    duration: 0.9,
    stagger: 0.14,
    ease: "power3.out",
    clearProps: "transform,opacity",
    scrollTrigger: {
      trigger: ".pk-set",
      start: "top 85%",
      onEnter: () => countPrices($(".pk-set[data-g=a]")),
    },
  });

  /* CTA */
  const contactSection = document.querySelector("#contact");
  if (contactSection) {
    const contactTimeline = gsap.timeline({
      defaults: {
        duration: 0.75,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
      },
      scrollTrigger: {
        trigger: contactSection,
        start: "top 85%",
        once: true,
      },
    });
    contactTimeline
      .from(".cta-kicker", { y: 14, autoAlpha: 0 })
      .from(".cta-left h2", { y: 28, autoAlpha: 0 }, "-=0.5")
      .from(".cta-left > p", { y: 18, autoAlpha: 0 }, "-=0.55")
      .from(".cta-steps li", { y: 18, autoAlpha: 0, stagger: 0.12 }, "-=0.45")
      .from(".cta-contact a", { y: 12, autoAlpha: 0, stagger: 0.1 }, "-=0.4")
      .from(".cta-form", { y: 24, autoAlpha: 0, duration: 0.9 }, 0.2)
      .from(".cta-form > *", { y: 12, autoAlpha: 0, stagger: 0.08 }, 0.45);
  }

  /* Footer */
  document.querySelector(".ft-word") &&
    gsap.from(".ft-word", {
      yPercent: 40,
      opacity: 0,
      duration: 1.4,
      ease: "power4.out",
      scrollTrigger: { trigger: ".ft-word", start: "top 100%" },
    });
}

(function () {
  const IMG = "assets/images/";
  const SVC = [
    [
      "Web Design/Development",
      "Transform your brand with stunning, user-friendly websites crafted to achieve your goals.",
      "service-1.jpg",
    ],
    [
      "Graphic Design",
      "We create logos and brochures that captivate and convey your brand's message.",
      "service-2.jpg",
    ],
    [
      "Social Media Services",
      "Grow your online community and engage your audience with effective social media strategies.",
      "service-3.jpg",
    ],
    [
      "App Development",
      "Deliver seamless user experiences with innovative mobile applications customized to your needs.",
      "service-4.jpg",
    ],
    [
      "SEO",
      "Boost your website's visibility and attract the right audience with our proven SEO techniques.",
      "service-5.jpg",
    ],
    [
      "Video Editing",
      "Create captivating video content that tells your story and engages your audience.",
      "service-6.jpg",
    ],
    [
      "2D & 3D Animations",
      "Bring ideas to life with eye-catching animations that add a dynamic touch to your brand.",
      "service-7.jpg",
    ],
    [
      "Illustrations",
      "Elevate your brand with custom illustrations that make a lasting impact.",
      "service-8.jpg",
    ],
  ];
  const FALL = "linear-gradient(135deg,#2b1370,#7a3cff 55%,#ff3d8b)";
  const q = (x) => document.querySelector(x);
  const wrap = q("#svcWrap"),
    st = q("#svcStage"),
    dots = q("#svcDots");
  if (!st) return;
  const pad = (v) => String(v).padStart(2, "0");

  st.innerHTML = SVC.map(
    (s, i) =>
      `<article class="svc-card"><img src="${IMG}${s[2]}" alt="${s[0]}" loading="lazy" onerror="this.remove()"><span class="svc-num">${pad(i + 1)}</span><div class="svc-t"><h3>${s[0]}</h3><p>${s[1]}</p><a href="#contact" class="svc-rm">Read more</a></div></article>`,
  ).join("");
  const cards = [...st.querySelectorAll(".svc-card")],
    n = cards.length;
  q("#svcTot").textContent = pad(n);
  dots.innerHTML = cards.map((_, i) => `<i data-i="${i}"></i>`).join("");
  let a = 0,
    W = 380,
    pd = [];
  const hasG = typeof gsap !== "undefined";
  const size = () => {
    W = Math.min(390, innerWidth * 0.72);
    wrap.style.setProperty("--cw", W + "px");
    wrap.style.setProperty("--ch", Math.round(W * 1.32) + "px");
  };
  const off = (i) => {
    let d = (((i - a) % n) + n) % n;
    if (d > n / 2) d -= n;
    return d;
  };
  function layout(instant) {
    const small = innerWidth < 700,
      vis = small ? 1 : 3;
    cards.forEach((c, i) => {
      const d = off(i),
        ad = Math.abs(d),
        on = d === 0,
        jump = pd[i] !== undefined && Math.abs(d - pd[i]) > n / 2;
      pd[i] = d;
      const p = {
        x: d * W * (small ? 0.78 : 0.6),
        scale: 1 - ad * 0.1,
        rotateY: -d * 16,
        z: -ad * 140,
        opacity: ad > vis ? 0 : 1,
        zIndex: 20 - ad,
        filter: on
          ? "grayscale(0) brightness(1)"
          : "grayscale(1) brightness(.6)",
      };
      if (hasG)
        gsap.to(c, {
          ...p,
          transformPerspective: 1600,
          duration: instant || jump ? 0 : 1.05,
          ease: "power3.out",
          overwrite: true,
        });
      else {
        c.style.transform = `translateX(${p.x}px) translateZ(${p.z}px) rotateY(${p.rotateY}deg) scale(${p.scale})`;
        c.style.opacity = p.opacity;
        c.style.zIndex = p.zIndex;
        c.style.filter = p.filter;
        c.style.transition = ".9s";
      }
      c.classList.toggle("on", on);
      c.style.pointerEvents = ad > vis ? "none" : "auto";
    });
    q("#svcN").textContent = pad(a + 1);
    [...dots.children].forEach((d, i) => d.classList.toggle("on", i === a));
  }
  const go = (i) => {
    a = ((i % n) + n) % n;
    layout();
  };
  size();
  layout(true);
  addEventListener("resize", () => {
    size();
    layout(true);
  });
  q("#svcNext").onclick = () => go(a + 1);
  q("#svcPrev").onclick = () => go(a - 1);
  dots.onclick = (e) => {
    const d = e.target.closest("i");
    if (d) go(+d.dataset.i);
  };
  cards.forEach((c, i) =>
    c.addEventListener("click", (e) => {
      if (off(i) !== 0) {
        e.preventDefault();
        go(i);
      }
    }),
  );

  let x0 = 0,
    down = false;
  st.addEventListener("pointerdown", (e) => {
    down = true;
    x0 = e.clientX;
    st.classList.add("drag");
  });
  addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - x0;
    if (Math.abs(dx) > 70) {
      go(a + (dx < 0 ? 1 : -1));
      x0 = e.clientX;
    }
  });
  addEventListener("pointerup", () => {
    down = false;
    st.classList.remove("drag");
  });

  let wl = 0;
  st.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const now = Date.now();
      if (now - wl < 450) return;
      wl = now;
      go(a + (e.deltaX > 0 ? 1 : -1));
    },
    { passive: false },
  );

  addEventListener("keydown", (e) => {
    const r = st.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    if (e.key === "ArrowRight") go(a + 1);
    if (e.key === "ArrowLeft") go(a - 1);
  });

  if (hasG && typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.create({
      trigger: st,
      start: "top 82%",
      once: true,
      onEnter: () =>
        gsap.from(cards, {
          x: 0,
          scale: 0.5,
          rotateY: 0,
          opacity: 0,
          duration: 1.4,
          stagger: 0.06,
          ease: "power4.out",
          overwrite: "auto",
        }),
    });
  }
})();

/* Portfolio */
(() => {
  const grid = document.getElementById("wkGrid");
  if (!grid) return;
  const cards = [...grid.querySelectorAll(".wk-card")];
  const bgs = [...document.querySelectorAll("#wkBg .wk-bg-img")];
  const fBox = document.getElementById("wkFilters");
  const pill = document.getElementById("wkPill");
  const cursor = document.getElementById("wkCursor");
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;

  const movePill = (b) => {
    pill.style.width = b.offsetWidth + "px";
    pill.style.height = b.offsetHeight + "px";
    pill.style.transform = `translate(${b.offsetLeft}px, ${b.offsetTop}px)`;
  };
  const first = fBox.querySelector("button.on");
  requestAnimationFrame(() => movePill(first));
  addEventListener("resize", () => movePill(fBox.querySelector("button.on")));

  fBox.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      fBox
        .querySelectorAll("button")
        .forEach((x) => x.classList.toggle("on", x === b));
      movePill(b);
      const f = b.dataset.f;
      let shown = 0;
      cards.forEach((c) => {
        const ok = f === "all" || c.dataset.c === f;
        c.classList.toggle("hide", !ok);
        if (ok) {
          shown++;
          if (window.gsap && !calm)
            gsap.fromTo(
              c,
              { opacity: 0, y: 40, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                delay: shown * 0.06,
                ease: "power3.out",
                clearProps: "transform,opacity",
              },
            );
        }
      });
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  });

  let cur = 0,
    hovering = false;
  const showBg = (i) => {
    if (i === cur || !bgs[i]) return;
    bgs[cur].classList.remove("on");
    bgs[i].classList.add("on");
    cur = i;
  };
  setInterval(() => {
    if (!hovering) showBg((cur + 1) % bgs.length);
  }, 5000);

  let cx = 0,
    cy = 0,
    tx = 0,
    ty = 0;
  const loop = () => {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    cursor.style.left = cx + "px";
    cursor.style.top = cy + "px";
    requestAnimationFrame(loop);
  };
  if (fine) loop();

  cards.forEach((c) => {
    c.addEventListener("mouseenter", () => {
      hovering = true;
      showBg(+c.dataset.i);
      if (fine) cursor.classList.add("on");
    });
    c.addEventListener("mouseleave", () => {
      hovering = false;
      cursor.classList.remove("on");
      c.style.transform = "";
    });
    c.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!fine || calm) return;
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    });
    c.addEventListener("click", () => openLb(cards.indexOf(c)));
  });

  const lb = document.getElementById("wkLb");
  const lbImg = document.getElementById("wkLbImg");
  let li = 0;
  const visible = () => cards.filter((c) => !c.classList.contains("hide"));
  const fill = (c) => {
    lbImg.src = c.querySelector("img").src;
    lbImg.alt = c.querySelector("h3").textContent;
    document.getElementById("wkLbCat").innerHTML =
      c.querySelector(".wk-cat").innerHTML;
    document.getElementById("wkLbT").textContent =
      c.querySelector("h3").textContent;
    document.getElementById("wkLbD").textContent =
      c.querySelector("p").textContent;
  };
  function openLb(i) {
    li = visible().indexOf(cards[i]);
    fill(cards[i]);
    lb.classList.add("on");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    cursor.classList.remove("on");
  }
  const closeLb = () => {
    lb.classList.remove("on");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  const step = (d) => {
    const v = visible();
    li = (li + d + v.length) % v.length;
    fill(v[li]);
  };
  lb.querySelector(".wk-lb-x").onclick = closeLb;
  lb.querySelector(".prev").onclick = () => step(-1);
  lb.querySelector(".next").onclick = () => step(1);
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLb();
  });
  addEventListener("keydown", (e) => {
    if (!lb.classList.contains("on")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });

  if (window.gsap && window.ScrollTrigger && !calm) {
    cards.forEach((c, i) =>
      gsap.from(c, {
        y: 70,
        opacity: 0,
        duration: 1,
        delay: (i % 3) * 0.08,
        ease: "power4.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: c, start: "top 95%" },
      }),
    );
  }
})();

/* Footer */
(() => {
  const f = document.getElementById("ftForm");
  const m = document.getElementById("ftMsg");
  if (!f) return;
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    m.textContent = "Thanks! You are subscribed.";
    f.reset();
  });
})();
