function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", fontFamily: "Arial" }}>
      <h1>Smart Resume Builder</h1>

      <label>Name:</label>
      <input type="text" placeholder="Your name" style={{ display: "block", width: "100%", marginBottom: "10px" }} />

      <label>Email:</label>
      <input type="text" placeholder="Your email" style={{ display: "block", width: "100%", marginBottom: "10px" }} />

      <label>Skills:</label>
      <textarea placeholder="e.g. HTML, CSS, JavaScript" style={{ display: "block", width: "100%", marginBottom: "10px" }}></textarea>

      <label>Experience:</label>
      <textarea placeholder="Describe your experience" style={{ display: "block", width: "100%", marginBottom: "10px" }}></textarea>

      <label>Education:</label>
      <textarea placeholder="Your education" style={{ display: "block", width: "100%", marginBottom: "10px" }}></textarea>

      <button style={{ padding: "10px 20px", background: "black", color: "white", border: "none", marginTop: "10px" }}>
        Get AI Suggestions
      </button>

      <h3 style={{ marginTop: "30px" }}>AI Suggestions</h3>
      <div style={{ border: "1px solid #ccc", padding: "10px", minHeight: "100px" }}>
        Suggestions will appear here...
      </div>
    </div>
  );
}

export default App;
