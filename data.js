export const demoQuestions = [
  {
    id: "phy-1", number: 1, subject: "Physics", type: "MCQ",
    stem: "If force, length and time are the fundamental quantities then what would be the dimensional formula for mass?",
    options: ["FL⁻¹T⁻²", "FL⁻¹T²", "FLT⁻²", "F"],
    answer: "A", chapter: "UNITS AND MEASUREMENTS", subtopics: ["Dimensions", "Dimensional formula"]
  },
  {
    id: "phy-2", number: 2, subject: "Physics", type: "MCQ",
    stem: "A particle is moving on a circular path of radius r with uniform speed v. The magnitude of change in velocity when the particle moves from P to Q is:",
    options: ["2v cos 40°", "2v sin 40°", "2v sin 20°", "2v cos 20°"],
    answer: "B", chapter: "KINEMATICS", subtopics: ["Circular motion", "Velocity"]
  },
  {
    id: "phy-3", number: 3, subject: "Physics", type: "NUMERICAL",
    stem: "A force of 12 N produces an acceleration of 2 m/s² in a box. Find the mass of the box.",
    answer: "6", chapter: "LAWS OF MOTION", subtopics: ["Newton's laws", "Mass and acceleration"]
  },
  {
    id: "phy-4", number: 4, subject: "Physics", type: "MCQ",
    stem: "Which of the following sets of forces can not give zero resultant force?",
    options: ["1 N, 1 N, 1 N", "2 N, 3 N, 4 N", "2 N, 3 N, 5 N", "2 N, 3 N, 6 N"],
    answer: "D", chapter: "LAWS OF MOTION", subtopics: ["Forces", "Resultant"]
  },
  {
    id: "phy-5", number: 5, subject: "Physics", type: "MCQ",
    stem: "A vector is perpendicular to which of the following vectors?",
    options: ["A", "B", "C", "D"], answer: "C",
    chapter: "VECTOR ALGEBRA", subtopics: ["Dot product", "Perpendicular vectors"]
  },
  ...Array.from({length: 20}, (_, i) => ({
    id: `demo-${i+6}`, number: i+6, subject: i < 20 ? "Physics" : "Mathematics",
    type: "MCQ",
    stem: `Demo JEE question ${i+6}. This placeholder represents the transcribed question from the uploaded PDF pipeline.`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: ["A","B","C","D"][i%4],
    chapter: ["ELECTROSTATICS","CURRENT ELECTRICITY","OPTICS","MODERN PHYSICS"][i%4],
    subtopics: ["Core concept", "Application"]
  })),
  ...Array.from({length: 25}, (_, i) => ({
    id: `chem-${i+1}`, number: i+26, subject: "Chemistry",
    type: i % 5 === 0 ? "NUMERICAL" : "MCQ",
    stem: `Chemistry demo question ${i+26}.`,
    options: i % 5 === 0 ? undefined : ["Option A", "Option B", "Option C", "Option D"],
    answer: i % 5 === 0 ? String(2+i%9) : ["A","B","C","D"][i%4],
    chapter: ["MOLE CONCEPT","THERMODYNAMICS","ORGANIC CHEMISTRY","COORDINATION COMPOUNDS"][i%4],
    subtopics: ["Concept", "Practice"]
  })),
  ...Array.from({length: 25}, (_, i) => ({
    id: `math-${i+1}`, number: i+51, subject: "Mathematics",
    type: i % 6 === 0 ? "NUMERICAL" : "MCQ",
    stem: `Mathematics demo question ${i+51}.`,
    options: i % 6 === 0 ? undefined : ["Option A", "Option B", "Option C", "Option D"],
    answer: i % 6 === 0 ? String(4+i%8) : ["A","B","C","D"][i%4],
    chapter: ["CALCULUS","ALGEBRA","COORDINATE GEOMETRY","VECTORS AND 3D"][i%4],
    subtopics: ["Core concept", "Application"]
  })),
];

export const analysisNav = [
  "Overview", "Subject Stats", "Chapter Reports", "Score Potential",
  "Time Analysis", "Insights", "Score Progress", "Question Journey",
  "Subject Journey", "Review Exam", "Compare with Peers", "Leaderboard"
];

export const chapterRows = [
  ["Units & Measurements", 4, 3, 1, 0, "75%", "At pace", "12m 08s"],
  ["Kinematics", 5, 4, 1, 0, "80%", "Fast", "13m 42s"],
  ["Laws of Motion", 5, 3, 1, 1, "75%", "Slow", "16m 11s"],
  ["Electrostatics", 4, 2, 2, 0, "50%", "Slow", "14m 55s"],
  ["Thermodynamics", 5, 4, 0, 1, "80%", "At pace", "11m 28s"],
];
