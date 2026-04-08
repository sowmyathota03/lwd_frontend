import { useState, useEffect, useCallback } from "react";
import {
  getMyAboutInfo,
  getAboutInfoByUserId,
} from "../../../api/JobSeekerApi";
import { Section } from "../comman/Helpers";
import AboutInfoForm from "./AboutInfoForm";

const AboutInfo = ({
  profile,
  setProfile,
  editable,
  userId,
  isOwnProfile,
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAboutInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let data;

      if (isOwnProfile) {
        data = await getMyAboutInfo();
      } else {
        if (!userId) {
          setError("User ID is missing.");
          return;
        }
        data = await getAboutInfoByUserId(userId);
      }

      const safeData = {
        headline: data?.headline || "",
        about: data?.about || "",
      };

      setAboutData(safeData);

      setProfile((prev) => ({
        ...prev,
        headline: safeData.headline,
        about: safeData.about,
      }));
    } catch (err) {
      console.error("Error loading about info:", err);
      setError(
        err?.response?.data?.message || "Failed to load about information."
      );
    } finally {
      setLoading(false);
    }
  }, [isOwnProfile, userId, setProfile]);

  useEffect(() => {
    loadAboutInfo();
  }, [loadAboutInfo]);

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

  if (error) {
    return (
      <Section title="About" editable={false} className="lwd-card">
        <p className="text-sm text-red-600 dark:text-red-400 p-3">{error}</p>
      </Section>
    );
  }

  const displayHeadline = aboutData?.headline ?? profile?.headline ?? "";
  const displayAbout = aboutData?.about ?? profile?.about ?? "";

  return (
    <>
      <Section
        title="About"
        editable={editable}
        onEdit={() => setOpenForm(true)}
        className="lwd-card lwd-card-hover"
      >
        <div className="space-y-4">
          <div>
            <p className="lwd-label mb-1">Headline</p>
            <p className="lwd-text text-sm md:text-base">
              {displayHeadline || "—"}
            </p>
          </div>

          <div>
            <p className="lwd-label mb-1">About</p>
            {displayAbout ? (
              <p className="lwd-text leading-relaxed">{displayAbout}</p>
            ) : (
              <p className="text-gray-400 italic text-sm dark:text-gray-500">
                Not provided
              </p>
            )}
          </div>
        </div>
      </Section>

      {openForm && (
        <AboutInfoForm
          profile={profile}
          setProfile={setProfile}
          onClose={() => setOpenForm(false)}
          onUpdated={loadAboutInfo}
        />
      )}
    </>
  );
};

export default AboutInfo;