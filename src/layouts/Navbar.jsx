import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ sections }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleAddClick = () => {
    setDrawerOpen(false);
    navigate('/add-section');
  };
  const handleSectionClick = (section) => {
    setDrawerOpen(false);
    navigate(`/section/${section.id}`);
  };

  return (
    <div>
      <div>
        <img 
          src="/images/slide.png" 
          style={{width:'80px', paddingTop:'20px',paddingLeft:'15px', cursor:'pointer'}}
          onClick={handleDrawerOpen}
        />
      </div>
      {drawerOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.2)',
            zIndex: 999
          }}
          onClick={handleDrawerClose}
        >
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '250px',
              height: '100%',
              background: 'white',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '40px',
              overflowY: 'auto',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ width:'100%', marginBottom: 20 , }}>
              {sections && sections.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 ,color:'black', }}>
                  {sections.map((section) => (
                    <li key={section.id} style={{
                      padding: '12px 0',
                      borderBottom: '1px solidrgb(65, 63, 63)',
                      color: 'black',
                      fontWeight: 600,
                      fontFamily: 'Nunito, sans-serif',
                      textAlign: 'center',
                      fontSize: 17,
                      cursor: 'pointer',
                    }} onClick={() => handleSectionClick(section)}>
                      {section.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <img 
              src="/images/add.png" 
              style={{width:'50px', cursor:'pointer', marginTop: 10}} 
              onClick={handleAddClick} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;