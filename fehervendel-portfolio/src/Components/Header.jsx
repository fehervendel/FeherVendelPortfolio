export default function Header() {
    return (
        <section className='container flex flex-row justify-between items-center w-full'>
            <div>
                <img alt="logo"/>
            </div>
            <div>
                <ol className="flex justify-between items-center">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ol>
            </div>
            <div>
                <ul className="flex justify-between items-center">
                    <li>Linkedin</li>
                    <li>Facebook</li>
                    <li>Email</li>
                </ul>
            </div>
        </section>
    )
}