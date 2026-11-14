/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { CoverageSection } from './components/CoverageSection';
import { DispatchBoard } from './components/DispatchBoard';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PortalFormsSection } from './components/PortalFormsSection';
import { ServicesSection } from './components/ServicesSection';
import {
  DriverCategory,
  DriverRegistration,
  DriverRequest,
  LanguageMode,
  SubmissionStatus,
} from './types';

export default function App() {
  const [lang, setLang] = useState<LanguageMode>('en');
  const [portalTab, setPortalTab] = useState<'request' | 'register'>('request');
  const [selectedCategory, setSelectedCategory] = useState<DriverCategory>(
    DriverCategory.PRIVATE_CAR
  );
  const [selectedArea, setSelectedArea] = useState<string>('DHA Phase 1–8');

  const [requests, setRequests] = useState<DriverRequest[]>([]);
  const [drivers, setDrivers] = useState<DriverRegistration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [boardError, setBoardError] = useState<string | null>(null);

  const fetchDispatchData = useCallback(async () => {
    setLoading(true);
    setBoardError(null);
    try {
      const [reqRes, drvRes] = await Promise.all([fetch('/api/requests'), fetch('/api/drivers')]);
      if (!reqRes.ok || !drvRes.ok) {
        throw new Error('Failed to load dispatch records.');
      }
      const [reqJson, drvJson] = await Promise.all([reqRes.json(), drvRes.json()]);
      setRequests(Array.isArray(reqJson.items) ? reqJson.items : []);
      setDrivers(Array.isArray(drvJson.items) ? drvJson.items : []);
    } catch (err) {
      setBoardError(err instanceof Error ? err.message : 'Unable to reach dispatch server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDispatchData();
  }, [fetchDispatchData]);

  function scrollToPortal(tab: 'request' | 'register') {
    setPortalTab(tab);
    const target = document.getElementById('portal');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleSelectCategory(cat: DriverCategory) {
    setSelectedCategory(cat);
    scrollToPortal('request');
  }

  function handleSelectArea(area: string) {
    setSelectedArea(area);
    scrollToPortal('request');
  }

  async function handleUpdateRequestStatus(id: string, status: SubmissionStatus) {
    try {
      const res = await fetch(`/api/requests/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status.');
      const data = await res.json();
      setRequests((prev) => prev.map((r) => (r.id === id ? data.item : r)));
    } catch (err) {
      setBoardError(err instanceof Error ? err.message : 'Failed to update status.');
    }
  }

  async function handleDeleteRequest(id: string) {
    try {
      const res = await fetch(`/api/requests/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to remove request.');
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setBoardError(err instanceof Error ? err.message : 'Failed to remove request.');
    }
  }

  async function handleUpdateDriverStatus(id: string, status: SubmissionStatus) {
    try {
      const res = await fetch(`/api/drivers/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update driver status.');
      const data = await res.json();
      setDrivers((prev) => prev.map((d) => (d.id === id ? data.item : d)));
    } catch (err) {
      setBoardError(err instanceof Error ? err.message : 'Failed to update driver status.');
    }
  }

  async function handleDeleteDriver(id: string) {
    try {
      const res = await fetch(`/api/drivers/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to remove driver.');
      setDrivers((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      setBoardError(err instanceof Error ? err.message : 'Failed to remove driver.');
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900">
      <Header
        lang={lang}
        onBookClick={() => scrollToPortal('request')}
        onRegisterClick={() => scrollToPortal('register')}
      />

      <main className="flex-1">
        <HeroSection
          lang={lang}
          onChangeLang={setLang}
          onRequestDriver={() => scrollToPortal('request')}
          onRegisterDriver={() => scrollToPortal('register')}
        />

        <ServicesSection lang={lang} onSelectCategory={handleSelectCategory} />

        <CoverageSection lang={lang} onSelectAreaForRequest={handleSelectArea} />

        <PortalFormsSection
          lang={lang}
          activeTab={portalTab}
          onTabChange={setPortalTab}
          preselectedCategory={selectedCategory}
          preselectedArea={selectedArea}
          onRequestCreated={(item) => setRequests((prev) => [item, ...prev])}
          onDriverCreated={(item) => setDrivers((prev) => [item, ...prev])}
        />

        <DispatchBoard
          lang={lang}
          requests={requests}
          drivers={drivers}
          loading={loading}
          error={boardError}
          onUpdateRequestStatus={handleUpdateRequestStatus}
          onDeleteRequest={handleDeleteRequest}
          onUpdateDriverStatus={handleUpdateDriverStatus}
          onDeleteDriver={handleDeleteDriver}
          onOpenRequestForm={() => scrollToPortal('request')}
          onOpenDriverForm={() => scrollToPortal('register')}
        />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
