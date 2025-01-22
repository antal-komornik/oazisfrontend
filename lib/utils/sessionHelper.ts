// utils/sessionHelper.ts
import { useSession } from "next-auth/react";

export const updateSessionProfile = async (newProfileData: { address: string, phone_number: string }) => {
  const { update } = useSession();
  
  try {
    await update({
      ...session,
      user: {
        ...session.user,
        profile: newProfileData
      }
    });
  } catch (error) {
    console.error("Hiba a session frissítésekor:", error);
    throw error;
  }
};