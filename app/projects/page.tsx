import { permanentRedirect as redirect } from 'next/navigation'

export default function ProjectsRedirectPage() {
  redirect('/#featured-projects')
}
