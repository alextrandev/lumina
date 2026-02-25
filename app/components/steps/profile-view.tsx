"use client";

import { UserInfo } from "@/app/types";
import { FadeIn } from "@/app/components/ui/fade-in";
import { MysticButton } from "@/app/components/ui/mystic-button";
import { useI18n } from "@/app/i18n";

interface ProfileViewProps {
  userInfo: UserInfo;
  onEdit: () => void;
  onConfirm: () => void;
}

export function ProfileView({ userInfo, onEdit, onConfirm }: ProfileViewProps) {
  const { t } = useI18n();

  const hasInfo = userInfo.name || userInfo.age || userInfo.occupation || userInfo.status;

  return (
    <div className="step-container profile-view">
      <FadeIn>
        <h2 className="step-title">Your Profile</h2>
        <div className="profile-card">
          {hasInfo ? (
            <div className="profile-details">
              {userInfo.name && (
                <div className="profile-item">
                  <span className="label">Name:</span>
                  <span className="value">{userInfo.name}</span>
                </div>
              )}
              {userInfo.age && (
                <div className="profile-item">
                  <span className="label">Age:</span>
                  <span className="value">{userInfo.age}</span>
                </div>
              )}
              {userInfo.occupation && (
                <div className="profile-item">
                  <span className="label">Occupation:</span>
                  <span className="value">{userInfo.occupation}</span>
                </div>
              )}
              {userInfo.status && (
                <div className="profile-item">
                  <span className="label">Status:</span>
                  <span className="value">{userInfo.status}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="no-info">No profile information stored yet.</p>
          )}
        </div>

        <div className="button-row" style={{ marginTop: '2rem' }}>
          <MysticButton onClick={onConfirm}>
            {hasInfo ? "Proceed to Reading" : "Create Profile"}
          </MysticButton>
          {hasInfo && (
            <MysticButton variant="ghost" onClick={onEdit}>
              Edit Profile
            </MysticButton>
          )}
        </div>
      </FadeIn>

      <style jsx>{`
        .profile-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          margin: 1rem 0;
          width: 100%;
          max-width: 400px;
        }
        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .profile-item {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 0.5rem;
        }
        .label {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
        }
        .value {
          color: #fff;
          font-weight: 500;
        }
        .no-info {
          text-align: center;
          color: rgba(255, 255, 255, 0.5);
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
