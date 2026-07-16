// filter tabs
document.querySelectorAll(".filter-tabs button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-tabs button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".p-card").forEach((card) => {
      card.style.display = f === "all" || card.dataset.cat === f ? "" : "none";
    });
  });
});

// reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
      }
    });
  },
  { threshold: 0.15 },
);
document
  .querySelectorAll("[data-reveal]")
  .forEach((el) => observer.observe(el));

// active nav on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("active"));
        const active = document.querySelector(
          'nav a[href="#' + entry.target.id + '"]',
        );
        if (active) active.classList.add("active");
      }
    });
  },
  { threshold: 0.5 },
);
sections.forEach((s) => navObserver.observe(s));

// FAQ accordion
document.querySelectorAll(".faq-item").forEach((item) => {
  item.querySelector(".faq-q").addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

// mobile menu toggle
const burger = document.getElementById("navBurger");
const mobileNav = document.getElementById("mobileNav");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  mobileNav.classList.toggle("open");
});
mobileNav.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    burger.classList.remove("open");
    mobileNav.classList.remove("open");
  });
});

// subtle tilt on the seam panel (desktop only)
const seam = document.getElementById("seamPanel");
if (seam && window.matchMedia("(hover: hover)").matches) {
  const wrap = seam.closest(".seam-wrap");
  wrap.addEventListener("mousemove", (e) => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    seam.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  wrap.addEventListener("mouseleave", () => {
    seam.style.transform = "";
  });
}

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const bar = entry.target.querySelector(".skill-bar-fill");

      if (bar) {
        bar.style.width = `${bar.dataset.pct}%`;
      }

      skillObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.4,
  },
);

document.querySelectorAll(".skill").forEach((skill) => {
  skillObserver.observe(skill);
});

document.querySelectorAll(".p-view").forEach((button) => {
  button.addEventListener("click", function () {
    const modal = document.getElementById("projectModal");

    document.getElementById("modalImg").src = this.dataset.image;

    document.getElementById("modalTitle").textContent = this.dataset.title;

    document.getElementById("modalDesc").textContent = this.dataset.description;

    const tags = document.getElementById("modalTags");

    tags.innerHTML = "";

    this.dataset.tags.split(",").forEach((item) => {
      tags.innerHTML += `<span>${item}</span>`;
    });

    modal.classList.add("active");
  });
});

document.querySelector(".modal-close").addEventListener("click", () => {
  document.getElementById("projectModal").classList.remove("active");
});

document.getElementById("projectModal").addEventListener("click", function (e) {
  if (e.target === this) {
    this.classList.remove("active");
  }
});

// Pop-up pour pour mon portfolio de designer graphique  quant on clique sur voir le projet

const designImages = [
  "./Images/pages 1 portfolio.png",
  "./Images/pages 2 portfolio.png",
  "./Images/pages 3 portfolio.png",
  "./Images/design-4.png",
  "./Images/design-5.png",
];

let currentDesign = 0;

const designModal = document.getElementById("designModal");
const designImage = document.getElementById("designImage");
const counter = document.getElementById("designCounter");

function updateDesign() {
  designImage.src = designImages[currentDesign];

  counter.textContent = `${String(currentDesign + 1).padStart(2, "0")} / ${designImages.length}`;
}

document.getElementById("openDesignPortfolio").addEventListener("click", () => {
  currentDesign = 0;

  updateDesign();

  designModal.classList.add("active");
});

document.querySelector(".design-close").onclick = () => {
  designModal.classList.remove("active");
};

document.querySelector(".next").onclick = () => {
  currentDesign++;

  if (currentDesign >= designImages.length) {
    currentDesign = 0;
  }

  updateDesign();
};

document.querySelector(".prev").onclick = () => {
  currentDesign--;

  if (currentDesign < 0) {
    currentDesign = designImages.length - 1;
  }

  updateDesign();
};
