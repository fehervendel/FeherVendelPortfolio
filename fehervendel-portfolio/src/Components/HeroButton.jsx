export default function HeroButton({children, link, handleMenuClick, ...props}) {
    return (
        <li onClick={handleMenuClick} className="px-2"><a {...props} href={link} className='text-xl pointer-events-auto underline-animation !text-stone-50'>{children}</a></li>
    )
}