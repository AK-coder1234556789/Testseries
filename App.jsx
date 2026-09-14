import { useMemo, useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import {
  BarChart3, BookOpen, ChevronLeft, ChevronRight, Clock3, FileText, Home,
  LayoutDashboard, LogIn, Play, Settings, Share2, Sparkles, Trophy, Upload,
  Users, X, CheckCircle2, AlertTriangle, Circle, RotateCcw, Search, SlidersHorizontal
} from "lucide-react";
import { demoQuestions, analysisNav, chapterRows } from "./data";

const nav = [
  {label:"Home", icon:Home, to:"/"},
  {label:"Generate Test", icon:Sparkles, to:"/generate"},
  {label:"My Tests", icon:FileText, to:"/tests"},
  {label:"Test Library", icon:BookOpen, to:"/library"},
  {label:"Analytics", icon:BarChart3, to:"/analysis"},
];

function Shell({children}) {
  const location = useLocation();
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><FileText size={20}/><span>→</span><MonitorIcon/></div><div><b>TestSeries</b><small>AUTOMATIC PDF TO CBT</small></div></div>
      <div className="side-nav">{nav.map(n=>{
        const I=n.icon; const active=location.pathname===n.to || (n.to==="/analysis" && location.pathname.startsWith("/analysis"));
        return <Link key={n.to} to={n.to} className={active?"active":""}><I size={17}/><span>{n.label}</span></Link>
      })}</div>
      <div className="sidebar-bottom">
        <Link to="/tests"><RotateCcw size={16}/> Reattempt</Link>
        <Link to="/"><LogIn size={16}/> Sign out</Link>
      </div>
    </aside>
    <main className="shell-main">{children}</main>
  </div>
}
function MonitorIcon(){return <span className="monitor-icon"/>}

function HomePage(){
 return <Shell><div className="ambient">
   <header className="topbar"><div><span className="eyebrow">TESTSERIES</span><h1>Prepare like the real exam.</h1><p>Convert question PDFs into a full JEE CBT experience and study every attempt.</p></div><button className="profile">L <span>Learn</span></button></header>
   <section className="hero-grid">
     <div className="hero-card"><span className="tag">JEE CBT ENGINE</span><h2>From PDF to a real test session.</h2><p>High-DPI extraction, answer mapping, chapter taxonomy, diagram preservation and exam-style delivery.</p><Link className="primary" to="/generate"><Sparkles size={17}/> Generate Test</Link></div>
     <div className="metric-card"><span>ACTIVE TESTS</span><strong>03</strong><small>2 ready · 1 processing</small></div>
     <div className="metric-card"><span>QUESTIONS</span><strong>1,275</strong><small>Across 18 generated tests</small></div>
   </section>
   <section className="section-head"><div><span className="eyebrow">RECENT</span><h2>My Tests</h2></div><Link to="/tests" className="text-link">View all <ChevronRight size={16}/></Link></section>
   <div className="test-list">{["Physics Full Test — Set 01","JEE Main Mock — Shift A","Organic Chemistry Drill"].map((t,i)=><div className="test-row" key={t}><div className="test-icon"><FileText size={19}/></div><div><b>{t}</b><small>{i===0?"75 questions · 180 min":"25 questions · 60 min"}</small></div><span className="status-ready">READY</span><Link className="launch" to="/launch">Start Test <Play size={14}/></Link></div>)}</div>
 </div></Shell>
}

function GeneratePage(){
 const [file,setFile]=useState(null);
 return <Shell><div className="page">
   <div className="page-title"><div><span className="eyebrow">GENERATE TEST</span><h1>Create a JEE CBT from your PDFs</h1><p>Question paper, optional answer key and optional solution PDF.</p></div><div className="secure-pill">Server processing · keys stay private</div></div>
   <div className="generator-grid">
     <section className="panel">
       <div className="panel-title"><Upload size={18}/><h3>Source Documents</h3></div>
       {[
         ["Question PDF","Required","Upload the complete question paper."],
         ["Answer Key","Optional","Used for deterministic answer mapping."],
         ["Solution PDF","Optional","Shown after submission when supplied."]
       ].map((x,i)=><label className="upload-card" key={x[0]}><div className="upload-icon"><FileText size={18}/></div><div><b>{x[0]}</b><small>{x[1]} · {x[2]}</small></div><input type="file" accept=".pdf" onChange={e=>i===0 && setFile(e.target.files?.[0]?.name || null)}/><span className="upload-action">{i===0&&file?file:"Choose PDF"}</span></label>)}
       <label className="check-row"><input type="checkbox"/> PDF includes marked answers / answer key</label>
     </section>
     <section className="panel">
       <div className="panel-title"><SlidersHorizontal size={18}/><h3>Pipeline Settings</h3></div>
       <div className="field"><label>Exam</label><select><option>JEE Main Paper 1</option><option>JEE Advanced</option></select></div>
       <div className="field"><label>Duration</label><div className="input-suffix"><input defaultValue="180"/><span>MIN</span></div></div>
       <div className="toggle-row"><div><b>Preserve original diagrams</b><small>Locate and crop from the source PDF; never redraw.</small></div><Toggle on/></div>
       <div className="toggle-row"><div><b>Chapter taxonomy</b><small>Attach chapter and subtopic metadata to each question.</small></div><Toggle on/></div>
       <div className="toggle-row"><div><b>Generate AI explanations</b><small>Separate from provided solutions.</small></div><Toggle/></div>
       <button className="primary full"><Sparkles size={17}/> Start server generation</button>
     </section>
   </div>
   <div className="pipeline"><span className="eyebrow">PROCESSING PIPELINE</span><div className="pipeline-steps">{["Read PDF","Extract answers","Transcribe questions","Locate diagrams","Validate","Build CBT"].map((s,i)=><div className={i<2?"step done":"step"} key={s}><span>{i<2?"✓":i+1}</span>{s}</div>)}</div></div>
 </div></Shell>
}
function Toggle({on=false}){return <span className={on?"toggle on":"toggle"}><i/></span>}

function LaunchPage(){
 const nav=useNavigate(); return <div className="launch-page"><div className="launch-card">
   <div className="launch-brand"><span className="brand-mini"><FileText size={16}/></span><b>TestSeries</b><small>AUTOMATIC PDF TO CBT</small></div>
   <h1>Physics Full Test — Set 01</h1><span className="shared">SHARED CBT</span>
   <div className="duration-box"><span>EXAM DURATION</span><b><Clock3 size={19}/>180 <em>MINS</em></b></div>
   <div className="launch-options">
     <ToggleLine title="NTA Interface" desc="STRICT EXAM MODE" icon="◎" red/>
     <ToggleLine title="Easy Mode" desc="RELAXED TIMER" icon="ϟ" purple/>
     <ToggleLine title="Generate AI Solutions" desc="START BACKGROUND TASK NOW" icon="ϟ" blue button/>
     <button className="edit-settings"><Settings size={18}/><span><b>Edit Test Settings</b><small>RULES & CONFIGURATION</small></span><ChevronRight/></button>
   </div>
   <button className="launch-btn" onClick={()=>nav("/cbt/instructions")}>Launch CBT <Play size={16}/></button>
 </div></div>
}
function ToggleLine({title,desc,icon,red,purple,blue,button}){
 return <div className="toggle-line"><span className={"mode-icon "+(red?"red":purple?"purple":blue?"blue":"")}>{icon}</span><span><b>{title}</b><small>{desc}</small></span>{button?<button className="small-outline">↻ START AI</button>:<Toggle/>}</div>
}

function Instructions(){
 const nav=useNavigate(); return <div className="cbt"><CbtTop title="Instructions"/><div className="instruction-main"><h2>Please read the instructions carefully</h2><div className="instruction-meta"><span>◷ <b>TOTAL DURATION<br/><strong>180 Minutes</strong></b></span><span>▤ <b>TOTAL QUESTIONS<br/><strong>75</strong></b></span></div>
 <ol>
  <li>The clock will be set at the server. The countdown timer in the top right corner will display the remaining time. When the timer reaches zero, the examination will end by itself.</li>
  <li>The Question Palette displayed on the right side of screen will show the status of each question using the symbols shown below.</li>
 </ol>
 <div className="legend-box"><LegendItem cls="notvisited" text="You have not visited the question yet."/><LegendItem cls="notanswered" text="You have not answered the question."/><LegendItem cls="answered" text="You have answered the question."/><LegendItem cls="marked" text="You have NOT answered the question, but have marked the question for review."/><LegendItem cls="ansmarked" text="Answered and Marked for Review will be considered for evaluation."/></div>
 <ol start={3}><li><b>Navigating to a Question:</b> Click a question number in the palette, use Save & Next, or Mark for Review & Next.</li><li><b>Answering a Question:</b> Select an option. Click it again or use Clear Response to deselect. Change answers by selecting another option.</li></ol>
 <div className="instruction-footer"><p>All the questions will appear in English language.</p><label><input type="checkbox"/> I have read and understood the instructions.</label><button className="nta-button disabled" onClick={()=>nav("/cbt/test")}>I am ready to begin</button></div>
 </div><div className="candidate-side"><div className="avatar">◉</div><b>akill</b></div></div>
}
function LegendItem({cls,text}){return <div><span className={"status "+cls}></span>{text}</div>}

function CbtTop({title}){return <div className="cbt-top"><b>{title}</b></div>}

function CbtTest(){
 const [q,setQ]=useState(1); const [subject,setSubject]=useState("Physics"); const [answers,setAnswers]=useState({}); const [marked,setMarked]=useState(new Set()); const [visited,setVisited]=useState(new Set([1]));
 const [time,setTime]=useState(2*3600+58*60+51);
 const current=demoQuestions.find(x=>x.number===q)!;
 const subjects=["Physics","Chemistry","Mathematics"];
 const filtered=demoQuestions.filter(x=>x.subject===subject);
 const maxForSubject=25;
 const setAnswer=(a)=>setAnswers(prev=>({...prev,[q]:prev[q]?.[0]===a?[]:[a]}));
 const status=(n)=>answers[n]?.length?"answered":marked.has(n)?"marked":visited.has(n)?"notanswered":"notvisited";
 const jump=(n)=>{setQ(n);setVisited(v=>new Set(v).add(n));};
 const next=()=>jump(Math.min(75,q+1));
 const fmt=`${String(Math.floor(time/3600)).padStart(2,"0")}:${String(Math.floor(time%3600/60)).padStart(2,"0")}:${String(time%60).padStart(2,"0")}`;
 useMemo(()=>{const t=setInterval(()=>setTime(v=>Math.max(0,v-1)),1000); return ()=>clearInterval(t)},[]);
 return <div className="cbt">
   <div className="cbt-browser">TestSeries | Physics Full Test — Set 01 <span>⌕  ⋮</span></div>
   <div className="cbt-header"><div className="exam-title">Physics Full Test — Set 01</div><div className="exam-actions">Accessibility &nbsp; Instructions &nbsp; Question Paper</div></div>
   <div className="cbt-subhead"><span>Sections</span><span className="timer">Time Left : <b>{fmt}</b></span></div>
   <div className="section-tabs">{subjects.map(s=><button className={subject===s?"selected":""} onClick={()=>{setSubject(s); const first=demoQuestions.find(x=>x.subject===s)?.number||1; jump(first)}} key={s}>{s} <i>i</i></button>)}</div>
   <div className="cbt-body">
    <main className="question-pane">
      <div className="question-toolbar"><span>Question Type: {current.type==="NUMERICAL"?"Numerical":"MCQ"}</span><span>Correct: 4 | Negative: 1</span></div>
      <div className="blue-strip"><span>View in : <select><option>English</option></select></span></div>
      <div className="question-scroll"><h3>Question No. {q}</h3><p className="qtext">{current.stem}</p>{current.asset&&<div className="asset-placeholder">[Original PDF diagram asset]</div>}
      {current.options?.map((o,i)=><label className={"option "+(answers[q]?.includes(String.fromCharCode(65+i))?"chosen":"")} key={o}><input type="radio" name={`q${q}`} checked={answers[q]?.includes(String.fromCharCode(65+i))||false} onChange={()=>setAnswer(String.fromCharCode(65+i))}/><span>{String.fromCharCode(65+i)}.</span>{o}</label>)}
      {current.type==="NUMERICAL"&&<div className="numeric-entry"><input placeholder="Enter answer"/><div className="keypad">{["1","2","3","4","5","6","7","8","9","0",".","⌫"].map(k=><button key={k}>{k}</button>)}</div></div>}
      </div>
      <div className="cbt-actions"><button onClick={()=>{setMarked(m=>new Set(m).add(q));next()}}>Mark for Review & Next</button><button onClick={()=>setAnswers(a=>({...a,[q]:[]}))}>Clear Response</button><button onClick={next}>Previous</button><button className="save" onClick={next}>Save & Next</button></div>
    </main>
    <aside className="palette"><div className="candidate"><div className="avatar">◉</div><b>akill</b></div><div className="state-grid"><State n={Object.values(answers).filter(x=>x.length).length} label="Answered" cls="answered"/><State n={75-visited.size-(Object.values(answers).filter(x=>x.length).length)} label="Not Answered" cls="notanswered"/><State n={75-visited.size} label="Not Visited" cls="notvisited"/><State n={marked.size} label="Marked for Review" cls="marked"/><State n={0} label="Answered & Marked for Review" cls="ansmarked"/></div><div className="palette-title">{subject}</div><div className="choose">Choose a Question</div><div className="qgrid">{filtered.map(x=><button key={x.number} className={status(x.number)} onClick={()=>jump(x.number)}>{x.number}</button>)}</div><button className="submit" onClick={()=>alert("Submission review screen would open here.")}>Submit</button></aside>
   </div>
 </div>
}
function State({n,label,cls}){return <div className="state"><span className={"status "+cls}>{n}</span><b>{label}</b></div>}

function Analysis(){
 const [section,setSection]=useState("Overview");
 return <div className="analysis-page">
  <aside className="analysis-side"><div className="analysis-brand"><FileText size={16}/><b>TestSeries</b><ChevronLeft size={14}/></div><span className="report-label">Reports</span>{analysisNav.map(x=><button className={section===x?"active":""} onClick={()=>setSection(x)} key={x}><IconFor label={x}/>{x}</button>)}<div className="analysis-bottom"><button><Share2/> Share Test</button><button><RotateCcw/> Reattempt</button><button className="exit"><X/> Exit</button></div></aside>
  <main className="analysis-main"><div className="analysis-head"><div><h1>{section}</h1><span>75 QS · 2H 58M TIME</span></div><div className="percentile"><small>TEST PERCENTILE</small><b>100.00%ile</b><span>Rank #1</span></div></div>{section==="Overview"?<Overview/>:section==="Subject Stats"?<SubjectStats/>:section==="Chapter Reports"?<ChapterReports/>:section==="Score Potential"?<ScorePotential/>:section==="Time Analysis"?<TimeAnalysis/>:<GenericAnalysis title={section}/>}</main>
 </div>
}
function IconFor({label}){const map={Overview:BarChart3,"Subject Stats":Trophy,"Chapter Reports":BookOpen,"Score Potential":Sparkles,"Time Analysis":Clock3,Insights:Sparkles,"Score Progress":BarChart3,"Question Journey":RotateCcw,"Subject Journey":Users,"Review Exam":FileText,"Compare with Peers":Users,Leaderboard:Trophy};const I=map[label]||Circle;return <I size={15}/>}
function Overview(){
 return <div className="analysis-content">
  <section className="overview-grid"><div className="score-card"><div className="ring">0.0%</div><div><span>Accuracy: 0%</span><b>0<small>/300</small></b></div></div><div className="subject-card"><span>◎ SUBJECT BREAKDOWN</span><div>{["Physics","Chemistry","Mathematics"].map(s=><b key={s}>{s}<em>0/100</em></b>)}</div></div></section>
  <section className="stat-strip">{[["CORRECT","0","+0 marks"],["INCORRECT","0","-0 marks"],["SKIPPED","75","100% of paper"],["TOTAL TIME","2h 58m","2m 23s / Q"]].map(x=><div key={x[0]}><span>{x[0]}</span><b>{x[1]}</b><small>{x[2]}</small></div>)}</section>
  <section className="dark-card"><h3>OUTCOME DISTRIBUTION</h3><div className="distribution"><i/><i/><i/></div><div className="legend-line"><span>● Correct</span><span>● Incorrect</span><span>● Skipped</span></div></section>
  <section className="dark-card"><h3>QUESTION MAP</h3><div className="question-map">{Array.from({length:75},(_,i)=><button key={i}>{i+1}</button>)}</div><div className="legend-line"><span>● CORRECT</span><span>● WRONG</span><span>● PARTIAL</span><span>● BONUS</span><span>● SKIPPED</span></div></section>
  <section className="dark-card chart-card"><h3>TIME PER QUESTION <button>↗ OPEN GRAPH</button></h3><div className="chart-bars">{Array.from({length:75},(_,i)=><i style={{height:`${8+(i%13)*4}px`}} key={i}/>)}</div><small>Click bars or Open Graph to explore with zoom/pan tools</small></section>
 </div>
}
function SubjectStats(){
 return <div className="analysis-content subject-stats">{["Physics","Chemistry","Mathematics"].map((s,i)=><div className="subject-panel" key={s}><div className="subject-top"><div className={"subject-dot d"+i}>{i===0?"P":i===1?"C":"M"}</div><div><h2>{s}</h2><b>0 <small>/100</small></b></div><div className="progress-line"><i/><small>0 Correct &nbsp; 0 Incorrect &nbsp; 25 Skipped</small></div></div><div className="subject-metrics"><span><b>ACCURACY</b>0%</span><span><b>TOTAL TIME</b>{i===0?"2m 14s":"0s"}</span><span><b>NEGATIVE MARKS</b>-0</span><span><b>PACE</b>{i===0?"5s":"0s"}</span></div></div>)}</div>
}
function ChapterReports(){return <div className="analysis-content"><div className="dark-card"><h3>CHAPTER PERFORMANCE</h3><table><thead><tr><th>CHAPTER</th><th>Q</th><th>CORRECT</th><th>INCORRECT</th><th>SKIPPED</th><th>ACCURACY</th><th>PACE</th><th>TIME</th></tr></thead><tbody>{chapterRows.map(r=><tr key={String(r[0])}>{r.map((c,i)=><td key={i}>{c}</td>)}</tr>)}</tbody></table></div><div className="dark-card matrix"><h3>CHAPTER PERFORMANCE MATRIX</h3><div className="axis"><span>Fast</span><div>{chapterRows.map(r=><button key={String(r[0])} style={{left:`${20+(Number(r[1])%5)*13}%`,bottom:`${20+(parseInt(String(r[5]))%5)*13}%`}}>{String(r[0]).slice(0,10)}</button>)}</div><span>Slow</span></div><p>Accuracy × average time/question. Quick Wins · Core Strengths · Needs Revision · Time Sinks.</p></div></div>}
function ScorePotential(){return <div className="analysis-content"><div className="dark-card potential"><h3>SCORE POTENTIAL</h3><b>+42</b><span>marks recoverable through avoidable errors and skipped opportunities</span><div className="potential-bars">{["Physics","Chemistry","Mathematics"].map((s,i)=><div key={s}><label>{s}</label><i style={{width:`${55+i*12}%`}}/><b>+{14+i*5}</b></div>)}</div></div></div>}
function TimeAnalysis(){return <div className="analysis-content"><div className="dark-card"><h3>TIME ANALYSIS</h3><div className="time-grid">{["Fast & Correct","At Pace & Correct","Slow & Correct","Fast & Incorrect","At Pace & Incorrect","Slow & Incorrect"].map((x,i)=><div key={x}><span>{x}</span><b>{[14,22,8,5,7,4][i]}</b><small>questions</small></div>)}</div><div className="large-chart">{Array.from({length:40},(_,i)=><i style={{height:`${15+(i*17)%90}px`}} key={i}/>)}</div></div></div>}
function GenericAnalysis({title}){return <div className="analysis-content"><div className="dark-card generic"><h2>{title}</h2><p>This TestSeries report view is wired for the full analytics dataset: timestamps, revisits, answer states, section switches, score trajectory, peer comparison and leaderboard data.</p><div className="placeholder-grid">{["Accuracy","Time","Score","Attempts","Revisits","Potential"].map(x=><div key={x}><span>{x}</span><b>—</b></div>)}</div></div></div>}

export default function App(){
 return <Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/generate" element={<GeneratePage/>}/>
  <Route path="/tests" element={<HomePage/>}/>
  <Route path="/library" element={<HomePage/>}/>
  <Route path="/launch" element={<LaunchPage/>}/>
  <Route path="/cbt/instructions" element={<Instructions/>}/>
  <Route path="/cbt/test" element={<CbtTest/>}/>
  <Route path="/analysis" element={<Analysis/>}/>
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes>
}
