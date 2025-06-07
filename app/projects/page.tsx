import { Suspense } from "react"

// Create a loading fallback component
function ProjectsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Assume ProjectsList is a component that uses useSearchParams
function ProjectsList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Project {i + 1}</h2>
            <p className="text-gray-700">Description of project {i + 1}.</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsList />
    </Suspense>
  )
}
