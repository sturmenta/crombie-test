import InsertChartOutlinedOutlinedIcon from "@mui/icons-material/InsertChartOutlinedOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MoreTimeOutlinedIcon from "@mui/icons-material/MoreTimeOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export type DrawerSection_Type =
  | "DASHBOARD"
  | "PROVIDERS"
  | "PRACTICES"
  | "JOBS"
  | "SCHEDULES"
  | "TIME & INVOICES"
  | "TIME & PAY"
  | "MESSAGES"
  | "HELP"
  | "SETTINGS";

export const drawerItems: {
  text: DrawerSection_Type;
  icon: (size: number) => JSX.Element;
}[] = [
  {
    text: "DASHBOARD",
    icon: (size: number) => (
      <InsertChartOutlinedOutlinedIcon sx={{ fontSize: size }} />
    ),
  },
  {
    text: "PROVIDERS",
    icon: (size: number) => <BadgeOutlinedIcon sx={{ fontSize: size }} />,
  },
  {
    text: "PRACTICES",
    icon: (size: number) => <PlaceOutlinedIcon sx={{ fontSize: size }} />,
  },
  {
    text: "JOBS",
    icon: (size: number) => (
      <BusinessCenterOutlinedIcon sx={{ fontSize: size }} />
    ),
  },
  {
    text: "SCHEDULES",
    icon: (size: number) => (
      <CalendarTodayOutlinedIcon sx={{ fontSize: size }} />
    ),
  },
  {
    text: "TIME & INVOICES",
    icon: (size: number) => <MoreTimeOutlinedIcon sx={{ fontSize: size }} />,
  },
  {
    text: "TIME & PAY",
    icon: (size: number) => (
      <MonetizationOnOutlinedIcon sx={{ fontSize: size }} />
    ),
  },
  {
    text: "MESSAGES",
    icon: (size: number) => (
      <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: size }} />
    ),
  },
];

export const drawerLastItems: {
  text: DrawerSection_Type;
  icon: (size: number) => JSX.Element;
}[] = [
  {
    text: "HELP",
    icon: (size: number) => (
      <QuestionMarkOutlinedIcon sx={{ fontSize: size }} />
    ),
  },
  {
    text: "SETTINGS",
    icon: (size: number) => <SettingsOutlinedIcon sx={{ fontSize: size }} />,
  },
];
