"use client";

import Image from "next/image";

import SubMenuItem from "./DesktopSubMenuItem";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { menuItemData, MenuItem } from "./Share";
import { useReadMe } from "@/utils/api-calls";

export default function DesktopHeader() {
  const pathName = usePathname();
  const { data: me } = useReadMe();
  const [popupFlag, setPopupFlag] = useState(false);
  const [link, setLink] = useState<string>("");
  useEffect(() => {
    setLink(pathName);
  }, [pathName]);

  const router = useRouter();

  const topMenuClicked = (item: MenuItem) => {
    if (item.link) {
      setLink(item.link);
      router.push(item.link);
    }
  };

  const RenderItems = menuItemData.map((item, index) => {
    const subItemList = item.subItems;

    if (subItemList == undefined) {
      return (
        <div
          className={`flex border-b-[2px] rounded-b-[6px] px-[30px] py-[15px] cursor-pointer 
                    ${
                      item.link && link.startsWith(item.link)
                        ? "text-white bg-mmn-red border-[#FFC5B9]"
                        : "bg-white border-white"
                    }
                    hover:bg-[#EAEAEA] hover:border-[#FFC5B9]`}
          onClick={() => topMenuClicked(item)}
          key={`desktopheader-${index}`}
        >
          <div className="line-height-mmn-normal self-center">{item.title}</div>
        </div>
      );
    } else {
      return <SubMenuItem item={item} key={`desktopheader-${index}`} />;
    }
  });

  const loggedInItems = (
    // prepare login and logout button based on me and logout button will be in dropdown
    <div className="flex gap-[10px]">
      {me ? (
        <>
          <div
            className={`flex relative px-[30px] py-[15px] border-b-[2px] rounded-b-[6px] cursor-pointer z-[3]
        ${
          ""
            ? "text-white bg-mmn-red border-[#FFC5B9]"
            : "bg-white border-white"
        } 
        hover:bg-[#EAEAEA] hover:border-[#FFC5B9] hover:text-black`}
            onMouseOver={(e) => setPopupFlag(true)}
            onMouseLeave={(e) => setPopupFlag(false)}
          >
            <div className="line-height-mmn-normal self-center flex gap-[6px] items-center">
              <span> {me.firstName + " " + me.lastName} ({me.membershipId}) </span>
              {popupFlag ? "⮝" : "⮟"}
            </div>

            {popupFlag ? (
                <div className="absolute cusor-pointer text-black top-[83px] left-[0px] w-full border-b-[2px] rounded-b-[6px] border-[#808080] border-b-[2px] bg-[#ECE9E9] flex flex-col p-[2px]">
                    <div
                        className="flex hover:text-[#FF5733] hover:bg-white p-[20px] animate-dissolve ease-out duration-300"
                        key={`desktopsubmenuitem-${1}`}
                    >
                        <div className="w-max self-center">{"Logout"}</div>
                    </div>
                </div>
            ) : (
                <></>
            )}
          </div>
        </>
      ) : (
        <div
          className="line-height-mmn-normal self-center cursor-pointer"
          onClick={() => {
            router.push("/login");
          }}
        >
          Login
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full flex gap-[10px] px-[30px] z-[3]">
      <Image
        src={"/image/logo/HeaderLogo.png"}
        alt="headerlogo"
        width="0"
        height="0"
        sizes="100vw"
        className="w-[135px] h-auto py-[15px] min-h-[83px]"
      />
      <div className="flex flex-grow px-[30px] gap-[1px] justify-end">
        {RenderItems}
      </div>
      {loggedInItems}
    </div>
  );
}
