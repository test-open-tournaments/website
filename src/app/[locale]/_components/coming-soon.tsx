import { Link } from '@navigation'
import { useTranslations } from 'next-intl'

import Background from '~/components/background'

export default function ComingSoon() {
  const t = useTranslations('HomePage')

  return (
    <Background className='flex min-h-screen flex-col items-center justify-center gap-6 px-3 text-[#070427]'>
      <div className='grid gap-1'>
        <h1 className='font-black text-5xl'>
          TEST <span className='font-medium'>Open</span>
        </h1>
        <p className='text-center text-xl italic'>{t('comingSoon')}</p>
      </div>

      <p className='text-center text-sm'>
        {`${t('OldSite.message')} `}
        <Link href='https://2024.test-open.com' className='underline'>
          {t('OldSite.link')}
        </Link>
        .
      </p>
    </Background>
  )
}
