import { AiFillAmazonCircle, AiFillGoogleCircle, AiFillApple } from 'react-icons/ai'
import { BiLogoMeta, BiLogoMicrosoft, BiLogoShopify } from 'react-icons/bi'
import { SiNotion, SiCoinbase } from 'react-icons/si'
const CompanyFooter = () => {
    return (
        <>
            <code className="text-xs sm:text-base">Practice interviews for companies including:</code>
            <div className='inline-flex'>
                <AiFillAmazonCircle className='sm:text-3xl' />
            </div>
            <div className='inline-flex'>
                <AiFillGoogleCircle className='sm:text-3xl' />
            </div>
            <div className='inline-flex'>
                <BiLogoMeta className='sm:text-3xl' />
            </div>
            <div className='inline-flex'>
                <AiFillApple className='sm:text-3xl' />
            </div>
            <div className='inline-flex'>
                <BiLogoMicrosoft className='sm:text-3xl' />
            </div>
            <div className='inline-flex'>
                <SiNotion className='sm:text-3xl' />
            </div>
            <div className='inline-flex'>
                <SiCoinbase className='sm:text-3xl' />
            </div>
            <div className='inline-flex'>
                <BiLogoShopify className='sm:text-3xl' />
            </div>
        </>
    )
}

export default CompanyFooter