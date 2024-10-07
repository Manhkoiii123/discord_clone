import React from "react";

const ServerPage = ({ params }: { params: { serverId: string } }) => {
  return <div>ServerPage {params.serverId}</div>;
};

export default ServerPage;
