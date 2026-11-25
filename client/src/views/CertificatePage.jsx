'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Search,
  Award,
  CheckCircle2,
  Copy,
  Check,
  X,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

import certificatesData from '../data/certificates.json';

const heroBg = '/assets/bghero.png';

function CertificateContent() {
  const searchParamsHook = useSearchParams();
  const searchParams = Array.isArray(searchParamsHook) ? searchParamsHook[0] : searchParamsHook;

  const getParam = (key) => {
    try {
      if (searchParams && typeof searchParams.get === 'function') {
        return searchParams.get(key);
      }
    } catch {
      // fallback
    }
    return null;
  };

  const initialParamId = getParam('id') || getParam('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialParamId);
  const [isSearched, setIsSearched] = useState(Boolean(initialParamId.trim()));
  const [copiedId, setCopiedId] = useState(null);

  // Prevent both horizontal and vertical window scrollbars when in search result view
  useEffect(() => {
    if (isSearched) {
      const originalOverflow = document.body.style.overflow;
      const originalOverflowX = document.body.style.overflowX;
      document.body.style.overflow = 'hidden';
      document.body.style.overflowX = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.overflowX = originalOverflowX;
      };
    }
  }, [isSearched]);

  // Search ONLY by certificateId
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    return certificatesData.filter((item) => {
      const id = (item.certificateId || '').toLowerCase().trim();
      if (!id || id === 'not on file') return false;
      return id === q || id.includes(q);
    });
  }, [searchQuery]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error('Please enter a Certificate ID');
      return;
    }
    setIsSearched(true);
  };

  const handleBack = () => {
    setIsSearched(false);
  };

  // Handle Copy Certificate ID
  const handleCopy = (id, e) => {
    if (e) e.stopPropagation();
    if (!id || id === 'Not on file') {
      toast.error('No Certificate ID available to copy');
      return;
    }
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success(`Copied "${id}" to clipboard`);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <section
      className="certificate-page-container relative w-full flex flex-col items-center justify-start overflow-hidden text-white"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#002b49',
        height: isSearched ? 'calc(100vh - 70px)' : 'auto',
        minHeight: 'calc(100vh - 70px)',
        overflow: 'hidden',
      }}
    >
      {/* WHITE BLUR OVERLAY - ACTIVATES ON SEARCH */}
      {isSearched && (
        <div
          className="absolute inset-0 z-10 bg-white/85 backdrop-blur-md transition-opacity duration-300 pointer-events-none"
        />
      )}

      {isSearched ? (
        /* RESULT VIEW - FULLY RESPONSIVE, ZERO SCROLLBARS, SMOOTH ANIMATION */
        <div className="w-full h-full max-w-6xl mx-auto flex flex-col items-center justify-start pt-5 sm:pt-8 pb-4 px-3 sm:px-6 relative z-30 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden animate-in fade-in duration-300">
          {/* 1. Only One Back Button */}
          <div className="w-full flex items-center justify-start mb-3 sm:mb-4">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#0096FF] bg-white hover:bg-gray-50 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-[#0096FF]" />
              <span>Back</span>
            </button>
          </div>

          {/* 2. Certificate Result */}
          {searchResults.length === 0 ? (
            /* Not Found Card */
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8 text-center text-gray-800 max-w-xl mx-auto w-full my-auto animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Certificate ID Not Found
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1.5 max-w-md mx-auto leading-relaxed">
                No certificate was found matching ID{' '}
                <span className="font-mono font-semibold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                  {searchQuery}
                </span>
                . Please verify the Certificate ID printed on your document.
              </p>
              <button
                type="button"
                onClick={handleBack}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0096FF] hover:bg-[#0080db] rounded-xl transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Try Another Certificate ID</span>
              </button>
            </div>
          ) : (
            <div className="w-full animate-in zoom-in-98 duration-200">
              {/* DESKTOP TABLE VIEW (Screens >= 1024px) */}
              <div className="hidden lg:block bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-full text-left">
                <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#00518B] text-white font-semibold uppercase tracking-wider text-[11px] select-none">
                        <th className="py-3.5 px-4 min-w-[150px]">Certificate ID</th>
                        <th className="py-3.5 px-4 min-w-[170px]">Participant Name</th>
                        <th className="py-3.5 px-4 min-w-[200px]">Training Topic</th>
                        <th className="py-3.5 px-3 min-w-[110px]">Training Date</th>
                        <th className="py-3.5 px-4 min-w-[170px]">Location</th>
                        <th className="py-3.5 px-4 min-w-[130px] text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-normal">
                      {searchResults.map((item, idx) => {
                        const isCompletion =
                          item.status.toLowerCase().includes('completion') ||
                          item.status.toLowerCase().includes('successful');
                        const hasId = item.certificateId && item.certificateId !== 'Not on file';

                        return (
                          <tr
                            key={`${item.certificateId}-${idx}`}
                            className="hover:bg-blue-50/50 transition-colors duration-150 group bg-white text-gray-800"
                          >
                            {/* 1. Certificate ID */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              {hasId ? (
                                <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#0096FF] bg-blue-50/80 px-2.5 py-1 rounded-md border border-[#0096FF]/20 whitespace-nowrap">
                                  <span className="whitespace-nowrap">{item.certificateId}</span>
                                  <button
                                    type="button"
                                    onClick={(e) => handleCopy(item.certificateId, e)}
                                    className="text-gray-400 hover:text-[#0096FF] transition-all duration-150 p-0.5 rounded cursor-pointer shrink-0 active:scale-90"
                                    title="Copy Certificate ID"
                                  >
                                    {copiedId === item.certificateId ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                </div>
                              ) : (
                                <span className="text-gray-400 italic text-xs whitespace-nowrap">
                                  Not on file
                                </span>
                              )}
                            </td>

                            {/* 2. Participant Name */}
                            <td className="py-3.5 px-4 font-semibold text-gray-900 group-hover:text-[#0096FF] transition-colors whitespace-nowrap">
                              {item.participantName || <span className="text-gray-400">—</span>}
                            </td>

                            {/* 3. Training Topic */}
                            <td className="py-3.5 px-4 text-gray-800 font-medium">
                              <span className="line-clamp-2" title={item.trainingTopic}>
                                {item.trainingTopic || '—'}
                              </span>
                            </td>

                            {/* 4. Date of Training */}
                            <td className="py-3.5 px-3 text-gray-600 whitespace-nowrap text-xs">
                              {item.dateOfTraining || '—'}
                            </td>

                            {/* 5. Client / Location */}
                            <td className="py-3.5 px-4 text-gray-600 text-xs">
                              <span className="line-clamp-2" title={item.clientLocation}>
                                {item.clientLocation || '—'}
                              </span>
                            </td>

                            {/* 6. Status (LAST COLUMN) */}
                            <td className="py-3.5 px-4 text-center whitespace-nowrap">
                              {isCompletion ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                                  <CheckCircle2 className="w-3 h-3" />
                                  {item.status}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#0096FF] border border-[#0096FF]/30 whitespace-nowrap">
                                  <Award className="w-3 h-3" />
                                  {item.status || 'Participation'}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MOBILE & TABLET CARD VIEW (Screens < 1024px) */}
              <div className="lg:hidden space-y-3.5 w-full text-left">
                {searchResults.map((item, idx) => {
                  const isCompletion =
                    item.status.toLowerCase().includes('completion') ||
                    item.status.toLowerCase().includes('successful');
                  const hasId = item.certificateId && item.certificateId !== 'Not on file';

                  return (
                    <div
                      key={`mob-${item.certificateId}-${idx}`}
                      className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-5 hover:border-[#0096FF] transition-all duration-200 text-gray-800"
                    >
                      <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-3 flex-wrap">
                        <div>
                          {hasId ? (
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <span className="font-mono text-xs font-semibold text-[#0096FF] bg-blue-50 px-2 py-0.5 rounded border border-[#0096FF]/20 whitespace-nowrap">
                                {item.certificateId}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => handleCopy(item.certificateId, e)}
                                className="text-gray-400 hover:text-[#0096FF] p-1 rounded cursor-pointer shrink-0 active:scale-90 transition-all"
                                title="Copy ID"
                              >
                                {copiedId === item.certificateId ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 italic whitespace-nowrap">
                              No ID in register
                            </span>
                          )}
                          <h4 className="text-base sm:text-lg font-bold text-gray-900 mt-1.5">
                            {item.participantName || '(Name not available)'}
                          </h4>
                        </div>

                        {/* Status */}
                        <div>
                          {isCompletion ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                              <CheckCircle2 className="w-3 h-3" />
                              {item.status}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0096FF] border border-[#0096FF]/30 whitespace-nowrap">
                              <Award className="w-3 h-3" />
                              {item.status || 'Participation'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Details list */}
                      <div className="mt-3 space-y-2 text-xs sm:text-sm text-gray-600">
                        <div>
                          <span className="font-semibold text-gray-800">Training Topic:</span>{' '}
                          {item.trainingTopic || '—'}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3">
                          <div>
                            <strong className="text-gray-800">Training Date:</strong>{' '}
                            {item.dateOfTraining || '—'}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-800">Location:</span>{' '}
                            {item.clientLocation || '—'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* INITIAL HERO VIEW - EYEBROW, TITLE, SUBTITLE & SEARCH BAR */
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-14 sm:pt-16 pb-16 px-4 relative z-10 transition-all duration-300">
          <div
            style={{ color: '#ffffff' }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 !text-white uppercase mb-2 eyebrow eyebrow-white break-words"
          >
            Official Certificate Register
          </div>

          <h1
            style={{ color: '#ffffff' }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight !text-white max-w-4xl leading-tight"
          >
            <span style={{ color: '#ffffff' }} className="!text-white">Verify &amp; Search </span>
            <span className="hl text-[#0096FF]">Training Certificates</span>
            <span className="text-[#f18032]">.</span>
          </h1>

          <p
            style={{ color: '#e2e8f0' }}
            className="mt-3 text-sm sm:text-base !text-slate-200 max-w-xl font-normal leading-relaxed"
          >
            Enter your official Certificate ID below to instantly authenticate and verify credentials.
          </p>

          {/* Hero Search Box */}
          <form
            onSubmit={handleSearch}
            className="w-full max-w-2xl mt-8 transition-all duration-300 relative"
          >
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl p-1.5 sm:p-2 border border-gray-200 text-[#1a211f]">
              <div className="pl-3 sm:pl-4 text-slate-400">
                <Search className="w-5 h-5 text-[#0096FF]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Certificate ID (e.g. T245-060324-110)..."
                style={{ color: '#1a211f' }}
                className="w-full px-3 py-2 text-sm sm:text-base !text-[#1a211f] placeholder:text-slate-400 bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 mr-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="btn btn-energy shrink-0 bg-[#FF9300] hover:bg-[#e08200] text-white px-4 sm:px-6 py-2 rounded-xl font-semibold text-sm transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Verify</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default function CertificatePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#002b49]" />}>
      <CertificateContent />
    </React.Suspense>
  );
}
