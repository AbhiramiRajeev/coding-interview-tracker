import { useState, useEffect } from 'react';
import { problemsData } from './data/problems';
import PatternSection from './components/PatternSection';
import ProblemGenerator from './components/ProblemGenerator';
import './App.css';

function App() {
  const [patterns, setPatterns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('codingProblems');
    if (savedData) {
      setPatterns(JSON.parse(savedData));
    } else {
      setPatterns(problemsData);
    }
  }, []);

  // Save to localStorage whenever patterns change
  useEffect(() => {
    if (patterns.length > 0) {
      localStorage.setItem('codingProblems', JSON.stringify(patterns));
    }
  }, [patterns]);

  const toggleProblemStatus = (patternId, problemId) => {
    setPatterns(prevPatterns =>
      prevPatterns.map(pattern =>
        pattern.id === patternId
          ? {
              ...pattern,
              problems: pattern.problems.map(problem =>
                problem.id === problemId
                  ? { ...problem, completed: !problem.completed }
                  : problem
              )
            }
          : pattern
      )
    );
  };

  const getStats = () => {
    let total = 0;
    let completed = 0;
    patterns.forEach(pattern => {
      pattern.problems.forEach(problem => {
        total++;
        if (problem.completed) completed++;
      });
    });
    return { total, completed, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  const stats = getStats();

  const filteredPatterns = patterns.map(pattern => ({
    ...pattern,
    problems: pattern.problems.filter(problem => {
      const matchesSearch = problem.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = filterDifficulty === 'all' || problem.difficulty === filterDifficulty;
      const matchesStatus = 
        filterStatus === 'all' || 
        (filterStatus === 'completed' && problem.completed) ||
        (filterStatus === 'pending' && !problem.completed);
      return matchesSearch && matchesDifficulty && matchesStatus;
    })
  })).filter(pattern => pattern.problems.length > 0);

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setPatterns(problemsData);
      localStorage.removeItem('codingProblems');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎯 Coding Interview Tracker</h1>
        <p className="subtitle">Track your DSA pattern mastery</p>
      </header>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-label">Total Problems:</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Completed:</span>
          <span className="stat-value completed">{stats.completed}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Pending:</span>
          <span className="stat-value pending">{stats.total - stats.completed}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Progress:</span>
          <span className="stat-value">{stats.percentage}%</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${stats.percentage}%` }}></div>
        </div>
      </div>

      <ProblemGenerator patterns={patterns} />

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search problems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <button onClick={resetProgress} className="reset-button">
          🔄 Reset Progress
        </button>
      </div>

      <div className="patterns-container">
        {filteredPatterns.map(pattern => (
          <PatternSection
            key={pattern.id}
            pattern={pattern}
            onToggle={toggleProblemStatus}
          />
        ))}
      </div>

      <footer className="footer">
        <p>Built with ❤️ for coding interview preparation</p>
      </footer>
    </div>
  );
}

export default App;

// Made with Bob
