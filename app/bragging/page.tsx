import { permanentRedirect as redirect } from "next/navigation"

export default function BraggingRedirectPage() {
  redirect("/#featured-projects")
}
