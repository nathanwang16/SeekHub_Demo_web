import { useState } from "react";

// The Cloud Run URL you copied during backend deploy.
// For local dev use:  http://127.0.0.1:8000
const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  // ----- state -----
  const [enText , setEnText ] = useState("");
  const [zhText , setZhText ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error  , setError  ] = useState(null);

  // ----- helpers -----
  async function translate() {
    if (!enText.trim()) return;

    setLoading(true);
    setError(null);
    setZhText("");

    try {
      const res = await fetch(`${API_URL}/translate`, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify({ text: enText })
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`${res.status} – ${msg}`);
      }

      const { translation } = await res.json();
      setZhText(translation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ----- UI -----
  return (
    <div style={styles.page}>
      <h1 style={styles.h1}>EN → 中文 Translator</h1>

      <textarea
        style={styles.textarea}
        placeholder="Paste or type English text here…"
        value={enText}
        onChange={e => setEnText(e.target.value)}
      />

      <button
        style={loading ? styles.btnDisabled : styles.btn}
        disabled={loading}
        onClick={translate}
      >
        {loading ? "Translating…" : "Translate"}
      </button>

      {error && <p style={styles.err}>{error}</p>}

      <textarea
        style={{ ...styles.textarea, background:"#fafafa" }}
        readOnly
        placeholder="Translation will appear here"
        value={zhText}
      />
    </div>
  );
}

// ----- naive inline “styling” -----
const styles = {
  page      : { maxWidth: 700, margin:"40px auto", fontFamily:"sans-serif", padding: "0 16px" },
  h1        : { fontSize:"1.6rem", marginBottom:16 },
  textarea  : { width:"100%", height:160, padding:10, fontSize:"1rem", lineHeight:1.4, marginBottom:12 },
  btn       : { padding:"10px 24px", fontSize:"1rem", cursor:"pointer", background:"#146FF5", color:"#fff",
                border:"none", borderRadius:4 },
  btnDisabled: { padding:"10px 24px", fontSize:"1rem", background:"#7ca7f7", color:"#fff",
                 border:"none", borderRadius:4 },
  err       : { color:"#c00", marginBottom:12 }
};