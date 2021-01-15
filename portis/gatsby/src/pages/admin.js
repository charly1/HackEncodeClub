import React from "react"
import Menu from "../components/display/menu";
import AdminView from "../components/display/admin";

const Page = () => {
  return (
    <main>
      <title>Dapp Web UI</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Menu type="admin" />
      <AdminView
        bgColor="grey"
        mainBgColor="cyan"
      />
    </main>
  )
}

export default Page;
