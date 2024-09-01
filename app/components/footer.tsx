import Link from "next/link";

export default function FooterPage(){
    return(
        <div className="flex flex-col bg-black items-center justify-center py-2 pl-2">
            <p className="text-sm text-slate-50">&copy;2024 Sagheer Shop, Pakpattan </p>
            <p className="text-xs text-slate-50">Developer by <Link target={'_blank'} className={'text-amber-200'} href={'https://www.linkedin.com/in/drsagher/'}>Abubakar Siddique</Link>, Senior Full Stack Developer</p>
        </div>
    )
}