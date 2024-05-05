import React, { useState } from 'react';
import * as Icons from "react-icons/vsc";
import { matchPath, NavLink, useLocation } from 'react-router-dom';

export default function SidebarLink({ link }) {
    const Icon = Icons[link.icon];
    const location = useLocation();
    const [showChildren, setShowChildren] = useState(false);

    const toggleChildren = () => {
        setShowChildren(!showChildren);
    };


    const matchRoute = (route) => {
        console.log(route);
        console.log(location.pathname)
        return matchPath({path:route}, location.pathname);
      }

    return (
        <div>
            <div className="flex items-center cursor-pointer p-2 hover:bg-slate-50" onClick={toggleChildren}>
                <div className='flex items-center gap-x-2'>
                    <div className='text-xl mt-3'>{link.icon}</div>
                    <span className='text-lg text-gray-600 mt-3'>{link.label}</span>
                </div>
                {link.children && (
                    <Icons.VscChevronRight className={`text-gray-500 ml-auto text-xl mt-3 ${showChildren ? 'transform rotate-90' : ''}`} />
                )}
            </div>
            {showChildren && link.children && (
                <div className=" ml-2 rounded-full">
                    {link.children.map(childLink => (
                        <div key={childLink.key} className={`flex items-center rounded-md gap-x-2 hover:bg-slate-50`}>
                                    <span className={`absolute  left-0 top-0 h-full w-[0.2rem] bg-black ${matchRoute(childLink.url) ? " opacity-100" : " opacity-0"}`}></span>
                            <div className={`${matchRoute(childLink.url) ? "font-semibold text-blue-800" : ""}  `}>{childLink.icon}</div>   
                            <NavLink
                                to={childLink.url}
                                className={`block py-2 font-light text-lg text-pure-greys-600 hover:text-gray-900 ${matchRoute(childLink.url) ? "font-semibold text-blue-800" : ""}  `}
                                onClick={() => setShowChildren(false)}
                            >
                                {childLink.label}
                            </NavLink>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
