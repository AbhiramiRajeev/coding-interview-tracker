import { useState } from 'react';
import './ProblemGenerator.css';

function ProblemGenerator({ patterns }) {
  const [selectedPattern, setSelectedPattern] = useState('all');
  const [generatedProblem, setGeneratedProblem] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const getCompletedProblems = () => {
    let completedProblems = [];
    
    patterns.forEach(pattern => {
      const completed = pattern.problems.filter(problem => problem.completed);
      if (selectedPattern === 'all' || pattern.id.toString() === selectedPattern) {
        completedProblems = [...completedProblems, ...completed.map(problem => ({
          ...problem,
          patternName: pattern.name
        }))];
      }
    });
    
    return completedProblems;
  };

  const generateRandomProblem = () => {
    const completedProblems = getCompletedProblems();
    
    if (completedProblems.length === 0) {
      alert('No completed problems found! Mark some problems as completed first.');
      return;
    }

    setIsGenerating(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * completedProblems.length);
      setGeneratedProblem(completedProblems[randomIndex]);
      setIsGenerating(false);
    }, 500);
  };

  const completedCount = getCompletedProblems().length;
  const selectedPatternName = selectedPattern === 'all' 
    ? 'All Patterns' 
    : patterns.find(p => p.id.toString() === selectedPattern)?.name || '';

  return (
    <div className="problem-generator">
      <div className="generator-header">
        <h2>🎲 Random Problem Generator</h2>
        <p>Practice with problems you've already completed</p>
      </div>

      <div className="generator-controls">
        <div className="pattern-selector">
          <label htmlFor="pattern-select">Select Pattern:</label>
          <select
            id="pattern-select"
            value={selectedPattern}
            onChange={(e) => setSelectedPattern(e.target.value)}
            className="pattern-select"
          >
            <option value="all">All Patterns</option>
            {patterns.map(pattern => (
              <option key={pattern.id} value={pattern.id.toString()}>
                {pattern.name}
              </option>
            ))}
          </select>
        </div>

        <div className="generator-info">
          <span className="completed-count">
            {completedCount} completed problems in {selectedPatternName}
          </span>
        </div>

        <button
          onClick={generateRandomProblem}
          disabled={completedCount === 0 || isGenerating}
          className="generate-button"
        >
          {isGenerating ? '🎲 Generating...' : '🎲 Generate Random Problem'}
        </button>
      </div>

      {generatedProblem && (
        <div className="generated-problem">
          <div className="problem-card">
            <div className="problem-header">
              <h3>{generatedProblem.name}</h3>
              <span className="pattern-badge">{generatedProblem.patternName}</span>
            </div>
            <div className="problem-details">
              <span 
                className="difficulty-badge"
                style={{ 
                  backgroundColor: 
                    generatedProblem.difficulty === 'easy' ? '#4ade80' :
                    generatedProblem.difficulty === 'medium' ? '#fbbf24' : '#f87171'
                }}
              >
                {generatedProblem.difficulty}
              </span>
              {generatedProblem.link && (
                <a 
                  href={generatedProblem.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="problem-link"
                >
                  🔗 Open Problem
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProblemGenerator;

// Made with Bob
