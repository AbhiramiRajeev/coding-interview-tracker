import { useState } from 'react';
import ProblemItem from './ProblemItem';
import './PatternSection.css';

function PatternSection({ pattern, onToggle }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedCount = pattern.problems.filter(p => p.completed).length;
  const totalCount = pattern.problems.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="pattern-section">
      <div className="pattern-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="pattern-title">
          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
          <h2>{pattern.name}</h2>
          <span className="pattern-count">
            {completedCount}/{totalCount} ({percentage}%)
          </span>
        </div>
        <div className="pattern-progress">
          <div className="pattern-progress-bar" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="problems-list">
          {pattern.problems.map(problem => (
            <ProblemItem
              key={problem.id}
              problem={problem}
              onToggle={() => onToggle(pattern.id, problem.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PatternSection;

// Made with Bob
