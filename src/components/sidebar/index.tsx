import { getAuthUserDetails } from "@/lib/queries";
import React from "react";
import MenuOptions from "./menu-options";

type SideBarProps = {
  id: string;
  type: "agency" | "subaccount";
};

async function Sidebar({ id, type }: SideBarProps) {
  const user = await getAuthUserDetails();

  if (!user) return null;

  if (!user.Agency) return null;

  const details =
    type === "agency"
      ? user?.Agency
      : user?.Agency.SubAccount.find((subaccount) => subaccount.id === id);

  const isWhiteLabelAgency = user.Agency.whiteLabel;
  if (!details) return;

  let sideBarLogo = user.Agency.agencyLogo || "/assets/plura-logo.svg";

  if (!isWhiteLabelAgency) {
    if (type === "subaccount") {
      sideBarLogo =
        user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const sideBarOpt =
    type === "agency"
      ? user.Agency.SidebarOption || []
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.SidebarOption || [];

  const subAccounts = user.Agency.SubAccount.filter((subaccount) => {
    user.Permissions.find(
      (permission) =>
        permission.subAccountId === subaccount.id && permission.access
    );
  });

  return (
    <>
      {/* for desktop */}
      <MenuOptions
        defaultOpen={true}
        subAccounts={subAccounts}
        sidebarOpt={sideBarOpt}
        sidebarLogo={sideBarLogo}
        details={details}
        user={user}
        id={id}
      />
      {/* for mobile */}
      <MenuOptions
        subAccounts={subAccounts}
        sidebarOpt={sideBarOpt}
        sidebarLogo={sideBarLogo}
        details={details}
        user={user}
        id={id}
      />
    </>
  );
}

export default Sidebar;
