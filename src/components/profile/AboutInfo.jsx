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
        className="p-3 md:p-4"
      >
        {/* Compact Fields */}
        <div className="flex flex-col gap-1">
          <Field
            label="Headline"
            value={profile?.headline || "—"}
            className="text-sm md:text-base"
          />
          <p className="text-sm md:text-sm leading-snug">
            <span className="font-medium">About:</span>{" "}
            {profile?.about || "—"}
          </p>
        </div>
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