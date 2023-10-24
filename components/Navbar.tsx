import Link from "next/link"
import  Image  from "next/image"
export default function Navbar(){
    return(
        <nav>
            <div className="logo">
                 <Link href="/">
                 <Image src="/logoweb.png" width={150} height={45} alt="logo"/>
                 </Link>

            </div>
            <Link href="/">Home page</Link>
            <Link href="/about">About</Link>
            <Link href="/product">product</Link>

            
        </nav>
    )
}

