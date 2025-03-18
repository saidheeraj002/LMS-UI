import React from 'react';

function Footer(){
    return(
        <footer id="footer" className="bg-white border-t">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-neutral-600 mb-4 md:mb-0">
                © 2025 LMS Portal. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <span className="text-neutral-600 cursor-pointer">About</span>
                <span className="text-neutral-600 cursor-pointer">Help Center</span>
                <span className="text-neutral-600 cursor-pointer">Terms</span>
                <span className="text-neutral-600 cursor-pointer">Privacy</span>
              </div>
            </div>
          </div>
        </footer>
    );
}

export default Footer;