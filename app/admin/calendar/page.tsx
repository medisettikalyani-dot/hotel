"use client";

import * as React from "react";
import {
  CalendarX,
  Plus,
  Trash2,
  Check,
  Building2,
  Clock,
  AlertTriangle,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { RoomDetail } from "@/lib/mock-rooms";
import { BlockedDateRecord } from "@/lib/calendar-service";

export default function AdminCalendarPage() {
  const [blocks, setBlocks] = React.useState<BlockedDateRecord[]>([]);
  const [units, setUnits] = React.useState<RoomDetail[]>([]);
  const [selectedUnit, setSelectedUnit] = React.useState("1bhk");
  const [dateStart, setDateStart] = React.useState("2026-11-20");
  const [dateEnd, setDateEnd] = React.useState("2026-11-23");
  const [reason, setReason] = React.useState("Scheduled Deep Sanitization & AC Maintenance");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [notification, setNotification] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [calRes, invRes] = await Promise.all([
        fetch("/api/admin/calendar"),
        fetch("/api/admin/inventory"),
      ]);

      const calData = await calRes.json();
      const invData = await invRes.json();

      if (calData.success) {
        setBlocks(calData.blockedDates || []);
      }
      if (invData.success && invData.units) {
        setUnits(invData.units);
        if (invData.units.length > 0 && !selectedUnit) {
          setSelectedUnit(invData.units[0].slug);
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load calendar data.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedUnit]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unitId: selectedUnit,
          startDate: dateStart,
          endDate: dateEnd,
          reason,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNotification(`Successfully blocked dates for ${selectedUnit.toUpperCase()}!`);
        setTimeout(() => setNotification(null), 3500);
        fetchData();
      } else {
        alert(data.error || "Failed to block dates.");
      }
    } catch {
      alert("Network error blocking dates.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlock = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/calendar?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setNotification("Blackout date removed in Supabase. Unit is now bookable.");
        setTimeout(() => setNotification(null), 3500);
        fetchData();
      } else {
        alert(data.error || "Failed to remove blackout.");
      }
    } catch {
      alert("Network error removing block.");
    }
  };

  return (
    <div className="space-y-6 select-none max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Calendar Blackout & Maintenance
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Manually lock dates for routine maintenance, deep cleaning, or offline private owner bookings.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchData}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1C1E24] hover:bg-[#252830] border border-[#2E3038] text-xs text-white transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#D4AF37]" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Blackout Form */}
        <div className="rounded-2xl bg-[#181A22] border border-[#2B2E38] p-5 shadow-xl h-fit">
          <h3 className="font-heading text-base font-bold text-white flex items-center gap-2 mb-4">
            <CalendarX className="w-4 h-4 text-[#D4AF37]" />
            <span>Block Specific Dates</span>
          </h3>

          <form onSubmit={handleAddBlock} className="space-y-3 text-xs">
            <div>
              <label className="text-[11px] text-[#A1A1AA] block mb-1">Select Flat Unit</label>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full bg-[#121316] border border-[#2B2E38] rounded-xl px-3 py-2 text-white"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.slug}>
                    {u.title} ({u.category} • {u.branchSlug === "barkas-salala" ? "Barkas" : "Moghal Pura"})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#A1A1AA] block mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  className="w-full bg-[#121316] border border-[#2B2E38] rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#A1A1AA] block mb-1">End Date</label>
                <input
                  type="date"
                  required
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  className="w-full bg-[#121316] border border-[#2B2E38] rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#A1A1AA] block mb-1">Reason / Note</label>
              <input
                type="text"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-[#121316] border border-[#2B2E38] rounded-xl px-3 py-2 text-white"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs transition-colors shadow"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? "Locking Dates..." : "Block Dates in Database"}</span>
            </button>
          </form>
        </div>

        {/* Existing Blackout List */}
        <div className="lg:col-span-2 rounded-2xl bg-[#181A22] border border-[#2B2E38] p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>Active Date Blocks ({blocks.length})</span>
            </h3>
            <span className="text-xs text-[#A1A1AA]">
              These dates are rejected by the booking availability engine.
            </span>
          </div>

          <div className="space-y-3">
            {blocks.length === 0 ? (
              <div className="p-8 text-center text-[#A1A1AA] text-xs">
                No active calendar blackouts. All flats are open for booking.
              </div>
            ) : (
              blocks.map((block) => (
                <div
                  key={block.id}
                  className="p-4 rounded-xl bg-[#14161E] border border-[#262835] flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs uppercase font-mono px-2 py-0.5 rounded bg-[#2B2E38]">
                        {block.unit_id}
                      </span>
                      <span className="text-xs text-[#D4AF37] font-semibold">
                        {block.blocked_date}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A1A1AA]">{block.reason || "Maintenance"}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteBlock(block.id)}
                    className="p-2 rounded-lg bg-[#2B2E38] hover:bg-rose-500/20 text-[#A1A1AA] hover:text-rose-400 transition-colors"
                    title="Remove Blackout"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
