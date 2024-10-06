import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CodeUploader from './components/CodeUploader.jsx';
import Hero from './components/Hero.jsx';
import Colab from './components/Colab.jsx'
import CodeLab from './components/CodeLab.jsx';
import SignIn from './components/SignIn.jsx';
import Register from './components/Register.jsx';
import ProjectForm from './components/ProjectForm.jsx';
import Project from './components/Project.jsx';
import ProjectOwn from './components/ProjectOwn.jsx';
import Myproject from './components/myproject.jsx'

function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/upload" element={<CodeUploader />} />
        <Route path="/collab" element={<Colab />} />
        <Route path="/codelab" element={<CodeLab/>} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/addproject" element={<ProjectForm />} />
        <Route path="/project/:repo_id" element={<Project />} />
        <Route path="/projectown/:repo_id" element={<ProjectOwn />} />
        <Route path="/myproject" element={<Myproject />} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;