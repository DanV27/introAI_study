const FULL_TEST_TOTAL = 50;
const FULL_TEST_WEIGHTS = {
  'types-of-ai': 0.2,
  'reasoning-knowledge': 0.4,
  'data-sources': 0.4,
};

async function fetchQuestions() {
  const res = await fetch('data/questions.json');
  if (!res.ok) throw new Error('Failed to load questions.json');
  return res.json();
}

function filterByTopic(questions, topic) {
  return questions.filter((q) => q.topic === topic);
}

function shuffle(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function shuffleChoices(question) {
  const indices = shuffle(question.choices.map((_, i) => i));
  const choices = indices.map((i) => question.choices[i]);
  const correctIndex = indices.indexOf(question.correctIndex);
  return { ...question, choices, correctIndex };
}

function buildFullTestSet(questions, total = FULL_TEST_TOTAL) {
  const set = [];
  for (const [topic, weight] of Object.entries(FULL_TEST_WEIGHTS)) {
    const pool = shuffle(filterByTopic(questions, topic));
    const count = Math.min(pool.length, Math.round(total * weight));
    set.push(...pool.slice(0, count));
  }
  return shuffle(set);
}

function buildQuizQuestions(allQuestions, topic) {
  let base;
  if (topic === 'full') {
    base = buildFullTestSet(allQuestions);
  } else {
    base = shuffle(filterByTopic(allQuestions, topic));
  }
  return base.map(shuffleChoices);
}

function calculateScore(answered) {
  const correct = answered.filter((a) => a.chosenIndex === a.correctIndex).length;
  return { correct, total: answered.length };
}
