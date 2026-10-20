import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Camera, Mic, MicOff, Video, VideoOff, Sparkles, ShieldCheck, WandSparkles, ChevronRight, CircleHelp, Menu, X, UserRound, MonitorSmartphone, Zap } from 'lucide-react';
import './styles.css';

const avatars = [
  { id: 'nova', name: 'Nova', type: 'Studio portrait', initials: 'N', color: 'violet', description: 'Warm, confident and expressive' },
  { id: 'kai', name: 'Kai', type: 'Digital human', initials: 'K', color: 'blue', description: 'Calm, modern and friendly' },
  { id: 'mira', name: 'Mira', type: 'Studio portrait', initials: 'M', color: 'rose', description: 'Bright, creative and approachable' },
  { id: 'atlas', name: 'Atlas', type: 'Digital human', initials: 'A', color: 'gold', description: 'Professional and composed' },
];

function App() {
  const [selected, setSelected] = useState(avatars[0]);
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [notice, setNotice] = useState('Preview mode · AI animation engine not connected yet');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
  }, []);

  async function toggleCamera() {
    if (cameraOn) {
      streamRef.current?.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) videoRef.current.srcObject = null;
      setCameraOn(false);
      setNotice('Camera stopped');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraOn(true);
      setCameraError('');
      setNotice('Camera preview active · Your original camera feed is not being transformed');
    } catch (e) {
      setCameraError('Camera access was blocked or unavailable. Allow camera permission in your browser and try again.');
    }
  }

  async function toggleMic() {
    if (!micOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        stream.getAudioTracks().forEach(t => t.stop());
        setMicOn(true);
        setNotice('Microphone permission checked · voice-driven animation is not connected yet');
      } catch {
        setCameraError('Microphone access was blocked or unavailable. Check your browser permissions.');
      }
    } else {
      setMicOn(false);
      setNotice('Microphone preview disabled');
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="FaceVerse AI home">
          <span className="brand-mark"><Sparkles size={20} /></span>
          <span>FACEVERSE<span className="brand-ai"> AI</span><small>YOUR VIRTUAL PRESENCE</small></span>
        </a>
        <nav className={mobileMenu ? 'nav-links open' : 'nav-links'}>
          <a className="nav-active" href="#studio" onClick={() => setMobileMenu(false)}>Studio</a>
          <a href="#avatars" onClick={() => setMobileMenu(false)}>Avatars</a>
          <a href="#how-it-works" onClick={() => setMobileMenu(false)}>How it works</a>
        </nav>
        <div className="top-actions">
          <span className="beta-pill"><span className="status-dot" /> EARLY ACCESS</span>
          <button className="icon-button menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X /> : <Menu />}</button>
          <button className="profile-button"><UserRound size={16} /> <span>Guest</span></button>
        </div>
      </header>

      <main>
        <section className="hero" id="studio">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> THE NEXT YOU, REIMAGINED</div>
            <h1>Your presence.<br /><span>Reimagined.</span></h1>
            <p>Meet your virtual self. Explore expressive AI avatars designed for a more creative, confident way to show up online.</p>
            <div className="hero-points">
              <span><ShieldCheck size={16} /> Privacy-first design</span>
              <span><Zap size={16} /> Built for real time</span>
            </div>
          </div>
          <div className="hero-orb-wrap" aria-hidden="true">
            <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
            <div className="hero-orb"><div className="orb-face"><div className="orb-hair"></div><div className="orb-eyes"><i></i><i></i></div><div className="orb-nose"></div><div className="orb-mouth"></div></div></div>
            <div className="orb-label"><span className="status-dot"></span> YOUR AVATAR UNIVERSE</div>
          </div>
        </section>

        <section className="workspace-grid">
          <div className="panel preview-panel">
            <div className="panel-heading">
              <div><span className="section-kicker">01 / LIVE WORKSPACE</span><h2>Avatar preview</h2></div>
              <span className="preview-badge"><span className="status-dot muted"></span> {cameraOn ? 'CAMERA ON' : 'STANDBY'}</span>
            </div>
            <div className="preview-stage">
              <video ref={videoRef} autoPlay playsInline muted className={cameraOn ? 'camera-video visible' : 'camera-video'} />
              {!cameraOn && <div className={`avatar-placeholder ${selected.color}`}>
                <div className="avatar-halo"></div><div className="avatar-head"><div className="avatar-hair"></div><div className="avatar-eyes"><i></i><i></i></div><div className="avatar-nose"></div><div className="avatar-smile"></div></div>
                <div className="avatar-caption"><span className="caption-dot"></span><span><b>{selected.name}</b><small>{selected.description}</small></span></div>
              </div>}
              {cameraOn && <div className="camera-label"><Camera size={13} /> Original camera preview</div>}
              <div className="preview-corner top-left"></div><div className="preview-corner top-right"></div><div className="preview-corner bottom-left"></div><div className="preview-corner bottom-right"></div>
              <div className="preview-controls">
                <button className={cameraOn ? 'round-control active' : 'round-control'} onClick={toggleCamera} aria-label={cameraOn ? 'Turn camera off' : 'Turn camera on'}>{cameraOn ? <Video size={18}/> : <VideoOff size={18}/>}</button>
                <button className={micOn ? 'round-control active' : 'round-control'} onClick={toggleMic} aria-label={micOn ? 'Turn microphone off' : 'Turn microphone on'}>{micOn ? <Mic size={18}/> : <MicOff size={18}/>}</button>
                <button className="round-control disabled" title="AI engine will be connected in a later phase" aria-label="AI effects unavailable"><WandSparkles size={18}/></button>
              </div>
            </div>
            {cameraError && <div className="error-note">{cameraError}</div>}
            <div className="notice-line"><span className="notice-icon"><CircleHelp size={15}/></span>{notice}</div>
            <div className="preview-footer">
              <div className="device-status"><span className="status-dot"></span><span>Camera ready when you are</span></div>
              <button className="primary-button" onClick={() => setNotice('The live AI avatar engine is not connected yet. This prototype currently previews your selected avatar or original camera.')}>Open studio <ChevronRight size={16}/></button>
            </div>
          </div>

          <aside className="panel avatar-panel" id="avatars">
            <div className="panel-heading">
              <div><span className="section-kicker">02 / YOUR LOOK</span><h2>Choose an avatar</h2></div>
              <span className="count-label">04 OPTIONS</span>
            </div>
            <p className="panel-intro">Choose a starting character for your virtual identity. More customisation is coming.</p>
            <div className="avatar-list">
              {avatars.map(avatar => <button key={avatar.id} onClick={() => { setSelected(avatar); setNotice(`${avatar.name} selected · preview is illustrative until the AI engine is connected`); }} className={`avatar-option ${selected.id === avatar.id ? 'selected' : ''}`}>
                <span className={`avatar-thumb ${avatar.color}`}><span className="thumb-head"><i></i><i></i><b></b></span></span>
                <span className="avatar-info"><b>{avatar.name}</b><small>{avatar.type}</small></span>
                <span className="radio-check">{selected.id === avatar.id && <span/>}</span>
              </button>)}
            </div>
            <button className="secondary-button" onClick={() => setNotice('Custom avatar upload will be added after secure upload and consent checks are implemented.')}><Sparkles size={16}/> Create custom avatar <span className="coming-soon">SOON</span></button>
            <div className="privacy-card"><ShieldCheck size={20}/><div><b>Your identity, your choice.</b><p>Use avatars you own or have permission to use. Clear AI disclosure helps keep calls transparent.</p></div></div>
          </aside>
        </section>

        <section className="steps-section" id="how-it-works">
          <div className="section-heading"><span className="section-kicker">03 / THE JOURNEY</span><h2>From imagination to interaction.</h2><p>We're building FaceVerse in thoughtful steps, with transparency at every stage.</p></div>
          <div className="steps-grid">
            <article className="step-card"><span className="step-number">01</span><div className="step-icon"><UserRound/></div><h3>Choose your look</h3><p>Explore virtual characters and select a style that feels like you.</p><span className="step-status done">PROTOTYPE READY</span></article>
            <article className="step-card"><span className="step-number">02</span><div className="step-icon"><WandSparkles/></div><h3>Bring it to life</h3><p>Connect a real-time animation engine for expressive movement and speech.</p><span className="step-status in-progress">NEXT MILESTONE</span></article>
            <article className="step-card"><span className="step-number">03</span><div className="step-icon"><MonitorSmartphone/></div><h3>Join your calls</h3><p>Build integrations for supported desktop and mobile calling workflows.</p><span className="step-status planned">PLANNED</span></article>
          </div>
        </section>
      </main>
      <footer className="footer"><a className="brand footer-brand" href="#"><span className="brand-mark"><Sparkles size={17}/></span><span>FACEVERSE<span className="brand-ai"> AI</span></span></a><span>Virtual presence, thoughtfully designed.</span><span>Prototype v0.1 · AI engine not connected</span></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
