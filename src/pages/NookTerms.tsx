import { Link } from 'react-router-dom'
import { LegalPage } from '../components/LegalPage'
import type { LegalSection } from '../components/LegalPage'
import { usePageMeta } from '../hooks/usePageMeta'

const SECTIONS: LegalSection[] = [
  {
    id: 'agreeing',
    title: 'Agreeing to these terms',
    content: (
      <>
        <p>
          These terms are the rules for using Nook, a Discord bot made by JR. (“the bot”, “we”, “us”). By adding
          the bot to a server, using its commands, or using it in a direct message, you agree to them. If you do
          not agree, please do not use the bot. Our <Link to="/nook/privacy">Nook privacy policy</Link> explains
          how data is handled.
        </p>
      </>
    ),
  },
  {
    id: 'who-can-use-it',
    title: 'Who can use it',
    content: (
      <>
        <ul>
          <li>
            You must follow Discord’s <a href="https://discord.com/terms" target="_blank" rel="noreferrer">Terms of Service</a> and{' '}
            <a href="https://discord.com/guidelines" target="_blank" rel="noreferrer">Community Guidelines</a>,
            including its minimum age (13, or higher where local law says so).
          </li>
          <li>If you add the bot to a server, you confirm you have permission to manage that server.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'what-the-bot-does',
    title: 'What the bot does',
    content: (
      <>
        <p>
          Nook provides moderation tools (warnings, mutes, kicks and bans), support tickets with transcripts,
          self-assignable role panels, and a private and shared media library for approved users. We may add,
          change or remove features at any time.
        </p>
      </>
    ),
  },
  {
    id: 'server-owners',
    title: 'Server owners and staff',
    content: (
      <>
        <ul>
          <li>
            You are responsible for how your staff use the bot’s moderation and ticket tools in your server, and
            for following the law and Discord’s rules when doing so.
          </li>
          <li>
            Moderation decisions are made by your server’s staff, not by us. We do not review or take
            responsibility for individual moderation decisions.
          </li>
          <li>Tell your members, where required, that moderation records and ticket transcripts are kept.</li>
          <li>Give the bot only the permissions it needs.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'media-library',
    title: 'The media library',
    content: (
      <>
        <ul>
          <li>The media library is for users we have approved. Access can be changed or removed at any time.</li>
          <li>
            You keep ownership of what you upload. You give us permission to store it and send it where you ask,
            only to run the feature.
          </li>
          <li>
            Only upload things you have the right to use. Do not upload anything illegal, anything that sexualises
            minors, hateful or harassing content, other people’s private information, or malware.
          </li>
          <li>
            Items in the shared library can be seen and sent by all approved users. Only the person who added an
            item can rename or delete it.
          </li>
          <li>We may remove content or access that breaks these terms.</li>
          <li>Keep your own copy of anything important. We do not guarantee that stored files will never be lost.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>break the law or Discord’s rules while using the bot,</li>
          <li>harass or harm others, or send spam,</li>
          <li>interfere with the bot or overload it,</li>
          <li>try to get around its access limits, permissions or rate limits, or probe it for weaknesses.</li>
        </ul>
        <p>We may stop the bot working for anyone who breaks these rules.</p>
      </>
    ),
  },
  {
    id: 'availability',
    title: 'Availability',
    content: (
      <>
        <p>
          The bot is free and may be down, slow or changed without notice. We do not promise that it will always
          work or be error free.
        </p>
      </>
    ),
  },
  {
    id: 'ending-use',
    title: 'Ending use',
    content: (
      <>
        <p>
          You can stop using the bot at any time by removing it from your server. We may suspend or remove
          access, or stop the bot working in a server, if these terms are broken or to protect people or the
          service. You can ask us to delete your data as described in the{' '}
          <Link to="/nook/privacy">privacy policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: 'No warranty and limits on our liability',
    content: (
      <>
        <p>
          The bot is provided “as is” and “as available”, without warranties of any kind, to the fullest extent
          the law allows. To the fullest extent the law allows, JR. is not liable for indirect or consequential
          loss, lost data or lost profits, or for actions taken by server staff or other users.
        </p>
        <p>Nothing in these terms limits liability that cannot be limited by law.</p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    content: (
      <>
        <p>
          We may update these terms. If we do, we will change the date at the top of this page. Using the bot
          after an update means you accept the new terms.
        </p>
      </>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    content: (
      <>
        <p>
          These terms are governed by the laws that apply where JR. operates. If a dispute cannot be settled
          informally, the courts of that place will have jurisdiction, unless your local consumer law gives you
          the right to bring a claim elsewhere.
        </p>
      </>
    ),
  },
]

export function NookTerms() {
  usePageMeta('/nook/terms')

  return (
    <LegalPage
      title="Nook terms of service"
      lead="The rules for using the Nook Discord bot."
      updated="5 November 2026"
      readMinutes={3}
      summary={{
        heading: 'The short version',
        points: [
          'Follow Discord’s rules, and be decent to others.',
          'Server staff are responsible for their own moderation decisions.',
          'The media library is for approved users, and you must have the right to what you upload.',
          'The bot is free and provided as is, and these terms may change.',
        ],
      }}
      sections={SECTIONS}
      other={{ to: '/nook/privacy', label: 'Nook privacy policy', blurb: 'What the bot handles and your choices.' }}
    />
  )
}
