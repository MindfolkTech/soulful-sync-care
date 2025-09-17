// GDPR Data Subject Rights Implementation

export interface UserDataExport {
  personalInfo: {
    name: string;
    email: string;
    dateOfBirth?: string;
    phoneNumber?: string;
    joinDate: string;
  };
  assessmentData: {
    responses: any[];
    personalityProfile: any;
    completedAt: string;
  };
  therapyData: {
    sessions: any[];
    messages: any[];
    notes: any[];
  };
  preferences: {
    notifications: any;
    privacy: any;
    communication: any;
  };
  accountActivity: {
    loginHistory: any[];
    profileViews: any[];
    lastActive: string;
  };
}

export class DataRightsManager {
  /**
   * Export all user data in GDPR-compliant format
   */
  static async exportUserData(userId: string): Promise<UserDataExport> {
    // In a real implementation, this would fetch from your backend
    // For now, we'll simulate with localStorage data
    
    const userData: UserDataExport = {
      personalInfo: {
        name: localStorage.getItem('userName') || 'Unknown User',
        email: localStorage.getItem('userEmail') || 'unknown@example.com',
        joinDate: localStorage.getItem('userJoinDate') || new Date().toISOString(),
      },
      assessmentData: {
        responses: JSON.parse(localStorage.getItem('assessmentResponses') || '[]'),
        personalityProfile: JSON.parse(localStorage.getItem('personalityProfile') || '{}'),
        completedAt: localStorage.getItem('assessmentCompletedAt') || new Date().toISOString(),
      },
      therapyData: {
        sessions: JSON.parse(localStorage.getItem('therapySessions') || '[]'),
        messages: JSON.parse(localStorage.getItem('therapyMessages') || '[]'),
        notes: JSON.parse(localStorage.getItem('therapyNotes') || '[]'),
      },
      preferences: {
        notifications: JSON.parse(localStorage.getItem('notificationPreferences') || '{}'),
        privacy: JSON.parse(localStorage.getItem('privacyPreferences') || '{}'),
        communication: JSON.parse(localStorage.getItem('communicationPreferences') || '{}'),
      },
      accountActivity: {
        loginHistory: JSON.parse(localStorage.getItem('loginHistory') || '[]'),
        profileViews: JSON.parse(localStorage.getItem('profileViews') || '[]'),
        lastActive: localStorage.getItem('lastActive') || new Date().toISOString(),
      },
    };

    return userData;
  }

  /**
   * Download user data as JSON file
   */
  static async downloadUserData(userId: string): Promise<void> {
    try {
      const userData = await this.exportUserData(userId);
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mindfolk-data-export-${new Date().toISOString().split('T')[0]}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Log the data export for audit purposes
      console.log('Data export completed for user:', userId);
    } catch (error) {
      console.error('Failed to export user data:', error);
      throw new Error('Failed to export your data. Please try again.');
    }
  }

  /**
   * Delete all user data (Right to Erasure)
   */
  static async deleteUserAccount(userId: string): Promise<void> {
    try {
      // In a real implementation, this would call your backend API
      // to delete all user data from the database
      
      // For now, we'll clear localStorage and show confirmation
      const keysToRemove = [
        'userName',
        'userEmail', 
        'userJoinDate',
        'assessmentResponses',
        'personalityProfile',
        'assessmentCompletedAt',
        'therapySessions',
        'therapyMessages',
        'therapyNotes',
        'notificationPreferences',
        'privacyPreferences',
        'communicationPreferences',
        'loginHistory',
        'profileViews',
        'lastActive',
        'cookie-consent',
        'cookie-consent-date',
        'therapistOnboarding'
      ];

      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });

      // Clear all cookies
      document.cookie.split(";").forEach(cookie => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      });

      // Log the deletion for audit purposes
      console.log('Account deletion completed for user:', userId);
      
    } catch (error) {
      console.error('Failed to delete user account:', error);
      throw new Error('Failed to delete your account. Please contact support.');
    }
  }

  /**
   * Update user data (Right to Rectification)
   */
  static async updateUserData(userId: string, updates: Partial<UserDataExport>): Promise<void> {
    try {
      // In a real implementation, this would update the backend
      // For now, we'll update localStorage
      
      if (updates.personalInfo) {
        Object.entries(updates.personalInfo).forEach(([key, value]) => {
          if (value) {
            localStorage.setItem(`user${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
          }
        });
      }

      if (updates.preferences) {
        Object.entries(updates.preferences).forEach(([key, value]) => {
          localStorage.setItem(`${key}Preferences`, JSON.stringify(value));
        });
      }

      console.log('User data updated for:', userId);
    } catch (error) {
      console.error('Failed to update user data:', error);
      throw new Error('Failed to update your data. Please try again.');
    }
  }

  /**
   * Get data processing information (Right to Information)
   */
  static getDataProcessingInfo(): any {
    return {
      dataController: {
        name: "MindFolk Ltd",
        address: "123 Therapy Street, London, UK",
        email: "privacy@mindfolk.com",
        phone: "+44 20 1234 5678"
      },
      dataProtectionOfficer: {
        name: "Data Protection Officer",
        email: "dpo@mindfolk.com"
      },
      purposes: [
        "Service delivery and matching",
        "Communication facilitation", 
        "Service improvement and analytics",
        "Legal compliance and safety"
      ],
      legalBasis: [
        "Consent (Article 6(1)(a)) - Marketing communications",
        "Contract (Article 6(1)(b)) - Service delivery",
        "Legitimate Interest (Article 6(1)(f)) - Service improvement"
      ],
      retentionPeriods: {
        accountData: "Until account deletion",
        therapyData: "7 years (legal requirement)",
        analyticsData: "2 years",
        marketingData: "Until consent withdrawn"
      },
      thirdParties: [
        "Supabase (data storage)",
        "Stripe (payment processing)",
        "Daily.co (video sessions)",
        "Resend (email communications)"
      ]
    };
  }
}
