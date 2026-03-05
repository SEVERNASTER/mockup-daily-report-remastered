import { useState } from 'react'
import Login from './components/Login'
import AllProjectsDashboard from './components/AllProjectsDashboard'
import ProjectDetails from './components/ProjectDetails'
import ReportCreationContainer from './components/ReportCreationContainer'

function App() {
  const [currentView, setCurrentView] = useState('login')
  const [selectedProject, setSelectedProject] = useState(null)

  const handleLoginSuccess = () => {
    setCurrentView('dashboard')
  }

  const handleProjectSelect = (project) => {
    setSelectedProject(project)
    setCurrentView('details')
  }

  const handleBackToDashboard = () => {
    setSelectedProject(null)
    setCurrentView('dashboard')
  }

  return (
    <>
      {currentView === 'login' && (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
      {currentView === 'dashboard' && (
        <AllProjectsDashboard onProjectSelect={handleProjectSelect} />
      )}
      {currentView === 'details' && (
        <ProjectDetails
          project={selectedProject}
          onBack={handleBackToDashboard}
          onCreateReport={() => setCurrentView('createReport')}
        />
      )}
      {currentView === 'createReport' && (
        <ReportCreationContainer
          project={selectedProject}
          onCancel={() => setCurrentView('details')}
        />
      )}
    </>
  )
}

export default App
