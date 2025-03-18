import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { getLogedInUserDetails } from '../services/home_page_service';


function Header({ onLogout, data }){

    return (
        <header id="header" className="sticky top-0 z-50 bg-white border-b w-screen">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <span className="text-xl">LMS Portal</span>
                <nav className="hidden md:flex space-x-8">
                  <span className="text-neutral-900 cursor-pointer">Dashboard</span>
                  <span className="text-neutral-600 cursor-pointer">My Courses</span>
                  <span className="text-neutral-600 cursor-pointer">Assessment</span>
                  <span className="text-neutral-600 cursor-pointer">Progress</span>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                {/* <button className="p-2"> */}
                  {/* <FontAwesomeIcon icon={faBell} /> */}
                {/* </button> */}
                <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=123" className="w-8 h-8 rounded-full" alt="User Avatar" />
                <span className='text-xlg'>{data?.username}</span>
                <button onClick={onLogout} className="ml-4 text-neutral-600 hover:text-neutral-900">Logout</button>
              </div>
            </div>
          </div>
        </header>
    )
}
export default Header;