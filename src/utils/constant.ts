import {
  Home,
  Settings,
  Image,
  FileText,
  Clipboard,
  Menu as MenuIcon,
} from "lucide-react";
import { VscPreview } from "react-icons/vsc";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

export const PUBLIC_ROUTES = {
  HOME: { label: 'HOME', link: '/', id: 'home' }
};

export const QUICK_LINKS = [
  { label: 'Home', link: '/' }
]


export const SOCIAL_LINKS = [
  {
    label: "Facebook",
    icon: FaFacebookF,
    href: "#",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedinIn,
    href: "#",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    href: "#",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "#",
  },
];


export const APP_NAME = 'Blogify';

// export const ADMIN_NAVLINKS = [
//   {
//     label: "Home",
//     path: "/admin",
//     icon: Home,
//   }
// ];
