import { useState, useEffect } from "react";
import {
  getMyAboutInfo,
  getAboutInfoByUserId,
} from "../../../api/JobSeekerApi";
import { Section, Field } from "../comman/Helpers";
import AboutInfoForm from "./AboutInfoForm";

/** 
 * AboutInfo component displays the user's headline and about section.
 * It fetches data based on ownership (own profile or other user's profile)
 * and allows editing when `editable` is true.
 *
 * @param {Object} props
 * @param {Object} props.profile - The current profile object (containing headline and about)
 * @param {Function} props.setProfile - State setter to update profile
 * @param {boolean} props.editable - Whether the current user can edit this section
 * @param {string|number} props.userId - ID of the user whose profile is being viewed
 * @param {boolean} props.isOwnProfile - Whether this is the logged-in user's profile
 */
const AboutInfo = ({ profile, setProfile, editable, userId, isOwnProfile }) => {
  const [openForm, setOpenForm] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ================= FETCH ABOUT INFO =================
  const loadAboutInfo = async () => {
    // Only fetch if we have the necessary identifiers
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

  // Show loading skeleton
  if (loading) {
    return (
      <Section title="About" editable={false} className="p-3 md:p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </Section>
    );
  }

  // Show error state
  if (error) {
    return (
      <Section title="About" editable={false} className="p-3 md:p-4">
        <p className="text-sm text-red-600">{error}</p>
      </Section>
    );
  }

  return (
    <>
      <Section
        title="About"
        editable={editable}
        onEdit={() => setOpenForm(true)}
        className="p-3 md:p-4"
      >
        <div className="space-y-3">
          {/* Headline field */}
          <Field
            label="Headline"
            value={profile?.headline || "—"}
            className="text-sm md:text-base"
          />

          {/* About text */}
          <div className="text-sm md:text-sm leading-relaxed">
            <span className="font-medium text-gray-700">About:</span>{" "}
            {profile?.about ? (
              <span className="text-gray-600">{profile.about}</span>
            ) : (
              <span className="text-gray-400 italic">Not provided</span>
            )}
          </div>
        </div>
      </Section>

      {/* Modal Form for editing */}
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