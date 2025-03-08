import { DashboardIcon } from "@/Assets/DashboardIcon";
import AsideLink from "../AsideLink/AsideLink";
import { ConfigIcon } from "@/Assets/ConfigIcon";
import { SharedIcon } from "@/Assets/SharedIcon";
import { PhotoIcon } from "@/Assets/PhotoIcon";
import { useUser } from "@/Context/UserContext";
import { OffIcon } from "@/Assets/OffIcon";
import { HomeIcon } from "@/Assets/HomeIcon";

export default function Aside() {
  const { user, logout } = useUser();

  return (
    <aside className="sticky top-0 left-0 z-40 min-w-64 h-full transition-transform -translate-x-full sm:translate-x-0">
      <div className="flex flex-col h-full w-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="overflow-y-auto py-4 px-3 ">
          <div className="flex items-center pl-2 mb-5">
            <DashboardIcon className="mr-3 h-6 sm:h-8 text-gray-800   dark:text-white " />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Dashboard
            </span>
          </div>
          <ul className="space-y-2 mt-8">
            <AsideLink to="/" icon={<HomeIcon />}>
              Home
            </AsideLink>

            <AsideLink to="/proyects" icon={<ConfigIcon />}>
              Proyects
            </AsideLink>
            <AsideLink to="/experience" icon={<SharedIcon />}>
              Experience
            </AsideLink>
            <AsideLink to="/galery" icon={<PhotoIcon />}>
              Galery
            </AsideLink>
          </ul>
        </div>

        <div className="mt-auto justify-center p-4 w-full ">
          <div
            data-dropdown-toggle="dropdownUserName"
            className="flex justify-between items-center px-2 pt-2 mt-4 w-full rounded-lg dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-50 dark:hover-bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
          >
            <span className="sr-only">Open user menu</span>
            <div className="flex items-center">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                className="mr-3 w-8 h-8 rounded-full"
                alt="Bonnie avatar"
              />
              <div className="text-left">
                <div className="font-semibold leading-none text-gray-900 dark:text-white mb-0.5">
                  {user?.username}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  no hay xd
                </div>
              </div>
            </div>
            <OffIcon
              className="h-6 w-6 text-gray-800 dark:text-white cursor-pointer"
              onClick={logout}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
