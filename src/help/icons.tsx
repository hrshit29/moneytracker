import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faCreditCard,
  faTags,
  faWallet,
  faCog,
  faSignOutAlt,
  faMoneyBillTrendUp,
  faMoneyBillTransfer,
  faMoneyBill,
  faArrowTrendUp,
  faPiggyBank,
  faUsersBetweenLines,
  faDollarSign,
  faCalendar,
  faComment,
  faPlus,
  faTrash,
  faRightFromBracket,
  faUtensils,
  faShirt,
  faBookOpen,
  faBowlFood,
  faBriefcaseMedical,
  faTv,
  faCircleDot,
  faEarthAmericas,
  faSun,        // 🌞 added
  faMoon        // 🌙 added
} from '@fortawesome/free-solid-svg-icons';
import {
  faBitcoin,
  faYoutube,
  faCcVisa,
} from '@fortawesome/free-brands-svg-icons';
import { AiFillInstagram, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';  // ✅ added

export const freelance = <FontAwesomeIcon icon={faEarthAmericas} />;
export const dashboard = <FontAwesomeIcon icon={faChartLine} />;
export const transactions = <FontAwesomeIcon icon={faCreditCard} />;
export const categories = <FontAwesomeIcon icon={faTags} />;
export const accounts = <FontAwesomeIcon icon={faWallet} />;
export const settings = <FontAwesomeIcon icon={faCog} />;
export const logout = <FontAwesomeIcon icon={faSignOutAlt} />;
export const trend = <FontAwesomeIcon icon={faMoneyBillTrendUp} />;
export const expenses = <FontAwesomeIcon icon={faMoneyBillTransfer} />;
export const money = <FontAwesomeIcon icon={faMoneyBill} />;
export const stocks = <FontAwesomeIcon icon={faArrowTrendUp} />;
export const bitcoin = <FontAwesomeIcon icon={faBitcoin} />;
export const piggy = <FontAwesomeIcon icon={faPiggyBank} />;
export const yt = <FontAwesomeIcon icon={faYoutube} />;
export const card = <FontAwesomeIcon icon={faCcVisa} />;
export const users = <FontAwesomeIcon icon={faUsersBetweenLines} />;
export const dollar = <FontAwesomeIcon icon={faDollarSign} />;
export const calender = <FontAwesomeIcon icon={faCalendar} />;
export const comment = <FontAwesomeIcon icon={faComment} />;
export const plus = <FontAwesomeIcon icon={faPlus} />;
export const trash = <FontAwesomeIcon icon={faTrash} />;
export const signout = <FontAwesomeIcon icon={faRightFromBracket} />;
export const takeaway = <FontAwesomeIcon icon={faUtensils} />;
export const clothing = <FontAwesomeIcon icon={faShirt} />;
export const book = <FontAwesomeIcon icon={faBookOpen} />;
export const food = <FontAwesomeIcon icon={faBowlFood} />;
export const medical = <FontAwesomeIcon icon={faBriefcaseMedical} />;
export const tv = <FontAwesomeIcon icon={faTv} />;
export const circle = <FontAwesomeIcon icon={faCircleDot} />;
export const sun = <FontAwesomeIcon icon={faSun} />;
export const moon = <FontAwesomeIcon icon={faMoon} />;

// ✅ newly added icons:
export const instagram = <AiFillInstagram />;
export const eye = <AiFillEye />;
export const eyeInvisible = <AiFillEyeInvisible />;
