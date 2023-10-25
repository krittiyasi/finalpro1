import Link from "next/link"
import  Image  from "next/image"
import SigninButton from "./signinbutton"
export default function Navbar(){
    return(
        <nav>
            <div className="logo">
                 <Link href="/">
                 <Image src="/logoweb.png" width={150} height={45} alt="logo"/>
                 </Link>

            </div>
            <Link href="/">Home</Link>
            <Link href="/signin">Signin</Link>
            

            
        </nav>
    )
}


