export {default} from "next-auth/middleware";
export const config = {
    matcher: ["/deo","/deo/xentry","/deo/balance","/deo/entryform","/deo/xviewbalance","/deo/viewbalance",
        "/admin/ysys/statusclient","/admin/ysys/viewbalance","/admin/ysys/delrecord","/admin", "/admin/ysys/clientregisteration",
        "/admin/ysys/viewclient","/admin/ysys/viewdata","/admin/ysys/editclient","/admin/ysys/register","/admin/ysys/changepassword",
        "/admin/xsys", "/admin/xsys/xregister","/admin/xsys/viewbalance","/admin/xsys/viewclient","/admin/xsys/delrecord",
        "/admin/xsys/editclient","/admin/xsys/statusclient","/admin/xsys/viewdata",
    ]
}
