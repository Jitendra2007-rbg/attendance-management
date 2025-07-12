import React from 'react'

const SectionDetails = ({ sectionName, onSectionNameChange }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ fontWeight: 'bold', fontSize: 16 }}>Section Name:</label>
      <input
        type="text"
        value={sectionName}
        onChange={onSectionNameChange}
        placeholder="e.g. CSE-A"
        style={{ marginLeft: 10, padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
      />
    </div>
  )
}

export default SectionDetails