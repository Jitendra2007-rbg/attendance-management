import React from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const AttendancePdf = ({ attendance, sectionName }) => {
  const handleDownload = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Attendance Report', 14, 18)
    doc.setFontSize(13)
    doc.text(`Section: ${sectionName || ''}`, 14, 28)
    doc.setFontSize(12)
    const headers = [['Sl. No', 'Registration Number', 'Name', 'Status']]
    const rows = attendance.map((s, idx) => [
      idx + 1,
      s.regNo,
      s.name,
      s.present ? 'Present' : 'Absent'
    ])
    const total = attendance.length
    const presents = attendance.filter(s => s.present).length
    const absents = total - presents
    autoTable(doc, {
      head: headers,
      body: rows,
      startY: 36,
      theme: 'plain',
      styles: { font: 'helvetica', fontSize: 11, cellPadding: 2 },
      headStyles: { fillColor: [25, 118, 210], textColor: 255, fontStyle: 'bold' },
      bodyStyles: { textColor: 20 },
      didDrawPage: (data) => {
        doc.setFontSize(12)
        let y = data.cursor.y + 12
        doc.text(`Total students: ${total}`, 14, y)
        doc.text(`Presents: ${presents}`, 14, y + 8)
        doc.text(`Absents: ${absents}`, 14, y + 16)
      }
    })
    doc.save('attendance.pdf')
  }

  return (
    <button
      onClick={handleDownload}
      style={{ marginTop: 18, padding: '8px 24px', borderRadius: 8, background: '#1976d2', color: '#fff', border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}
    >
      PDF
    </button>
  )
}

export default AttendancePdf