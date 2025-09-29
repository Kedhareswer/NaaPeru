export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  github?: string | null
  demo?: string | null
  category?: string | null
  project_date?: string | null
  image?: string | null
  featured?: boolean | null
  created_at?: string | null
  objectives?: string[] | null
  outcomes?: string[] | null
}
