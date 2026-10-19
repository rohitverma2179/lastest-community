'use client';

// import NavBar           from "../components/shared/NavBar";
// import Footer          from "../components/shared/Footer";
import CommunityHero   from "../components/community/CommunityHero";
import CommunityFeatures from "../components/community/CommunityFeatures";
import MemberSpotlights  from "../components/community/MemberSpotlights";
// import CountryChapters   from "../components/community/CountryChapters";
import CommunityFAQ      from "../components/community/CommunityFAQ";
import CommunityJoinBand from "../components/community/CommunityJoinBand";

export default function CommunityPage() {
  return (
    <>
      {/* <NavBar active="community" /> */}
      <CommunityHero />
      <CommunityFeatures />
      <MemberSpotlights />
      {/* <CountryChapters /> */}
      <CommunityFAQ />
      <CommunityJoinBand />
      {/* <Footer /> */}
    </>
  );
}
