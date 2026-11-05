import { Link } from 'react-router-dom'
import { LegalPage } from '../components/LegalPage'
import type { LegalSection } from '../components/LegalPage'
import { usePageMeta } from '../hooks/usePageMeta'

const SECTIONS: LegalSection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    content: (
      <>
        <p>
          Nook is a Discord bot made by JR. (“we”, “us”). This policy covers the bot only. Our website has its
          own <Link to="/privacy">privacy policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: 'what-the-bot-handles',
    title: 'What the bot handles',
    content: (
      <>
        <table className="legal__table">
          <thead>
            <tr><th>Feature</th><th>What is handled</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Everyday operation</td>
              <td data-label="What is handled">
                Discord IDs (users, servers, channels, roles and messages) and usernames, as needed to run
                commands and buttons. The bot reads message text to spot commands that start with a prefix such
                as “!”. Messages that are not commands are not stored.
              </td>
            </tr>
            <tr>
              <td>Moderation</td>
              <td data-label="What is handled">
                When a moderator warns someone, we store the server ID, the warned user’s ID and username, the
                moderator’s ID and username, the reason, any proof link or file link the moderator adds, a case
                ID, whether a direct message was sent, and the time. Other actions (ban, kick, mute and similar)
                are carried out on Discord and recorded in the server’s moderation log channel, which that
                server’s staff control.
              </td>
            </tr>
            <tr>
              <td>Tickets</td>
              <td data-label="What is handled">
                A ticket record with the channel ID, server ID, the creator’s ID and username, the ticket type,
                its status and timestamps. When a ticket is closed, the bot reads the messages in that ticket
                channel to build a transcript. The transcript is posted as a file in the server’s staff logs
                channel on Discord. It is not kept in our database.
              </td>
            </tr>
            <tr>
              <td>Self-assign roles</td>
              <td data-label="What is handled">
                No personal data is stored. The bot only adds or removes the roles you pick.
              </td>
            </tr>
            <tr>
              <td>Media library</td>
              <td data-label="What is handled">
                For approved users only: the images, GIFs and stickers you upload, the names you give them, file
                type, size and dimensions, your user ID and username (shown as the adder on shared items) and
                timestamps. Personal libraries are visible only to their owner. The shared library is visible to
                all approved users.
              </td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: 'what-we-dont-do',
    title: 'What we do not do',
    content: (
      <>
        <ul>
          <li>We do not sell, rent or trade your information.</li>
          <li>We do not show ads or build advertising profiles.</li>
          <li>We do not use your data to train AI models.</li>
          <li>We do not store the content of ordinary messages that are not bot commands.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use-it',
    title: 'Why we use it',
    content: (
      <>
        <ul>
          <li>To provide the features above and keep servers moderated and organised.</li>
          <li>To keep the records that server staff need, such as warning history and ticket logs.</li>
          <li>To keep the bot secure, fix errors and prevent abuse.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'who-else-sees-it',
    title: 'Who else sees it',
    content: (
      <>
        <ul>
          <li><strong>Discord</strong>, because the bot runs on their platform. Their own policies apply to your use of Discord.</li>
          <li>
            <strong>Our service providers</strong>: a hosting provider that runs the bot and a database provider
            that stores its records. They process data only to provide those services, and may do so in the
            United States or other countries.
          </li>
          <li><strong>Server staff</strong>, who see moderation logs and ticket transcripts for their own server, as that server sets them up.</li>
          <li><strong>Authorities</strong>, only if we are legally required to, or to protect people from serious harm.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-long-we-keep-it',
    title: 'How long we keep it',
    content: (
      <>
        <ul>
          <li>Warnings are kept until a moderator removes them or you ask us to delete them.</li>
          <li>
            Ticket records are kept until deleted on request. Transcript files live in the server’s logs channel
            and are controlled by that server’s staff.
          </li>
          <li>
            Media you upload is kept until you delete it. Deleting an item removes its file from our database
            straight away.
          </li>
          <li>
            Our hosting provider may keep routine technical logs, for example error messages that contain IDs,
            for a short period.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your choices and rights',
    content: (
      <>
        <p>You can ask us at any time to:</p>
        <ul className="legal__cards">
          <li><strong>Show you</strong>what we hold about you, with a copy.</li>
          <li><strong>Correct it</strong>if anything is wrong.</li>
          <li><strong>Delete it</strong>including warnings, ticket records and media.</li>
        </ul>
        <p>
          Use the <Link to="/contact">contact page</Link> or message us on Discord, and include your Discord user
          ID so we can find your data. We aim to answer within 30 days. Some moderation records may need to be
          kept when that is necessary for safety, to stop abuse or to meet a legal duty. If so, we will tell you.
        </p>
        <p>
          You can also remove the bot from your server at any time, and approved media users can delete their
          own items inside the bot.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    content: (
      <>
        <p>
          Discord requires users to be at least 13, or older where local law says so. Nook is not aimed at
          children under 13 and we do not knowingly collect their information. If you believe a child has given
          us data, contact us and we will delete it.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    content: (
      <>
        <p>
          We limit access to the data, use providers that encrypt data in transit, and keep the media library to
          approved users, with each person’s private library open only to them. No system is perfectly secure,
          so we cannot promise absolute security.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    content: (
      <>
        <p>
          If we change this policy we will update the date at the top of this page. If a change is significant,
          we will say so in our Discord community where we can.
        </p>
      </>
    ),
  },
]

export function NookPrivacy() {
  usePageMeta('/nook/privacy')

  return (
    <LegalPage
      title="Nook privacy policy"
      lead="What the Nook Discord bot handles, why, and the control you have over it."
      updated="5 November 2026"
      readMinutes={4}
      summary={{
        heading: 'The short version',
        points: [
          'We only handle what the bot needs to work: Discord IDs, usernames and what you give it.',
          'Warnings and ticket records are stored. Ticket transcripts go to your server’s logs channel, not our database.',
          'We never sell your information, show ads or train AI on it.',
          'You can ask us to show, fix or delete your data at any time.',
        ],
      }}
      sections={SECTIONS}
      other={{ to: '/nook/terms', label: 'Nook terms of service', blurb: 'The rules for using the bot.' }}
    />
  )
}
