import React from "react";

function Page({ params }: { params: { agencyId: string } }) {
  return <div>{params.agencyId}</div>;
}

export default Page;
