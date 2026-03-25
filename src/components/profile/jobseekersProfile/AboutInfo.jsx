import { useState, useEffect } from "react";
import {
  getMyAboutInfo,
  getAboutInfoByUserId,
} from "../../../api/JobSeekerApi";
import { Section, Field } from "../comman/Helpers";
import AboutInfoForm from "./AboutInfoForm";

const AboutInfo = ({ profile, setProfile, editable, userId, isOwnProfile }) => {
  const [openForm, setOpenForm] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ================= FETCH ABOUT INFO =================
  const loadAboutInfo = async () => {
    if (!isOwnProfile && !userId) return;

    setLoading(true);
    setError(null);
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
      setError("Failed to load about information.");
    } finally {
      setLoading(false);
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

  // ================= LOADING =================
  if (loading) {
    return (
      <Section title="About" editable={false} className="lwd-card">
        <div className="lwd-skeleton space-y-3 p-3">
          <div className="h-4 rounded w-1/3"></div>
          <div className="h-4 rounded w-2/3"></div>
        </div>
      </Section>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <Section title="About" editable={false} className="lwd-card">
        <p className="text-sm text-red-600 dark:text-red-400 p-3">
          {error}
        </p>
      </Section>
    );
  }

  // ================= UI =================
  return (
    <>
      <Section
        title="About"
        editable={editable}
        onEdit={() => setOpenForm(true)}
        className="lwd-card lwd-card-hover"
      >
        <div className="space-y-4">

          {/* Headline */}
          <div>
            <p className="lwd-label mb-1">Headline</p>
            <p className="lwd-text text-sm md:text-base">
              {profile?.headline || "—"}
            </p>
          </div>

          {/* About */}
          <div>
            <p className="lwd-label mb-1">About</p>
            {profile?.about ? (
              <p className="lwd-text leading-relaxed">
                {profile.about}
              </p>
            ) : (
              <p className="text-gray-400 italic text-sm dark:text-gray-500">
                Not provided
              </p>
            )}
          </div>

        </div>
      </Section>

      {/* ===== MODAL ===== */}
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