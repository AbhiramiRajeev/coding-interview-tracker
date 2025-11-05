import './ProblemItem.css';

function ProblemItem({ problem, onToggle }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#4ade80';
      case 'medium': return '#fbbf24';
      case 'hard': return '#f87171';
      default: return '#6b7280';
    }
  };

  return (
    <div className={`problem-item ${problem.completed ? 'completed' : 'pending'}`}>
      <div className="problem-checkbox">
        <input
          type="checkbox"
          checked={problem.completed}
          onChange={onToggle}
          className="checkbox"
        />
      </div>
      
      <div className="problem-content">
        <div className="problem-name">
          {problem.name}
        </div>
        <div className="problem-meta">
          <span 
            className="difficulty-badge"
            style={{ backgroundColor: getDifficultyColor(problem.difficulty) }}
          >
            {problem.difficulty}
          </span>
          {problem.link && (
            <a 
              href={problem.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="problem-link"
              onClick={(e) => e.stopPropagation()}
            >
              🔗 Link
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProblemItem;

// Made with Bob
