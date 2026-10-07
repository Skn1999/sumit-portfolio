import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Shield,
  Key,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Sparkles,
  Info,
} from 'lucide-react';
import { ArcButton } from './arc/ArcButton';
import { ArcBadge } from './arc/ArcBadge';
import {
  getGoogleClientId,
  setGoogleClientId,
  authenticateGmail,
  fetchGmailProfile,
  syncGmailInbox,
  disconnectGmail,
  GmailSyncResult,
} from '../lib/gmailService';

interface GmailConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | null;
  onSyncComplete: (result: GmailSyncResult) => void;
  onDisconnect: () => void;
  onLoadDemoData: () => void;
}

export const GmailConnectModal: React.FC<GmailConnectModalProps> = ({
  isOpen,
  onClose,
  userEmail,
  onSyncComplete,
  onDisconnect,
  onLoadDemoData,
}) => {
  const [clientId, setClientIdState] = useState<string>(() => getGoogleClientId());
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [copiedOrigin, setCopiedOrigin] = useState(false);

  const handleSaveAndConnect = async () => {
    setErrorMsg(null);
    if (!clientId.trim()) {
      setErrorMsg('Please enter your Google OAuth Client ID.');
      return;
    }

    try {
      setIsAuthenticating(true);
      setGoogleClientId(clientId.trim());

      // 1. Authenticate with Google (prompt for account selection & consent)
      const token = await authenticateGmail(clientId.trim(), true);

      // 2. Fetch Profile to confirm user email
      const profile = await fetchGmailProfile(token);

      // 3. Initial Sync: Last 2 Days
      setIsSyncing(true);
      const syncResult = await syncGmailInbox(token, true);

      onSyncComplete(syncResult);
      setIsAuthenticating(false);
      setIsSyncing(false);
      onClose();
    } catch (err: any) {
      setIsAuthenticating(false);
      setIsSyncing(false);
      setErrorMsg(err.message || 'Authentication failed. Please check your Client ID and redirect origins.');
    }
  };

  const handleIncrementalSync = async () => {
    setErrorMsg(null);
    try {
      setIsSyncing(true);
      const token = await authenticateGmail(clientId.trim());
      const syncResult = await syncGmailInbox(token, false);
      onSyncComplete(syncResult);
      setIsSyncing(false);
    } catch (err: any) {
      setIsSyncing(false);
      setErrorMsg(err.message || 'Incremental sync failed.');
    }
  };

  const handleDisconnect = () => {
    disconnectGmail();
    onDisconnect();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="gmail-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none font-ui bg-black/40"
        >
          {/* Modal Card */}
          <motion.div
            key="gmail-modal-card"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#ffffff] border border-[#e1e1e1] rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            {/* Header */}
            <div className="p-5 border-b border-[#e1e1e1] bg-[#fff3e7] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#030302] text-[#ffffff]">
                  <Mail className="w-5 h-5 text-[#ff4500]" />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-medium text-[#030302] tracking-tight">
                    Gmail Ingestion Engine
                  </h3>
                  <p className="text-xs text-[#41413f]">
                    Read-Only • 2-Day Initial & 1-Day Incremental Sync
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#efefef] text-[#41413f] hover:text-[#030302] transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-5 text-left">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-[#ff4500]/10 border border-[#ff4500]/25 text-xs text-[#ff4500] leading-relaxed">
                  <strong>Connection Error:</strong> {errorMsg}
                </div>
              )}

              {userEmail ? (
                // ================= ALREADY CONNECTED VIEW =================
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#f7f7f7] border border-[#e1e1e1] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0087ff] text-[#ffffff] flex items-center justify-center font-bold text-sm">
                        {userEmail.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-[#030302]">{userEmail}</h4>
                          <span className="w-2 h-2 rounded-full bg-[#9bd8a9]" />
                        </div>
                        <p className="text-[11px] text-[#bebbba] font-mono">
                          Google OAuth 2.0 (Read-Only)
                        </p>
                      </div>
                    </div>

                    <ArcBadge variant="mint" size="sm" icon={<CheckCircle2 className="w-3 h-3" />}>
                      Connected
                    </ArcBadge>
                  </div>

                  {/* Sync Controls */}
                  <div className="p-4 rounded-2xl bg-[#fff3e7] border border-[#e1e1e1] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#030302]">
                        Incremental Sync
                      </span>
                      <span className="text-[10px] text-[#bebbba] font-mono">
                        Window: Last 24 Hours
                      </span>
                    </div>
                    <p className="text-xs text-[#41413f] leading-relaxed">
                      Fetches fresh emails from the last 1 day. Existing triaged tasks and notes remain pinned on your board.
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <ArcButton
                        variant="primary"
                        size="sm"
                        icon={<RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />}
                        onClick={handleIncrementalSync}
                        disabled={isSyncing}
                      >
                        {isSyncing ? 'Syncing Inbox...' : 'Sync Now (Last 1 Day)'}
                      </ArcButton>

                      <button
                        type="button"
                        onClick={handleDisconnect}
                        className="text-xs text-[#ff4500] hover:underline flex items-center gap-1"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Disconnect</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // ================= NOT CONNECTED VIEW =================
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#f7f7f7] border border-[#e1e1e1] space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#030302]">
                      <Shield className="w-4 h-4 text-[#52b788]" />
                      <span>Zero-Risk Read-Only Ingestion</span>
                    </div>
                    <p className="text-xs text-[#41413f] leading-relaxed">
                      Requests strictly <code className="bg-white px-1.5 py-0.5 rounded border text-[11px] font-mono">gmail.readonly</code>. It never deletes, moves, or sends emails from Google’s servers.
                    </p>
                  </div>

                  {clientId.trim().length > 0 ? (
                    // Client ID is already configured (from .env or previous save)
                    <div className="space-y-4">
                      <div className="p-3.5 rounded-2xl bg-[#9bd8a9]/20 border border-[#9bd8a9]/50 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#2d6a4f]" />
                          <div>
                            <p className="text-xs font-semibold text-[#030302]">OAuth Client Configured</p>
                            <p className="text-[10px] font-mono text-[#41413f] truncate max-w-[260px]">
                              {clientId}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowSetupGuide(!showSetupGuide)}
                          className="text-xs text-[#0087ff] hover:underline flex-shrink-0"
                        >
                          {showSetupGuide ? 'Close' : 'Edit'}
                        </button>
                      </div>

                      {/* Origin Whitelist Alert to prevent 'no registered origin' error */}
                      <div className="p-3 rounded-2xl bg-[#fff3e7] border border-[#fde99b] text-xs text-[#41413f] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#030302] text-[11px]">
                            Authorized Origin Required in Google Cloud:
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (typeof navigator !== 'undefined' && navigator.clipboard) {
                                navigator.clipboard.writeText(window.location.origin);
                                setCopiedOrigin(true);
                                setTimeout(() => setCopiedOrigin(false), 2500);
                              }
                            }}
                            className="text-[11px] font-semibold text-[#0087ff] hover:underline"
                          >
                            {copiedOrigin ? '✓ Copied to clipboard!' : 'Copy Origin'}
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="bg-white px-2 py-1 rounded-lg border border-[#e1e1e1] font-mono text-[11px] text-[#030302] font-semibold select-all">
                            {typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8080'}
                          </code>
                        </div>
                        <p className="text-[10px] text-[#776622] leading-relaxed">
                          If Google blocks with <em>"no registered origin"</em>, open your Client ID in <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" className="text-[#0087ff] underline">Google Cloud Credentials</a> and add the exact URL above under <strong>Authorized JavaScript origins</strong>.
                        </p>
                      </div>

                      {showSetupGuide && (
                        <div className="space-y-1">
                          <label className="block text-xs font-mono text-[#bebbba] uppercase">
                            Update Client ID
                          </label>
                          <input
                            type="text"
                            placeholder="your-app-id.apps.googleusercontent.com"
                            value={clientId}
                            onChange={(e) => setClientIdState(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-[#f7f7f7] border border-[#e1e1e1] text-xs text-[#030302] focus:outline-none focus:ring-1 focus:ring-[#030302] font-mono"
                          />
                        </div>
                      )}

                      <ArcButton
                        variant="primary"
                        size="md"
                        icon={<Mail className="w-4 h-4 text-[#ff4500]" />}
                        onClick={handleSaveAndConnect}
                        disabled={isAuthenticating || isSyncing}
                        className="w-full justify-center py-2.5 text-sm"
                      >
                        {isAuthenticating
                          ? 'Opening Google Login...'
                          : isSyncing
                          ? 'Fetching Last 2 Days...'
                          : 'Open Google Sign-In Window'}
                      </ArcButton>
                    </div>
                  ) : (
                    // Client ID is not yet configured
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-mono text-[#bebbba] uppercase">
                            Google Cloud Client ID
                          </label>
                          <a
                            href="https://console.cloud.google.com/apis/credentials"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-[#0087ff] hover:underline flex items-center gap-0.5"
                          >
                            <span>Open Google Cloud Credentials</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                        <div className="relative">
                          <Key className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#bebbba]" />
                          <input
                            type="text"
                            placeholder="e.g. 123456789-xyz.apps.googleusercontent.com"
                            value={clientId}
                            onChange={(e) => setClientIdState(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#f7f7f7] border border-[#e1e1e1] text-xs text-[#030302] focus:outline-none focus:ring-1 focus:ring-[#030302] font-mono"
                          />
                        </div>
                        <p className="text-[11px] text-[#bebbba] mt-1">
                          Saved once to your local environment. You can also paste into <code className="bg-[#efefef] px-1 rounded font-mono">.env</code> as <code className="bg-[#efefef] px-1 rounded font-mono">VITE_GOOGLE_CLIENT_ID</code>.
                        </p>
                      </div>

                      <div className="pt-1">
                        <ArcButton
                          variant="primary"
                          size="md"
                          icon={<Mail className="w-4 h-4 text-[#ff4500]" />}
                          onClick={handleSaveAndConnect}
                          disabled={isAuthenticating || isSyncing || !clientId.trim()}
                          className="w-full justify-center"
                        >
                          Save & Open Google Sign-In
                        </ArcButton>
                      </div>
                    </div>
                  )}

                  {/* Quick Options Footer */}
                  <div className="pt-3 flex items-center justify-between border-t border-[#e1e1e1] text-xs">
                    <button
                      type="button"
                      onClick={() => setShowSetupGuide(!showSetupGuide)}
                      className="text-[#0087ff] hover:underline flex items-center gap-1"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>{showSetupGuide ? 'Hide 30s Setup Steps' : 'Need help getting a Client ID?'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onLoadDemoData();
                        onClose();
                      }}
                      className="text-[#41413f] hover:text-[#030302] font-semibold"
                    >
                      Use Demo Mock Inbox →
                    </button>
                  </div>

                  {/* Setup Guide Accordion */}
                  {showSetupGuide && (
                    <div className="p-3.5 rounded-xl bg-[#fff3e7] border border-[#e1e1e1] text-xs text-[#41413f] space-y-2 leading-relaxed">
                      <p className="font-semibold text-[#030302]">30-Second Google Cloud Setup (No Firebase needed):</p>
                      <ol className="list-decimal pl-4 space-y-1 text-[11px]">
                        <li>
                          Open{' '}
                          <a
                            href="https://console.cloud.google.com/apis/credentials"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0087ff] underline inline-flex items-center gap-0.5"
                          >
                            Google Cloud Credentials <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </li>
                        <li>Create a project and enable the <strong>Gmail API</strong>.</li>
                        <li>
                          Click <strong>Create Credentials → OAuth Client ID</strong> (Application type: <em>Web application</em>).
                        </li>
                        <li>
                          Under <strong>Authorized JavaScript origins</strong>, add:
                          <br />
                          <code className="bg-white px-1 rounded font-mono text-[10px]">http://localhost:5173</code> and{' '}
                          <code className="bg-white px-1 rounded font-mono text-[10px]">http://localhost:8090</code>
                        </li>
                        <li>Paste your Client ID above and click <em>Save & Open Google Sign-In</em>!</li>
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
