'use client'

import { UserButton as ClerkUserButton } from '@clerk/nextjs'

export default function UserButton() {
  return (
    <ClerkUserButton>
      <ClerkUserButton.MenuItems>
        <ClerkUserButton.Link
          label='Profile'
          href='/profile'
          labelIcon={<div />}
        />
        <ClerkUserButton.Link
          label='Invites'
          href='/profile#invites'
          labelIcon={<div />}
        />
        <ClerkUserButton.Link label='Team' href='/team' labelIcon={<div />} />
        <ClerkUserButton.Action label='manageAccount' />
      </ClerkUserButton.MenuItems>
    </ClerkUserButton>
  )
}
