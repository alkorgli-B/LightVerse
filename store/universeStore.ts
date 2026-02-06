import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { nanoid } from 'nanoid';

export interface Soul {
  id: string;
  color: string;
  message: string;
  position: [number, number, number];
  size: number;
  speed: number;
  energy: number;
  connections: string[];
  isStarred: boolean;
  createdAt: number;
  country?: string;
}

export interface Connection {
  id: string;
  fromId: string;
  toId: string;
  createdAt: number;
  expiresAt: number;
}

interface UniverseState {
  souls: Soul[];
  connections: Connection[];
  mySoulId: string | null;
  totalSouls: number;
  totalInteractions: number;
  mode: 'normal' | 'ocean' | 'galaxy' | 'meditation' | 'festival';
  selectedSoul: Soul | null;
  showOnboarding: boolean;
  showDashboard: boolean;
  
  // Actions
  addSoul: (soul: Omit<Soul, 'id' | 'energy' | 'connections' | 'isStarred' | 'createdAt'>) => Soul;
  removeSoul: (id: string) => void;
  updateSoul: (id: string, updates: Partial<Soul>) => void;
  sendEnergy: (fromId: string, toId: string) => void;
  createConnection: (fromId: string, toId: string) => void;
  removeConnection: (id: string) => void;
  starSoul: (id: string) => void;
  setMode: (mode: UniverseState['mode']) => void;
  setSelectedSoul: (soul: Soul | null) => void;
  setShowOnboarding: (show: boolean) => void;
  setShowDashboard: (show: boolean) => void;
  setMySoulId: (id: string) => void;
}

export const useUniverseStore = create<UniverseState>()(
  persist(
    (set, get) => ({
      souls: [],
      connections: [],
      mySoulId: null,
      totalSouls: 0,
      totalInteractions: 0,
      mode: 'normal',
      selectedSoul: null,
      showOnboarding: true,
      showDashboard: false,

      addSoul: (soulData) => {
        const soul: Soul = {
          ...soulData,
          id: nanoid(),
          energy: 0,
          connections: [],
          isStarred: false,
          createdAt: Date.now(),
        };
        
        set((state) => ({
          souls: [...state.souls, soul],
          totalSouls: state.totalSouls + 1,
          mySoulId: soul.id, // حفظ معرف الروح الخاصة بالمستخدم تلقائياً
          showOnboarding: false, // إخفاء واجهة الترحيب بمجرد إنشاء الروح
        }));
        
        return soul;
      },

      removeSoul: (id) => {
        set((state) => ({
          souls: state.souls.filter((s) => s.id !== id),
          mySoulId: state.mySoulId === id ? null : state.mySoulId,
        }));
      },

      updateSoul: (id, updates) => {
        set((state) => ({
          souls: state.souls.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        }));
      },

      sendEnergy: (fromId, toId) => {
        set((state) => ({
          souls: state.souls.map((s) =>
            s.id === toId ? { ...s, energy: s.energy + 1 } : s
          ),
          totalInteractions: state.totalInteractions + 1,
        }));

        const soul = get().souls.find((s) => s.id === toId);
        if (soul && soul.energy >= 100) {
          get().starSoul(toId);
        }
      },

      createConnection: (fromId, toId) => {
        const connection: Connection = {
          id: nanoid(),
          fromId,
          toId,
          createdAt: Date.now(),
          expiresAt: Date.now() + 5 * 60 * 1000,
        };

        set((state) => ({
          connections: [...state.connections, connection],
          souls: state.souls.map((s) => {
            if (s.id === fromId || s.id === toId) {
              return {
                ...s,
                connections: [...s.connections, s.id === fromId ? toId : fromId],
              };
            }
            return s;
          }),
          totalInteractions: state.totalInteractions + 1,
        }));

        setTimeout(() => {
          get().removeConnection(connection.id);
        }, 5 * 60 * 1000);
      },

      removeConnection: (id) => {
        set((state) => {
          const conn = state.connections.find((c) => c.id === id);
          if (!conn) return state;

          return {
            connections: state.connections.filter((c) => c !== id), // تصحيح بسيط هنا
            souls: state.souls.map((s) => {
              if (s.id === conn.fromId) {
                return {
                  ...s,
                  connections: s.connections.filter((c) => c !== conn.toId),
                };
              }
              if (s.id === conn.toId) {
                return {
                  ...s,
                  connections: s.connections.filter((c) => c !== conn.fromId),
                };
              }
              return s;
            }),
          };
        });
      },

      starSoul: (id) => {
        set((state) => ({
          souls: state.souls.map((s) =>
            s.id === id ? { ...s, isStarred: true, size: s.size * 1.5 } : s
          ),
          totalInteractions: state.totalInteractions + 1,
        }));

        setTimeout(() => {
          set((state) => ({
            souls: state.souls.map((s) =>
              s.id === id ? { ...s, isStarred: false, size: s.size / 1.5 } : s
            ),
          }));
        }, 60000);
      },

      setMode: (mode) => set({ mode }),
      setSelectedSoul: (soul) => set({ selectedSoul: soul }),
      setShowOnboarding: (show) => set({ showOnboarding: show }),
      setShowDashboard: (show) => set({ showDashboard: show }),
      setMySoulId: (id) => set({ mySoulId: id }),
    }),
    {
      name: 'zen-universe-storage', // اسم المفتاح في localStorage
      storage: createJSONStorage(() => localStorage),
      // تحديد البيانات التي نريد حفظها فقط لضمان عدم حفظ بيانات مؤقتة
      partialize: (state) => ({ 
        souls: state.souls, 
        mySoulId: state.mySoulId,
        totalSouls: state.totalSouls,
        showOnboarding: state.showOnboarding 
      }),
    }
  )
);
