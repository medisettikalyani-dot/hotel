"use client";

import * as React from "react";
import {
  CalendarCheck,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Filter,
  CreditCard,
  Banknote,
  Check,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { formatPrice } from "@/lib/constants";
import { BookingRecord } from "@/types/booking";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = React.useState<BookingRecord[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [successNote, setSuccessNote] = React.useState<string | null>(null);

  const fetchBookings = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = new URL("/api/admin/bookings", window.location.origin);
      if (statusFilter !== "all") url.searchParams.set("status", statusFilter);
      if (searchTerm.trim()) url.searchParams.set("query", searchTerm.trim());

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        setError(data.error || "Failed to load bookings.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load bookings.");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, searchTerm]);

  React.useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleMarkBalanceCollected = async (bookingId: string, bookingCode: string) => {
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: bookingId,
          balanceCollected: true,
          bookingStatus: "checked_in",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessNote(`Successfully recorded 80% balance collected for ${bookingCode} via Arrival Desk Cash/UPI!`);
        setTimeout(() => setSuccessNote(null), 4000);
        fetchBookings();
      } else {
        alert(data.error || "Failed to update balance collection status.");
      }
    } catch {
      alert("Network error updating booking.");
    }
  };

  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: bookingId,
          bookingStatus: newStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchBookings();
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6 select-none max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Reservations & Collections Ledger
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Track guest bookings, verify domestic/international ID proofs, and collect the 80% balance on arrival.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchBookings}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1C1E24] hover:bg-[#252830] border border-[#2E3038] text-xs text-white transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#D4AF37]" : ""}`} />
          <span>Refresh Bookings</span>
        </button>
      </div>

      {successNote && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{successNote}</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#181A22] p-4 rounded-2xl border border-[#2B2E38]">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Booking ID (FLT-xxxxx), guest name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#121316] border border-[#2B2E38] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "All Bookings" },
            { id: "confirmed", label: "Confirmed" },
            { id: "checked_in", label: "Checked In" },
            { id: "completed", label: "Completed" },
            { id: "cancelled", label: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? "bg-[#D4AF37] text-[#121316]"
                  : "bg-[#1C1F28] text-[#A1A1AA] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl bg-[#181A22] border border-[#2B2E38] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          {bookings.length === 0 ? (
            <div className="p-12 text-center text-[#A1A1AA] text-xs">
              No reservations matched your criteria.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1C1F28] text-[#A1A1AA] uppercase tracking-wider border-b border-[#2B2E38]">
                <tr>
                  <th className="py-3 px-4">Booking ID</th>
                  <th className="py-3 px-4">Guest Information</th>
                  <th className="py-3 px-4">Residence & Stay Purpose</th>
                  <th className="py-3 px-4">Dates & Occupancy</th>
                  <th className="py-3 px-4">Payment Breakdown</th>
                  <th className="py-3 px-4">Arrival Desk Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262835] text-[#F5F5F7]">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#1E212B] transition-colors">
                    {/* Booking Code & Status */}
                    <td className="py-4 px-4 align-top">
                      <span className="font-mono font-bold text-sm text-[#D4AF37] block">
                        {b.bookingCode}
                      </span>
                      <span className="text-[10px] text-[#A1A1AA] block mt-0.5">
                        {new Date(b.createdAt).toLocaleDateString("en-IN")}
                      </span>
                      <div className="mt-2">
                        <select
                          value={b.bookingStatus}
                          onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                          className="bg-[#121316] border border-[#2B2E38] text-[10px] text-white rounded px-1.5 py-0.5"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="checked_in">Checked In</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>

                    {/* Guest Information */}
                    <td className="py-4 px-4 align-top">
                      <span className="font-bold text-white text-sm block">{b.guest.fullName}</span>
                      <div className="flex items-center gap-1 text-[11px] text-[#A1A1AA] mt-1">
                        <Phone className="w-3 h-3 text-[#D4AF37]" />
                        <span>{b.guest.phone}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#A1A1AA] mt-0.5">
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[180px]">{b.guest.email}</span>
                      </div>
                      <div className="mt-1.5">
                        <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          {b.guest.isInternational ? "Passport Required" : "Govt ID Required"}
                        </span>
                      </div>
                    </td>

                    {/* Residence & Purpose */}
                    <td className="py-4 px-4 align-top">
                      <span className="font-semibold text-white block uppercase">{b.unitId}</span>
                      <span className="text-[11px] text-[#D4AF37] font-medium block mt-0.5 capitalize">
                        {b.stayPurpose} Stay
                      </span>
                      {b.guest.specialRequests && (
                        <p className="text-[10px] text-[#A1A1AA] italic mt-1 max-w-[200px]">
                          &ldquo;{b.guest.specialRequests}&rdquo;
                        </p>
                      )}
                    </td>

                    {/* Dates & Occupancy */}
                    <td className="py-4 px-4 align-top">
                      <span className="font-medium block">
                        {b.checkInDate} → {b.checkOutDate}
                      </span>
                      <span className="text-[11px] text-[#A1A1AA] block mt-0.5">
                        {b.totalNights} Nights • {b.adultsCount} Adults{b.kidsCount > 0 ? `, ${b.kidsCount} Kids` : ""}
                      </span>
                    </td>

                    {/* Financial Breakdown */}
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-0.5">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[11px] text-[#A1A1AA]">Gross:</span>
                          <span className="font-mono font-bold text-white">
                            {formatPrice(b.pricing.grossTotal)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[11px] text-emerald-400">20% Paid:</span>
                          <span className="font-mono font-semibold text-emerald-400">
                            {formatPrice(b.pricing.advancePayable)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 pt-1 border-t border-[#2B2E38]">
                          <span className="text-[11px] text-[#D4AF37] font-bold">80% Balance:</span>
                          <span className="font-mono font-bold text-[#D4AF37]">
                            {formatPrice(b.pricing.balanceDueOnArrival)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Arrival Desk Action */}
                    <td className="py-4 px-4 align-top">
                      {b.balanceCollected ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>80% Balance Collected</span>
                          </span>
                          <span className="text-[10px] text-[#A1A1AA] block">
                            Settled on Arrival (Cash/UPI)
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                            <Clock className="w-3 h-3" /> Pending on Arrival
                          </span>
                          <button
                            type="button"
                            onClick={() => handleMarkBalanceCollected(b.id, b.bookingCode)}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs transition-colors shadow"
                          >
                            <Banknote className="w-3.5 h-3.5" />
                            <span>Mark 80% Collected</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
