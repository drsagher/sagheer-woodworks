import Form from "@/app/clientregisteration/form";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export default async function ClientRegisteration() {
    // const session =  await getServerSession();
    // if(session){
    //     redirect("/");
    // }
    return(
        <div>
            <Form/>
        </div>
    )
}