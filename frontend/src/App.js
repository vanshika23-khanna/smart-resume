import React, { useState } from 'react';
import './App.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleGetSuggestions = () => {
    if (!name || !email || !skills || !experience || !education) {
      alert(' Please fill in all the fields before getting suggestions.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert(' Please enter a valid email address.');
      return;
    }

    let suggestionText = 'Here are some suggestions:\n\n';

    if (skills.toLowerCase().includes('html')) {
      suggestionText += "- Highlight your HTML skills in a dedicated 'Skills' section.\n";
    }
    if (experience.length < 50) {
      suggestionText += '- Add more details to your experience section to show impact and results.\n';
    }
    if (!education.toLowerCase().includes('project')) {
      suggestionText += '- Consider listing your academic projects under the Education section.\n';
    }

    suggestionText += '- Tailor your resume to specific job descriptions using keywords.';

    setSuggestions(suggestionText);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById('resume-content');

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('resume.pdf');
      alert('✅ Your resume has been downloaded as PDF!');
    });
  };

  return (
    <div className="container">
      <h1>Smart Resume Builder</h1>

    
      <div id="resume-content">
        <label>Name:</label>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />

        <label>Email:</label>
        <input
          type="text"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />

        <label>Skills:</label>
        <textarea
          placeholder="e.g. HTML, CSS, JavaScript"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="textarea-field"
        />

        <label>Experience:</label>
        <textarea
          placeholder="Describe your experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="textarea-field"
        />

        <label>Education:</label>
        <textarea
          placeholder="Your education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          className="textarea-field"
        />
      </div>

      
      <button onClick={handleGetSuggestions} className="button">
        Get AI Suggestions
      </button>

      <button
        onClick={handleDownloadPDF}
        className="button">
        Download as PDF
      </button>

      <h3 className="head">AI Suggestions</h3>
      <div className="suggestions">
        {suggestions || 'Suggestions will appear here...'}
      </div>
    </div>
  );
}

export default App;
