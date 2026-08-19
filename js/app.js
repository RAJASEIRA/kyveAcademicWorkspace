/* ============================================================
   ACADEMIC WORKSPACE — app.js
   All application logic. Vanilla JS. No dependencies.
   ============================================================ */

/* ---------- Storage (versioned key → fresh start, progress 0%) ---------- */
const STORAGE_KEY = "academicWorkspace.v3";

function defaultState(){
  return {
    v: 3,
    completed: {},                       // "CODE::n" -> true  (learning progress)
    tasks: [],                           // {id, text, done}
    notes: [],                           // {id, title, body, ts}
    projects: [],                        // {id, title, desc, status}
    profile: { name:"", studentNo:"", program:"BS Computer Engineering", year:"1st Year", email:"", bio:"" },
    prefs: { theme:"dark", accent:"indigo" },
    focus: { sessions:0, minutes:0 },
    nav: "dashboard"
  };
}

function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultState();
    const data = JSON.parse(raw);
    if(!data || data.v !== 3) return defaultState();   // incompatible old data → fresh
    return Object.assign(defaultState(), data);
  }catch(e){
    return defaultState();
  }
}
function save(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){}
}

let state = load();

/* ---------- Module-level runtime state ---------- */
let currentPage = state.nav || "dashboard";
let lessonFilter = "all";
let calCursor = monthOf(new Date());
let calSelected = dateKey(new Date());
let editNoteId = null;
let currentReader = null;

function monthOf(d){ return { y:d.getFullYear(), m:d.getMonth() }; }
function dateKey(d){ return d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate(); }

/* ---------- Theme accents ---------- */
const ACCENTS = {
  indigo:{a:"#6366f1",b:"#8b5cf6"}, blue:{a:"#3b82f6",b:"#06b6d4"}, green:{a:"#22c55e",b:"#10b981"},
  teal:{a:"#14b8a6",b:"#06b6d4"}, violet:{a:"#8b5cf6",b:"#6366f1"}, pink:{a:"#ec4899",b:"#f43f5e"},
  amber:{a:"#f59e0b",b:"#f97316"}, red:{a:"#ef4444",b:"#f59e0b"}
};
function hexA(hex,a){ const n=parseInt(hex.slice(1),16); return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`; }
function applyAccent(name){
  const c = ACCENTS[name] || ACCENTS.indigo;
  const r = document.documentElement.style;
  r.setProperty("--accent", c.a);
  r.setProperty("--accent-soft", hexA(c.a,.16));
  r.setProperty("--accent-grad", `linear-gradient(135deg, ${c.a}, ${c.b})`);
  document.documentElement.setAttribute("data-accent", name);
}
function applyTheme(t){
  document.documentElement.setAttribute("data-theme", t);
}

/* ---------- Utils ---------- */
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m])); }
function fmtTime(t){ let [h,m]=t.split(":").map(Number); const ap=h>=12?"PM":"AM"; let hh=h%12; if(hh===0)hh=12; return `${hh}:${String(m).padStart(2,"0")} ${ap}`; }
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
function todayKey(){ return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date().getDay()]; }

/* course helpers */
function getCourse(code){ return COURSES.find(c=>c.code===code); }
function lid(code,n){ return code+"::"+n; }
function isDone(code,n){ return !!state.completed[lid(code,n)]; }
function totalLessons(){ return COURSES.reduce((s,c)=>s+c.lessons.length,0); }
function completedCount(){ return Object.keys(state.completed).filter(k=>state.completed[k]).length; }
function courseDone(c){ return c.lessons.filter(l=>isDone(c.code,l.n)).length; }
function coursePct(c){ return c.lessons.length? Math.round(courseDone(c)/c.lessons.length*100):0; }
function overallPct(){ return Math.round(completedCount()/totalLessons()*100); }

/* ---------- Icons ---------- */
const ICO = {
  grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  layers:'<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
  book:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  check:'<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  edit:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/>',
  folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  chart:'<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
  user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  close:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>',
  play:'<polygon points="5 3 19 12 5 21 5 3"/>',
  pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
  rotate:'<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
  arrow:'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  left:'<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.2" y1="4.2" x2="5.6" y2="5.6"/><line x1="18.4" y1="18.4" x2="19.8" y2="19.8"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.2" y1="19.8" x2="5.6" y2="18.4"/><line x1="18.4" y1="5.6" x2="19.8" y2="4.2"/>',
  cap:'<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5"/>',
  flame:'<path d="M12 2s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-3s0 2 2 2 2-3 2-8z"/>',
  list:'<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>'
};
function svg(name){ return '<svg viewBox="0 0 24 24">'+(ICO[name]||"")+'</svg>'; }

/* ---------- Navigation config ---------- */
const NAV = [
  { label:"Workspace", items:[
    {id:"dashboard",label:"Dashboard",icon:"grid"},
    {id:"topics",label:"My Topics",icon:"layers"},
    {id:"lessons",label:"Lessons",icon:"book"},
    {id:"stats",label:"Statistics",icon:"chart"},
  ]},
  { label:"Plan", items:[
    {id:"schedule",label:"Schedule",icon:"clock"},
    {id:"calendar",label:"Calendar",icon:"calendar"},
    {id:"tasks",label:"Tasks",icon:"check"},
  ]},
  { label:"Tools", items:[
    {id:"notes",label:"Notes",icon:"edit"},
    {id:"projects",label:"Projects",icon:"folder"},
    {id:"focus",label:"Focus",icon:"target"},
  ]},
  { label:"Account", items:[
    {id:"about",label:"About Me",icon:"user"},
    {id:"settings",label:"Settings",icon:"gear"},
  ]}
];
const PAGE_META = {
  dashboard:["Dashboard","Your study overview"],
  topics:["My Topics","All your courses"],
  lessons:["Lessons","Read and complete lessons"],
  schedule:["Schedule","Your weekly classes"],
  calendar:["Calendar","Month at a glance"],
  tasks:["Tasks","Things to get done"],
  notes:["Notes","Capture your ideas"],
  projects:["Projects","Track your work"],
  focus:["Focus","Stay on task"],
  stats:["Statistics","Your learning progress"],
  about:["About Me","Your profile"],
  settings:["Settings","Preferences & data"]
};

function renderNav(){
  const nav = $("#nav");
  nav.innerHTML = NAV.map(g=>`
    <div class="nav-label">${g.label}</div>
    ${g.items.map(i=>`
      <button class="nav-item ${i.id===currentPage?'active':''}" data-action="nav" data-page="${i.id}">
        ${svg(i.icon)}<span class="nav-label-txt">${i.label}</span>
      </button>`).join("")}
  `).join("");
}

function updateChrome(){
  $("#pageTitle").textContent = PAGE_META[currentPage][0];
  $("#pageSub").textContent = PAGE_META[currentPage][1];
  const pct = overallPct();
  $("#sideOverallPct").textContent = pct+"%";
  $("#sideOverallBar").style.width = pct+"%";
  $$(".nav-item").forEach(b=>b.classList.toggle("active", b.dataset.page===currentPage));
}

function navigate(page, opts={}){
  currentPage = page;
  state.nav = page; save();
  if(opts.course!==undefined) lessonFilter = opts.course;
  closeSidebar();
  renderPage();
  updateChrome();
  $("#page").scrollIntoView({block:"start"});
  window.scrollTo({top:0});
}

function renderPage(){
  const page = $("#page");
  const fn = PAGES[currentPage] || PAGES.dashboard;
  page.innerHTML = `<div class="reveal">${fn()}</div>`;
  page.classList.remove("reveal-anim");
}

/* ============================================================
   PAGE RENDERERS
   ============================================================ */
const PAGES = {};

/* shared building blocks */
function statCard(num,label,icon,spark){
  return `<div class="card stat-card">
    <div class="stat-top"><div class="stat-num">${num}</div><div class="stat-ico">${svg(icon)}</div></div>
    <div class="stat-label">${label}</div>${spark?`<div class="stat-spark">${spark}</div>`:""}
  </div>`;
}
function progressBar(pct,cls=""){ return `<div class="progress ${cls}"><div class="progress-fill" style="width:${pct}%"></div></div>`; }
function emptyState(icon,title,text){
  return `<div class="empty">${svg(icon)}<h3>${esc(title)}</h3><p>${esc(text)}</p></div>`;
}

/* ---------- DASHBOARD ---------- */
PAGES.dashboard = function(){
  const p = state.profile;
  const greet = p.name ? `Welcome back, ${esc(p.name.split(" ")[0])}` : "Welcome back";
  const openTasks = state.tasks.filter(t=>!t.done).length;
  const today = todayKey();
  const todays = SCHEDULE.filter(s=>s.day===today).sort((a,b)=>a.s.localeCompare(b.s));

  const courseRows = COURSES.map(c=>{
    const pct = coursePct(c);
    return `<div class="row-between" style="margin-bottom:13px">
      <div style="min-width:0;flex:1">
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
          <span class="tag dot" style="--cc:${c.color}">${c.code}</span>
          <span style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(c.title)}</span>
        </div>
        ${progressBar(pct,"sm")}
      </div>
      <span style="font-size:12px;font-weight:700;color:var(--text-mute);width:42px;text-align:right">${pct}%</span>
    </div>`;
  }).join("");

  const cont = [];
  for(const c of COURSES){
    for(const l of c.lessons){
      if(!isDone(c.code,l.n)){ cont.push({c,l}); break; }
    }
    if(cont.length>=4) break;
  }

  return `
  <p class="page-intro">${greet}. Here's your study snapshot for today, ${new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}.</p>

  <div class="grid cols-4" style="margin-bottom:18px">
    ${statCard(overallPct()+"%","Overall progress","chart", completedCount()+" of "+totalLessons()+" lessons")}
    ${statCard(completedCount(),"Lessons completed","check", totalLessons()+" total")}
    ${statCard(openTasks,"Open tasks","list", state.tasks.length+" total")}
    ${statCard(state.projects.length,"Projects","folder", state.projects.filter(p=>p.status==="done").length+" done")}
  </div>

  <div class="grid cols-2" style="margin-bottom:18px">
    <div class="card">
      <div class="section-head"><h2>Today's classes</h2><span class="sub">${DAY_FULL[today]}</span></div>
      ${todays.length? todays.map(s=>schedItemHTML(s)).join("") : emptyState("calendar","No classes today","Enjoy the free time or get ahead on your lessons.")}
    </div>
    <div class="card">
      <div class="section-head"><h2>Quick actions</h2></div>
      <div style="display:flex;flex-direction:column;gap:9px">
        ${quickBtn("book","Read a lesson","lessons")}
        ${quickBtn("check","Add a task","tasks")}
        ${quickBtn("edit","Write a note","notes")}
        ${quickBtn("target","Start a focus session","focus")}
      </div>
    </div>
  </div>

  <div class="grid cols-2">
    <div class="card card-pad-lg">
      <div class="section-head"><h2>Course progress</h2><button class="btn btn-sm" data-action="nav" data-page="topics">All courses</button></div>
      ${courseRows}
    </div>
    <div class="card card-pad-lg">
      <div class="section-head"><h2>Continue learning</h2></div>
      ${cont.length? cont.map(({c,l})=>lessonRowHTML(c,l)).join("") : `<div class="empty" style="padding:30px">${svg("check")}<h3>All caught up!</h3><p>You've started every course.</p></div>`}
    </div>
  </div>`;
};
function quickBtn(icon,label,page){ return `<button class="btn btn-ghost btn-block" style="justify-content:flex-start" data-action="nav" data-page="${page}">${svg(icon)} ${label} ${svg("arrow")}</button>`; }

function schedItemHTML(s){
  return `<div class="sched-item" style="--cc:${s.color}" data-action="open-course" data-code="${s.code}" title="Open ${esc(s.code)}">
    <div class="sched-time">${fmtTime(s.s)} – ${fmtTime(s.e)}</div>
    <div class="sched-code">${esc(s.code)} · ${esc(s.title)}</div>
    <div class="sched-room">${esc(s.room)}</div>
  </div>`;
}

function lessonRowHTML(c,l){
  const done = isDone(c.code,l.n);
  return `<div class="lesson-card ${done?'done':''}">
    <div class="lesson-num">${String(l.n).padStart(2,"0")}</div>
    <div class="lesson-body">
      <div class="lesson-title">${esc(l.title)}</div>
      <div class="lesson-sub" style="--cc:${c.color}">${c.code}</div>
    </div>
    <div class="lesson-actions">
      <button class="btn btn-sm" data-action="read" data-code="${c.code}" data-n="${l.n}">Read</button>
      <button class="check ${done?'checked':''}" data-action="toggle-lesson" data-code="${c.code}" data-n="${l.n}" title="Mark complete">${svg("check")}</button>
    </div>
  </div>`;
}

/* ---------- TOPICS ---------- */
PAGES.topics = function(){
  const cards = COURSES.map(c=>{
    const done = courseDone(c);
    return `<div class="card course-card" style="--cc:${c.color}">
      <div class="cc-top">
        <div>
          <div class="course-code">${c.code}</div>
          <div class="course-title">${esc(c.title)}</div>
          <div class="course-desc">${esc(c.desc)}</div>
        </div>
        <div class="course-dot"></div>
      </div>
      <div>
        <div class="row-between" style="margin-bottom:7px"><span style="font-size:12px;color:var(--text-dim)">Progress</span><span style="font-size:12px;font-weight:700">${done}/${c.lessons.length} · ${coursePct(c)}%</span></div>
        ${progressBar(coursePct(c))}
      </div>
      <div class="course-meta"><span><b>${c.lessons.length}</b> lessons</span><span><b>${c.units}</b> units</span></div>
      <button class="btn btn-primary btn-block" data-action="nav" data-page="lessons" data-course="${c.code}">${svg("book")} Open lessons</button>
    </div>`;
  }).join("");
  return `<p class="page-intro">You have <b>${COURSES.length} courses</b> with <b>${totalLessons()} lessons</b> to study. Click any course to start reading.</p>
  <div class="grid cols-3">${cards}</div>`;
};

/* ---------- LESSONS ---------- */
PAGES.lessons = function(){
  const chips = [`<button class="chip ${lessonFilter==='all'?'active':''}" data-action="filter" data-code="all">All courses</button>`]
    .concat(COURSES.map(c=>`<button class="chip ${lessonFilter===c.code?'active':''}" data-action="filter" data-code="${c.code}"><span class="tag dot" style="--cc:${c.color};background:none;padding:0">${c.code}</span></button>`)).join("");

  let list = [];
  for(const c of COURSES){
    if(lessonFilter!=="all" && lessonFilter!==c.code) continue;
    for(const l of c.lessons) list.push({c,l});
  }

  const cards = list.map(({c,l})=>`
    <div class="lesson-card ${isDone(c.code,l.n)?'done':''}">
      <div class="lesson-num">${String(l.n).padStart(2,"0")}</div>
      <div class="lesson-body">
        <div class="lesson-title">${esc(l.title)}</div>
        <div class="lesson-sub" style="--cc:${c.color}">${c.code} · ${esc(c.title)}</div>
      </div>
      <div class="lesson-actions">
        <button class="btn btn-sm btn-primary" data-action="read" data-code="${c.code}" data-n="${l.n}">Read Lesson</button>
        <button class="check ${isDone(c.code,l.n)?'checked':''}" data-action="toggle-lesson" data-code="${c.code}" data-n="${l.n}" title="Mark as complete">${svg("check")}</button>
      </div>
    </div>`).join("");

  const activeCourse = lessonFilter!=="all" ? getCourse(lessonFilter) : null;
  const head = activeCourse ? `${activeCourse.lessons.length} lessons · ${courseDone(activeCourse)} completed` : `${list.length} lessons across all courses`;

  return `<div class="chips" style="margin-bottom:18px">${chips}</div>
  <div class="row-between" style="margin-bottom:14px"><span class="sub" style="font-size:13px;color:var(--text-dim)">${head}</span></div>
  <div class="stack">${cards}</div>`;
};

/* ---------- SCHEDULE ---------- */
PAGES.schedule = function(){
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat"];
  const cols = days.map(d=>{
    const items = SCHEDULE.filter(s=>s.day===d).sort((a,b)=>a.s.localeCompare(b.s));
    return `<div class="day-col">
      <div class="day-head">${DAY_FULL[d].slice(0,3)} ${d===todayKey()?'<span class="today-badge">TODAY</span>':''}</div>
      ${items.length? items.map(schedItemHTML).join("") : `<div style="font-size:12px;color:var(--text-mute);padding:6px 2px">No classes</div>`}
    </div>`;
  }).join("");
  const legend = [...new Set(SCHEDULE.map(s=>s.code))].map(code=>{
    const c = getCourse(code);
    return `<span class="tag" style="--cc:${(c&&c.color)||'#888'}"><span class="tag dot" style="padding:0;background:none">${code}</span></span>`;
  }).join("");
  return `<p class="page-intro">Your weekly class schedule. Click any class to open that course. <b>"TH"</b> classes (e.g. CHEM010, GEC 002, IEM 001, GEC 004) appear under both Tuesday and Thursday.</p>
  <div style="margin-bottom:14px" class="chips">${legend}</div>
  <div class="schedule-grid">${cols}</div>`;
};

/* ---------- CALENDAR ---------- */
PAGES.calendar = function(){
  const {y,m} = calCursor;
  const first = new Date(y,m,1);
  const startDay = (first.getDay()+6)%7; // Monday-first
  const daysInMonth = new Date(y,m+1,0).getDate();
  const monthName = new Date(y,m,1).toLocaleDateString(undefined,{month:"long",year:"numeric"});
  const today = dateKey(new Date());

  let cells = "";
  ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach(d=> cells+=`<div class="cal-head">${d}</div>`);
  for(let i=0;i<startDay;i++) cells+=`<div class="cal-cell empty"></div>`;
  for(let d=1; d<=daysInMonth; d++){
    const dd = new Date(y,m,d);
    const key = dateKey(dd);
    const wd = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][dd.getDay()];
    const has = SCHEDULE.some(s=>s.day===wd);
    const sel = key===calSelected;
    cells+=`<div class="cal-cell ${key===today?'is-today':''} ${sel?'is-sel':''}" data-action="cal-day" data-key="${key}" data-wd="${wd}">
      <span class="cal-num">${d}</span>
      ${has?'<span class="cal-dot"></span>':''}
    </div>`;
  }

  // selected day classes
  const parts = calSelected.split("-").map(Number);
  const selObj = new Date(parts[0],parts[1],parts[2]);
  const selWd = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][selObj.getDay()];
  const selClasses = SCHEDULE.filter(s=>s.day===selWd).sort((a,b)=>a.s.localeCompare(b.s));

  return `<div class="row-between" style="margin-bottom:16px">
    <button class="icon-btn" data-action="cal-prev">${svg("left")}</button>
    <h2 style="font-size:18px">${monthName}</h2>
    <button class="icon-btn" data-action="cal-next">${svg("arrow")}</button>
  </div>
  <div class="grid cols-2">
    <div class="card">
      <div class="calendar-grid">${cells}</div>
    </div>
    <div class="card">
      <div class="section-head"><h2>${DAY_FULL[selWd]||selWd}</h2><span class="sub">${selObj.toLocaleDateString(undefined,{month:"long",day:"numeric"})}</span></div>
      ${selClasses.length? selClasses.map(schedItemHTML).join("") : emptyState("calendar","No classes","Nothing scheduled on this day.")}
    </div>
  </div>`;
};

/* ---------- TASKS ---------- */
PAGES.tasks = function(){
  const open = state.tasks.filter(t=>!t.done);
  const done = state.tasks.filter(t=>t.done);
  const item = t=>`<div class="task-item ${t.done?'done':''}">
    <button class="check ${t.done?'checked':''}" data-action="toggle-task" data-id="${t.id}" title="Toggle">${svg("check")}</button>
    <span class="task-text">${esc(t.text)}</span>
    <button class="task-del" data-action="del-task" data-id="${t.id}" title="Delete">${svg("trash")}</button>
  </div>`;
  return `
  <div class="card" style="margin-bottom:18px">
    <div class="field" style="margin:0">
      <label>Add a task</label>
      <div style="display:flex;gap:10px">
        <input class="input" id="taskInput" placeholder="e.g. Review Lesson 3 of Chemistry" data-enter="add-task" />
        <button class="btn btn-primary" data-action="add-task">${svg("plus")} Add</button>
      </div>
    </div>
  </div>
  <div class="section-head"><h2>To do</h2><span class="sub">${open.length} open</span></div>
  <div class="stack" style="margin-bottom:22px">${open.length?open.map(item).join("") : emptyState("check","All clear","No open tasks. Add one above.")}</div>
  <div class="section-head"><h2>Completed</h2><span class="sub">${done.length} done</span></div>
  <div class="stack">${done.length?done.map(item).join("") : `<p style="color:var(--text-mute);font-size:13px;padding:6px 2px">Nothing completed yet.</p>`}</div>`;
};

/* ---------- NOTES ---------- */
PAGES.notes = function(){
  const noteHTML = n=>`<div class="card note-card">
    <div class="note-head">
      <div class="note-title">${esc(n.title||"Untitled")}</div>
      <div style="display:flex;gap:4px">
        <button class="mini-ico-btn" data-action="edit-note" data-id="${n.id}" title="Edit">${svg("edit")}</button>
        <button class="mini-ico-btn" data-action="del-note" data-id="${n.id}" title="Delete">${svg("trash")}</button>
      </div>
    </div>
    <div class="note-body">${esc(n.body)}</div>
    <div class="note-foot"><span>${new Date(n.ts).toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"})}</span></div>
  </div>`;
  return `
  <div class="card" style="margin-bottom:18px">
    <div class="field"><label>${editNoteId?'Edit note':'New note'}</label><input class="input" id="noteTitle" placeholder="Title" value="${editNoteId?esc(state.notes.find(n=>n.id===editNoteId)?.title||''):''}" /></div>
    <div class="field"><textarea class="textarea" id="noteBody" placeholder="Write your note...">${editNoteId?esc(state.notes.find(n=>n.id===editNoteId)?.body||''):''}</textarea></div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-primary" data-action="add-note">${editNoteId?'Update':'Save note'}</button>
      ${editNoteId?'<button class="btn btn-ghost" data-action="cancel-note">Cancel</button>':''}
    </div>
  </div>
  <div class="grid cols-2">${state.notes.length?state.notes.map(noteHTML).join("") : emptyState("edit","No notes yet","Create your first note above.")}</div>`;
};

/* ---------- PROJECTS ---------- */
PAGES.projects = function(){
  const ST = {todo:"To do", progress:"In progress", done:"Done"};
  const card = p=>`<div class="card project-card">
    <div class="note-head">
      <div class="note-title">${esc(p.title||"Untitled project")}</div>
      <button class="mini-ico-btn" data-action="del-project" data-id="${p.id}" title="Delete">${svg("trash")}</button>
    </div>
    <div class="note-body">${esc(p.desc||"No description.")}</div>
    <div class="note-foot">
      <button class="proj-status ${p.status}" data-action="cycle-project" data-id="${p.id}" title="Click to change status">${ST[p.status]}</button>
    </div>
  </div>`;
  return `
  <div class="card" style="margin-bottom:18px">
    <div class="form-row">
      <div class="field" style="margin:0"><label>Project title</label><input class="input" id="projTitle" placeholder="e.g. Chemistry Lab Report 1" /></div>
      <div class="field" style="margin:0"><label>Description</label><input class="input" id="projDesc" placeholder="Short description" /></div>
    </div>
    <button class="btn btn-primary" data-action="add-project" style="margin-top:12px">${svg("plus")} Add project</button>
  </div>
  <div class="grid cols-3">${state.projects.length?state.projects.map(card).join("") : emptyState("folder","No projects yet","Add your first project above.")}</div>`;
};

/* ---------- FOCUS ---------- */
const TIMER = { mode:"focus", focusLen:25*60, breakLen:5*60, remaining:25*60, running:false, int:null };
function focusTotal(){ return TIMER.mode==="focus"?TIMER.focusLen:TIMER.breakLen; }
function focusColor(){ return TIMER.mode==="focus"?"var(--accent)":"#22c55e"; }
function fmtClock(sec){ const m=Math.floor(sec/60), s=sec%60; return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`; }

PAGES.focus = function(){
  const circ = 2*Math.PI*120;
  const frac = TIMER.remaining/focusTotal();
  const R = 120;
  return `
  <p class="page-intro">Use the Pomodoro technique: focus for 25 minutes, then take a 5-minute break. Completed focus sessions are tracked below.</p>
  <div class="card card-pad-lg">
    <div class="timer-ring-wrap">
      <div class="timer-ring">
        <svg viewBox="0 0 260 260">
          <circle class="track" cx="130" cy="130" r="${R}" stroke-width="14" fill="none"/>
          <circle class="fill" id="focusFill" cx="130" cy="130" r="${R}" stroke-width="14" fill="none"
            stroke-dasharray="${circ}" stroke-dashoffset="${circ*(1-frac)}" style="stroke:${focusColor()}"/>
        </svg>
        <div class="timer-center">
          <div class="timer-time" id="focusTime">${fmtClock(TIMER.remaining)}</div>
          <div class="timer-mode" id="focusMode">${TIMER.mode==="focus"?"Focus":"Break"}</div>
        </div>
      </div>
    </div>
    <div class="timer-controls">
      <button class="btn" id="focusStartBtn" data-action="focus-toggle">${TIMER.running?'Pause':'Start'} ${TIMER.running?svg("pause"):svg("play")}</button>
      <button class="btn btn-ghost" data-action="focus-reset">${svg("rotate")} Reset</button>
      <button class="btn btn-ghost" data-action="focus-skip">${svg("arrow")} Skip</button>
    </div>
    <div class="grid cols-3" style="margin-top:22px">
      ${statCard(state.focus.sessions,"Focus sessions","flame")}
      ${statCard(state.focus.minutes,"Focus minutes","clock")}
      ${statCard(TIMER.mode==="focus"?25:5,"Current block (min)","target",TIMER.mode==="focus"?"Focus":"Break")}
    </div>
  </div>`;
};
function tick(){
  TIMER.remaining--;
  let completed=false;
  if(TIMER.remaining<=0){
    if(TIMER.mode==="focus"){
      state.focus.sessions++; state.focus.minutes += Math.round(TIMER.focusLen/60); save();
      toast("Focus session complete! Take a 5-minute break.","ok");
      TIMER.mode="break"; TIMER.remaining=TIMER.breakLen; completed=true;
    }else{
      toast("Break over — back to focus!","");
      TIMER.mode="focus"; TIMER.remaining=TIMER.focusLen;
    }
  }
  if(completed && currentPage==="focus"){ renderPage(); updateChrome(); }
  updateFocusUI();
}
function updateFocusUI(){
  const t = $("#focusTime"); if(!t) return;
  const circ = 2*Math.PI*120, frac = TIMER.remaining/focusTotal();
  t.textContent = fmtClock(TIMER.remaining);
  const m = $("#focusMode"); if(m) m.textContent = TIMER.mode==="focus"?"Focus":"Break";
  const f = $("#focusFill");
  if(f){ f.style.strokeDashoffset = circ*(1-frac); f.style.stroke = focusColor(); }
  const b = $("#focusStartBtn");
  if(b) b.innerHTML = (TIMER.running?'Pause':'Start')+(TIMER.running?svg("pause"):svg("play"));
}
function focusToggle(){
  if(TIMER.running){ clearInterval(TIMER.int); TIMER.running=false; }
  else{ TIMER.running=true; TIMER.int=setInterval(tick,1000); }
  updateFocusUI();
}
function focusReset(){
  clearInterval(TIMER.int); TIMER.running=false;
  TIMER.mode="focus"; TIMER.remaining=TIMER.focusLen;
  renderPage(); updateChrome();
}
function focusSkip(){
  clearInterval(TIMER.int); TIMER.running=false;
  TIMER.mode = TIMER.mode==="focus"?"break":"focus";
  TIMER.remaining = focusTotal();
  renderPage(); updateChrome();
}

/* ---------- STATISTICS ---------- */
PAGES.stats = function(){
  const done = completedCount(), total = totalLessons(), pct = overallPct();
  const openTasks = state.tasks.filter(t=>!t.done).length;
  const max = Math.max(...COURSES.map(c=>c.lessons.length));
  const rows = COURSES.map(c=>{
    const cp = coursePct(c), cd = courseDone(c);
    return `<div style="margin-bottom:16px">
      <div class="row-between" style="margin-bottom:6px">
        <span style="font-size:13px;font-weight:600"><span class="tag dot" style="--cc:${c.color}">${c.code}</span> ${esc(c.title)}</span>
        <span style="font-size:12px;font-weight:700;color:var(--text-dim)">${cd}/${c.lessons.length} · ${cp}%</span>
      </div>
      ${progressBar(cp)}
    </div>`;
  }).join("");
  const bars = COURSES.map(c=>{
    const cd = courseDone(c);
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex:1;min-width:0">
      <div style="height:120px;width:100%;display:flex;align-items:flex-end">
        <div style="width:60%;margin:0 auto;border-radius:7px 7px 0 0;background:${c.color};height:${Math.max(4,cd/c.lessons.length*100)}%;transition:height .5s;opacity:${cd?1:.3}"></div>
      </div>
      <span style="font-size:10px;color:var(--text-mute);text-align:center;line-height:1.3">${c.code.replace(' ','')}</span>
    </div>`;
  }).join("");
  return `
  <div class="grid cols-4" style="margin-bottom:18px">
    ${statCard(pct+"%","Overall progress","chart")}
    ${statCard(done+" / "+total,"Lessons completed","check")}
    ${statCard(String(state.tasks.filter(t=>t.done).length),"Tasks completed","check", openTasks+" open")}
    ${statCard(state.projects.length,"Projects","folder", state.focus.sessions+" focus sessions")}
  </div>
  <div class="card card-pad-lg" style="margin-bottom:18px">
    <div class="section-head"><h2>Lessons completed by course</h2></div>
    <div style="display:flex;gap:10px;align-items:flex-end;margin-bottom:8px">${bars}</div>
  </div>
  <div class="card card-pad-lg">
    <div class="section-head"><h2>Course-by-course progress</h2></div>
    ${rows}
  </div>`;
};

/* ---------- ABOUT ME ---------- */
PAGES.about = function(){
  const p = state.profile;
  const initials = (p.name||"AW").split(" ").map(w=>w[0]||"").join("").slice(0,2).toUpperCase();
  return `
  <div class="card card-pad-lg" style="margin-bottom:18px">
    <div class="about-hero" style="margin-bottom:18px">
      <div class="avatar">${esc(initials)}</div>
      <div>
        <h2 style="font-size:22px">${esc(p.name||"Your Name")}</h2>
        <p style="color:var(--text-dim);font-size:13.5px;margin-top:2px">${esc(p.program||"")} · ${esc(p.year||"")}</p>
      </div>
    </div>
    <div class="grid cols-2">
      <div><div class="kv"><span>Student no.</span><span>${esc(p.studentNo||"—")}</span></div>
        <div class="kv"><span>Program</span><span>${esc(p.program||"—")}</span></div>
        <div class="kv" style="border:none"><span>Year level</span><span>${esc(p.year||"—")}</span></div></div>
      <div><div class="kv"><span>Email</span><span>${esc(p.email||"—")}</span></div>
        <div class="kv" style="border:none"><span>Bio</span><span style="text-align:right;max-width:60%">${esc(p.bio||"—")}</span></div></div>
    </div>
  </div>
  <div class="card card-pad-lg">
    <div class="section-head"><h2>Edit profile</h2></div>
    <div class="form-row">
      <div class="field"><label>Full name</label><input class="input" id="pfName" value="${esc(p.name)}" placeholder="Your name"/></div>
      <div class="field"><label>Student number</label><input class="input" id="pfNo" value="${esc(p.studentNo)}" placeholder="e.g. 2025-00000"/></div>
    </div>
    <div class="form-row">
      <div class="field"><label>Program</label><input class="input" id="pfProg" value="${esc(p.program)}"/></div>
      <div class="field"><label>Year level</label>
        <select class="select" id="pfYear">${["1st Year","2nd Year","3rd Year","4th Year","5th Year"].map(y=>`<option ${p.year===y?'selected':''}>${y}</option>`).join("")}</select>
      </div>
    </div>
    <div class="field"><label>Email</label><input class="input" id="pfEmail" value="${esc(p.email)}" placeholder="you@university.edu"/></div>
    <div class="field"><label>Bio</label><textarea class="textarea" id="pfBio" placeholder="A short bio about you...">${esc(p.bio)}</textarea></div>
    <button class="btn btn-primary" data-action="save-profile">${svg("check")} Save profile</button>
  </div>`;
};

/* ---------- SETTINGS ---------- */
PAGES.settings = function(){
  const theme = state.prefs.theme;
  const accent = state.prefs.accent;
  const swatches = Object.keys(ACCENTS).map(name=>`<button class="swatch ${name===accent?'active':''}" style="background:linear-gradient(135deg,${ACCENTS[name].a},${ACCENTS[name].b})" data-action="set-accent" data-name="${name}" title="${name}"></button>`).join("");
  const storageBytes = new Blob([JSON.stringify(state)]).size;
  return `
  <div class="card card-pad-lg" style="margin-bottom:18px">
    <div class="section-head"><h2>Appearance</h2></div>
    <div class="toggle-row">
      <div class="tr-info"><div class="tr-title">Dark theme</div><div class="tr-desc">Switch between dark and light.</div></div>
      <button class="switch ${theme==='dark'?'on':''}" data-action="toggle-theme"></button>
    </div>
    <div class="toggle-row">
      <div class="tr-info"><div class="tr-title">Accent color</div><div class="tr-desc">Personalize the highlight color.</div></div>
      <div class="swatches">${swatches}</div>
    </div>
  </div>

  <div class="card card-pad-lg" style="margin-bottom:18px">
    <div class="section-head"><h2>Learning progress</h2></div>
    <p style="font-size:13px;color:var(--text-dim);margin-bottom:14px">Resetting clears <b>only</b> lesson completion and course progress back to 0%. Your tasks, notes, projects and profile are kept.</p>
    <div class="grid cols-4" style="margin-bottom:16px">
      ${statCard(overallPct()+"%","Overall","chart")}
      ${statCard(completedCount(),"Completed","check")}
      ${statCard(totalLessons(),"Total lessons","book")}
      ${statCard(COURSES.length,"Courses","layers")}
    </div>
    <button class="btn btn-danger" data-action="reset-progress">${svg("rotate")} Reset learning progress</button>
  </div>

  <div class="card card-pad-lg" style="margin-bottom:18px">
    <div class="section-head"><h2>Storage & data</h2></div>
    <div class="kv"><span>Storage key</span><span style="font-family:monospace;font-size:12px">${STORAGE_KEY}</span></div>
    <div class="kv"><span>Data version</span><span>v3</span></div>
    <div class="kv"><span>Storage used</span><span>${(storageBytes/1024).toFixed(1)} KB</span></div>
    <div class="kv"><span>Lessons completed</span><span>${completedCount()}</span></div>
    <div class="kv"><span>Tasks</span><span>${state.tasks.length}</span></div>
    <div class="kv"><span>Notes</span><span>${state.notes.length}</span></div>
    <div class="kv" style="border:none"><span>Projects</span><span>${state.projects.length}</span></div>
    <p style="font-size:12px;color:var(--text-mute);margin-top:14px">Everything is stored locally in your browser. Clearing your browser data will erase it.</p>
  </div>

  <div class="card card-pad-lg">
    <div class="section-head"><h2>Danger zone</h2></div>
    <p style="font-size:13px;color:var(--text-dim);margin-bottom:14px">Erase <b>all</b> data — progress, tasks, notes, projects and profile — and start completely fresh.</p>
    <button class="btn btn-danger" data-action="wipe-all">${svg("trash")} Erase all data</button>
  </div>`;
};

/* ============================================================
   LESSON READER
   ============================================================ */
function blockHTML(b){
  const box=(cls,icon,label,text)=>`<div class="b-block ${cls}"><div class="b-label">${icon} ${label}</div><div>${esc(text)}</div></div>`;
  if(b.h) return `<h2 class="b-h">${esc(b.h)}</h2>`;
  if(b.p) return `<p>${esc(b.p)}</p>`;
  if(b.ul) return `<ul>${b.ul.map(i=>`<li>${esc(i)}</li>`).join("")}</ul>`;
  if(b.ol) return `<ol>${b.ol.map(i=>`<li>${esc(i)}</li>`).join("")}</ol>`;
  if(b.hl) return `<div class="b-block b-hl">${esc(b.hl)}</div>`;
  if(b.mem) return box("b-mem","💡","Easy to remember",b.mem);
  if(b.ex) return box("b-ex","📘","Example",b.ex);
  if(b.mis) return box("b-mis","⚠️","Common misconception",b.mis);
  if(b.app) return box("b-app","⚙️","Real-world / Engineering",b.app);
  if(b.recap) return `<div class="b-block b-recap"><div class="b-label">✅ Quick recap</div><ul>${b.recap.map(i=>`<li>${esc(i)}</li>`).join("")}</ul></div>`;
  if(b.recall) return `<div class="b-block b-recall"><div class="b-label">❓ Quick recall questions</div><ol>${b.recall.map(i=>`<li>${esc(i)}</li>`).join("")}</ol></div>`;
  return "";
}
function openReader(code,n){
  const c = getCourse(code); if(!c) return;
  const idx = c.lessons.findIndex(l=>l.n===Number(n));
  if(idx<0) return;
  const l = c.lessons[idx];
  currentReader = {code,n:Number(n)};
  const done = isDone(code,l.n);
  const prev = c.lessons[idx-1], next = c.lessons[idx+1];
  const pct = coursePct(c);
  $("#reader").innerHTML = `
    <div class="reader-inner">
      <div class="reader-top">
        <button class="reader-close" data-action="close-reader">${svg("left")} All lessons</button>
        <span style="font-size:12px;color:var(--text-mute)">${esc(c.code)}</span>
      </div>
      <div class="reader-eyebrow" style="--cc:${c.color};color:${c.color}">Lesson ${l.n} · ${esc(c.code)}</div>
      <h1 class="reader-h1">${esc(l.title)}</h1>
      <div class="reader-coursebar">
        <span class="course-code" style="--cc:${c.color}">${esc(c.code)}</span>
        <div class="reader-progress">
          <div class="reader-bar-label"><span>${esc(c.title)}</span><span>${courseDone(c)}/${c.lessons.length} · ${pct}%</span></div>
          ${progressBar(pct)}
        </div>
      </div>
      <div class="reader-body">${l.blocks.map(blockHTML).join("")}</div>
      <div class="reader-footer">
        <button class="reader-complete-btn ${done?'done':''}" data-action="reader-complete" data-code="${code}" data-n="${l.n}">
          ${done? svg("check")+' Completed — well done!' : svg("check")+' Mark this lesson as complete'}
        </button>
        <div class="reader-nav">
          <button class="btn ${prev?'':'btn-ghost'}" ${prev?`data-action="read" data-code="${code}" data-n="${prev.n}"`:'disabled'}>${svg("left")} Previous</button>
          <button class="btn ${next?'btn-primary':''}" ${next?`data-action="read" data-code="${code}" data-n="${next.n}"`:'disabled'}>${next?'Next '+svg("arrow"):'Last lesson'}</button>
        </div>
      </div>
    </div>`;
  $("#readerOverlay").hidden = false;
  document.body.style.overflow = "hidden";
  $("#reader").scrollTop = 0;
}
function closeReader(){
  $("#readerOverlay").hidden = true;
  currentReader = null;
  document.body.style.overflow = "";
}

/* ============================================================
   SEARCH
   ============================================================ */
function buildIndex(){
  const idx = [];
  COURSES.forEach(c=>{
    idx.push({t:"course", code:c.code, title:c.title, sub:"Course · "+c.lessons.length+" lessons", q:(c.code+" "+c.title+" "+c.desc).toLowerCase(), act:()=>navigate("lessons",{course:c.code})});
    c.lessons.forEach(l=>{
      const text = l.blocks.map(b=>Object.values(b).join(" ")).join(" ");
      idx.push({t:"lesson", code:c.code, title:`Lesson ${l.n} — ${l.title}`, sub:c.code+" · "+c.title, q:(c.code+" "+l.title+" "+text).toLowerCase(), act:()=>openReader(c.code,l.n)});
    });
  });
  state.tasks.forEach(tk=> idx.push({t:"task", title:tk.text, sub:(tk.done?"Completed":"Task"), q:("task "+tk.text).toLowerCase(), act:()=>navigate("tasks")}));
  state.notes.forEach(n=> idx.push({t:"note", title:n.title||"Untitled note", sub:"Note", q:("note "+n.title+" "+n.body).toLowerCase(), act:()=>navigate("notes")}));
  state.projects.forEach(p=> idx.push({t:"project", title:p.title, sub:"Project", q:("project "+p.title+" "+p.desc).toLowerCase(), act:()=>navigate("projects")}));
  SCHEDULE.forEach(s=> idx.push({t:"schedule", title:s.code+" · "+s.title, sub:s.day+" "+fmtTime(s.s), q:("schedule "+s.code+" "+s.title+" "+s.day+" "+s.room).toLowerCase(), act:()=>navigate("lessons",{course:s.code})}));
  return idx;
}
let searchIdx = [];
let searchSel = 0;
let searchResultsCache = [];

function openSearch(){
  searchIdx = buildIndex();
  $("#searchOverlay").hidden = false;
  $("#searchInput").value = "";
  setTimeout(()=>$("#searchInput").focus(),30);
  runSearch("");
}
function closeSearch(){ $("#searchOverlay").hidden = true; }

const S_META = {
  course:{icon:"layers",label:"Courses"},
  lesson:{icon:"book",label:"Lessons"},
  task:{icon:"check",label:"Tasks"},
  note:{icon:"edit",label:"Notes"},
  project:{icon:"folder",label:"Projects"},
  schedule:{icon:"clock",label:"Schedule"}
};
const TYPE_ORDER = ["lesson","course","task","note","project","schedule"];

function runSearch(q){
  const res = $("#searchResults");
  q = q.trim().toLowerCase();
  let matches;
  if(!q){
    // suggestions: show all courses + first lessons
    matches = searchIdx.filter(i=>i.t==="course").slice(0,6);
  }else{
    matches = searchIdx.filter(i=>i.q.includes(q));
  }
  // rank: title matches first
  if(q){
    matches.sort((a,b)=>{
      const at = (a.title||"").toLowerCase().includes(q)?0:1;
      const bt = (b.title||"").toLowerCase().includes(q)?0:1;
      if(at!==bt) return at-bt;
      return 0;
    });
    matches = matches.slice(0,30);
  }
  searchResultsCache = matches;
  searchSel = 0;

  if(!matches.length){
    res.innerHTML = `<div class="s-empty">${svg("search")}<div style="margin-top:10px">No results for "<b>${esc(q)}</b>"</div></div>`;
    return;
  }
  // group by type
  let html = "";
  const grouped = {};
  matches.forEach(m=>{ (grouped[m.t]=grouped[m.t]||[]).push(m); });
  TYPE_ORDER.forEach(type=>{
    if(!grouped[type]) return;
    html += `<div class="s-group-label">${S_META[type].label}</div>`;
    grouped[type].forEach(m=>{
      const i = searchResultsCache.indexOf(m);
      html += `<div class="s-item ${i===searchSel?'sel':''}" data-action="search-go" data-idx="${i}">
        <div class="s-item-ico">${svg(S_META[type].icon)}</div>
        <div class="s-item-main"><div class="s-item-title">${highlight(m.title,q)}</div><div class="s-item-sub">${esc(m.sub)}</div></div>
      </div>`;
    });
  });
  res.innerHTML = html;
}
function highlight(text,q){
  if(!q) return esc(text);
  const lt = text.toLowerCase(), i = lt.indexOf(q.toLowerCase());
  if(i<0) return esc(text);
  return esc(text.slice(0,i))+'<mark style="background:var(--accent-soft);color:var(--accent);padding:0 2px;border-radius:3px">'+esc(text.slice(i,i+q.length))+'</mark>'+esc(text.slice(i+q.length));
}
function searchGo(i){
  const m = searchResultsCache[i];
  if(!m) return;
  closeSearch();
  m.act();
}

/* ============================================================
   CONFIRM DIALOG
   ============================================================ */
let confirmCb = null;
function confirmDialog(opts){
  $("#confirmTitle").textContent = opts.title||"Are you sure?";
  $("#confirmText").textContent = opts.text||"";
  $("#confirmIcon").textContent = opts.icon||"⚠️";
  $("#confirmOk").textContent = opts.ok||"Confirm";
  $("#confirmOk").className = "btn "+(opts.danger?"btn-danger":"btn-primary");
  confirmCb = opts.onOk||null;
  $("#confirmOverlay").hidden = false;
}
function closeConfirm(){ $("#confirmOverlay").hidden = true; confirmCb = null; }

/* ============================================================
   TOAST
   ============================================================ */
function toast(msg,type=""){
  const wrap = $("#toasts");
  const t = document.createElement("div");
  t.className = "toast "+type;
  t.innerHTML = `<div class="t-ico">${svg(type==="ok"?"check":type==="warn"?"flame":"check")}</div><span>${esc(msg)}</span>`;
  wrap.appendChild(t);
  setTimeout(()=>{ t.style.opacity="0"; t.style.transform="translateY(10px)"; t.style.transition=".3s"; setTimeout(()=>t.remove(),300); }, 2600);
}

/* ============================================================
   ACTIONS
   ============================================================ */
function lessonNeedsRerender(){ return ["dashboard","lessons","topics","stats","settings"].includes(currentPage); }

function handleAction(action, el){
  switch(action){
    case "nav": navigate(el.dataset.page); break;
    case "read": closeReader(); openReader(el.dataset.code, el.dataset.n); break;
    case "close-reader": closeReader(); renderPage(); break;
    case "toggle-lesson": {
      const id = lid(el.dataset.code, el.dataset.n);
      const was = !!state.completed[id];
      state.completed[id] = !was;
      if(!state.completed[id]) delete state.completed[id];
      save();
      toast(was?"Marked incomplete":"Lesson completed! 🎉", was?"warn":"ok");
      if(currentReader) openReader(el.dataset.code, el.dataset.n);
      if(lessonNeedsRerender()) renderPage();
      updateChrome();
      break;
    }
    case "reader-complete": {
      const id = lid(el.dataset.code, el.dataset.n);
      const was = !!state.completed[id];
      state.completed[id] = !was;
      if(!state.completed[id]) delete state.completed[id];
      save();
      toast(was?"Marked incomplete":"Lesson completed! 🎉", was?"warn":"ok");
      openReader(el.dataset.code, el.dataset.n);
      updateChrome();
      break;
    }
    case "open-course": navigate("lessons",{course:el.dataset.code}); break;
    case "filter": lessonFilter = el.dataset.code; renderPage(); break;
    case "cal-day": calSelected = el.dataset.key; renderPage(); break;
    case "cal-prev": { calCursor.m--; if(calCursor.m<0){calCursor.m=11;calCursor.y--;} renderPage(); break; }
    case "cal-next": { calCursor.m++; if(calCursor.m>11){calCursor.m=0;calCursor.y++;} renderPage(); break; }

    case "add-task": {
      const inp = $("#taskInput"); const v = inp.value.trim();
      if(!v){ toast("Type a task first.","warn"); return; }
      state.tasks.unshift({id:uid(),text:v,done:false}); save();
      renderPage(); toast("Task added","ok");
      break;
    }
    case "toggle-task": { const t=state.tasks.find(x=>x.id===el.dataset.id); if(t){t.done=!t.done;save();renderPage();} break; }
    case "del-task": confirmDialog({title:"Delete task?",text:"This task will be removed permanently.",ok:"Delete",danger:true,icon:"🗑️",onOk:()=>{ state.tasks=state.tasks.filter(x=>x.id!==el.dataset.id); save(); renderPage(); toast("Task deleted"); }}); break;

    case "add-note": {
      const title=$("#noteTitle").value.trim(), body=$("#noteBody").value.trim();
      if(!title&&!body){ toast("Write something first.","warn"); return; }
      if(editNoteId){ const n=state.notes.find(x=>x.id===editNoteId); if(n){n.title=title;n.body=body;n.ts=Date.now();} editNoteId=null; toast("Note updated","ok"); }
      else{ state.notes.unshift({id:uid(),title,body,ts:Date.now()}); toast("Note saved","ok"); }
      save(); renderPage();
      break;
    }
    case "edit-note": editNoteId=el.dataset.id; renderPage(); setTimeout(()=>$("#noteTitle")&&$("#noteTitle").focus(),30); break;
    case "cancel-note": editNoteId=null; renderPage(); break;
    case "del-note": confirmDialog({title:"Delete note?",text:"This note will be removed permanently.",ok:"Delete",danger:true,icon:"🗑️",onOk:()=>{ state.notes=state.notes.filter(x=>x.id!==el.dataset.id); save(); renderPage(); toast("Note deleted"); }}); break;

    case "add-project": {
      const title=$("#projTitle").value.trim(), desc=$("#projDesc").value.trim();
      if(!title){ toast("Give your project a title.","warn"); return; }
      state.projects.unshift({id:uid(),title,desc,status:"todo"}); save();
      $("#projTitle").value=""; $("#projDesc").value="";
      renderPage(); toast("Project added","ok");
      break;
    }
    case "cycle-project": { const p=state.projects.find(x=>x.id===el.dataset.id); if(p){p.status=p.status==="todo"?"progress":p.status==="progress"?"done":"todo"; save(); renderPage();} break; }
    case "del-project": confirmDialog({title:"Delete project?",text:"This project will be removed permanently.",ok:"Delete",danger:true,icon:"🗑️",onOk:()=>{ state.projects=state.projects.filter(x=>x.id!==el.dataset.id); save(); renderPage(); toast("Project deleted"); }}); break;

    case "focus-toggle": focusToggle(); break;
    case "focus-reset": focusReset(); break;
    case "focus-skip": focusSkip(); break;

    case "save-profile": {
      state.profile.name=$("#pfName").value.trim();
      state.profile.studentNo=$("#pfNo").value.trim();
      state.profile.program=$("#pfProg").value.trim();
      state.profile.year=$("#pfYear").value;
      state.profile.email=$("#pfEmail").value.trim();
      state.profile.bio=$("#pfBio").value.trim();
      save(); toast("Profile saved","ok"); renderPage();
      break;
    }

    case "toggle-theme": {
      state.prefs.theme = state.prefs.theme==="dark"?"light":"dark";
      applyTheme(state.prefs.theme); save();
      renderPage();
      break;
    }
    case "set-accent": state.prefs.accent=el.dataset.name; applyAccent(el.dataset.name); save(); renderPage(); break;

    case "reset-progress": confirmDialog({title:"Reset learning progress?",text:"All lesson completion and course progress will return to 0%. Your tasks, notes, projects and profile are NOT affected.",ok:"Reset progress",danger:true,icon:"🔄",onOk:()=>{
      state.completed = {}; save(); renderPage(); updateChrome(); toast("Learning progress reset to 0%","ok");
    }}); break;

    case "wipe-all": confirmDialog({title:"Erase ALL data?",text:"This permanently deletes your progress, tasks, notes, projects and profile. This cannot be undone.",ok:"Erase everything",danger:true,icon:"⚠️",onOk:()=>{
      localStorage.removeItem(STORAGE_KEY); state=defaultState(); applyTheme(state.prefs.theme); applyAccent(state.prefs.accent); currentPage="dashboard"; renderNav(); renderPage(); updateChrome(); toast("All data erased","warn");
    }}); break;

    case "search-go": searchGo(Number(el.dataset.idx)); break;
  }
}

/* ============================================================
   EVENT WIRING
   ============================================================ */
function wire(){
  // delegated click
  document.addEventListener("click", e=>{
    const trig = e.target.closest("[data-action]");
    if(trig){ handleAction(trig.dataset.action, trig); return; }

    // overlay backdrop close
    if(e.target===$("#searchOverlay")) closeSearch();
    if(e.target===$("#confirmOverlay")) closeConfirm();
  });

  // delegated Enter on inputs
  document.addEventListener("keydown", e=>{
    if(e.key==="Enter" && e.target && e.target.dataset && e.target.dataset.enter){
      handleAction(e.target.dataset.enter, e.target);
    }
  });

  // search
  $("#searchTrigger").addEventListener("click", openSearch);
  $("#searchInput").addEventListener("input", e=>runSearch(e.target.value));
  $("#searchInput").addEventListener("keydown", e=>{
    const items = $$("#searchResults .s-item");
    if(e.key==="ArrowDown"){ e.preventDefault(); searchSel=Math.min(searchSel+1,items.length-1); paintSel(items); }
    else if(e.key==="ArrowUp"){ e.preventDefault(); searchSel=Math.max(searchSel-1,0); paintSel(items); }
    else if(e.key==="Enter"){ e.preventDefault(); if(items[searchSel]) items[searchSel].click(); }
  });
  function paintSel(items){ items.forEach((it,i)=>it.classList.toggle("sel",i===searchSel)); if(items[searchSel]) items[searchSel].scrollIntoView({block:"nearest"}); }

  // confirm buttons
  $("#confirmOk").addEventListener("click", ()=>{ const cb=confirmCb; closeConfirm(); if(cb) cb(); });
  $("#confirmCancel").addEventListener("click", closeConfirm);

  // theme toggle (topbar)
  $("#themeToggle").addEventListener("click", ()=>{ handleAction("toggle-theme",{dataset:{}}); });

  // mobile sidebar
  $("#menuToggle").addEventListener("click", ()=>{ $("#sidebar").classList.toggle("open"); $("#sidebarScrim").classList.toggle("show"); });
  $("#sidebarScrim").addEventListener("click", closeSidebar);

  // global keyboard
  document.addEventListener("keydown", e=>{
    if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==="k"){ e.preventDefault(); $("#searchOverlay").hidden?openSearch():closeSearch(); }
    if(e.key==="Escape"){
      if(!$("#readerOverlay").hidden){ closeReader(); renderPage(); }
      else if(!$("#searchOverlay").hidden) closeSearch();
      else if(!$("#confirmOverlay").hidden) closeConfirm();
      else closeSidebar();
    }
  });
}
function closeSidebar(){ $("#sidebar").classList.remove("open"); $("#sidebarScrim").classList.remove("show"); }

/* theme toggle helper that works via topbar (no dataset) */
function init(){
  applyTheme(state.prefs.theme);
  applyAccent(state.prefs.accent);
  renderNav();
  wire();
  renderPage();
  updateChrome();
}
if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
