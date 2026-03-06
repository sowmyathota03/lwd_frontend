import { useState, useEffect } from "react";

import {
  getMyAboutInfo,
  getAboutInfoByUserId,
} from "../../api/JobSeekerApi";

import { Section, Field } from "./Helpers";
import AboutInfoForm from "./AboutInfoForm";

const AboutInfo = ({ profile, setProfile, editable, userId, isOwnProfile }) => {

  const [openForm, setOpenForm] = useState(false);
  const [aboutData, setAboutData] = useState(null);

  // ================= FETCH ABOUT INFO =================
  const loadAboutInfo = async () => {
    try {
      let res;

      if (isOwnProfile) {
        res = await getMyAboutInfo();
      } else {
        res = await getAboutInfoByUserId(userId);
      }

      setAboutData(res);
    } catch (error) {
      console.error("Error loading about info", error);
    }
  };

  useEffect(() => {
    loadAboutInfo();
  }, [userId, isOwnProfile]);

  // ================= SYNC PROFILE =================
  useEffect(() => {
    if (aboutData) {
      setProfile((prev) => ({
        ...prev,
        headline: aboutData.headline,
        about: aboutData.about,
      }));
    }
  }, [aboutData, setProfile]);

  return (
    <>
      <Section
        title="About"
        editable={editable}
        onEdit={() => setOpenForm(true)}
      >
        <Field label="Headline" value={profile?.headline || "—"} />
        <p className="text-sm">
          About: <span className="font-medium">{profile?.about || "—"}</span>
        </p>
      </Section>

      {/* Modal Form */}
      {openForm && (
        <AboutInfoForm
          profile={profile}
          setProfile={setProfile}
          onClose={() => setOpenForm(false)}
        />
      )}
    </>
  );
};

export default AboutInfo;
