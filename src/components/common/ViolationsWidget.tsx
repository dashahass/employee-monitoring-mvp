import React from 'react';
import { Employee } from '../../types/employee';
import './ViolationsWidget.css';

interface ViolationItem {
  employee: Employee;
  violations: number;
  lastViolation: string;
  time: string;
}

interface ViolationsWidgetProps {
  violations: ViolationItem[];
  maxItems?: number;
}

const ViolationsWidget: React.FC<ViolationsWidgetProps> = ({
  violations,
  maxItems = 5
}) => {
  const displayedViolations = violations.slice(0, maxItems);

  const getSeverityClass = (count: number) => {
    if (count >= 5) return 'high';
    if (count >= 3) return 'medium';
    return 'low';
  };

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="violations-widget">
      <div className="widget-header">
        <h3>Последние нарушения</h3>
        <span className="widget-badge">{violations.length}</span>
      </div>
      
      <div className="violations-list">
        {displayedViolations.length === 0 ? (
          <div className="no-violations">
            <div className="no-violations-icon">✅</div>
            <p>Нарушений нет</p>
            <span className="no-violations-subtitle">Отличная работа!</span>
          </div>
        ) : (
          displayedViolations.map((item, index) => (
            <div key={index} className="violation-item">
              <div className="violation-severity">
                <div className={`severity-dot ${getSeverityClass(item.violations)}`} />
              </div>
              
              <div className="violation-avatar">
                {item.employee.name.charAt(0)}
              </div>
              
              <div className="violation-info">
                <div className="employee-name">
                  {item.employee.name}
                  <span className="violation-count">
                    {item.violations} наруш.
                  </span>
                </div>
                <div className="violation-description">
                  {item.lastViolation}
                </div>
              </div>
              
              <div className="violation-time">
                {formatTime(item.time)}
              </div>
            </div>
          ))
        )}
      </div>
      
      {violations.length > maxItems && (
        <div className="widget-footer">
          <button className="view-all-violations">
            Показать все нарушения ({violations.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default ViolationsWidget;