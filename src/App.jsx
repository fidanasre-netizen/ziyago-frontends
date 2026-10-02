import { useMemo, useState } from "react";
import "./App.css";
import logo from "./assets/ziyago-logo.png";

function App() {
  // =========================
  // UI STATES
  // =========================
  const [mobileMenu, setMobileMenu] = useState(false);

  const [searchType, setSearchType] = useState("flight");
  const [tripType, setTripType] = useState("roundtrip");

  const [searchValues, setSearchValues] = useState({
    from: "Kochi",
    to: "Dubai",
    departure: "",
    returnDate: "",
    hotelCity: "",
    checkIn: "",
    checkOut: "",
    activityCity: "",
    activityDate: "",
    travelers: 1,
    adults: 1,
    children: 0,
    infants: 0,
    cabin: "Economy",
  });

  const [showTravelers, setShowTravelers] = useState(false);
  const [searchResult, setSearchResult] = useState("");

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showEnquiry, setShowEnquiry] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [enquiryData, setEnquiryData] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    travelDate: "",
    travelers: 2,
    message: "",
  });

  const [packageFilter, setPackageFilter] = useState("All");
  const [destinationSearch, setDestinationSearch] = useState("");

  const [activeMonth, setActiveMonth] = useState("January");
  const [activeState, setActiveState] = useState("Kerala");
  const [openFaq, setOpenFaq] = useState(null);

  // =========================
  // SEARCH DATA
  // =========================
  const flightRoutes = [
    {
      from: "Kochi",
      to: "Dubai",
      price: "₹12,999",
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=85",
    },
    {
      from: "Kochi",
      to: "Bali",
      price: "₹18,499",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
    },
    {
      from: "Kochi",
      to: "Bangkok",
      price: "₹14,999",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=85",
    },
    {
      from: "Kochi",
      to: "Maldives",
      price: "₹16,999",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85",
    },
  ];

  const countries = [
    {
      name: "India",
      subtitle: "Mountains, beaches & culture",
      image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Dubai",
      subtitle: "Luxury, shopping & adventure",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Thailand",
      subtitle: "Beaches, islands & nightlife",
      image:
        "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Bhutan",
      subtitle: "Peaceful Himalayan escape",
      image:
        "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Maldives",
      subtitle: "Island luxury & romance",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Bali",
      subtitle: "Tropical beauty & culture",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
    },
  ];

// =========================
// HOLIDAY PACKAGES
// =========================
const holidayPackages = [
  // =========================
  // INDIA
  // =========================
  {
    id: 1,
    title: "Magical Sikkim",
    location: "Sikkim, India",
    category: "India",
    price: "₹24,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    title: "Himachal Escape",
    location: "Manali, India",
    category: "Adventure",
    price: "₹21,999",
    duration: "4 Nights / 5 Days",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    title: "Kashmir Paradise",
    location: "Kashmir, India",
    category: "Honeymoon",
    price: "₹27,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    title: "Andaman Escape",
    location: "Andaman, India",
    category: "Beach",
    price: "₹29,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    title: "Kerala Highlights",
    location: "Kerala, India",
    category: "India",
    price: "₹18,999",
    duration: "4 Nights / 5 Days",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    title: "Spiti Valley Adventure",
    location: "Spiti, India",
    category: "Adventure",
    price: "₹31,999",
    duration: "6 Nights / 7 Days",
    image:
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    title: "Leh Ladakh Expedition",
    location: "Ladakh, India",
    category: "Adventure",
    price: "₹32,999",
    duration: "6 Nights / 7 Days",
    image:
      "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    title: "Royal Rajasthan",
    location: "Rajasthan, India",
    category: "India",
    price: "₹22,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
  },

  // =========================
  // DUBAI
  // =========================
  {
    id: 9,
    title: "Dubai Explorer",
    location: "Dubai, UAE",
    category: "International",
    price: "₹36,999",
    duration: "4 Nights / 5 Days",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 10,
    title: "Dubai Luxury Escape",
    location: "Dubai, UAE",
    category: "International",
    price: "₹49,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://experience-ireland.s3.amazonaws.com/thumbs2/e30ce5c8-ad2b-11e8-b5de-0ac55974a77a.800x600.jpg",
  },
  {
    id: 11,
    title: "Dubai Family Holiday",
    location: "Dubai, UAE",
    category: "International",
    price: "₹39,999",
    duration: "4 Nights / 5 Days",
    image:
      "https://images.unsplash.com/photo-1610823230542-55da5ce635aa?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 12,
    title: "Dubai Shopping Escape",
    location: "Dubai, UAE",
    category: "International",
    price: "₹34,999",
    duration: "4 Nights / 5 Days",
    image:
      "https://images.corendonresources.com/L1E12079A2W0H0.jpg?v=240418160103",
  },
  {
    id: 13,
    title: "Dubai Desert Adventure",
    location: "Dubai, UAE",
    category: "Adventure",
    price: "₹37,999",
    duration: "4 Nights / 5 Days",
    image:
      "https://desertbuggys.com/wp-content/uploads/2022/10/about-tour.jpg",
  },
  {
    id: 14,
    title: "Dubai Couple Escape",
    location: "Dubai, UAE",
    category: "Honeymoon",
    price: "₹42,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://newcrm.cityrisetours.com/uploads/inventory/ticket/1750313701-3-ticket_gallery.jpeg",
  },
  {
    id: 15,
    title: "Dubai Premium Holiday",
    location: "Dubai, UAE",
    category: "International",
    price: "₹54,999",
    duration: "6 Nights / 7 Days",
    image:
      "https://www.clubmahindra.com/blog/images/Scuba-Diving-at-The-Dubai-Aquarium-resized.jpg",
  },
  {
    id: 16,
    title: "Dubai Festive Escape",
    location: "Dubai, UAE",
    category: "International",
    price: "₹38,999",
    duration: "4 Nights / 5 Days",
    image:
      "https://dubaidesertsafariviews.com/wp-content/uploads/2025/09/pexels-abid-ali-150086727-10679305-scaled.jpg",
  },

    // =========================
  // THAILAND
  // =========================
  {
    id: 17,
    title: "Thailand Delight",
    location: "Thailand",
    category: "International",
    price: "₹29,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 18,
    title: "Phuket Beach Escape",
    location: "Phuket, Thailand",
    category: "Beach",
    price: "₹31,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 19,
    title: "Bangkok City Holiday",
    location: "Bangkok, Thailand",
    category: "International",
    price: "₹26,999",
    duration: "4 Nights / 5 Days",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 20,
    title: "Krabi Island Escape",
    location: "Krabi, Thailand",
    category: "Beach",
    price: "₹32,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 21,
    title: "Thailand Couple Retreat",
    location: "Phuket, Thailand",
    category: "Honeymoon",
    price: "₹39,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 22,
    title: "Thailand Family Tour",
    location: "Bangkok, Thailand",
    category: "International",
    price: "₹34,999",
    duration: "6 Nights / 7 Days",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 23,
    title: "Pattaya Beach Escape",
    location: "Pattaya, Thailand",
    category: "Beach",
    price: "₹28,999",
    duration: "4 Nights / 5 Days",
    image:
      "https://images.unsplash.com/photo-1548919973-5cef591cdbc9?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 24,
    title: "Chiang Mai Cultural Escape",
    location: "Chiang Mai, Thailand",
    category: "International",
    price: "₹31,999",
    duration: "3 Nights / 4 Days",
    image:
      "https://images.unsplash.com/photo-1512553353614-82a7370096dc?auto=format&fit=crop&w=900&q=85",
  },

  // =========================
// BHUTAN
// =========================
{
  id: 25,
  title: "Paro Valley Escape",
  location: "Paro, Bhutan",
  category: "International",
  price: "₹36,999",
  duration: "5 Nights / 6 Days",
  image:
    "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=900&q=85",
},

{
  id: 26,
  title: "Thimphu Cultural Tour",
  location: "Thimphu, Bhutan",
  category: "International",
  price: "₹32,999",
  duration: "4 Nights / 5 Days",
  image:
    "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=900&q=85",
},

{
  id: 27,
  title: "Punakha Valley Journey",
  location: "Punakha, Bhutan",
  category: "International",
  price: "₹35,999",
  duration: "4 Nights / 5 Days",
  image:
    "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=900&q=85",
},

{
  id: 28,
  title: "Phobjikha Valley Escape",
  location: "Phobjikha, Bhutan",
  category: "Adventure",
  price: "₹39,999",
  duration: "5 Nights / 6 Days",
  image:
    "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=900&q=85",
},

{
  id: 29,
  title: "Haa Valley Retreat",
  location: "Haa Valley, Bhutan",
  category: "Honeymoon",
  price: "₹42,999",
  duration: "5 Nights / 6 Days",
  image:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
},

{
  id: 30,
  title: "Dochula Mountain Escape",
  location: "Dochula, Bhutan",
  category: "Adventure",
  price: "₹37,999",
  duration: "5 Nights / 6 Days",
  image:
    "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=900&q=85",
},

{
  id: 31,
  title: "Bumthang Heritage Tour",
  location: "Bumthang, Bhutan",
  category: "International",
  price: "₹38,999",
  duration: "5 Nights / 6 Days",
  image:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
},

{
  id: 32,
  title: "Trongsa Himalayan Journey",
  location: "Trongsa, Bhutan",
  category: "Adventure",
  price: "₹40,999",
  duration: "6 Nights / 7 Days",
  image:
    "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=900&q=85",
},
  // =========================
// MALDIVES
// =========================
{
  id: 33,
  title: "Maldives Romance",
  location: "Maldives",
  category: "Honeymoon",
  price: "₹52,999",
  duration: "4 Nights / 5 Days",
  image:
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85",
},
{
  id: 34,
  title: "Maldives Island Escape",
  location: "Maldives",
  category: "Beach",
  price: "₹48,999",
  duration: "4 Nights / 5 Days",
  image:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
},
{
  id: 35,
  title: "Maldives Luxury Retreat",
  location: "Maldives",
  category: "Honeymoon",
  price: "₹69,999",
  duration: "5 Nights / 6 Days",
  image:
    "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=900&q=85",
},
{
  id: 36,
  title: "Maldives Family Holiday",
  location: "Maldives",
  category: "Beach",
  price: "₹55,999",
  duration: "5 Nights / 6 Days",
  image:
    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=85",
},
{
  id: 37,
  title: "Maldives Water Villa",
  location: "Maldives",
  category: "Honeymoon",
  price: "₹74,999",
  duration: "5 Nights / 6 Days",
  image:
    "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=85",
},
{
  id: 38,
  title: "Maldives Beach Escape",
  location: "Maldives",
  category: "Beach",
  price: "₹46,999",
  duration: "3 Nights / 4 Days",
  image:
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=900&q=85",
},
{
  id: 39,
  title: "Maldives Couple Retreat",
  location: "Maldives",
  category: "Honeymoon",
  price: "₹59,999",
  duration: "4 Nights / 5 Days",
  image:
    "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=85",
},
{
  id: 40,
  title: "Maldives Premium Escape",
  location: "Maldives",
  category: "Beach",
  price: "₹64,999",
  duration: "5 Nights / 6 Days",
  image:
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
},

    // =========================
  // BALI
  // =========================
  {
    id: 41,
    title: "Bali Paradise",
    location: "Bali, Indonesia",
    category: "International",
    price: "₹39,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 42,
    title: "Romantic Bali",
    location: "Bali, Indonesia",
    category: "Honeymoon",
    price: "₹44,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 43,
    title: "Bali Beach Escape",
    location: "Bali, Indonesia",
    category: "Beach",
    price: "₹37,999",
    duration: "4 Nights / 5 Days",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 44,
    title: "Bali Adventure",
    location: "Bali, Indonesia",
    category: "Adventure",
    price: "₹41,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 45,
    title: "Ubud Cultural Journey",
    location: "Ubud, Bali",
    category: "International",
    price: "₹38,999",
    duration: "4 Nights / 5 Days",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 46,
    title: "Bali Luxury Retreat",
    location: "Bali, Indonesia",
    category: "Honeymoon",
    price: "₹54,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 47,
    title: "Bali Family Holiday",
    location: "Bali, Indonesia",
    category: "International",
    price: "₹42,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 48,
    title: "Bali Island Escape",
    location: "Bali, Indonesia",
    category: "Beach",
    price: "₹40,999",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=900&q=85",
  },
];
  // =========================
  // THEMES
  // =========================
  const themes = [
    {
      title: "Honeymoon",
      text: "Romantic escapes for two",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=85",
    },
    {
      title: "Family Holidays",
      text: "Memorable journeys together",
      image:
        "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=1000&q=85",
    },
    {
      title: "Adventure",
      text: "Thrilling experiences",
      image:
        "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1000&q=85",
    },
    {
      title: "Beach Holidays",
      text: "Relax by the sea",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
    },
    {
      title: "International",
      text: "Explore beyond borders",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
    },
    {
      title: "Weekend Getaways",
      text: "Short trips, big memories",
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85",
    },
  ];

  // =========================
  // DESTINATIONS
  // =========================
  const destinations = [
    {
      name: "Munnar",
      state: "Kerala",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Wayanad",
      state: "Kerala",
      image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Manali",
      state: "Himachal Pradesh",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Gulmarg",
      state: "Kashmir",
      image:
        "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Goa",
      state: "Goa",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Jaipur",
      state: "Rajasthan",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Leh",
      state: "Ladakh",
      image:
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Srinagar",
      state: "Kashmir",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
    },
  ];

  // =====================================================
  // 12 MONTHS × 5 DIFFERENT DESTINATIONS = 60 PLACES
  // =====================================================
  const seasonalPackages = [
    // JANUARY
    {
      id: "jan-1",
      month: "January",
      destination: "Kashmir",
      title: "Snowy Kashmir Escape",
      price: "₹27,999",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "jan-2",
      month: "January",
      destination: "Rajasthan",
      title: "Royal Rajasthan Winter",
      price: "₹22,999",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "jan-3",
      month: "January",
      destination: "Kerala",
      title: "Kerala Winter Escape",
      price: "₹18,999",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "jan-4",
      month: "January",
      destination: "Dubai",
      title: "Dubai Winter Adventure",
      price: "₹36,999",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "jan-5",
      month: "January",
      destination: "Maldives",
      title: "Maldives Island Escape",
      price: "₹52,999",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85",
    },

    // FEBRUARY
    {
      id: "feb-1",
      month: "February",
      destination: "Kerala",
      title: "Romantic Kerala",
      price: "₹18,999",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "feb-2",
      month: "February",
      destination: "Goa",
      title: "Goa Beach Escape",
      price: "₹19,999",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "feb-3",
      month: "February",
      destination: "Rajasthan",
      title: "Royal Jaipur Journey",
      price: "₹21,999",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "feb-4",
      month: "February",
      destination: "Dubai",
      title: "Dubai Couple Escape",
      price: "₹35,999",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "feb-5",
      month: "February",
      destination: "Bali",
      title: "Romantic Bali Experience",
      price: "₹39,999",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
    },

    // MARCH
    {
      id: "mar-1",
      month: "March",
      destination: "Dubai",
      title: "Dubai City Escape",
      price: "₹36,999",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "mar-2",
      month: "March",
      destination: "Thailand",
      title: "Thailand Island Holiday",
      price: "₹29,999",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "mar-3",
      month: "March",
      destination: "Kerala",
      title: "Kerala Nature Holiday",
      price: "₹17,999",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "mar-4",
      month: "March",
      destination: "Sri Lanka",
      title: "Sri Lanka Discovery",
      price: "₹31,999",
      image:
        "https://images.unsplash.com/photo-1586611013016-969c19ba27bb?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "mar-5",
      month: "March",
      destination: "Singapore",
      title: "Singapore City Lights",
      price: "₹34,999",
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=85",
    },

    // APRIL
    {
      id: "apr-1",
      month: "April",
      destination: "Thailand",
      title: "Thailand Beach Holiday",
      price: "₹29,999",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "apr-2",
      month: "April",
      destination: "Bali",
      title: "Bali Tropical Escape",
      price: "₹38,999",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "apr-3",
      month: "April",
      destination: "Maldives",
      title: "Maldives Luxury Stay",
      price: "₹49,999",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "apr-4",
      month: "April",
      destination: "Vietnam",
      title: "Vietnam Explorer",
      price: "₹32,999",
      image:
        "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "apr-5",
      month: "April",
      destination: "Andaman",
      title: "Andaman Island Escape",
      price: "₹28,999",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=85",
    },

    // MAY
    {
      id: "may-1",
      month: "May",
      destination: "Manali",
      title: "Manali Summer Trip",
      price: "₹21,999",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "may-2",
      month: "May",
      destination: "Kashmir",
      title: "Kashmir Valley Escape",
      price: "₹27,999",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "may-3",
      month: "May",
      destination: "Ladakh",
      title: "Ladakh Adventure",
      price: "₹32,999",
      image:
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "may-4",
      month: "May",
      destination: "Sikkim",
      title: "Sikkim Mountain Escape",
      price: "₹24,999",
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "may-5",
      month: "May",
      destination: "Meghalaya",
      title: "Meghalaya Nature Trail",
      price: "₹25,999",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    },

    // JUNE
    {
      id: "jun-1",
      month: "June",
      destination: "Ladakh",
      title: "Ladakh Road Trip",
      price: "₹32,999",
      image:
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "jun-2",
      month: "June",
      destination: "Himachal",
      title: "Himachal Mountain Escape",
      price: "₹23,999",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "jun-3",
      month: "June",
      destination: "Sikkim",
      title: "Sikkim Summer Holiday",
      price: "₹25,999",
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "jun-4",
      month: "June",
      destination: "Kashmir",
      title: "Kashmir Summer Escape",
      price: "₹26,999",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "jun-5",
      month: "June",
      destination: "Spiti",
      title: "Spiti Valley Adventure",
      price: "₹31,999",
      image:
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=900&q=85",
    },

    // JULY
    {
      id: "jul-1",
      month: "July",
      destination: "Kerala",
      title: "Monsoon Kerala",
      price: "₹16,999",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "jul-2",
      month: "July",
      destination: "Coorg",
      title: "Coorg Monsoon Escape",
      price: "₹17,999",
      image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "jul-3",
      month: "July",
      destination: "Wayanad",
      title: "Wayanad Rainforest Holiday",
      price: "₹15,999",
      image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "jul-4",
      month: "July",
      destination: "Meghalaya",
      title: "Meghalaya Monsoon Magic",
      price: "₹24,999",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "jul-5",
      month: "July",
      destination: "Goa",
      title: "Goa Monsoon Escape",
      price: "₹17,999",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
    },

    // AUGUST
    {
      id: "aug-1",
      month: "August",
      destination: "Goa",
      title: "Goa Monsoon Getaway",
      price: "₹17,999",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "aug-2",
      month: "August",
      destination: "Kerala",
      title: "Kerala Green Escape",
      price: "₹16,999",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "aug-3",
      month: "August",
      destination: "Coorg",
      title: "Coorg Coffee Trails",
      price: "₹18,999",
      image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "aug-4",
      month: "August",
      destination: "Andaman",
      title: "Andaman Island Escape",
      price: "₹28,999",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "aug-5",
      month: "August",
      destination: "Meghalaya",
      title: "Meghalaya Nature Escape",
      price: "₹24,999",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    },

    // SEPTEMBER
    {
      id: "sep-1",
      month: "September",
      destination: "Bali",
      title: "Bali Experience",
      price: "₹34,999",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "sep-2",
      month: "September",
      destination: "Thailand",
      title: "Thailand Island Escape",
      price: "₹29,999",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "sep-3",
      month: "September",
      destination: "Kerala",
      title: "Kerala Nature Journey",
      price: "₹17,999",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "sep-4",
      month: "September",
      destination: "Rajasthan",
      title: "Rajasthan Heritage Tour",
      price: "₹22,999",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "sep-5",
      month: "September",
      destination: "Himachal",
      title: "Himachal Valley Escape",
      price: "₹22,999",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
    },

    // OCTOBER
    {
      id: "oct-1",
      month: "October",
      destination: "Rajasthan",
      title: "Royal Rajasthan",
      price: "₹22,999",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "oct-2",
      month: "October",
      destination: "Kerala",
      title: "Kerala Festive Escape",
      price: "₹18,999",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "oct-3",
      month: "October",
      destination: "Kashmir",
      title: "Kashmir Autumn Escape",
      price: "₹27,999",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "oct-4",
      month: "October",
      destination: "Bhutan",
      title: "Bhutan Mountain Escape",
      price: "₹34,999",
      image:
        "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "oct-5",
      month: "October",
      destination: "Nepal",
      title: "Nepal Himalayan Journey",
      price: "₹29,999",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85",
    },

    // NOVEMBER
    {
      id: "nov-1",
      month: "November",
      destination: "Bhutan",
      title: "Bhutan Mountain Escape",
      price: "₹34,999",
      image:
        "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "nov-2",
      month: "November",
      destination: "Rajasthan",
      title: "Royal Rajasthan Journey",
      price: "₹22,999",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "nov-3",
      month: "November",
      destination: "Kerala",
      title: "Kerala Winter Beginning",
      price: "₹18,999",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "nov-4",
      month: "November",
      destination: "Thailand",
      title: "Thailand Delight",
      price: "₹29,999",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "nov-5",
      month: "November",
      destination: "Dubai",
      title: "Dubai Explorer",
      price: "₹36,999",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
    },

    // DECEMBER
    {
      id: "dec-1",
      month: "December",
      destination: "Maldives",
      title: "Maldives Christmas Holiday",
      price: "₹52,999",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "dec-2",
      month: "December",
      destination: "Dubai",
      title: "Dubai Festive Escape",
      price: "₹38,999",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "dec-3",
      month: "December",
      destination: "Goa",
      title: "Goa Christmas Getaway",
      price: "₹24,999",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "dec-4",
      month: "December",
      destination: "Kerala",
      title: "Kerala Christmas Escape",
      price: "₹19,999",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "dec-5",
      month: "December",
      destination: "Thailand",
      title: "Thailand Festive Holiday",
      price: "₹31,999",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=85",
    },
  ];

  // =========================
  // POPULAR EXPERIENCES
  // =========================
  const popularExperiences = [
    {
      title: "Backwater Cruise",
      location: "Kerala",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Desert Safari",
      location: "Dubai",
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=85",
    },
    {
      title: "Island Adventure",
      location: "Maldives",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=85",
    },
    {
      title: "Mountain Escape",
      location: "Kashmir",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=85",
    },
    {
      title: "Tropical Bali",
      location: "Bali",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85",
    },
  ];

// =========================
// BLOGS
// =========================

const blogs = [
  {
    title: "kashmir Travel Tips",
    category: "kashmir",
    date: "Sep 15, 2026",
    image: "/images/blogs.png",
  },
  {
    slug: "kerala",
    title: "10 Beautiful Places to Visit in Kerala",
    category: "Kerala",
    date: "Travel Guide",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
  },

  {
    slug: "kashmir",
    title: "Best Time to Visit Kashmir",
    category: "Kashmir",
    date: "Travel Tips",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
  },

  {
    slug: "dubai",
    title: "Dubai Travel Guide for First-Time Visitors",
    category: "Dubai",
    date: "Travel Guide",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
  },

  {
    slug: "international",
    title: "Things to Know Before Your First International Trip",
    category: "International",
    date: "Travel Tips",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
  },
];
   

  // =========================
  // FAQ
  // =========================
  const faqs = [
    {
      question: "How do I book a holiday package?",
      answer:
        "Choose a package you like and click Enquire. Share your travel details with our team and we will contact you with the available options and pricing.",
    },
    {
      question: "Can I customize a package?",
      answer:
        "Yes. You can customize destinations, hotels, activities, number of nights and other travel requirements based on your preferences.",
    },
    {
      question: "Do you provide international holiday packages?",
      answer:
        "Yes. ZiyaGo Holidays offers international travel options including Dubai, Thailand, Bali, Maldives, Bhutan and more.",
    },
    {
      question: "Can I book flights and hotels separately?",
      answer:
        "Yes. You can use the flight and hotel search sections separately according to your travel requirements.",
    },
    {
      question: "How can I contact ZiyaGo Holidays?",
      answer:
        "You can contact our travel team through phone, email, WhatsApp or the enquiry form available on this website.",
    },
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const states = [
  "Kerala",
  "Karnataka",
  "Tamil Nadu",
  "Goa",
  "Rajasthan",
  "Himachal Pradesh",
  "Kashmir",
  "Uttarakhand",
  "Sikkim",
  "Andaman",
  "Ladakh",
  "Thailand",
  
];
const statePackages = [
  // =====================================================
  // KERALA - 6
  // =====================================================
  {
    id: 1,
    state: "Kerala",
    destination: "Munnar",
    title: "Munnar Hill Escape",
    duration: "3 Nights / 4 Days",
    price: "₹14,999",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    state: "Kerala",
    destination: "Wayanad",
    title: "Wayanad Nature Holiday",
    duration: "3 Nights / 4 Days",
    price: "₹15,999",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    state: "Kerala",
    destination: "Alleppey",
    title: "Alleppey Backwater Escape",
    duration: "3 Nights / 4 Days",
    price: "₹17,999",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    state: "Kerala",
    destination: "Thekkady",
    title: "Thekkady Wildlife Retreat",
    duration: "3 Nights / 4 Days",
    price: "₹16,999",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    state: "Kerala",
    destination: "Kovalam",
    title: "Kovalam Beach Holiday",
    duration: "3 Nights / 4 Days",
    price: "₹18,999",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    state: "Kerala",
    destination: "Varkala",
    title: "Varkala Coastal Escape",
    duration: "2 Nights / 3 Days",
    price: "₹15,999",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80",
  },

  // =====================================================
  // KARNATAKA - 6
  // =====================================================
  {
    id: 7,
    state: "Karnataka",
    destination: "Coorg",
    title: "Coorg Coffee Trail",
    duration: "3 Nights / 4 Days",
    price: "₹16,999",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    state: "Karnataka",
    destination: "Hampi",
    title: "Hampi Heritage Escape",
    duration: "3 Nights / 4 Days",
    price: "₹18,999",
    image: "https://images.unsplash.com/photo-1600100397608-f0107c7d9b8c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    state: "Karnataka",
    destination: "Mysore",
    title: "Mysore Royal Holiday",
    duration: "2 Nights / 3 Days",
    price: "₹13,999",
    image: "https://images.unsplash.com/photo-1600112356915-089abb8fc71e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 10,
    state: "Karnataka",
    destination: "Chikmagalur",
    title: "Chikmagalur Mountain Escape",
    duration: "3 Nights / 4 Days",
    price: "₹15,999",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 11,
    state: "Karnataka",
    destination: "Gokarna",
    title: "Gokarna Beach Retreat",
    duration: "3 Nights / 4 Days",
    price: "₹17,999",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 12,
    state: "Karnataka",
    destination: "Kabini",
    title: "Kabini Wildlife Escape",
    duration: "2 Nights / 3 Days",
    price: "₹19,999",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80",
  },

  // =====================================================
  // TAMIL NADU - 6
  // =====================================================
  {
    id: 13,
    state: "Tamil Nadu",
    destination: "Ooty",
    title: "Ooty Mountain Escape",
    duration: "3 Nights / 4 Days",
    price: "₹16,999",
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 14,
    state: "Tamil Nadu",
    destination: "Kodaikanal",
    title: "Kodaikanal Holiday",
    duration: "3 Nights / 4 Days",
    price: "₹17,999",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 15,
    state: "Tamil Nadu",
    destination: "Chennai",
    title: "Chennai City Explorer",
    duration: "2 Nights / 3 Days",
    price: "₹12,999",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 16,
    state: "Tamil Nadu",
    destination: "Madurai",
    title: "Madurai Heritage Journey",
    duration: "2 Nights / 3 Days",
    price: "₹13,999",
    image: "https://images.unsplash.com/photo-1600100397608-f0107c7d9b8c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 17,
    state: "Tamil Nadu",
    destination: "Rameswaram",
    title: "Rameswaram Coastal Escape",
    duration: "3 Nights / 4 Days",
    price: "₹15,999",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 18,
    state: "Tamil Nadu",
    destination: "Mahabalipuram",
    title: "Mahabalipuram Heritage Tour",
    duration: "2 Nights / 3 Days",
    price: "₹14,999",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80",
  },

  // =====================================================
  // GOA - 6
  // =====================================================
  {
    id: 19,
    state: "Goa",
    destination: "North Goa",
    title: "Goa Beach Escape",
    duration: "3 Nights / 4 Days",
    price: "₹18,999",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 20,
    state: "Goa",
    destination: "South Goa",
    title: "South Goa Relaxation",
    duration: "3 Nights / 4 Days",
    price: "₹19,999",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 21,
    state: "Goa",
    destination: "Baga",
    title: "Baga Beach Getaway",
    duration: "2 Nights / 3 Days",
    price: "₹15,999",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 22,
    state: "Goa",
    destination: "Panaji",
    title: "Goa Culture & Heritage",
    duration: "3 Nights / 4 Days",
    price: "₹17,999",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 23,
    state: "Goa",
    destination: "Candolim",
    title: "Candolim Luxury Escape",
    duration: "3 Nights / 4 Days",
    price: "₹22,999",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 24,
    state: "Goa",
    destination: "Palolem",
    title: "Palolem Beach Retreat",
    duration: "3 Nights / 4 Days",
    price: "₹20,999",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
  },

  // =====================================================
  // RAJASTHAN - 6
  // =====================================================
  {
    id: 25,
    state: "Rajasthan",
    destination: "Jaipur",
    title: "Royal Jaipur Journey",
    duration: "3 Nights / 4 Days",
    price: "₹21,999",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 26,
    state: "Rajasthan",
    destination: "Udaipur",
    title: "Udaipur Lake Escape",
    duration: "3 Nights / 4 Days",
    price: "₹23,999",
    image: "https://images.unsplash.com/photo-1602643163983-ed0babc39797?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 27,
    state: "Rajasthan",
    destination: "Jaisalmer",
    title: "Jaisalmer Desert Adventure",
    duration: "3 Nights / 4 Days",
    price: "₹22,999",
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 28,
    state: "Rajasthan",
    destination: "Jodhpur",
    title: "Jodhpur Blue City Escape",
    duration: "2 Nights / 3 Days",
    price: "₹18,999",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 29,
    state: "Rajasthan",
    destination: "Pushkar",
    title: "Pushkar Cultural Holiday",
    duration: "2 Nights / 3 Days",
    price: "₹17,999",
    image: "https://images.unsplash.com/photo-1602643163983-ed0babc39797?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 30,
    state: "Rajasthan",
    destination: "Mount Abu",
    title: "Mount Abu Hill Escape",
    duration: "2 Nights / 3 Days",
    price: "₹16,999",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  },

  // =====================================================
  // HIMACHAL PRADESH - 6
  // =====================================================
  {
    id: 31,
    state: "Himachal Pradesh",
    destination: "Manali",
    title: "Manali Mountain Escape",
    duration: "4 Nights / 5 Days",
    price: "₹21,999",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 32,
    state: "Himachal Pradesh",
    destination: "Shimla",
    title: "Shimla Holiday",
    duration: "3 Nights / 4 Days",
    price: "₹19,999",
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 33,
    state: "Himachal Pradesh",
    destination: "Kasol",
    title: "Kasol Valley Adventure",
    duration: "3 Nights / 4 Days",
    price: "₹18,999",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 34,
    state: "Himachal Pradesh",
    destination: "Dharamshala",
    title: "Dharamshala Mountain Retreat",
    duration: "3 Nights / 4 Days",
    price: "₹20,999",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 35,
    state: "Himachal Pradesh",
    destination: "Dalhousie",
    title: "Dalhousie Scenic Escape",
    duration: "3 Nights / 4 Days",
    price: "₹20,999",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 36,
    state: "Himachal Pradesh",
    destination: "Spiti Valley",
    title: "Spiti Valley Expedition",
    duration: "5 Nights / 6 Days",
    price: "₹29,999",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  },

  // =====================================================
  // KASHMIR - 6
  // =====================================================
  {
    id: 37,
    state: "Kashmir",
    destination: "Srinagar",
    title: "Srinagar Paradise",
    duration: "4 Nights / 5 Days",
    price: "₹24,999",
    image: "https://images.unsplash.com/photo-1582972236019-ea9e6a1f2f31?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 38,
    state: "Kashmir",
    destination: "Gulmarg",
    title: "Gulmarg Snow Escape",
    duration: "4 Nights / 5 Days",
    price: "₹27,999",
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 39,
    state: "Kashmir",
    destination: "Pahalgam",
    title: "Pahalgam Valley Retreat",
    duration: "4 Nights / 5 Days",
    price: "₹25,999",
    image: "https://images.unsplash.com/photo-1582972236019-ea9e6a1f2f31?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 40,
    state: "Kashmir",
    destination: "Sonamarg",
    title: "Sonamarg Alpine Escape",
    duration: "3 Nights / 4 Days",
    price: "₹23,999",
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 41,
    state: "Kashmir",
    destination: "Doodhpathri",
    title: "Doodhpathri Nature Escape",
    duration: "3 Nights / 4 Days",
    price: "₹22,999",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 42,
    state: "Kashmir",
    destination: "Aru Valley",
    title: "Aru Valley Scenic Holiday",
    duration: "4 Nights / 5 Days",
    price: "₹26,999",
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=900&q=80",
  },

  // =====================================================
  // UTTARAKHAND - 6
  // =====================================================
  {
    id: 43,
    state: "Uttarakhand",
    destination: "Mussoorie",
    title: "Mussoorie Hills",
    duration: "3 Nights / 4 Days",
    price: "₹18,999",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 44,
    state: "Uttarakhand",
    destination: "Rishikesh",
    title: "Rishikesh Adventure",
    duration: "3 Nights / 4 Days",
    price: "₹16,999",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 45,
    state: "Uttarakhand",
    destination: "Nainital",
    title: "Nainital Lake Holiday",
    duration: "3 Nights / 4 Days",
    price: "₹17,999",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 46,
    state: "Uttarakhand",
    destination: "Jim Corbett",
    title: "Jim Corbett Wildlife Escape",
    duration: "2 Nights / 3 Days",
    price: "₹18,999",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 47,
    state: "Uttarakhand",
    destination: "Auli",
    title: "Auli Snow Adventure",
    duration: "3 Nights / 4 Days",
    price: "₹21,999",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 48,
    state: "Uttarakhand",
    destination: "Ranikhet",
    title: "Ranikhet Mountain Retreat",
    duration: "3 Nights / 4 Days",
    price: "₹18,999",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  },
  // =====================================================
// SIKKIM - 6
// =====================================================

{
  id: 49,
  state: "Sikkim",
  destination: "Gangtok",
  title: "Gangtok Himalayan Escape",
  duration: "3 Nights / 4 Days",
  price: "₹18,999",
  image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
},
{
  id: 50,
  state: "Sikkim",
  destination: "Pelling",
  title: "Pelling Mountain Retreat",
  duration: "3 Nights / 4 Days",
  price: "₹19,999",
  image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
},
{
  id: 51,
  state: "Sikkim",
  destination: "Lachung",
  title: "Lachung Snow Escape",
  duration: "4 Nights / 5 Days",
  price: "₹23,999",
  image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=900&q=80",
},
{
  id: 52,
  state: "Sikkim",
  destination: "Yuksom",
  title: "Yuksom Nature Holiday",
  duration: "3 Nights / 4 Days",
  price: "₹18,999",
  image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
},
{
  id: 53,
  state: "Sikkim",
  destination: "Tsomgo Lake",
  title: "Tsomgo Lake Adventure",
  duration: "3 Nights / 4 Days",
  price: "₹21,999",
  image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=900&q=80",
},
{
  id: 54,
  state: "Sikkim",
  destination: "North Sikkim",
  title: "North Sikkim Expedition",
  duration: "5 Nights / 6 Days",
  price: "₹28,999",
  image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
},


// =====================================================
// ANDAMAN - 6
// =====================================================

{
  id: 55,
  state: "Andaman",
  destination: "Port Blair",
  title: "Port Blair Island Escape",
  duration: "3 Nights / 4 Days",
  price: "₹24,999",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
},
{
  id: 56,
  state: "Andaman",
  destination: "Havelock Island",
  title: "Havelock Island Paradise",
  duration: "4 Nights / 5 Days",
  price: "₹29,999",
  image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80",
},
{
  id: 57,
  state: "Andaman",
  destination: "Neil Island",
  title: "Neil Island Beach Retreat",
  duration: "3 Nights / 4 Days",
  price: "₹27,999",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
},
{
  id: 58,
  state: "Andaman",
  destination: "Radhanagar Beach",
  title: "Radhanagar Beach Escape",
  duration: "4 Nights / 5 Days",
  price: "₹31,999",
  image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
},
{
  id: 59,
  state: "Andaman",
  destination: "Baratang",
  title: "Baratang Island Adventure",
  duration: "3 Nights / 4 Days",
  price: "₹26,999",
  image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80",
},
{
  id: 60,
  state: "Andaman",
  destination: "Ross Island",
  title: "Ross Island Heritage Tour",
  duration: "3 Nights / 4 Days",
  price: "₹25,999",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
},


// =====================================================
// LADAKH - 6
// =====================================================

{
  id: 61,
  state: "Ladakh",
  destination: "Leh",
  title: "Leh Ladakh Expedition",
  duration: "5 Nights / 6 Days",
  price: "₹32,999",
  image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
},
{
  id: 62,
  state: "Ladakh",
  destination: "Pangong Lake",
  title: "Pangong Lake Adventure",
  duration: "5 Nights / 6 Days",
  price: "₹34,999",
  image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=900&q=80",
},
{
  id: 63,
  state: "Ladakh",
  destination: "Nubra Valley",
  title: "Nubra Valley Escape",
  duration: "4 Nights / 5 Days",
  price: "₹29,999",
  image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
},
{
  id: 64,
  state: "Ladakh",
  destination: "Khardung La",
  title: "Khardung La Expedition",
  duration: "5 Nights / 6 Days",
  price: "₹35,999",
  image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
},
{
  id: 65,
  state: "Ladakh",
  destination: "Tso Moriri",
  title: "Tso Moriri Lake Escape",
  duration: "5 Nights / 6 Days",
  price: "₹33,999",
  image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=900&q=80",
},
{
  id: 66,
  state: "Ladakh",
  destination: "Alchi",
  title: "Alchi Monastery Journey",
  duration: "4 Nights / 5 Days",
  price: "₹30,999",
  image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
},


// =====================================================
// THAILAND - 6
// =====================================================

{
  id: 67,
  state: "Thailand",
  destination: "Bangkok",
  title: "Bangkok City Explorer",
  duration: "3 Nights / 4 Days",
  price: "₹29,999",
  image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80",
},
{
  id: 68,
  state: "Thailand",
  destination: "Phuket",
  title: "Phuket Beach Escape",
  duration: "4 Nights / 5 Days",
  price: "₹34,999",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
},
{
  id: 69,
  state: "Thailand",
  destination: "Krabi",
  title: "Krabi Island Adventure",
  duration: "4 Nights / 5 Days",
  price: "₹36,999",
  image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80",
},
{
  id: 70,
  state: "Thailand",
  destination: "Pattaya",
  title: "Pattaya Holiday Escape",
  duration: "3 Nights / 4 Days",
  price: "₹27,999",
  image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80",
},
{
  id: 71,
  state: "Thailand",
  destination: "Phi Phi Islands",
  title: "Phi Phi Island Paradise",
  duration: "4 Nights / 5 Days",
  price: "₹39,999",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
},
{
  id: 72,
  state: "Thailand",
  destination: "Chiang Mai",
  title: "Chiang Mai Cultural Escape",
  duration: "3 Nights / 4 Days",
  price: "₹31,999",
  image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80",
},
];
  const packageCategories = [
    "All",
    "India",
    "Beach",
    "Adventure",
    "International",
    "Honeymoon",
  ];

  // =========================
  // FUNCTIONS
  // =========================
  const updateSearch = (field, value) => {
    setSearchValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const changeSearchType = (type) => {
    setSearchType(type);
    setSearchResult("");
    setShowTravelers(false);
  };

  const swapLocations = () => {
    setSearchValues((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const runSearch = (event) => {
    event.preventDefault();

    if (searchType === "flight") {
      setSearchResult(
        `Searching flights from ${searchValues.from || "your city"} to ${
          searchValues.to || "your destination"
        }`
      );
    } else if (searchType === "hotel") {
      setSearchResult(
        `Searching hotels in ${searchValues.hotelCity || "your destination"}`
      );
    } else {
      setSearchResult(
        `Searching activities in ${
          searchValues.activityCity || "your destination"
        }`
      );
    }

    setTimeout(() => {
      document
        .getElementById("packages")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const openEnquiry = (item = {}) => {
    setSelectedPackage(item);

    setEnquiryData((prev) => ({
      ...prev,
      destination: item.location || item.destination || prev.destination,
      message: item.title
        ? `I am interested in the ${item.title} package.`
        : prev.message,
    }));

    setShowEnquiry(true);
  };

  const closeEnquiry = () => {
    setShowEnquiry(false);
    setSelectedPackage(null);
};

  const submitEnquiry = (event) => {
    event.preventDefault();

    const message = `
Hello ZiyaGo Holidays,

I would like to enquire about a holiday.

Name: ${enquiryData.name}
Phone: ${enquiryData.phone}
Email: ${enquiryData.email}
Destination: ${enquiryData.destination}
Travel Date: ${enquiryData.travelDate}
Travellers: ${enquiryData.travelers}
Message: ${enquiryData.message}
    `.trim();

    const whatsappUrl = `https://wa.me/917034735101?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    
    setShowEnquiry(false);
    setSelectedPackage(null);
    const closeEnquiry = () => {
  setShowEnquiry(false);
  setSelectedPackage(null);
};

const submitEnquiry = (event) => {
  event.preventDefault();

  const message = `
Hello ZiyaGo Holidays,

I would like to enquire about a holiday.

Name: ${enquiryData.name}
Phone: ${enquiryData.phone}
Email: ${enquiryData.email}
Destination: ${enquiryData.destination}
Travel Date: ${enquiryData.travelDate}
Travellers: ${enquiryData.travelers}
Message: ${enquiryData.message}
  `.trim();

  const whatsappUrl =
    `https://wa.me/917034735101?text=${encodeURIComponent(message)}`;

  // Open WhatsApp
  window.open(whatsappUrl, "_blank");

  // Close enquiry box
  setShowEnquiry(false);
  setSelectedPackage(null);

  // Show automatic Thank You popup
  setShowThankYou(true);

  // Automatically hide after 4 seconds
  setTimeout(() => {
    setShowThankYou(false);
  }, 4000);
};
     setTimeout(() => {
    setShowThankYou(false);
  }, 4000);
};

  const useFlightRoute = (route) => {
    setSearchType("flight");

    setSearchValues((prev) => ({
      ...prev,
      from: route.from,
      to: route.to,
    }));

    document
      .getElementById("search")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPackages = () => {
    document
      .getElementById("packages")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (target) => {
    setMobileMenu(false);

    const element = document.getElementById(target);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const updateTraveler = (type, amount) => {
    setSearchValues((prev) => {
      const current = prev[type];

      let updated = current + amount;

      if (type === "adults") {
        updated = Math.max(1, updated);
      } else {
        updated = Math.max(0, updated);
      }

      const adults = type === "adults" ? updated : prev.adults;
      const children = type === "children" ? updated : prev.children;
      const infants = type === "infants" ? updated : prev.infants;

      return {
        ...prev,
        [type]: updated,
        travelers: adults + children + infants,
      };
    });
  };

  // =========================
  // FILTERS
  // =========================
  const filteredPackages = useMemo(() => {
  const search = destinationSearch.toLowerCase().trim();

  // Normal page load / All without search
  if (!search && packageFilter === "All") {
    return holidayPackages.slice(0, 8);
  }

  return holidayPackages.filter((item) => {
    // Category filter
    const categoryMatch =
      packageFilter === "All" ||
      item.category.toLowerCase() === packageFilter.toLowerCase();

    // Destination search
    const searchMatch =
      !search ||
      item.title.toLowerCase().includes(search) ||
      item.location.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search);

    return categoryMatch && searchMatch;
  });
}, [packageFilter, destinationSearch]);
  const filteredDestinations = useMemo(() => {
    const search = destinationSearch.toLowerCase().trim();

    if (!search) {
      return destinations;
    }

    return destinations.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.state.toLowerCase().includes(search)
    );
  }, [destinationSearch]);

  const currentSeasonalPackages = seasonalPackages.filter(
    (item) => item.month === activeMonth
  );

  return (
    <div className="ziyago-app">
      {/* =========================
          TOP BAR
      ========================= */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div>
            <span>✈️ Travel Beyond Boundaries</span>
          </div>

          <div className="top-contact">
            <a href="tel:+917034735101">📞 +91 7034735101</a>
            <a href="mailto:hello@ziyagoholidays.com">
              ✉️ hello@ziyagoholidays.com
            </a>
          </div>
        </div>
      </div>

      {/* =========================
          NAVBAR
      ========================= */}
      <header className="navbar">
        <div className="container nav-inner">
          <button
            type="button"
            className="logo-wrap"
            onClick={() => handleNavClick("home")}
            aria-label="ZiyaGo Home"
          >
            <img src={logo} alt="ZiyaGo Holidays" className="logo" />
          </button>

          <nav className={`nav-links ${mobileMenu ? "open" : ""}`}>
            <button type="button" onClick={() => handleNavClick("home")}>
              Home
            </button>

            <button type="button" onClick={() => handleNavClick("packages")}>
              Packages
            </button>

            <button type="button" onClick={() => handleNavClick("destinations")}>
              Destinations
            </button>

            <button type="button" onClick={() => handleNavClick("themes")}>
              Experiences
            </button>

            <button type="button" onClick={() => handleNavClick("about")}>
              About
            </button>

            <button type="button" onClick={() => handleNavClick("contact")}>
              Contact
            </button>

            <button
              type="button"
              className="nav-enquiry"
              onClick={() => openEnquiry()}
            >
              Enquire Now
            </button>
          </nav>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenu((prev) => !prev)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </header>


     {/* =========================
    SEARCH
========================= */}

<section className="search-image-section">

  {/* SECOND IMAGE */}
  <div
    className="search-background"
    style={{
      backgroundImage: "url('/images/ziyago-bg.png')",
    }}
  >

    {/* =========================
        FLIGHT / HOTEL / ACTIVITY SEARCH
    ========================= */}

    <section className="search-section" id="search">

      <div className="container">

        <div className="search-card">

          <div className="search-tabs">

            <button
              type="button"
              className={searchType === "flight" ? "active" : ""}
              onClick={() => changeSearchType("flight")}
            >
              ✈️ Flights
            </button>

            <button
              type="button"
              className={searchType === "hotel" ? "active" : ""}
              onClick={() => changeSearchType("hotel")}
            >
              🏨 Hotels
            </button>

            <button
              type="button"
              className={searchType === "activity" ? "active" : ""}
              onClick={() => changeSearchType("activity")}
            >
              🎟️ Activities
            </button>

          </div>


          <form onSubmit={runSearch}>

            {/* =========================
                FLIGHTS
            ========================= */}

            {searchType === "flight" && (
              <>

                <div className="trip-toggle">

                  <button
                    type="button"
                    className={
                      tripType === "roundtrip"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTripType("roundtrip")
                    }
                  >
                    Round Trip
                  </button>

                  <button
                    type="button"
                    className={
                      tripType === "oneway"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setTripType("oneway")
                    }
                  >
                    One Way
                  </button>

                </div>


                <div className="flight-form-grid">

                  {/* FROM */}

                  <div className="search-field">

                    <label>
                      From
                    </label>

                    <input
                      value={searchValues.from}
                      onChange={(e) =>
                        updateSearch(
                          "from",
                          e.target.value
                        )
                      }
                      placeholder="Departure city"
                    />

                  </div>


                  {/* SWAP */}

                  <button
                    type="button"
                    className="swap-button"
                    onClick={swapLocations}
                    aria-label="Swap locations"
                  >
                    ⇄
                  </button>


                  {/* TO */}

                  <div className="search-field">

                    <label>
                      To
                    </label>

                    <input
                      value={searchValues.to}
                      onChange={(e) =>
                        updateSearch(
                          "to",
                          e.target.value
                        )
                      }
                      placeholder="Destination"
                    />

                  </div>


                  {/* DEPARTURE */}

                  <div className="search-field">

                    <label>
                      Departure
                    </label>

                    <input
                      type="date"
                      value={searchValues.departure}
                      onChange={(e) =>
                        updateSearch(
                          "departure",
                          e.target.value
                        )
                      }
                    />

                  </div>


                  {/* RETURN */}

                  {tripType === "roundtrip" && (

                    <div className="search-field">

                      <label>
                        Return
                      </label>

                      <input
                        type="date"
                        value={searchValues.returnDate}
                        onChange={(e) =>
                          updateSearch(
                            "returnDate",
                            e.target.value
                          )
                        }
                      />

                    </div>

                  )}


                  {/* TRAVELLERS */}

                  <div className="search-field">

                  <label>
                    Travellers
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={searchValues.travelers}
                    onChange={(e) =>
                      updateSearch(
                        "travelers",
                        Math.max(
                          1,
                          Number(
                            e.target.value
                          )
                        )
                      )
                    }
                  />

                </div>

              </div>

              </>
            )}


            {/* =========================
                HOTELS
            ========================= */}

            {searchType === "hotel" && (

              <div className="hotel-form-grid">

                <div className="search-field">

                  <label>
                    Destination
                  </label>

                  <input
                    value={searchValues.hotelCity}
                    onChange={(e) =>
                      updateSearch(
                        "hotelCity",
                        e.target.value
                      )
                    }
                    placeholder="City or destination"
                  />

                </div>


                <div className="search-field">

                  <label>
                    Check In
                  </label>

                  <input
                    type="date"
                    value={searchValues.checkIn}
                    onChange={(e) =>
                      updateSearch(
                        "checkIn",
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="search-field">

                  <label>
                    Check Out
                  </label>

                  <input
                    type="date"
                    value={searchValues.checkOut}
                    onChange={(e) =>
                      updateSearch(
                        "checkOut",
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="search-field">

                  <label>
                    Guests
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={searchValues.travelers}
                    onChange={(e) =>
                      updateSearch(
                        "travelers",
                        Math.max(
                          1,
                          Number(
                            e.target.value
                          )
                        )
                      )
                    }
                  />

                </div>

              </div>

            )}


            {/* =========================
                ACTIVITIES
            ========================= */}

            {searchType === "activity" && (

              <div className="activity-form-grid">

                <div className="search-field">

                  <label>
                    Destination
                  </label>

                  <input
                    value={searchValues.activityCity}
                    onChange={(e) =>
                      updateSearch(
                        "activityCity",
                        e.target.value
                      )
                    }
                    placeholder="Where do you want to explore?"
                  />

                </div>


                <div className="search-field">

                  <label>
                    Date
                  </label>

                  <input
                    type="date"
                    value={searchValues.activityDate}
                    onChange={(e) =>
                      updateSearch(
                        "activityDate",
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="search-field">

                  <label>
                    Travellers
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={searchValues.travelers}
                    onChange={(e) =>
                      updateSearch(
                        "travelers",
                        Math.max(
                          1,
                          Number(
                            e.target.value
                          )
                        )
                      )
                    }
                  />

                </div>

              </div>

            )}


            {/* =========================
                SEARCH BUTTON
            ========================= */}

            <button
  type="submit"
  className="search-submit"
  onClick={(e) => {
    e.preventDefault();
  

    if (searchType === "flight") {
      document
        .getElementById("flight-routes")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    } else {
      runSearch(e);
    }
  }}
>
  Search{" "}
  {searchType === "flight"
    ? "Flights"
    : searchType === "hotel"
    ? "Hotels"
    : "Activities"}{" "}
  →
</button>

          </form>


          {/* RESULT */}

          {searchResult && (

            <div className="search-result">
              ✓ {searchResult}
            </div>

          )}

        </div>

      </div>

    </section>

  </div>

</section>

      {/* =========================
          FLIGHT ROUTES
      ========================= */}
      <section id="flight-routes"className="section flight-routes-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">POPULAR ROUTES</span>
              </div>
              </div>

          <div className="flight-routes-grid">
            {flightRoutes.map((route) => (
              <article className="flight-route-card" key={`${route.from}-${route.to}`}>
                <div className="route-image">
                  <img
                    src={route.image}
                    alt={`${route.from} to ${route.to}`}
                  />

                  <span className="city-badge">{route.to}</span>
                </div>

                <div className="route-content">
                  <span>{route.from} → {route.to}</span>

                  <div className="route-bottom">
                    <div>
                      <small>Starting from</small>
                      <strong>{route.price}</strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => useFlightRoute(route)}
                    >
                      Book →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          COUNTRIES
      ========================= */}
      <section className="section country-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">EXPLORE COUNTRIES</span>
            <h2>Where Would You Like to Go?</h2>
            <p>
              Discover destinations selected for unforgettable experiences.
            </p>
          </div>

          <div className="country-grid">
            {countries.map((country) => (
              <button
                type="button"
                className="country-card"
                key={country.name}
                onClick={() => {
                  setPackageFilter("All");
                  setDestinationSearch(country.name);
                  scrollToPackages();
                }}
              >
                <img src={country.image} alt={country.name} />

                <div className="country-overlay">
                  <span>Explore</span>
                  <h3>{country.name}</h3>
                  <p>{country.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          HOLIDAY PACKAGES
      ========================= */}
      <section className="section packages-section" id="packages">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">HOLIDAY PACKAGES</span>
              <h2>Handpicked Holidays</h2>
              <p>
                Find your perfect getaway from our curated collection.
              </p>
            </div>
          </div>

          <div className="package-filter-row">
            <div className="filter-buttons">
              {packageCategories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={packageFilter === category ? "active" : ""}
                  onClick={() => setPackageFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <input
              className="package-search"
              type="search"
              value={destinationSearch}
              onChange={(e) => setDestinationSearch(e.target.value)}
              placeholder="Search destination..."
            />
          </div>

          <div className="package-grid">
            {filteredPackages.map((item) => (
              <article className="package-card" key={item.id}>
                <div className="package-image">
                  <img src={item.image} alt={item.title} />

                  <span className="package-tag">{item.category}</span>

                  <button
                    type="button"
                    className="package-heart"
                    aria-label={`Save ${item.title}`}
                  >
                    ♡
                  </button>
                </div>

                <div className="package-body">
                  <span className="package-location">
                    📍 {item.location}
                  </span>

                  <h3>{item.title}</h3>

                  <div className="package-meta">
                    <span>🕒 {item.duration}</span>
                  </div>

                  <div className="package-bottom">
                    <div>
                      <small>Starting from</small>
                      <strong>{item.price}</strong>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openEnquiry({
                          title: item.title,
                          location: item.location,
                        })
                      }
                    >
                      Enquire →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="empty-state">
              <h3>No packages found</h3>
              <p>Try another destination or category.</p>

              <button
                type="button"
                className="secondary-btn"
                onClick={() => {
                  setPackageFilter("All");
                  setDestinationSearch("");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          DESTINATION BANNER
      ========================= */}
      <section className="destination-banner">
        <div className="destination-overlay" />

        <div className="container destination-content">
          <span className="eyebrow">YOUR NEXT ADVENTURE</span>
          <h2>Dream It. Plan It. Experience It.</h2>
          <p>
            Tell us what you are looking for and let our travel experts create
            a trip around you.
          </p>

          <button
            type="button"
            className="primary-btn"
            onClick={() => openEnquiry()}
          >
            Start Planning →
          </button>
        </div>
      </section>

      {/* =========================
          THEMES
      ========================= */}
      <section className="section" id="themes">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">TRAVEL YOUR WAY</span>
            <h2>Explore by Travel Theme</h2>
            <p>Choose the experience that matches your travel style.</p>
          </div>

          <div className="theme-grid">
            {themes.map((theme) => (
              <button
                type="button"
                className="theme-card"
                key={theme.title}
                onClick={() => {
                  setDestinationSearch("");
                  setPackageFilter(
                    theme.title === "Honeymoon"
                      ? "Honeymoon"
                      : theme.title === "Adventure"
                      ? "Adventure"
                      : theme.title === "Beach Holidays"
                      ? "Beach"
                      : theme.title === "International"
                      ? "International"
                      : "All"
                  );

                  scrollToPackages();
                }}
              >
                <img src={theme.image} alt={theme.title} />

                <div className="theme-overlay">
                  <span>{theme.text}</span>
                  <h3>{theme.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          DESTINATIONS
      ========================= */}
      <section className="section state-section" id="destinations">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">INDIA & BEYOND</span>
              <h2>Popular Destinations</h2>
              <p>Places travellers love to explore.</p>
            </div>

            <button
              type="button"
              className="secondary-btn"
              onClick={() => openEnquiry()}
            >
              Plan a Trip
            </button>
          </div>

          <div className="destination-grid">
            {filteredDestinations.map((destination) => (
              <button
                type="button"
                className="destination-card"
                key={destination.name}
                onClick={() =>
                  openEnquiry({
                    location: `${destination.name}, ${destination.state}`,
                    title: `${destination.name} Holiday`,
                  })
                }
              >
                <img src={destination.image} alt={destination.name} />

                <div className="destination-card-overlay">
                  <small>{destination.state}</small>
                  <h3>{destination.name}</h3>
                  <span>Explore →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          CUSTOM HOLIDAY
      ========================= */}
      <section className="custom-section" id="about">
        <div className="container">
          <div className="custom-card">
            <div className="custom-copy">
              <span className="eyebrow">PERSONALIZED TRAVEL</span>

              <h2>Build a Holiday That Feels Like Yours.</h2>

              <p>
                Tell us your destination, budget, travel dates and interests.
                Our travel experts will help create a personalized itinerary
                around your needs.
              </p>

              <div className="custom-points">
                <span>✓ Flexible itinerary</span>
                <span>✓ Handpicked stays</span>
                <span>✓ Local experiences</span>
                <span>✓ Dedicated assistance</span>
              </div>

              <button
                type="button"
                className="primary-btn"
                onClick={() => openEnquiry()}
              >
                Customize My Trip →
              </button>
            </div>

            <div className="custom-visual">
              <div className="floating-card">
                <strong>500+</strong>
                <span>Happy Travellers</span>
              </div>

              <div className="floating-card second">
                <strong>24/7</strong>
                <span>Travel Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

   {/* =========================
    WHY ZIYAGO
========================= */}

<section className="section why-section">
  <div className="container">

    <div className="why-single-image">
      <img
        src="/images/why-ziyago.png"
        alt="Why ZiyaGo - Travel With Confidence"
      />
    </div>

  </div>
</section>

      {/* =========================
          HOW IT WORKS
      ========================= */}
      <section className="how-section">
        <div className="container">
          <div className="how-it-works-image">
            <img src="/images/how-it-works.png"alt="How It Works"/>
          </div>
        </div>
      </section>

      {/* =========================
          SEASONAL HOLIDAYS
          5 DESTINATIONS FOR EVERY MONTH
      ========================= */}

{/* ================= STATE WISE PACKAGES ================= */}
<section className="section state-wise-section" id="state-wise">
  <div className="container">

    <div className="section-heading centered">
      <span className="eyebrow">STATE WISE TRAVEL</span>

      <h2>Explore Holidays by State</h2>

      <p>
        Discover beautiful destinations and handpicked holiday packages
        across India.
      </p>
    </div>

    {/* STATE TABS */}
    <div className="state-tabs">
      {states.map((state) => (
        <button
          type="button"
          key={state}
          className={activeState === state ? "active" : ""}
          onClick={() => setActiveState(state)}
        >
          {state}
        </button>
      ))}
    </div>

    {/* STATE PACKAGES */}
    <div className="state-package-grid">
      {statePackages
        .filter((item) => item.state === activeState)
        .map((item) => (
          <article className="state-package-card" key={item.id}>

            <div className="state-package-image">
              <img
                src={item.image}
                alt={item.title}
              />

              <span>{item.state}</span>
            </div>

            <div className="state-package-content">

              <small>
                📍 {item.destination}
              </small>

              <h3>{item.title}</h3>

              <p>{item.duration}</p>

              <div className="state-package-bottom">

                <div>
                  <small>Starting from</small>

                  <strong>{item.price}</strong>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openEnquiry({
                      title: item.title,
                      location: `${item.destination}, ${item.state}`,
                    })
                  }
                >
                  Enquire →
                </button>

              </div>

            </div>

          </article>
        ))}
    </div>

  </div>
</section>
      <section className="section seasonal-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SEASONAL HOLIDAYS</span>
              <h2>Where to Travel This Month</h2>
              <p>
                Explore <strong>5 handpicked destinations</strong> for every
                month of the year.
              </p>
            </div>
          </div>

          <div className="month-tabs">
            {months.map((month) => (
              <button
                type="button"
                key={month}
                className={activeMonth === month ? "active" : ""}
                onClick={() => setActiveMonth(month)}
              >
                {month.slice(0, 3)}
              </button>
            ))}
          </div>

          <div className="seasonal-grid">
            {currentSeasonalPackages.map((item) => (
              <article className="seasonal-card" key={item.id}>
                <img src={item.image} alt={item.destination} />

                <div className="seasonal-content">
                  <span>{item.month}</span>
                  <small>📍 {item.destination}</small>

                  <h3>{item.title}</h3>

                  <div className="seasonal-bottom">
                    <strong>{item.price}</strong>

                    <button
                      type="button"
                      onClick={() =>
                        openEnquiry({
                          title: item.title,
                          location: item.destination,
                        })
                      }
                    >
                      Enquire →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* =========================
          POPULAR EXPERIENCES
      ========================= */}
      <section className="section popular-section">
        <div className="container">
          <div className="section-heading centered">
            <span className="eyebrow">UNFORGETTABLE EXPERIENCES</span>
            <h2>Make Memories Along the Way</h2>
            <p>Travel is more than reaching a destination.</p>
          </div>

          <div className="popular-grid">
            {popularExperiences.map((experience, index) => (
              <button
                type="button"
                className={`popular-card ${index === 0 ? "featured" : ""}`}
                key={experience.title}
                onClick={() =>
                  openEnquiry({
                    title: experience.title,
                    location: experience.location,
                  })
                }
              >
                <img src={experience.image} alt={experience.title} />

                <div className="popular-overlay">
                  <small>{experience.location}</small>
                  <h3>{experience.title}</h3>
                  <span>Explore →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          ACHIEVEMENTS
      ========================= */}
      <section className="achievement-section">
        <div className="container">
          <div className="achievement-grid">
            <div>
              <strong>500+</strong>
              <span>Happy Travellers</span>
            </div>

            <div>
              <strong>60+</strong>
              <span>Seasonal Destinations</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Travel Assistance</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Personal Attention</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          SAFE & SECURE
      ========================= */}
      <section className="section safe-section">
        <div className="container">
          <div className="safe-card">
            <div className="safe-image" />

            <div className="safe-content">
              <span className="eyebrow">TRAVEL WITH PEACE OF MIND</span>

              <h2>Safe, Simple & Supported.</h2>

              <p>
                From the first enquiry to the end of your trip, our team is
                here to make your travel experience smooth and comfortable.
              </p>

              <div className="safe-list">
                <span>✓ Transparent travel assistance</span>
                <span>✓ Personalized trip planning</span>
                <span>✓ Dedicated customer support</span>
                <span>✓ Flexible travel options</span>
              </div>

              <button
                type="button"
                className="primary-btn"
                onClick={() => openEnquiry()}
              >
                Talk to a Travel Expert →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BLOG
      ========================= */}
      <section className="section blog-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">TRAVEL STORIES</span>
              <h2>Travel Inspiration</h2>
              <p>Tips and ideas to help you plan your next journey.</p>
            </div>
          </div>

          <div className="blog-grid">
            {blogs.map((blog) => (
              <article className="blog-card" key={blog.title}>
                <div className="blog-image">
                  <img src={blog.image} alt={blog.title} />
                </div>

                <div className="blog-content">
                  <div className="blog-meta">
                    <span>{blog.category}</span>
                    <span>{blog.date}</span>
                  </div>

                  <h3>{blog.title}</h3>

                  <button
                    type="button"
                    onClick={() =>
                      openEnquiry({
                        title: blog.title,
                        location: blog.category,
                      })
                    }
                  >
                    Plan This Trip →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          FAQ
      ========================= */}
      <section className="section faq-section">
        <div className="container faq-container">
          <div className="section-heading centered">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know before planning.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                className={`faq-item ${openFaq === index ? "open" : ""}`}
                key={faq.question}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                >
                  <span>{faq.question}</span>
                  <span>{openFaq === index ? "−" : "+"}</span>
                </button>

                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          NEWSLETTER
      ========================= */}
      <section className="newsletter-section">
        <div className="container newsletter-card">
          <div>
            <span className="eyebrow">TRAVEL UPDATES</span>
            <h2>Get Travel Inspiration in Your Inbox</h2>
            <p>
              Receive destination ideas, travel tips and holiday inspiration.
            </p>
          </div>

          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing!");
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
            />

            <button type="submit" className="primary-btn">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* =========================
          CONTACT CTA
      ========================= */}
      <section className="contact-section" id="contact">
        <div className="container contact-content">
          <span className="eyebrow">LET'S PLAN YOUR JOURNEY</span>

          <h2>Ready to Explore?</h2>

          <p>
            Tell us where you want to go. We'll help you turn your travel
            dreams into a memorable journey.
          </p>

          <div className="contact-actions">
            <button
              type="button"
              className="primary-btn"
              onClick={() => openEnquiry()}
            >
              Send an Enquiry →
            </button>

            <a className="outline-btn" href="tel:+917034735101">
              📞 Call Us
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================= */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="ZiyaGo Holidays" />

            <h3>ZiyaGo Holidays</h3>

            <p>
              Explore. Discover. Experience.
              <br />
              Your trusted travel partner for unforgettable journeys.
            </p>

            <div className="footer-socials">
              <a href="#" aria-label="Instagram">
                Instagram
              </a>
              <a href="#" aria-label="Facebook">
                Facebook
              </a>
              <a href="#" aria-label="YouTube">
                YouTube
              </a>
            </div>
          </div>

          <div>
            <h4>Explore</h4>

            <button type="button" onClick={() => handleNavClick("packages")}>
              Holiday Packages
            </button>

            <button
              type="button"
              onClick={() => handleNavClick("destinations")}
            >
              Destinations
            </button>

            <button type="button" onClick={() => handleNavClick("themes")}>
              Experiences
            </button>

            <button type="button" onClick={() => handleNavClick("about")}>
              About Us
            </button>
          </div>

          <div>
            <h4>Travel</h4>

            <button type="button" onClick={() => handleNavClick("search")}>
              Flights
            </button>

            <button type="button" onClick={() => handleNavClick("search")}>
              Hotels
            </button>

            <button type="button" onClick={() => handleNavClick("search")}>
              Activities
            </button>

            <button type="button" onClick={() => openEnquiry()}>
              Custom Trips
            </button>
          </div>

          <div>
            <h4>Contact</h4>

            <a href="tel:+917034735101">+91 7034735101</a>

            <a href="mailto:hello@ziyagoholidays.com">
              hello@ziyagoholidays.com
            </a>

            <span>Kerala, India</span>

            <button
              type="button"
              className="footer-enquiry"
              onClick={() => openEnquiry()}
            >
              Enquire Now →
            </button>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© 2026 ZiyaGo Holidays. All rights reserved.</p>

          <div>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </div>
        </div>
      </footer>

      {/* =========================
          WHATSAPP
      ========================= */}
      <a
        className="whatsapp-button"
        href="https://wa.me/917034735101"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <span>💬</span>
      </a>
      {/* =========================
      INSTAGRAM
========================= */}
      <a
      className="instagram-button"
      href="https://www.instagram.com/ziyago_holidays/"
      target="_blank"
      rel="noreferrer"
      aria-label="Follow us on Instagram"
      >
        <span>📷</span>
      </a>

      {/* =========================
          ENQUIRY MODAL
      ========================= */}
      {showEnquiry && (
        <div className="enquiry-modal" onClick={closeEnquiry}>
          <div
            className="enquiry-box"
            onClick={(e) => e.stopPropagation()}
            
          >
            <button
              type="button"
              className="modal-close"
              onClick={closeEnquiry}
              aria-label="Close"
            >
              ×
            </button>

            <div className="modal-heading">
              <span className="eyebrow">PLAN YOUR TRIP</span>

              <h2>
                {selectedPackage?.title
                  ? `Enquire About ${selectedPackage.title}`
                  : "Tell Us About Your Trip"}
              </h2>

              <p>
                Share a few details and our travel team will get in touch.
              </p>
            </div>

            <form onSubmit={submitEnquiry}>
              <div className="form-grid">
                <div className="search-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={enquiryData.name}
                    onChange={(e) =>
                      setEnquiryData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="search-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={enquiryData.phone}
                    onChange={(e) =>
                      setEnquiryData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="+91"
                    required
                  />
                </div>

                <div className="search-field">
                  <label>Email</label>
                  <input
                    type="email"
                    value={enquiryData.email}
                    onChange={(e) =>
                      setEnquiryData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="your@email.com"
                  />
                </div>

                <div className="search-field">
                  <label>Destination</label>
                  <input
                    type="text"
                    value={enquiryData.destination}
                    onChange={(e) =>
                      setEnquiryData((prev) => ({
                        ...prev,
                        destination: e.target.value,
                      }))
                    }
                    placeholder="Where do you want to go?"
                    required
                  />
                </div>

                <div className="search-field">
                  <label>Travel Date</label>
                  <input
                    type="date"
                    value={enquiryData.travelDate}
                    onChange={(e) =>
                      setEnquiryData((prev) => ({
                        ...prev,
                        travelDate: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="search-field">
                  <label>Travellers</label>
                  <input
                    type="number"
                    min="1"
                    value={enquiryData.travelers}
                    
                    onChange={(e) =>
                      setEnquiryData((prev) => ({
                        ...prev,
                        travelers: Math.max(1, Number(e.target.value)),
                      }))
                    }
                  />
                </div>
              </div>

              <div className="search-field">
                <label>Message</label>

                <textarea
                  rows="4"
                  value={enquiryData.message}
                  onChange={(e) =>
                    setEnquiryData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  placeholder="Tell us about your trip..."
                />
              </div>

              <button type="submit" className="search-submit">
                Send Enquiry on WhatsApp →
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;