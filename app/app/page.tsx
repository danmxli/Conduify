import BriefDescription from '@/components/landing/brief-description';
import UserPortal from '@/components/landing/user-portal';


export default function Landing() {
  return (
    <div className='grid md:grid-cols-2'>
      <div className='h-screen flex items-center justify-center'>
        <UserPortal />
      </div>
      <div className='h-screen flex items-center justify-center'>
        <BriefDescription />
      </div>
    </div>
  )
}
