import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";

export const PUBLIC_ROUTES = {
  HOME: { label: "HOME", link: "/", id: "home" },
};

export const QUICK_LINKS = [{ label: "Home", link: "/" }];

export const SOCIAL_LINKS = [
  { label: "Facebook", icon: FaFacebookF, href: "#" },
  { label: "LinkedIn", icon: FaLinkedinIn, href: "#" },
  { label: "YouTube", icon: FaYoutube, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "#" },
];

export const APP_NAME = "Blogify";
