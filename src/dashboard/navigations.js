import HomePage from "./views/home";
import GuestsPage from "./views/guests";
import CheckinPage from "./views/check-in";
import NewGuestPage from "./views/new-guest";

const Navs = [
  {
    icon: "home",
    label: "Home",
    to: "/home",
    component: HomePage,
  },
  {
    icon: "qrCode",
    label: "Check in",
    to: "/check",
    component: CheckinPage,
  },
  {
    icon: "guest",
    label: "New Guest",
    to: "/guests/new",
    component: NewGuestPage,
    hide: true,
  },
  {
    icon: "guest",
    label: "Guests",
    to: "/guests",
    component: GuestsPage,
  },
  {
    icon: "logout",
    label: "Logout",
    to: "/out",
    component: null,
  },
];

export default Navs;
