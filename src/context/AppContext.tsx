import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CreatorProfile,
  Collaboration,
  PitchRecord,
  RateItem,
  PortfolioItem,
  DeliverableTask,
  MediaKitSectionConfig,
} from '../types';
import {
  initialProfile,
  initialCollaborations,
  initialPitches,
  initialRateItems,
  initialPortfolioItems,
  initialDeliverables,
  initialMediaKitSections,
} from '../data/initialData';

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  type: 'urgent' | 'reminder' | 'info';
  timestamp: string;
  read: boolean;
  actionTab?: string;
}

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
  previewDevice: 'desktop' | 'mobile';
  setPreviewDevice: (d: 'desktop' | 'mobile') => void;

  profile: CreatorProfile;
  updateProfile: (updates: Partial<CreatorProfile>) => void;

  collaborations: Collaboration[];
  addCollaboration: (collab: Omit<Collaboration, 'id'>) => void;
  updateCollaboration: (id: string, updates: Partial<Collaboration>) => void;
  deleteCollaboration: (id: string) => void;

  pitches: PitchRecord[];
  addPitch: (pitch: Omit<PitchRecord, 'id'>) => void;
  updatePitch: (id: string, updates: Partial<PitchRecord>) => void;
  deletePitch: (id: string) => void;

  rates: RateItem[];
  addRate: (rate: Omit<RateItem, 'id'>) => void;
  updateRate: (id: string, updates: Partial<RateItem>) => void;
  deleteRate: (id: string) => void;

  portfolio: PortfolioItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolioItem: (id: string, updates: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;

  deliverables: DeliverableTask[];
  addDeliverable: (task: Omit<DeliverableTask, 'id'>) => void;
  updateDeliverable: (id: string, updates: Partial<DeliverableTask>) => void;
  deleteDeliverable: (id: string) => void;

  mediaKitSections: MediaKitSectionConfig[];
  updateMediaKitSections: (sections: MediaKitSectionConfig[]) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  exportAllData: () => string;
  importAllData: (jsonData: string) => boolean;
  resetAllData: () => void;
}

const STORAGE_KEY = 'couturefloss_store_v2';

const defaultNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Deliverable Overdue',
    description: 'Nicobar Autumn Lookbook cut #2 approval is waiting for client response.',
    type: 'urgent',
    timestamp: '2 hours ago',
    read: false,
    actionTab: 'deliverables',
  },
  {
    id: 'notif-2',
    title: 'Follow-up Due: Dyson Haircare',
    description: 'Pitch sent 6 days ago. Schedule follow-up email before end of week.',
    type: 'reminder',
    timestamp: 'Yesterday',
    read: false,
    actionTab: 'pitches',
  },
  {
    id: 'notif-3',
    title: 'Rate Card Updated',
    description: 'Signature Reel + Story package updated with 15% bundled savings.',
    type: 'info',
    timestamp: '2 days ago',
    read: true,
    actionTab: 'rates',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Loaded from LocalStorage or Initial
  const [profile, setProfile] = useState<CreatorProfile>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
      return saved ? JSON.parse(saved) : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [collaborations, setCollaborations] = useState<Collaboration[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_collabs`);
      return saved ? JSON.parse(saved) : initialCollaborations;
    } catch {
      return initialCollaborations;
    }
  });

  const [pitches, setPitches] = useState<PitchRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_pitches`);
      return saved ? JSON.parse(saved) : initialPitches;
    } catch {
      return initialPitches;
    }
  });

  const [rates, setRates] = useState<RateItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_rates`);
      return saved ? JSON.parse(saved) : initialRateItems;
    } catch {
      return initialRateItems;
    }
  });

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_portfolio`);
      return saved ? JSON.parse(saved) : initialPortfolioItems;
    } catch {
      return initialPortfolioItems;
    }
  });

  const [deliverables, setDeliverables] = useState<DeliverableTask[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_deliverables`);
      return saved ? JSON.parse(saved) : initialDeliverables;
    } catch {
      return initialDeliverables;
    }
  });

  const [mediaKitSections, setMediaKitSections] = useState<MediaKitSectionConfig[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_sections`);
      return saved ? JSON.parse(saved) : initialMediaKitSections;
    } catch {
      return initialMediaKitSections;
    }
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(defaultNotifications);

  // Sync to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_collabs`, JSON.stringify(collaborations));
  }, [collaborations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_pitches`, JSON.stringify(pitches));
  }, [pitches]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_rates`, JSON.stringify(rates));
  }, [rates]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_portfolio`, JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_deliverables`, JSON.stringify(deliverables));
  }, [deliverables]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_sections`, JSON.stringify(mediaKitSections));
  }, [mediaKitSections]);

  const updateProfile = (updates: Partial<CreatorProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const addCollaboration = (collab: Omit<Collaboration, 'id'>) => {
    const newCollab: Collaboration = {
      ...collab,
      id: `collab-${Date.now()}`,
    };
    setCollaborations(prev => [newCollab, ...prev]);
  };

  const updateCollaboration = (id: string, updates: Partial<Collaboration>) => {
    setCollaborations(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCollaboration = (id: string) => {
    setCollaborations(prev => prev.filter(c => c.id !== id));
  };

  const addPitch = (pitch: Omit<PitchRecord, 'id'>) => {
    const newPitch: PitchRecord = {
      ...pitch,
      id: `pitch-${Date.now()}`,
    };
    setPitches(prev => [newPitch, ...prev]);
  };

  const updatePitch = (id: string, updates: Partial<PitchRecord>) => {
    setPitches(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deletePitch = (id: string) => {
    setPitches(prev => prev.filter(p => p.id !== id));
  };

  const addRate = (rate: Omit<RateItem, 'id'>) => {
    const newRate: RateItem = {
      ...rate,
      id: `rate-${Date.now()}`,
    };
    setRates(prev => [...prev, newRate]);
  };

  const updateRate = (id: string, updates: Partial<RateItem>) => {
    setRates(prev => prev.map(r => (r.id === id ? { ...r, ...updates } : r)));
  };

  const deleteRate = (id: string) => {
    setRates(prev => prev.filter(r => r.id !== id));
  };

  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: `port-${Date.now()}`,
    };
    setPortfolio(prev => [newItem, ...prev]);
  };

  const updatePortfolioItem = (id: string, updates: Partial<PortfolioItem>) => {
    setPortfolio(prev => prev.map(item => (item.id === id ? { ...item, ...updates } : item)));
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolio(prev => prev.filter(item => item.id !== id));
  };

  const addDeliverable = (task: Omit<DeliverableTask, 'id'>) => {
    const newTask: DeliverableTask = {
      ...task,
      id: `del-${Date.now()}`,
    };
    setDeliverables(prev => [newTask, ...prev]);
  };

  const updateDeliverable = (id: string, updates: Partial<DeliverableTask>) => {
    setDeliverables(prev => prev.map(d => (d.id === id ? { ...d, ...updates } : d)));
  };

  const deleteDeliverable = (id: string) => {
    setDeliverables(prev => prev.filter(d => d.id !== id));
  };

  const updateMediaKitSections = (sections: MediaKitSectionConfig[]) => {
    setMediaKitSections(sections);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const exportAllData = () => {
    const backup = {
      exportDate: new Date().toISOString(),
      profile,
      collaborations,
      pitches,
      rates,
      portfolio,
      deliverables,
      mediaKitSections,
    };
    return JSON.stringify(backup, null, 2);
  };

  const importAllData = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      if (data.profile) setProfile(data.profile);
      if (data.collaborations) setCollaborations(data.collaborations);
      if (data.pitches) setPitches(data.pitches);
      if (data.rates) setRates(data.rates);
      if (data.portfolio) setPortfolio(data.portfolio);
      if (data.deliverables) setDeliverables(data.deliverables);
      if (data.mediaKitSections) setMediaKitSections(data.mediaKitSections);
      return true;
    } catch (e) {
      console.error('Failed to import data', e);
      return false;
    }
  };

  const resetAllData = () => {
    setProfile(initialProfile);
    setCollaborations(initialCollaborations);
    setPitches(initialPitches);
    setRates(initialRateItems);
    setPortfolio(initialPortfolioItems);
    setDeliverables(initialDeliverables);
    setMediaKitSections(initialMediaKitSections);
    localStorage.removeItem(`${STORAGE_KEY}_profile`);
    localStorage.removeItem(`${STORAGE_KEY}_collabs`);
    localStorage.removeItem(`${STORAGE_KEY}_pitches`);
    localStorage.removeItem(`${STORAGE_KEY}_rates`);
    localStorage.removeItem(`${STORAGE_KEY}_portfolio`);
    localStorage.removeItem(`${STORAGE_KEY}_deliverables`);
    localStorage.removeItem(`${STORAGE_KEY}_sections`);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currency,
        setCurrency,
        previewDevice,
        setPreviewDevice,
        profile,
        updateProfile,
        collaborations,
        addCollaboration,
        updateCollaboration,
        deleteCollaboration,
        pitches,
        addPitch,
        updatePitch,
        deletePitch,
        rates,
        addRate,
        updateRate,
        deleteRate,
        portfolio,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        deliverables,
        addDeliverable,
        updateDeliverable,
        deleteDeliverable,
        mediaKitSections,
        updateMediaKitSections,
        searchQuery,
        setSearchQuery,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        exportAllData,
        importAllData,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
