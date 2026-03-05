import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  getMyAboutInfo,
  getAboutInfoByUserId,
} from "../../api/JobSeekerApi";

import { Section, Field } from "./Helpers";
import AboutInfoForm from "./AboutInfoForm";

const AboutInfo = ({ profile, setProfile, editable, userId, isOwnProfile }) => {

  const [openForm, setOpenForm] = useState(false);

  // ================= FETCH ABOUT INFO =================
  const { data: aboutData } = useQuery({
    queryKey: ["aboutInfo", userId || "me"],
    queryFn: async () => {
      if (isOwnProfile) {
        return await getMyAboutInfo();
      } else {
        return await getAboutInfoByUserId(userId);
      }
    },
  });

  // Sync profile
  useEffect(() => {
    if (aboutData) {
      setProfile((prev) => ({
        ...prev,
        headline: aboutData.headline,
        about: aboutData.about,
      }));
    }
  }, [aboutData]);

  return (
    <>
      <Section
        title="About"
        editable={editable}
        onEdit={() => setOpenForm(true)}
      >
        <Field label="Headline" value={profile?.headline || "—"} />
        <Field label="About" value={profile?.about || "—"} />
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
