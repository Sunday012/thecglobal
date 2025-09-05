import { Badge } from "@/components/ui/badge";
import { Bell, ChevronDown, HelpCircle, Settings, Shield, User } from "lucide-react";
import Link from "next/link";
import { AdminLogoutButton } from "./logout-button";

type SettingsDropType = {
    profile?: any;
    isOpen: any;
    setIsOpen: any
}

export const SettingsDropDown = ({ isOpen, setIsOpen } : SettingsDropType) => {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="rounded-full flex items-center justify-center">
          <Settings size={18} className="text-black" />
          </div>
          {/* <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-[#272f31]">
              {profile.first_name} {profile.last_name}
            </p>
            <p className="text-xs text-gray-600">{profile.student_id}</p>
          </div> */}
          <ChevronDown 
            size={16} 
            className={`text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
  
        {isOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
            {/* Profile Header */}
  
            {/* Menu Items */}
            <div className="py-2">
              {/* <Link href="/school/dashboard/profile" className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <User className="w-4 h-4 mr-3 text-gray-500" />
                View Profile
              </Link>
              <Link href="/school/dashboard/settings" className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <Settings className="w-4 h-4 mr-3 text-gray-500" />
                Account Settings
              </Link> */}
              <Link href="/school/dashboard/notifications" className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <Bell className="w-4 h-4 mr-3 text-gray-500" />
                Notifications
              </Link>
              <Link href="/school/dashboard/privacy" className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <Shield className="w-4 h-4 mr-3 text-gray-500" />
                Privacy & Security
              </Link>
              <Link href="/school/dashboard/help" className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                <HelpCircle className="w-4 h-4 mr-3 text-gray-500" />
                Help & Support
              </Link>
            </div>
  
            {/* Account Info */}
            {/* <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
              <div className="text-xs text-gray-600">
                <p>Student since: {new Date(profile.enrollment_date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}</p>
              </div>
            </div> */}
  
            {/* Logout */}
            <div className="border-t border-gray-100 w-full py-2 px-2">
                <AdminLogoutButton />
            </div>
          </div>
        )}
      </div>
    );
  };