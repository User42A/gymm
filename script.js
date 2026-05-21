const STORAGE_KEY = "nova_day_training_upgrade_v5_correct_order";
function uid() { return "id-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9); }
function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

const today = new Date();
const todayISO = toISO(today);

const themes = {
  mono: { accent: "#f5f5f5", rgb: "245,245,245", bg1: "#030303", bg2: "#080808" },
  blue: { accent: "#6aa9ff", rgb: "106,169,255", bg1: "#020611", bg2: "#07111f" },
  purple: { accent: "#a78bfa", rgb: "167,139,250", bg1: "#06030d", bg2: "#120a21" },
  red: { accent: "#ff5c7a", rgb: "255,92,122", bg1: "#080202", bg2: "#17070b" },
  green: { accent: "#4ade80", rgb: "74,222,128", bg1: "#020805", bg2: "#07150d" },
  orange: { accent: "#fb923c", rgb: "251,146,60", bg1: "#090503", bg2: "#171008" }
};
function hexToRgb(hex) {
  const value = String(hex || "#f5f5f5").replace("#", "");
  const full = value.length === 3 ? value.split("").map(x => x + x).join("") : value;
  const n = parseInt(full, 16);
  return ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255);
}

const defaults = {
  settings: {
    appName: "My Daily App",
    profileName: "Mein Profil",
    avatarEmoji: "💪",
    accent: "#5b8cff"
  },
  routine: [
    { id: uid(), title: "Morgenroutine", note: "Aufstehen, waschen, ready machen", time: "06:00", done: false },
    { id: uid(), title: "Abendroutine", note: "Duschen, Supplements, schlafen", time: "22:00", done: false }
  ],
  calendar: [
    { id: uid(), title: "Gym", note: "Training", time: "18:00", date: todayISO, done: false }
  ],
  habits: [
    { id: uid(), title: "2L Wasser", note: "Über den Tag verteilt", time: "", done: false },
    { id: uid(), title: "Workout", note: "Gym oder Cardio", time: "18:00", done: false }
  ],
  meals: [
    { id: uid(), title: "1", note: "", time: "6:30", done: false },
    { id: uid(), title: "2", note: "", time: "9:05", done: false },
    { id: uid(), title: "3", note: "", time: "12:00", done: false },
    { id: uid(), title: "PreWorkout", note: "", time: "17:30 for Gym", done: false },
    { id: uid(), title: "5", note: "", time: "20:00", done: false },
    { id: uid(), title: "6", note: "", time: "21:45", done: false }
  ],
  recipes: {
    activeCategory: "Shakes",
    categories: ["Frühstück", "Mittagessen", "Abendessen", "Snacks", "Shakes"],
    items: [
      { id: uid(), title: "Ultra Massenshake 1", category: "Shakes", ingredients: "", note: "", done: false }
    ]
  },
  supplements: [
    { id: uid(), title: "Omega 3", note: "2000-3000mg 3Kap", time: "9:00", done: false },
    { id: uid(), title: "D3+K2", note: "2000-4000ie", time: "9:00", done: false },
    { id: uid(), title: "Kreatin", note: "Kreatin 8-10g", time: "Nach Gym", done: false },
    { id: uid(), title: "Zinc", note: "25mg", time: "21:00", done: false },
    { id: uid(), title: "Magnesium", note: "400mg 4Kap", time: "21:30", done: false }
  ],
  schedule: [
    { id: uid(), title: "Arbeit / Schule", note: "Fokusblock", time: "08:00 - 12:00", done: false }
  ],
  checklist: [
    { id: uid(), title: "Zimmer aufräumen", note: "10 Minuten", time: "", done: false }
  ],
  training: {
    activeDayId: "day-bbs",
    days: [
      {
        id: "day-bbs",
        name: "BBS",
        exercises: [
          { id: uid(), name: "Schrägbank Kurzhantel", weight: 28, sets: 2, reps: 0, notes: "", done: false },
          { id: uid(), name: "CableFly", weight: 14, sets: 2, reps: 0, notes: "H; 9", done: false },
          { id: uid(), name: "Dips", weight: 54, sets: 3, reps: 0, notes: "", done: false },
          { id: uid(), name: "BizepsCurl Sitzend", weight: 20, sets: 2, reps: 0, notes: "20/14KG Hinten; 2 Loch Unten; 2 Loch", done: false },
          { id: uid(), name: "BackCableCurls", weight: 17, sets: 2, reps: 0, notes: "H:4", done: false },
          { id: uid(), name: "Front Delt Machine", weight: 54, sets: 2, reps: 0, notes: "Sitz, 4", done: false },
          { id: uid(), name: "Cable LR", weight: 8, sets: 0, reps: 0, notes: "H; 3", done: false },
          { id: uid(), name: "FacePulls", weight: 31, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Shrugs", weight: 24, sets: 0, reps: 0, notes: "", done: false }
        ]
      },
      {
        id: "day-legsabs",
        name: "LegsAbs",
        exercises: [
          { id: uid(), name: "Leg Press", weight: 90, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Leg Extensions", weight: 82, sets: 2, reps: 0, notes: "H:1, KP:2, FP,2 DS; 64, 50KG", done: false },
          { id: uid(), name: "L5", weight: 82, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Wadenheben", weight: 30, sets: 0, reps: 0, notes: "H:3 25 ProS", done: false },
          { id: uid(), name: "Abs Crunches", weight: 77, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Roasty Maschine", weight: 77, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "V UPS", weight: 0, sets: 0, reps: 0, notes: "", done: false }
        ]
      },
      {
        id: "day-rt",
        name: "RT",
        exercises: [
          { id: uid(), name: "Klimmzüge", weight: 68, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Latpulldown", weight: 70, sets: 0, reps: 0, notes: "DS; 52, 39", done: false },
          { id: uid(), name: "Maschine Row", weight: 45, sets: 0, reps: 0, notes: "H;5 V;5", done: false },
          { id: uid(), name: "Lower Back", weight: 20, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "T-Bar", weight: 40, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Tricep Extension 2:1", weight: 9, sets: 0, reps: 0, notes: "9x18", done: false },
          { id: uid(), name: "Overhead Extension Sitzend 3eck", weight: 15, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Forearm Cable", weight: 38, sets: 0, reps: 0, notes: "", done: false }
        ]
      },
      {
        id: "day-rest",
        name: "Rest",
        exercises: [
          { id: uid(), name: "Liegestützen", weight: 0, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Hammer Curls", weight: 0, sets: 0, reps: 0, notes: "", done: false }
        ]
      },
      {
        id: "day-bbs-2",
        name: "BBS 2",
        exercises: [
          { id: uid(), name: "Incline Bench Machine", weight: 35, sets: 2, reps: 0, notes: "H4;V:2", done: false },
          { id: uid(), name: "Fly nach unten", weight: 21, sets: 2, reps: 0, notes: "", done: false },
          { id: uid(), name: "Butterfly Machine", weight: 93, sets: 2, reps: 0, notes: "H;4 O:4", done: false },
          { id: uid(), name: "Benchpress Machine", weight: 70, sets: 2, reps: 0, notes: "H;6 1x Vertikal 1x Horizontal", done: false },
          { id: uid(), name: "Preacher curl Machine", weight: 60, sets: 2, reps: 0, notes: "", done: false },
          { id: uid(), name: "Hammercurl Cable", weight: 28, sets: 2, reps: 0, notes: "", done: false },
          { id: uid(), name: "Front Delt Cable", weight: 6, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Dumbbel LR", weight: 12, sets: 0, reps: 0, notes: "12x8", done: false },
          { id: uid(), name: "RearDelt Maschine", weight: 54, sets: 0, reps: 0, notes: "H:4", done: false },
          { id: uid(), name: "Cable Schrugs", weight: 48, sets: 2, reps: 0, notes: "", done: false }
        ]
      },
      {
        id: "day-legsabs-2",
        name: "LegsAbs 2",
        exercises: [
          { id: uid(), name: "Perfekt Squat", weight: 20, sets: 0, reps: 0, notes: "H:3", done: false },
          { id: uid(), name: "Leg Curls", weight: 50, sets: 0, reps: 0, notes: "FP:2, BP:1", done: false },
          { id: uid(), name: "L6", weight: 82, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Wadenheben", weight: 50, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Leg Raises x V Ups", weight: 0, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Crunchmaschine", weight: 0, sets: 0, reps: 0, notes: "", done: false }
        ]
      },
      {
        id: "day-rt-2",
        name: "RT 2",
        exercises: [
          { id: uid(), name: "Klimmzüge", weight: 68, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Latpulldown eng", weight: 68, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Einarmiges Rudern", weight: 0, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Row Machine", weight: 0, sets: 0, reps: 0, notes: "H:6 • V:5", done: false },
          { id: uid(), name: "Lower Back Machine", weight: 60, sets: 0, reps: 0, notes: "U:1 • O:4", done: false },
          { id: uid(), name: "Cross Body Triceps", weight: 8, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Tricep 3eck", weight: 23, sets: 0, reps: 0, notes: "", done: false },
          { id: uid(), name: "Sam Sulek Cable", weight: 38, sets: 0, reps: 0, notes: "", done: false }
        ]
      }
    ]
  }
};

let state = loadState();
let currentSection = "dashboard";
let editType = null;
let editId = null;
let currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let selectedDate = todayISO;
let editingExerciseDayId = null;
let editingExerciseId = null;
let editingRecipeId = null;

const sidePanel = document.getElementById("sidePanel");
const backdrop = document.getElementById("backdrop");
const screenTitle = document.getElementById("screenTitle");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const entryForm = document.getElementById("entryForm");
const fieldTitle = document.getElementById("fieldTitle");
const fieldTime = document.getElementById("fieldTime");
const fieldDate = document.getElementById("fieldDate");
const fieldNote = document.getElementById("fieldNote");
const dateLabel = document.getElementById("dateLabel");
const progressText = document.getElementById("progressText");
const heroCard = document.getElementById("heroCard");
const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");
const calendarEventList = document.getElementById("calendarEventList");
const trainingDaysEl = document.getElementById("trainingDays");
const trainingExerciseListEl = document.getElementById("trainingExerciseList");
const activeTrainingDayTitle = document.getElementById("activeTrainingDayTitle");
const activeTrainingDayProgressText = document.getElementById("activeTrainingDayProgressText");
const brandName = document.getElementById("brandName");
const profileAvatar = document.getElementById("profileAvatar");
const profileNameText = document.getElementById("profileNameText");
const appNameSmall = document.getElementById("appNameSmall");
const settingAppName = document.getElementById("settingAppName");
const settingProfileName = document.getElementById("settingProfileName");
const settingAvatarEmoji = document.getElementById("settingAvatarEmoji");
const customAccent = document.getElementById("customAccent");
const recipeCategoriesEl = document.getElementById("recipeCategories");
const recipeListEl = document.getElementById("recipeList");
const activeRecipeCategoryTitle = document.getElementById("activeRecipeCategoryTitle");
const activeRecipeCount = document.getElementById("activeRecipeCount");
const recipeModal = document.getElementById("recipeModal");
const recipeModalTitle = document.getElementById("recipeModalTitle");
const recipeForm = document.getElementById("recipeForm");
const recipeName = document.getElementById("recipeName");
const recipeCategory = document.getElementById("recipeCategory");
const recipeNotes = document.getElementById("recipeNotes");

const trainingModal = document.getElementById("trainingModal");
const trainingModalTitle = document.getElementById("trainingModalTitle");
const trainingForm = document.getElementById("trainingForm");
const exerciseName = document.getElementById("exerciseName");
const exerciseWeight = document.getElementById("exerciseWeight");
const exerciseSets = document.getElementById("exerciseSets");
const exerciseReps = document.getElementById("exerciseReps");
const exerciseNotes = document.getElementById("exerciseNotes");

const listEls = {
  routine: document.getElementById("routineList"),
  habits: document.getElementById("habitsList"),
  meals: document.getElementById("mealsList"),
  supplements: document.getElementById("supplementsList"),
  schedule: document.getElementById("scheduleList"),
  checklist: document.getElementById("checklistList")
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return clone(defaults);
    const parsed = JSON.parse(raw);
    if (!parsed.training) parsed.training = clone(defaults.training);
    if (!parsed.training.days || !parsed.training.days.length) parsed.training = clone(defaults.training);
    if (!parsed.training.activeDayId) parsed.training.activeDayId = parsed.training.days[0].id;
    parsed.settings = { ...clone(defaults.settings), ...(parsed.settings || {}) };
    if (!parsed.recipes) parsed.recipes = clone(defaults.recipes);
    if (!parsed.recipes.items) parsed.recipes = clone(defaults.recipes);
    if (!parsed.recipes.activeCategory) parsed.recipes.activeCategory = parsed.recipes.items[0]?.category || "Shakes";
    return parsed;
  } catch {
    return clone(defaults);
  }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function esc(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + d;
}
function openMenu(show) {
  sidePanel.classList.toggle("open", show);
  backdrop.classList.toggle("hidden", !show);
}
function titleFor(section) {
  return {
    dashboard: "Dashboard",
    training: "Training",
    routine: "Routine",
    calendar: "Kalender",
    habits: "Habits",
    meals: "Mahlzeiten",
    recipes: "Rezepte",
    supplements: "Supplements",
    schedule: "Tagesplan",
    checklist: "Checkliste",
    settings: "Settings"
  }[section] || "Dashboard";
}
function switchSection(section) {
  currentSection = section;
  screenTitle.textContent = titleFor(section);
  document.querySelectorAll(".screen").forEach(el => el.classList.remove("visible"));
  const activeScreen = document.querySelector('.screen[data-screen="' + section + '"]');
  if (activeScreen) activeScreen.classList.add("visible");
  heroCard.classList.toggle("hidden", section !== "dashboard");
  document.querySelectorAll(".menu-item, .bottom-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.section === section);
  });
  openMenu(false);
}


function applySettings() {
  const settings = state.settings || clone(defaults.settings);
  const theme = themes[settings.theme] || themes.mono;
  const accent = settings.theme === "custom" ? settings.customAccent : theme.accent;
  const rgb = settings.theme === "custom" ? hexToRgb(settings.customAccent) : theme.rgb;
  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--accent-rgb", rgb);
  document.documentElement.style.setProperty("--bg-1", theme.bg1 || "#030303");
  document.documentElement.style.setProperty("--bg-2", theme.bg2 || "#080808");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme.bg1 || "#050505");
  document.title = settings.appName || "My Daily App";
  brandName.textContent = settings.appName || "My Daily App";
  profileNameText.textContent = settings.profileName || "Mein Profil";
  profileAvatar.textContent = settings.avatarEmoji || "💪";
  appNameSmall.textContent = settings.appName || "Today";
  settingAppName.value = settings.appName || "";
  settingProfileName.value = settings.profileName || "";
  settingAvatarEmoji.value = settings.avatarEmoji || "";
  customAccent.value = settings.customAccent || accent;
  document.querySelectorAll(".theme-dot").forEach(btn => btn.classList.toggle("active", btn.dataset.theme === settings.theme));
}
function updateSettings(patch) {
  state.settings = { ...clone(defaults.settings), ...(state.settings || {}), ...patch };
  saveState();
  applySettings();
}

function openModal(type, item) {
  editType = type;
  editId = item ? item.id : null;
  modalTitle.textContent = item ? "Eintrag bearbeiten" : "Eintrag hinzufügen";
  fieldTitle.value = item ? item.title : "";
  fieldTime.value = item ? item.time : "";
  fieldNote.value = item ? item.note : "";
  fieldDate.value = item && item.date ? item.date : selectedDate;
  dateLabel.classList.toggle("hidden", type !== "calendar");
  modal.classList.remove("hidden");
  fieldTitle.focus();
}
function closeModal() {
  modal.classList.add("hidden");
  entryForm.reset();
  editType = null;
  editId = null;
}

function openTrainingModal(dayId, exercise) {
  editingExerciseDayId = dayId;
  editingExerciseId = exercise ? exercise.id : null;
  trainingModalTitle.textContent = exercise ? "Exercise bearbeiten" : "Exercise hinzufügen";
  exerciseName.value = exercise ? exercise.name : "";
  exerciseWeight.value = exercise ? exercise.weight : "";
  exerciseSets.value = exercise ? exercise.sets : "";
  exerciseReps.value = exercise ? exercise.reps : "";
  exerciseNotes.value = exercise ? exercise.notes : "";
  trainingModal.classList.remove("hidden");
  exerciseName.focus();
}
function closeTrainingModal() {
  trainingModal.classList.add("hidden");
  trainingForm.reset();
  editingExerciseDayId = null;
  editingExerciseId = null;
}

function upsertItem(type, payload) {
  if (!payload.title.trim()) return;
  if (editId) {
    const idx = state[type].findIndex(item => item.id === editId);
    if (idx >= 0) {
      state[type][idx] = {
        ...state[type][idx],
        title: payload.title.trim(),
        time: payload.time.trim(),
        note: payload.note.trim(),
        ...(type === "calendar" ? { date: payload.date || selectedDate } : {})
      };
    }
  } else {
    state[type].unshift({
      id: uid(),
      title: payload.title.trim(),
      time: payload.time.trim(),
      note: payload.note.trim(),
      done: false,
      ...(type === "calendar" ? { date: payload.date || selectedDate } : {})
    });
  }
}

function getActiveTrainingDay() {
  return state.training.days.find(day => day.id === state.training.activeDayId) || state.training.days[0];
}
function getDayProgress(day) {
  const total = day.exercises.length || 1;
  const done = day.exercises.filter(ex => ex.done).length;
  const percent = day.exercises.length ? Math.round((done / total) * 100) : 0;
  return { total: day.exercises.length, done, percent };
}
function getTodayTraining() {
  return state.training.days[0] || { name: "Kein Plan", exercises: [] };
}
function upsertExercise(dayId, payload) {
  const day = state.training.days.find(d => d.id === dayId);
  if (!day || !payload.name.trim()) return;
  if (editingExerciseId) {
    const idx = day.exercises.findIndex(ex => ex.id === editingExerciseId);
    if (idx >= 0) {
      day.exercises[idx] = {
        ...day.exercises[idx],
        name: payload.name.trim(),
        weight: Number(payload.weight || 0),
        sets: Number(payload.sets || 0),
        reps: Number(payload.reps || 0),
        notes: payload.notes.trim()
      };
    }
  } else {
    day.exercises.push({
      id: uid(),
      name: payload.name.trim(),
      weight: Number(payload.weight || 0),
      sets: Number(payload.sets || 0),
      reps: Number(payload.reps || 0),
      notes: payload.notes.trim(),
      done: false
    });
  }
}
function addTrainingDay() {
  const number = state.training.days.length + 1;
  const newDay = { id: "day-" + uid(), name: "Day " + number, exercises: [] };
  state.training.days.push(newDay);
  state.training.activeDayId = newDay.id;
  saveState();
  renderAll();
}
function deleteTrainingDay(dayId) {
  if (state.training.days.length <= 1) return;
  const day = state.training.days.find(d => d.id === dayId);
  const name = day ? day.name : "diesen Tag";
  if (!confirm("Bist du sicher, dass du " + name + " löschen willst?")) return;
  state.training.days = state.training.days.filter(day => day.id !== dayId);
  if (state.training.activeDayId === dayId) {
    state.training.activeDayId = state.training.days[0].id;
  }
  saveState();
  renderAll();
}
function moveExercise(dayId, exerciseId, direction) {
  const day = state.training.days.find(d => d.id === dayId);
  if (!day) return;
  const idx = day.exercises.findIndex(ex => ex.id === exerciseId);
  if (idx < 0) return;
  const nextIdx = idx + direction;
  if (nextIdx < 0 || nextIdx >= day.exercises.length) return;
  const [item] = day.exercises.splice(idx, 1);
  day.exercises.splice(nextIdx, 0, item);
  saveState();
  renderAll();
}

function labelFor(type) {
  return {
    routine: "Routine",
    habits: "Habit",
    meals: "Meal",
    supplements: "Supp",
    schedule: "Plan",
    checklist: "Task",
    calendar: "Termin"
  }[type];
}
function cardHtml(item, type) {
  return `
    <article class="item glass-soft">
      <button type="button" class="check-btn ${item.done ? "done" : ""}" data-action="toggle" data-type="${type}" data-id="${item.id}">
        ${item.done ? "✓" : ""}
      </button>
      <div>
        <h4 class="${item.done ? "done" : ""}">${esc(item.title)}</h4>
        <p>${esc(item.note)}</p>
        <div class="meta">
          ${item.time ? `<span class="pill">${esc(item.time)}</span>` : ""}
          ${item.date ? `<span class="pill">${esc(item.date)}</span>` : ""}
          <span class="pill">${labelFor(type)}</span>
        </div>
      </div>
      <div class="actions">
        <button type="button" class="text-btn" data-action="edit" data-type="${type}" data-id="${item.id}">Edit</button>
        <button type="button" class="text-btn delete" data-action="delete" data-type="${type}" data-id="${item.id}">Löschen</button>
      </div>
    </article>
  `;
}
function exerciseHtml(dayId, ex, idx, total) {
  return `
    <article class="exercise-card">
      <div class="exercise-top">
        <div class="exercise-left">
          <button type="button" class="exercise-check ${ex.done ? "done" : ""}" data-training-action="toggle-exercise" data-day-id="${dayId}" data-exercise-id="${ex.id}">${ex.done ? "✓" : ""}</button>
          <div>
            <div class="exercise-name">${esc(ex.name)}</div>
            <div class="muted-copy">${esc(ex.notes || "")}</div>
          </div>
        </div>
        <div class="exercise-actions">
          <button type="button" class="icon-mini" data-training-action="edit-exercise" data-day-id="${dayId}" data-exercise-id="${ex.id}">✎</button>
          <button type="button" class="icon-mini" data-training-action="move-up" data-day-id="${dayId}" data-exercise-id="${ex.id}" ${idx === 0 ? "disabled" : ""}>↑</button>
          <button type="button" class="icon-mini" data-training-action="move-down" data-day-id="${dayId}" data-exercise-id="${ex.id}" ${idx === total - 1 ? "disabled" : ""}>↓</button>
          <button type="button" class="icon-mini" data-training-action="delete-exercise" data-day-id="${dayId}" data-exercise-id="${ex.id}">🗑</button>
        </div>
      </div>
      <div class="exercise-grid">
        <div class="exercise-field"><span>WEIGHT (KG)</span><strong>${ex.weight}</strong></div>
        <div class="exercise-field"><span>SETS</span><strong>${ex.sets}</strong></div>
        <div class="exercise-field"><span>REPS</span><strong>${ex.reps}</strong></div>
        <div class="exercise-field"><span>PROGRESS</span><strong>${ex.done ? "100%" : "0%"}</strong></div>
      </div>
    </article>
  `;
}


function recipeCategories() {
  const base = ["Frühstück", "Mittagessen", "Abendessen", "Snacks", "Shakes"];
  const custom = (state.recipes?.items || []).map(r => r.category).filter(Boolean);
  return Array.from(new Set(base.concat(custom)));
}
function openRecipeModal(recipe) {
  editingRecipeId = recipe ? recipe.id : null;
  recipeModalTitle.textContent = recipe ? "Rezept bearbeiten" : "Rezept hinzufügen";
  recipeName.value = recipe ? recipe.title : "";
  recipeCategory.value = recipe ? recipe.category : (state.recipes.activeCategory || "Shakes");
  recipeNotes.value = recipe ? recipe.note : "";
  recipeModal.classList.remove("hidden");
  recipeName.focus();
}
function closeRecipeModal() {
  recipeModal.classList.add("hidden");
  recipeForm.reset();
  editingRecipeId = null;
}
function upsertRecipe(payload) {
  const title = payload.title.trim();
  const category = payload.category.trim() || "Shakes";
  if (!title) return;
  if (editingRecipeId) {
    const idx = state.recipes.items.findIndex(r => r.id === editingRecipeId);
    if (idx >= 0) state.recipes.items[idx] = { ...state.recipes.items[idx], title, category, note: payload.note.trim() };
  } else {
    state.recipes.items.unshift({ id: uid(), title, category, note: payload.note.trim() });
  }
  state.recipes.activeCategory = category;
}
function recipeHtml(recipe) {
  return `
    <article class="recipe-card glass-soft">
      <div class="recipe-main">
        <button type="button" class="recipe-open" data-recipe-action="view" data-recipe-id="${recipe.id}">›</button>
        <div>
          <h4>${esc(recipe.title)}</h4>
          ${recipe.note ? `<p>${esc(recipe.note)}</p>` : ""}
          <div class="meta"><span class="pill">${esc(recipe.category)}</span></div>
        </div>
      </div>
      <div class="actions">
        <button type="button" class="text-btn" data-recipe-action="edit" data-recipe-id="${recipe.id}">Edit</button>
        <button type="button" class="text-btn delete" data-recipe-action="delete" data-recipe-id="${recipe.id}">Löschen</button>
      </div>
    </article>
  `;
}
function renderRecipes() {
  if (!state.recipes) state.recipes = clone(defaults.recipes);
  const cats = recipeCategories();
  if (!cats.includes(state.recipes.activeCategory)) state.recipes.activeCategory = cats[0] || "Shakes";
  recipeCategoriesEl.innerHTML = cats.map(cat => {
    const count = state.recipes.items.filter(r => r.category === cat).length;
    return `<button type="button" class="recipe-cat-card ${cat === state.recipes.activeCategory ? "active" : ""}" data-recipe-category="${esc(cat)}"><strong>${esc(cat)}</strong><span>${count} Rezepte</span></button>`;
  }).join("");
  const items = state.recipes.items.filter(r => r.category === state.recipes.activeCategory);
  activeRecipeCategoryTitle.textContent = state.recipes.activeCategory;
  activeRecipeCount.textContent = items.length + (items.length === 1 ? " Rezept" : " Rezepte");
  recipeListEl.innerHTML = items.length ? items.map(recipeHtml).join("") : '<div class="empty">Noch keine Rezepte in dieser Kategorie.</div>';
}

function renderList(type) {
  const list = listEls[type];
  const items = state[type];
  list.innerHTML = items.length ? items.map(item => cardHtml(item, type)).join("") : '<div class="empty">Noch nichts drin.</div>';
}
function renderStats() {
  const todayTraining = getTodayTraining();
  const progress = getDayProgress(todayTraining);
  document.getElementById("todayTrainingName").textContent = todayTraining.name;
  document.getElementById("todayTrainingProgress").textContent = progress.percent + "%";
  document.getElementById("routineCount").textContent = state.routine.length;
  document.getElementById("calendarCount").textContent = state.calendar.length;
  document.getElementById("dashboardWorkoutTitle").textContent = todayTraining.name;
  document.getElementById("dashboardWorkoutMeta").textContent = progress.total + " Übungen · " + progress.done + "/" + progress.total + " erledigt";
  document.getElementById("dashboardWorkoutPercent").textContent = progress.percent + "%";
  const circumference = 2 * Math.PI * 34;
  const offset = circumference - (progress.percent / 100) * circumference;
  const miniBar = document.querySelector(".mini-bar");
  miniBar.style.strokeDasharray = String(circumference);
  miniBar.style.strokeDashoffset = String(offset);
}
function renderProgress() {
  const all = []
    .concat(state.routine, state.calendar, state.habits, state.meals, state.supplements, state.schedule, state.checklist)
    .concat(state.training.days.flatMap(day => day.exercises));
  const total = all.length || 1;
  const done = all.filter(item => item.done).length;
  const percent = Math.round((done / total) * 100);
  progressText.textContent = percent + "%";
  const circumference = 2 * Math.PI * 48;
  const offset = circumference - (percent / 100) * circumference;
  const ring = document.querySelector(".ring-progress");
  ring.style.strokeDasharray = String(circumference);
  ring.style.strokeDashoffset = String(offset);
}
function renderCalendar() {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  monthTitle.textContent = currentMonth.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
  const firstDay = new Date(year, month, 1);
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  let cells = [];
  for (let i = 0; i < firstWeekday; i++) {
    const day = prevMonthDays - firstWeekday + i + 1;
    cells.push(dayCell(new Date(year, month - 1, day), true));
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(dayCell(new Date(year, month, day), false));
  }
  while (cells.length % 7 !== 0) {
    const day = cells.length - (firstWeekday + daysInMonth) + 1;
    cells.push(dayCell(new Date(year, month + 1, day), true));
  }
  calendarGrid.innerHTML = cells.join("");
  renderSelectedDayEvents();
}
function dayCell(dateObj, muted) {
  const iso = toISO(dateObj);
  const hasEvent = state.calendar.some(evt => evt.date === iso);
  const selected = iso === selectedDate;
  return `<button type="button" class="calendar-day ${muted ? "muted" : ""} ${selected ? "selected" : ""} ${hasEvent ? "has-event" : ""}" data-date="${iso}"><span>${dateObj.getDate()}</span></button>`;
}
function renderSelectedDayEvents() {
  const items = state.calendar.filter(evt => evt.date === selectedDate).sort((a, b) => (a.time || "").localeCompare(b.time || ""));
  calendarEventList.innerHTML = items.length ? items.map(item => cardHtml(item, "calendar")).join("") : '<div class="empty">Keine Termine an diesem Tag.</div>';
}
function renderTraining() {
  const activeDay = getActiveTrainingDay();
  trainingDaysEl.innerHTML = state.training.days.map((day, idx) => {
    const p = getDayProgress(day);
    return `
      <button type="button" class="training-day-card ${day.id === activeDay.id ? "active" : ""}" data-training-action="select-day" data-day-id="${day.id}">
        <div class="training-day-top">
          <span>⋮⋮</span>
          <span data-training-action="delete-day" data-day-id="${day.id}">${state.training.days.length > 1 ? "✕" : ""}</span>
        </div>
        <strong>${esc(day.name || "Day " + (idx + 1))}</strong>
        <span>${p.done}/${p.total} done</span>
      </button>
    `;
  }).join("");

  activeTrainingDayTitle.textContent = activeDay.name;
  const p = getDayProgress(activeDay);
  activeTrainingDayProgressText.textContent = p.done + "/" + p.total + " completed";

  trainingExerciseListEl.innerHTML = activeDay.exercises.length
    ? activeDay.exercises.map((ex, idx) => exerciseHtml(activeDay.id, ex, idx, activeDay.exercises.length)).join("")
    : '<div class="empty">Noch keine Übungen drin.</div>';
}
function renderAll() {
  applySettings();
  ["routine", "habits", "meals", "supplements", "schedule", "checklist"].forEach(renderList);
  renderStats();
  renderProgress();
  renderCalendar();
  renderTraining();
  renderRecipes();
  switchSection(currentSection);
}

document.getElementById("menuBtn").addEventListener("click", () => openMenu(!sidePanel.classList.contains("open")));
document.getElementById("settingsBtn").addEventListener("click", () => switchSection("settings"));
document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Alles zurücksetzen?")) return;
  state = clone(defaults);
  selectedDate = todayISO;
  currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  saveState();
  renderAll();
});
backdrop.addEventListener("click", () => openMenu(false));
document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("cancelBtn").addEventListener("click", closeModal);
document.getElementById("closeTrainingModal").addEventListener("click", closeTrainingModal);
document.getElementById("cancelTrainingBtn").addEventListener("click", closeTrainingModal);
document.getElementById("closeRecipeModal").addEventListener("click", closeRecipeModal);
document.getElementById("cancelRecipeBtn").addEventListener("click", closeRecipeModal);

document.querySelectorAll(".menu-item, .bottom-item").forEach(btn => {
  btn.addEventListener("click", () => switchSection(btn.dataset.section));
});
document.querySelectorAll(".add-btn").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.type, null));
});
document.getElementById("prevMonth").addEventListener("click", () => {
  currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
  renderCalendar();
});
document.getElementById("nextMonth").addEventListener("click", () => {
  currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  renderCalendar();
});
document.getElementById("addTrainingDayBtn").addEventListener("click", addTrainingDay);
settingAppName.addEventListener("input", () => updateSettings({ appName: settingAppName.value.trim() || "My Daily App" }));
settingProfileName.addEventListener("input", () => updateSettings({ profileName: settingProfileName.value.trim() || "Mein Profil" }));
settingAvatarEmoji.addEventListener("input", () => updateSettings({ avatarEmoji: settingAvatarEmoji.value.trim() || "💪" }));
document.getElementById("themeGrid").addEventListener("click", e => {
  const btn = e.target.closest(".theme-dot");
  if (!btn) return;
  const theme = btn.dataset.theme;
  const next = themes[theme] || themes.mono;
  updateSettings({ theme, customAccent: next.accent });
});
customAccent.addEventListener("input", () => updateSettings({ theme: "custom", customAccent: customAccent.value }));
document.getElementById("addExerciseBtn").addEventListener("click", () => {
  const activeDay = getActiveTrainingDay();
  openTrainingModal(activeDay.id, null);
});
document.getElementById("addRecipeBtn").addEventListener("click", () => openRecipeModal(null));

entryForm.addEventListener("submit", e => {
  e.preventDefault();
  if (!editType) return;
  upsertItem(editType, {
    title: fieldTitle.value,
    time: fieldTime.value,
    date: fieldDate.value,
    note: fieldNote.value
  });
  saveState();
  renderAll();
  closeModal();
});

trainingForm.addEventListener("submit", e => {
  e.preventDefault();
  if (!editingExerciseDayId) return;
  upsertExercise(editingExerciseDayId, {
    name: exerciseName.value,
    weight: exerciseWeight.value,
    sets: exerciseSets.value,
    reps: exerciseReps.value,
    notes: exerciseNotes.value
  });
  saveState();
  renderAll();
  closeTrainingModal();
});

recipeForm.addEventListener("submit", e => {
  e.preventDefault();
  upsertRecipe({ title: recipeName.value, category: recipeCategory.value, note: recipeNotes.value });
  saveState();
  renderAll();
  closeRecipeModal();
});

document.body.addEventListener("click", e => {
  const recipeCatBtn = e.target.closest("[data-recipe-category]");
  if (recipeCatBtn) {
    state.recipes.activeCategory = recipeCatBtn.dataset.recipeCategory;
    saveState();
    renderRecipes();
    return;
  }
  const recipeActionBtn = e.target.closest("[data-recipe-action]");
  if (recipeActionBtn) {
    const action = recipeActionBtn.dataset.recipeAction;
    const id = recipeActionBtn.dataset.recipeId;
    const recipe = state.recipes.items.find(r => r.id === id);
    if (!recipe) return;
    if (action === "edit" || action === "view") {
      openRecipeModal(recipe);
      return;
    }
    if (action === "delete") {
      state.recipes.items = state.recipes.items.filter(r => r.id !== id);
      saveState();
      renderRecipes();
      return;
    }
  }

  const dateBtn = e.target.closest(".calendar-day");
  if (dateBtn) {
    selectedDate = dateBtn.dataset.date;
    renderCalendar();
    return;
  }

  const trainingBtn = e.target.closest("[data-training-action]");
  if (trainingBtn) {
    const action = trainingBtn.dataset.trainingAction;
    const dayId = trainingBtn.dataset.dayId;
    const exId = trainingBtn.dataset.exerciseId;

    if (action === "select-day" && dayId) {
      state.training.activeDayId = dayId;
      saveState();
      renderTraining();
      renderStats();
      return;
    }
    if (action === "delete-day" && dayId) {
      deleteTrainingDay(dayId);
      return;
    }

    const day = state.training.days.find(d => d.id === dayId);
    const exercise = day ? day.exercises.find(ex => ex.id === exId) : null;

    if (action === "toggle-exercise" && exercise) {
      exercise.done = !exercise.done;
    } else if (action === "edit-exercise" && exercise) {
      openTrainingModal(dayId, exercise);
      return;
    } else if (action === "delete-exercise" && day && exercise) {
      if (!confirm("Bist du sicher, dass du " + exercise.name + " löschen willst?")) return;
      day.exercises = day.exercises.filter(ex => ex.id !== exId);
    } else if (action === "move-up") {
      moveExercise(dayId, exId, -1);
      return;
    } else if (action === "move-down") {
      moveExercise(dayId, exId, 1);
      return;
    }
    saveState();
    renderAll();
    return;
  }

  const button = e.target.closest("[data-action]");
  if (!button) return;
  const type = button.dataset.type;
  const id = button.dataset.id;
  const item = state[type].find(entry => entry.id === id);
  if (!item) return;

  if (button.dataset.action === "toggle") {
    item.done = !item.done;
  } else if (button.dataset.action === "delete") {
    state[type] = state[type].filter(entry => entry.id !== id);
  } else if (button.dataset.action === "edit") {
    openModal(type, item);
    return;
  }

  saveState();
  renderAll();
});

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
renderAll();
