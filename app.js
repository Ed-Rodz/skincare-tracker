function getTodayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isOddDate() {
  return new Date().getDate() % 2 === 1;
}

function buildRoutines() {
  const acidStep = isOddDate()
    ? {
        name: "The Ordinary Azelaic Acid 10% Suspension",
        note: "Odd date",
        instructions:
          "Pea-sized, thin even layer, avoid eye area. Wait 10–15 min before moisturizer. Never use both the same night.",
      }
    : {
        name: "The Ordinary Salicylic Acid 2% Solution",
        note: "Even date",
        instructions:
          "A few drops, thin even layer, avoid eye area. Wait 10–15 min before moisturizer. Never use both the same night.",
      };

  const am = [
    {
      id: "am-cleanse",
      name: "La Roche-Posay Toleriane Hydrating Gentle Cleanser",
      instructions: "Dime-to-nickel size. Massage 30–60 sec, down into the beard. Rinse, pat dry.",
    },
    {
      id: "am-niacinamide",
      name: "The Ordinary Niacinamide 10% + Zinc",
      instructions: "A few drops, thin layer over face. Apply right after cleansing.",
    },
    {
      id: "am-moisturize",
      name: "La Roche-Posay Toleriane Double Repair Moisturizer",
      instructions: "Pea-to-nickel size. Work into beard, not just on top.",
    },
    {
      id: "am-sunscreen",
      name: "Sunscreen (CeraVe / Anthelios / ANUA)",
      note: "Non-negotiable",
      instructions:
        "Nickel-to-quarter size, full face and ears. Last step, once moisturizer sinks in. Non-negotiable, even on cloudy days.",
    },
  ];

  const pm = [
    {
      id: "pm-cleanse",
      name: "La Roche-Posay Toleriane Hydrating Gentle Cleanser",
      instructions: "Dime-to-nickel size. Massage 30–60 sec, down into the beard, rinse, pat dry. Wait 5–10 min before treatment step.",
    },
    { id: "pm-acid", name: acidStep.name, note: acidStep.note, instructions: acidStep.instructions },
    {
      id: "pm-moisturize",
      name: "La Roche-Posay Toleriane Double Repair Moisturizer",
      instructions: "Pea-to-nickel size. Work into beard area.",
    },
    {
      id: "pm-beard-oil",
      name: "Beard oil",
      instructions:
        "3–5 drops, warm between palms first, work into beard. Focus on beard, avoid shaved neckline and cheeks. Apply right after moisturizer.",
    },
  ];

  return { am, pm };
}

function loadState(todayKey) {
  const raw = localStorage.getItem(`skincare-${todayKey}`);
  return raw ? JSON.parse(raw) : {};
}

function saveState(todayKey, state) {
  localStorage.setItem(`skincare-${todayKey}`, JSON.stringify(state));
}

function renderList(listEl, steps, state, todayKey) {
  listEl.innerHTML = "";

  steps.forEach((step) => {
    const li = document.createElement("li");
    const isDone = !!state[step.id];
    if (isDone) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isDone;
    checkbox.id = step.id;

    const textWrap = document.createElement("div");
    textWrap.className = "step-text";

    const name = document.createElement("span");
    name.className = "step-name";
    name.textContent = step.name;
    textWrap.appendChild(name);

    if (step.note) {
      const note = document.createElement("span");
      note.className = "step-note";
      note.textContent = step.note;
      textWrap.appendChild(note);
    }

    if (step.instructions) {
      const instructions = document.createElement("span");
      instructions.className = "step-instructions";
      instructions.textContent = step.instructions;
      textWrap.appendChild(instructions);
    }

    const label = document.createElement("label");
    label.setAttribute("for", step.id);
    label.style.display = "contents";
    label.appendChild(checkbox);
    label.appendChild(textWrap);
    li.appendChild(label);

    const toggle = () => {
      state[step.id] = !state[step.id];
      checkbox.checked = state[step.id];
      li.classList.toggle("done", state[step.id]);
      saveState(todayKey, state);
    };

    checkbox.addEventListener("change", toggle);

    listEl.appendChild(li);
  });
}

function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("skincare-theme");

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  };

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(stored || (prefersDark ? "dark" : "light"));

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("skincare-theme", next);
    applyTheme(next);
  });
}

function init() {
  initTheme();

  const todayKey = getTodayKey();
  const { am, pm } = buildRoutines();
  const state = loadState(todayKey);

  document.getElementById("today-date").textContent = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  renderList(document.getElementById("am-list"), am, state, todayKey);
  renderList(document.getElementById("pm-list"), pm, state, todayKey);
}

init();
