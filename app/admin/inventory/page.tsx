"use client";

import * as React from "react";
import Image from "next/image";
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  MapPin,
  Users,
  Sparkles,
  Save,
  RefreshCw,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { formatPrice } from "@/lib/constants";
import { RoomDetail } from "@/lib/mock-rooms";
import { Branch } from "@/lib/constants";

export default function AdminInventoryPage() {
  const [rooms, setRooms] = React.useState<RoomDetail[]>([]);
  const [branches, setBranches] = React.useState<Branch[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = React.useState<string | null>(null);

  const [editingRoomId, setEditingRoomId] = React.useState<string | null>(null);
  const [editForm, setEditForm] = React.useState<{
    title: string;
    basePrice: number;
    extraPersonFee: number;
    baseAdults: number;
    maxAdults: number;
    totalUnits: number;
    branchSlug: string;
    isAvailable: boolean;
  }>({
    title: "",
    basePrice: 2000,
    extraPersonFee: 500,
    baseAdults: 2,
    maxAdults: 4,
    totalUnits: 1,
    branchSlug: "moghal-pura",
    isAvailable: true,
  });

  // Modal for adding new unit (e.g. 5 BHK)
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newUnitForm, setNewUnitForm] = React.useState({
    title: "5 BHK Presidential Residence",
    category: "5BHK" as "1BHK" | "2BHK" | "3BHK" | "4BHK" | "5BHK",
    slug: "5bhk",
    branchSlug: "barkas-salala",
    basePricePerNight: 5000,
    baseAdults: 10,
    maxAdults: 15,
    maxKids: 4,
    extraPersonFeePerNight: 500,
    totalUnits: 1,
  });

  const fetchInventory = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/inventory");
      const data = await res.json();
      if (data.success) {
        setRooms(data.units || []);
        if (data.branches) setBranches(data.branches);
      } else {
        setError(data.error || "Failed to load inventory.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load inventory.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const startEdit = (room: RoomDetail) => {
    setEditingRoomId(room.id);
    setEditForm({
      title: room.title,
      basePrice: room.basePricePerNight,
      extraPersonFee: room.extraPersonFeePerNight || 500,
      baseAdults: room.baseAdults,
      maxAdults: room.maxAdults,
      totalUnits: room.totalUnits || 1,
      branchSlug: room.branchSlug || "moghal-pura",
      isAvailable: true,
    });
  };

  const handleSave = async (slug: string) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/inventory", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          title: editForm.title,
          basePricePerNight: editForm.basePrice,
          extraPersonFeePerNight: editForm.extraPersonFee,
          baseAdults: editForm.baseAdults,
          maxAdults: editForm.maxAdults,
          totalUnits: editForm.totalUnits,
          branchSlug: editForm.branchSlug,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEditingRoomId(null);
        setSaveSuccess(`Updated ${slug.toUpperCase()} pricing and occupancy in Supabase!`);
        setTimeout(() => setSaveSuccess(null), 3500);
        fetchInventory();
      } else {
        alert(data.error || "Failed to save unit updates.");
      }
    } catch {
      alert("Network error saving unit.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUnitForm),
      });

      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setSaveSuccess(`Created ${newUnitForm.category} (${newUnitForm.title}) successfully!`);
        setTimeout(() => setSaveSuccess(null), 4000);
        fetchInventory();
      } else {
        alert(data.error || "Failed to create new unit category.");
      }
    } catch {
      alert("Network error creating unit.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUnit = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete ${title} (${slug})?`)) return;

    try {
      const res = await fetch(`/api/admin/inventory?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(`Deleted ${slug} from inventory.`);
        setTimeout(() => setSaveSuccess(null), 3500);
        fetchInventory();
      } else {
        alert(data.error || "Failed to delete unit.");
      }
    } catch {
      alert("Network error deleting unit.");
    }
  };

  return (
    <div className="space-y-8 select-none max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Inventory & Rates Manager
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Dynamic database rates, extra guest fees, occupancies, and property branch allocations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchInventory}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1C1E24] hover:bg-[#252830] border border-[#2E3038] text-xs text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#D4AF37]" : ""}`} />
            <span>Refresh</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs transition-colors shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add 5 BHK Category</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Flats List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => {
          const isEditing = editingRoomId === room.id;
          const photoUrl = room.gallery[0]?.url || `/images/flats/flat-${room.slug}-luxury.jpg`;

          return (
            <div
              key={room.id}
              className="rounded-2xl bg-[#181A22] border border-[#2B2E38] overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-[16/9] w-full bg-[#121316]">
                  <Image
                    src={photoUrl}
                    alt={room.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-white/10">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>{room.branchSlug === "barkas-salala" ? "Barkas Salala" : "Moghal Pura"}</span>
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className="text-xs font-bold text-[#121316] px-2.5 py-1 rounded-xl bg-[#D4AF37]">
                      {room.type}
                    </span>
                  </div>
                </div>

                {/* Flat Details / Edit Form */}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">
                        {room.title}
                      </h3>
                      <span className="text-[11px] text-[#A1A1AA]">
                        {room.totalUnits} physical unit(s) in property
                      </span>
                    </div>
                    <span className="text-sm font-mono text-[#D4AF37] font-bold">
                      {formatPrice(room.basePricePerNight)} / night
                    </span>
                  </div>

                  {isEditing ? (
                    <div className="mt-4 space-y-3 bg-[#1F222C] p-4 rounded-xl border border-[#2E3038] text-xs">
                      <div>
                        <label className="text-[11px] text-[#A1A1AA] block mb-1">
                          Residence Title
                        </label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full bg-[#14161E] border border-[#2B2E38] rounded-lg px-2.5 py-1.5 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-[#A1A1AA] block mb-1">
                            Base Price / Night (₹)
                          </label>
                          <input
                            type="number"
                            value={editForm.basePrice}
                            onChange={(e) =>
                              setEditForm({ ...editForm, basePrice: Number(e.target.value) })
                            }
                            className="w-full bg-[#14161E] border border-[#2B2E38] rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#A1A1AA] block mb-1">
                            Extra Person Fee (₹)
                          </label>
                          <input
                            type="number"
                            value={editForm.extraPersonFee}
                            onChange={(e) =>
                              setEditForm({ ...editForm, extraPersonFee: Number(e.target.value) })
                            }
                            className="w-full bg-[#14161E] border border-[#2B2E38] rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] text-[#A1A1AA] block mb-1">
                            Base Adults
                          </label>
                          <input
                            type="number"
                            value={editForm.baseAdults}
                            onChange={(e) =>
                              setEditForm({ ...editForm, baseAdults: Number(e.target.value) })
                            }
                            className="w-full bg-[#14161E] border border-[#2B2E38] rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#A1A1AA] block mb-1">
                            Max Adults
                          </label>
                          <input
                            type="number"
                            value={editForm.maxAdults}
                            onChange={(e) =>
                              setEditForm({ ...editForm, maxAdults: Number(e.target.value) })
                            }
                            className="w-full bg-[#14161E] border border-[#2B2E38] rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-[#A1A1AA] block mb-1">
                            Units Count
                          </label>
                          <input
                            type="number"
                            value={editForm.totalUnits}
                            onChange={(e) =>
                              setEditForm({ ...editForm, totalUnits: Number(e.target.value) })
                            }
                            className="w-full bg-[#14161E] border border-[#2B2E38] rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-[#A1A1AA] block mb-1">
                          Property Branch Assignment
                        </label>
                        <select
                          value={editForm.branchSlug}
                          onChange={(e) =>
                            setEditForm({ ...editForm, branchSlug: e.target.value })
                          }
                          className="w-full bg-[#14161E] border border-[#2B2E38] rounded-lg px-2.5 py-1.5 text-white"
                        >
                          <option value="barkas-salala">Barkas Salala (Near Chandrayangutta)</option>
                          <option value="moghal-pura">Moghal Pura (Near Charminar)</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#2E3038]">
                        <button
                          type="button"
                          onClick={() => setEditingRoomId(null)}
                          className="px-3 py-1.5 rounded-lg bg-[#2B2E38] hover:bg-[#343844] text-[#A1A1AA] text-xs transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          disabled={isSaving}
                          onClick={() => handleSave(room.slug)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs flex items-center gap-1.5 transition-colors shadow"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{isSaving ? "Saving..." : "Save to DB"}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-2 text-xs">
                      <div className="grid grid-cols-2 gap-2 text-[#A1A1AA]">
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider">Base Capacity:</span>
                          <span className="text-white font-medium">{room.baseAdults} Adults</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider">Max Capacity:</span>
                          <span className="text-white font-medium">{room.maxAdults} Adults</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider">Extra Person Fee:</span>
                          <span className="text-white font-medium">₹{room.extraPersonFeePerNight} / night</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider">Active Units:</span>
                          <span className="text-white font-medium">{room.totalUnits} Units</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#262835] flex items-center justify-between">
                        <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> 100% Dynamic & Editable
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(room)}
                            className="inline-flex items-center gap-1 text-xs text-[#D4AF37] hover:underline font-semibold"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit Rates</span>
                          </button>
                          {room.category === "5BHK" && (
                            <button
                              type="button"
                              onClick={() => handleDeleteUnit(room.slug, room.title)}
                              className="text-rose-400 hover:text-rose-300 p-1"
                              title="Delete unit"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: ADD 5 BHK / CUSTOM UNIT CATEGORY */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#181A22] border border-[#2B2E38] rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2B2E38] pb-3">
              <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#D4AF37]" />
                <span>Add 5 BHK Category to Inventory</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[#A1A1AA] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUnit} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] text-[#A1A1AA] block mb-1">Residence Title</label>
                <input
                  type="text"
                  required
                  value={newUnitForm.title}
                  onChange={(e) => setNewUnitForm({ ...newUnitForm, title: e.target.value })}
                  className="w-full bg-[#121316] border border-[#2B2E38] rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#A1A1AA] block mb-1">Category</label>
                  <select
                    value={newUnitForm.category}
                    onChange={(e) =>
                      setNewUnitForm({
                        ...newUnitForm,
                        category: e.target.value as "5BHK",
                      })
                    }
                    className="w-full bg-[#121316] border border-[#2B2E38] rounded-lg px-3 py-2 text-white"
                  >
                    <option value="5BHK">5 BHK</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-[#A1A1AA] block mb-1">URL Identifier (Slug)</label>
                  <input
                    type="text"
                    required
                    value={newUnitForm.slug}
                    onChange={(e) => setNewUnitForm({ ...newUnitForm, slug: e.target.value })}
                    className="w-full bg-[#121316] border border-[#2B2E38] rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#A1A1AA] block mb-1">Base Price / Night (₹)</label>
                  <input
                    type="number"
                    required
                    value={newUnitForm.basePricePerNight}
                    onChange={(e) =>
                      setNewUnitForm({ ...newUnitForm, basePricePerNight: Number(e.target.value) })
                    }
                    className="w-full bg-[#121316] border border-[#2B2E38] rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#A1A1AA] block mb-1">Extra Person Fee (₹)</label>
                  <input
                    type="number"
                    required
                    value={newUnitForm.extraPersonFeePerNight}
                    onChange={(e) =>
                      setNewUnitForm({
                        ...newUnitForm,
                        extraPersonFeePerNight: Number(e.target.value),
                      })
                    }
                    className="w-full bg-[#121316] border border-[#2B2E38] rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-[#A1A1AA] block mb-1">Base Adults</label>
                  <input
                    type="number"
                    required
                    value={newUnitForm.baseAdults}
                    onChange={(e) =>
                      setNewUnitForm({ ...newUnitForm, baseAdults: Number(e.target.value) })
                    }
                    className="w-full bg-[#121316] border border-[#2B2E38] rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#A1A1AA] block mb-1">Max Adults</label>
                  <input
                    type="number"
                    required
                    value={newUnitForm.maxAdults}
                    onChange={(e) =>
                      setNewUnitForm({ ...newUnitForm, maxAdults: Number(e.target.value) })
                    }
                    className="w-full bg-[#121316] border border-[#2B2E38] rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#A1A1AA] block mb-1">Physical Units</label>
                  <input
                    type="number"
                    required
                    value={newUnitForm.totalUnits}
                    onChange={(e) =>
                      setNewUnitForm({ ...newUnitForm, totalUnits: Number(e.target.value) })
                    }
                    className="w-full bg-[#121316] border border-[#2B2E38] rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#A1A1AA] block mb-1">Branch</label>
                <select
                  value={newUnitForm.branchSlug}
                  onChange={(e) => setNewUnitForm({ ...newUnitForm, branchSlug: e.target.value })}
                  className="w-full bg-[#121316] border border-[#2B2E38] rounded-lg px-3 py-2 text-white"
                >
                  <option value="barkas-salala">Barkas Salala</option>
                  <option value="moghal-pura">Moghal Pura</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#2B2E38]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#2B2E38] text-[#A1A1AA] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold"
                >
                  {isSaving ? "Creating..." : "Create 5 BHK Residence"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
