import { createFileRoute } from '@tanstack/react-router'
import { Instagram, Mail, MapPin } from 'lucide-react'
import { STORE_NAME } from '@/data/store'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: `Contact — ${STORE_NAME}` },
      {
        name: 'description',
        content:
          'Questions, wholesale inquiries, or just want to say hi? Get in touch with The Fitzgerald Experience.',
      },
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24">
      <h1 className="font-display text-5xl text-cream">Get in touch</h1>
      <p className="mt-4 text-ash">
        Questions, wholesale inquiries, or just want to say hi? Reach out.
      </p>

      <ul className="mt-10 divide-y divide-cream/10 border-y border-cream/10">
        <li className="flex items-center gap-4 py-5">
          <Instagram className="h-5 w-5 text-ember" />
          <a
            href="https://www.instagram.com/thefitzgeraldexperience"
            target="_blank"
            rel="noreferrer"
            className="font-display text-xl italic text-cream transition hover:text-ember"
          >
            @thefitzgeraldexperience
          </a>
        </li>
        <li className="flex items-center gap-4 py-5">
          <Mail className="h-5 w-5 text-ember" />
          <a
            href="mailto:THEFITZGERALDEXPERIENCE@GMAIL.COM"
            className="text-cream transition hover:text-ember"
          >
            THEFITZGERALDEXPERIENCE@GMAIL.COM
          </a>
        </li>
        <li className="flex items-center gap-4 py-5">
          <MapPin className="h-5 w-5 text-ember" />
          <span className="text-cream">St. Louis, Missouri</span>
        </li>
      </ul>
    </div>
  )
}
