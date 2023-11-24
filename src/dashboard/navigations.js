import HomePage from "./views/home";

const Navs = [
  {
    icon: "home",
    label: "Home",
    to: "/home",
    component: HomePage,
  },
  {
    icon: "home",
    label: "Home",
    to: "/all-visits",
    component: HomePage,
  },
  {
    icon: "qrCode",
    label: "Check in",
    to: "/check-in",
    component: HomePage,
  },
];

export default Navs;
