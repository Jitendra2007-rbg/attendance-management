import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ sections }) => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      {sections.length === 0 ? (
        <div style={{ fontSize: '1.3rem', color: '#888', marginTop: '60px' }}>
          No sections added yet. Please add a section 😊
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '32px',
          marginTop: '40px',
          justifyItems: 'center',
        }}>
          {sections.map((section) => (
            <div
              key={section.id}
              style={{
                background: 'linear-gradient(120deg, #e3ffe8 0%, #b2f7ef 100%)',
                borderRadius: 18,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                padding: '32px 18px',
                minWidth: 200,
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
                fontSize: 22,
                color: '#1976d2',
                cursor: 'pointer',
                transition: 'transform 0.15s',
                position: 'relative',
              }}
              onClick={() => navigate(`/attendance/${section.id}`)}
            >
              {section.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;